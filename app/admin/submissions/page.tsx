"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useData } from "@/lib/data-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Filter,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileText,
  ExternalLink,
  RefreshCw,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminSubmissions() {
  const { submissions, hackathons, users, updateSubmissionStatus } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [hackathonFilter, setHackathonFilter] = useState("all")
  const [refreshKey, setRefreshKey] = useState(0)

  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [viewSubmissionDialogOpen, setViewSubmissionDialogOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [feedback, setFeedback] = useState("")
  const [newStatus, setNewStatus] = useState<"pending" | "approved" | "rejected">("pending")

  // Filter submissions based on search, status, and hackathon
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      searchTerm === "" ||
      submission.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesHackathon = hackathonFilter === "all" || submission.hackathonId === hackathonFilter

    return matchesSearch && matchesStatus && matchesHackathon
  })

  const handleOpenFeedbackDialog = (submission: any, initialStatus: "pending" | "approved" | "rejected") => {
    setSelectedSubmission(submission)
    setFeedback(submission.feedback || "")
    setNewStatus(initialStatus)
    setFeedbackDialogOpen(true)
  }

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission)
    setViewSubmissionDialogOpen(true)
  }

  const handleSubmitFeedback = () => {
    if (selectedSubmission) {
      updateSubmissionStatus(selectedSubmission.id, newStatus, feedback)

      toast({
        title: `Submission ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
        description: `The submission has been ${newStatus}. Feedback has been sent to the user.`,
      })

      setFeedbackDialogOpen(false)
    }
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
    toast({
      title: "Refreshed",
      description: "Submissions list has been refreshed",
    })
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/80"
      case "approved":
        return "bg-green-500/80"
      case "rejected":
        return "bg-red-500/80"
      default:
        return "bg-gray-500/80"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Submissions</h1>
            <p className="text-muted-foreground">Review and manage user project submissions</p>
          </div>
          <Button onClick={handleRefresh} className="bg-primary hover:bg-primary/80 transition-all duration-300">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search submissions..."
              className="pl-10 border-primary/20 focus:border-primary transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-primary/20 focus:border-primary transition-all duration-300">
              <Filter className="mr-2 h-4 w-4 text-primary" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={hackathonFilter} onValueChange={setHackathonFilter}>
            <SelectTrigger className="w-[220px] border-primary/20 focus:border-primary transition-all duration-300">
              <Filter className="mr-2 h-4 w-4 text-primary" />
              <SelectValue placeholder="Filter by hackathon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hackathons</SelectItem>
              {hackathons.map((hackathon) => (
                <SelectItem key={hackathon.id} value={hackathon.id}>
                  {hackathon.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription>A list of all project submissions from users</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No submissions found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || hackathonFilter !== "all"
                  ? "Try changing your search or filter criteria"
                  : "There are no project submissions yet"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Hackathon</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => {
                  const hackathon = hackathons.find((h) => h.id === submission.hackathonId)
                  const user = users.find((u) => u.id === submission.userId)

                  if (!hackathon || !user) return null

                  const completedTasks = submission.tasks.filter((t) => t.completed).length
                  const totalTasks = submission.tasks.length
                  const progress = Math.round((completedTasks / totalTasks) * 100)

                  return (
                    <TableRow key={submission.id} className="transition-colors hover:bg-primary/5">
                      <TableCell>
                        <div className="font-medium">{submission.projectName}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {submission.description.substring(0, 60)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{hackathon.title}</div>
                        <div className="text-xs text-muted-foreground">{hackathon.category}</div>
                      </TableCell>
                      <TableCell>{new Date(submission.submissionDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(submission.status)}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-primary/10 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                            onClick={() => handleViewSubmission(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                            onClick={() => handleOpenFeedbackDialog(submission, submission.status)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {submission.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-green-500/20 text-green-500 hover:bg-green-500/10 transition-all duration-300"
                                onClick={() => handleOpenFeedbackDialog(submission, "approved")}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all duration-300"
                                onClick={() => handleOpenFeedbackDialog(submission, "rejected")}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {newStatus === "pending"
                ? "Update Feedback"
                : newStatus === "approved"
                  ? "Approve Submission"
                  : "Reject Submission"}
            </DialogTitle>
            <DialogDescription>
              {newStatus === "pending"
                ? "Update feedback for this submission"
                : newStatus === "approved"
                  ? "Provide feedback for the approved submission"
                  : "Provide feedback explaining why the submission was rejected"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedSubmission && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Project: {selectedSubmission.projectName}</h4>
                <p className="text-sm text-muted-foreground">{selectedSubmission.description.substring(0, 100)}...</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback to the user about their submission"
                className="min-h-[120px]"
              />
            </div>
            {newStatus === "pending" && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newStatus}
                  onValueChange={(value: "pending" | "approved" | "rejected") => setNewStatus(value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              className={
                newStatus === "approved"
                  ? "bg-green-500 hover:bg-green-600"
                  : newStatus === "rejected"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary hover:bg-primary/80"
              }
            >
              {newStatus === "pending" ? "Update Feedback" : newStatus === "approved" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Submission Dialog */}
      {selectedSubmission && (
        <Dialog open={viewSubmissionDialogOpen} onOpenChange={setViewSubmissionDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Project Submission Details</DialogTitle>
              <DialogDescription>Detailed information about the submitted project</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{selectedSubmission.projectName}</h3>
                <Badge className={getStatusBadgeClass(selectedSubmission.status)}>
                  {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                </Badge>
                <p className="text-muted-foreground">{selectedSubmission.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Submitted By</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      {users.find((u) => u.id === selectedSubmission.userId)?.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{users.find((u) => u.id === selectedSubmission.userId)?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {users.find((u) => u.id === selectedSubmission.userId)?.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Hackathon</h4>
                  <div className="font-medium">
                    {hackathons.find((h) => h.id === selectedSubmission.hackathonId)?.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {hackathons.find((h) => h.id === selectedSubmission.hackathonId)?.category}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Submission Date</h4>
                  <div>{new Date(selectedSubmission.submissionDate).toLocaleDateString()}</div>
                </div>
                {selectedSubmission.teamId && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Team</h4>
                    <div>Team submission</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium mb-1">Links</h4>
                <div className="flex flex-col gap-2">
                  <a
                    href={selectedSubmission.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Repository: {selectedSubmission.repoUrl}
                  </a>
                  {selectedSubmission.demoUrl && (
                    <a
                      href={selectedSubmission.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo: {selectedSubmission.demoUrl}
                    </a>
                  )}
                  {selectedSubmission.fileUrl && (
                    <a
                      href={selectedSubmission.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      Uploaded File
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium mb-1">Project Tasks</h4>
                <div className="space-y-2">
                  {selectedSubmission.tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`h-5 w-5 rounded-full flex items-center justify-center ${task.completed ? "bg-green-500 text-white" : "bg-muted"}`}
                      >
                        {task.completed && <CheckCircle className="h-3 w-3" />}
                      </div>
                      <span className={task.completed ? "line-through text-muted-foreground" : ""}>{task.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedSubmission.feedback && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium mb-1">Feedback</h4>
                  <Alert>
                    <AlertTitle>Admin Feedback</AlertTitle>
                    <AlertDescription>{selectedSubmission.feedback}</AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewSubmissionDialogOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setViewSubmissionDialogOpen(false)
                  handleOpenFeedbackDialog(selectedSubmission, selectedSubmission.status)
                }}
                className="bg-primary hover:bg-primary/80"
              >
                Provide Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

