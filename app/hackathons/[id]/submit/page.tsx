"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useData, type ProjectSubmission, type Team } from "@/lib/data-service"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash, Save, Clock, AlertCircle, Upload, LinkIcon, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { SiteFooter } from "@/components/site-footer"

export default function SubmitProject() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")

  const { user, isLoading: authLoading } = useAuth()
  const {
    getHackathon,
    getUserSubmissions,
    addSubmission,
    updateSubmission,
    getUserTeams,
    startHackathonTimer,
    registerForHackathon,
  } = useData()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hackathon, setHackathon] = useState<any>(null)
  const [existingSubmission, setExistingSubmission] = useState<ProjectSubmission | null>(null)
  const [userTeams, setUserTeams] = useState<Team[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [step, setStep] = useState(1)
  const [isRegistered, setIsRegistered] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
    teamId: "individual",
    tasks: [
      { name: "Project Setup", completed: false },
      { name: "Core Functionality", completed: false },
      { name: "UI Implementation", completed: false },
      { name: "Testing", completed: false },
      { name: "Documentation", completed: false },
    ],
  })

  // Load hackathon and user data
  useEffect(() => {
    if (authLoading || isInitialized) return

    const initializeSubmission = async () => {
      if (!user) {
        router.push("/login?redirect=" + encodeURIComponent(`/hackathons/${params.id}/submit`))
        return
      }

      const hackathonId = params.id as string
      const hackathonData = getHackathon(hackathonId)

      if (hackathonData) {
        setHackathon(hackathonData)

        // Check if user is registered
        const userIsRegistered = user.registeredHackathons?.includes(hackathonId) || false
        setIsRegistered(userIsRegistered)

        // Get user's teams for this hackathon
        const teams = getUserTeams(user.id).filter((team) => team.hackathonId === hackathonId)
        setUserTeams(teams)

        // If editing an existing submission
        if (editId) {
          const userSubmissions = getUserSubmissions(user.id)
          const submission = userSubmissions.find((s) => s.id === editId)

          if (submission) {
            setExistingSubmission(submission)
            setFormData({
              projectName: submission.projectName,
              description: submission.description,
              repoUrl: submission.repoUrl,
              demoUrl: submission.demoUrl || "",
              teamId: submission.teamId || "individual",
              tasks: submission.tasks,
            })

            // Calculate time remaining
            if (submission.startTime) {
              updateTimeRemaining(submission.startTime, hackathonData.duration)
            }
          } else {
            toast({
              title: "Submission not found",
              description:
                "The submission you're trying to edit doesn't exist or you don't have permission to edit it.",
              variant: "destructive",
            })
            router.push(`/hackathons/${hackathonId}`)
          }
        } else {
          // Auto-register if not registered
          if (!userIsRegistered) {
            try {
              registerForHackathon(user.id, hackathonId)
              setIsRegistered(true)
              toast({
                title: "Automatically Registered",
                description: `You have been registered for ${hackathonData.title}`,
              })
            } catch (error) {
              console.error("Registration error:", error)
              toast({
                title: "Registration Error",
                description: "There was an error registering you for this hackathon.",
                variant: "destructive",
              })
              router.push(`/hackathons/${hackathonId}`)
              return
            }
          }

          // Start the hackathon timer if not editing
          const submissionId = startHackathonTimer(user.id, hackathonId)
          const submission = getUserSubmissions(user.id).find((s) => s.id === submissionId)

          if (submission && submission.startTime) {
            setExistingSubmission(submission)

            // If the submission already has data, populate the form
            if (submission.projectName !== "Untitled Project") {
              setFormData({
                projectName: submission.projectName,
                description: submission.description,
                repoUrl: submission.repoUrl,
                demoUrl: submission.demoUrl || "",
                teamId: submission.teamId || "individual",
                tasks: submission.tasks,
              })
            }

            updateTimeRemaining(submission.startTime, hackathonData.duration)
          }
        }
      } else {
        toast({
          title: "Hackathon Not Found",
          description: "The hackathon you're looking for doesn't exist or has been removed.",
          variant: "destructive",
        })
        router.push("/hackathons")
        return
      }

      setIsLoading(false)
      setIsInitialized(true)
    }

    initializeSubmission()
  }, [
    params.id,
    user,
    authLoading,
    router,
    getHackathon,
    getUserSubmissions,
    getUserTeams,
    editId,
    startHackathonTimer,
    registerForHackathon,
    isInitialized,
  ])

  // Update time remaining every second
  useEffect(() => {
    if (!existingSubmission?.startTime || !hackathon) return

    const interval = setInterval(() => {
      updateTimeRemaining(existingSubmission.startTime!, hackathon.duration)
    }, 1000)

    return () => clearInterval(interval)
  }, [existingSubmission, hackathon])

  const updateTimeRemaining = (startTime: string, duration: string) => {
    const start = new Date(startTime).getTime()
    const durationHours = Number.parseInt(duration.split(" ")[0], 10)
    const end = start + durationHours * 60 * 60 * 1000
    const now = new Date().getTime()

    const remaining = end - now

    if (remaining <= 0) {
      setTimeRemaining("Time's up!")
      return
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

    setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleTaskChange = (index: number, completed: boolean) => {
    const updatedTasks = [...formData.tasks]
    updatedTasks[index] = { ...updatedTasks[index], completed }
    setFormData((prev) => ({ ...prev, tasks: updatedTasks }))
  }

  const handleTaskNameChange = (index: number, name: string) => {
    const updatedTasks = [...formData.tasks]
    updatedTasks[index] = { ...updatedTasks[index], name }
    setFormData((prev) => ({ ...prev, tasks: updatedTasks }))
  }

  const addTask = () => {
    setFormData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { name: "", completed: false }],
    }))
  }

  const removeTask = (index: number) => {
    const updatedTasks = formData.tasks.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, tasks: updatedTasks }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 50MB",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)

      // Clear file error if it exists
      if (errors.file) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.file
          return newErrors
        })
      }
    }
  }

  const handleTeamChange = (value: string) => {
    setFormData((prev) => ({ ...prev, teamId: value }))
  }

  const simulateFileUpload = () => {
    if (!selectedFile) return Promise.resolve("")

    setIsUploading(true)
    setUploadProgress(0)

    return new Promise<string>((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5
        if (progress >= 100) {
          clearInterval(interval)
          setUploadProgress(100)
          setTimeout(() => {
            setIsUploading(false)
            // For demo purposes, we'll just use the file name
            resolve(`/uploads/${selectedFile.name}`)
          }, 500)
        } else {
          setUploadProgress(progress)
        }
      }, 300)
    })
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
    }

    if (!formData.repoUrl.trim()) {
      newErrors.repoUrl = "Repository URL is required"
    } else if (!/^https?:\/\//i.test(formData.repoUrl)) {
      newErrors.repoUrl = "Please enter a valid URL starting with http:// or https://"
    }

    if (formData.demoUrl && !/^https?:\/\//i.test(formData.demoUrl)) {
      newErrors.demoUrl = "Please enter a valid URL starting with http:// or https://"
    }

    // Check if at least one task is defined
    const validTasks = formData.tasks.filter((task) => task.name.trim() !== "")
    if (validTasks.length === 0) {
      newErrors.tasks = "At least one task is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !hackathon) return

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate file upload
      const fileUrl = await simulateFileUpload()

      const submissionData = {
        userId: user.id,
        hackathonId: hackathon.id,
        teamId: formData.teamId !== "individual" ? formData.teamId : undefined,
        projectName: formData.projectName,
        description: formData.description,
        repoUrl: formData.repoUrl,
        demoUrl: formData.demoUrl || undefined,
        fileUrl: fileUrl || undefined,
        submissionDate: new Date().toISOString().split("T")[0],
        status: "pending" as const,
        tasks: formData.tasks.filter((task) => task.name.trim() !== ""),
      }

      if (existingSubmission) {
        updateSubmission(existingSubmission.id, submissionData)
        toast({
          title: "Submission Updated",
          description: "Your project has been updated successfully.",
        })
      } else {
        addSubmission(submissionData)
        toast({
          title: "Submission Complete",
          description: "Your project has been submitted successfully.",
        })
      }

      // Show success message and redirect to dashboard
      setSubmissionComplete(true)
      setTimeout(() => {
        router.push("/dashboard?tab=submissions")
      }, 3000)
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step === 1) {
      // Validate first step
      const newErrors: { [key: string]: string } = {}

      if (!formData.projectName.trim()) {
        newErrors.projectName = "Project name is required"
      }

      if (!formData.description.trim()) {
        newErrors.description = "Project description is required"
      }

      setErrors(newErrors)
      if (Object.keys(newErrors).length === 0) {
        setStep(2)
        window.scrollTo(0, 0)
      }
    }
  }

  const prevStep = () => {
    if (step === 2) {
      setStep(1)
      window.scrollTo(0, 0)
    }
  }

  if (isLoading) {
    return (
      <>
        <MainNav />
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Loading submission form...</p>
          </div>
        </div>
        <SiteFooter />
      </>
    )
  }

  if (!hackathon) {
    return (
      <>
        <MainNav />
        <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Hackathon Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              The hackathon you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-6 bg-primary hover:bg-primary/80 transition-all duration-300" asChild>
              <Link href="/hackathons">Browse Hackathons</Link>
            </Button>
          </div>
        </div>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <Button variant="outline" className="mb-6" asChild>
          <Link href={`/hackathons/${hackathon.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hackathon
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto">
          {timeRemaining && (
            <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">Time Remaining:</span>
              </div>
              <span className="text-xl font-bold">{timeRemaining}</span>
            </div>
          )}

          {/* Progress Steps */}
          {!submissionComplete && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-muted"}`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-1">Project Info</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-muted"}`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-1">Files & Tasks</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${submissionComplete ? "bg-primary" : "bg-muted"}`}></div>
                <div
                  className={`flex flex-col items-center ${submissionComplete ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${submissionComplete ? "bg-primary text-white" : "bg-muted"}`}
                  >
                    3
                  </div>
                  <span className="text-sm mt-1">Complete</span>
                </div>
              </div>
            </div>
          )}

          {submissionComplete ? (
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mr-2" />
                  <span>Submission Successful!</span>
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  Your project has been submitted for {hackathon.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <p>Your submission is now pending review by the hackathon organizers.</p>
                <p>You can view and track the status of your submission in your dashboard.</p>
                <div className="flex justify-center mt-6">
                  <Button
                    className="bg-primary hover:bg-primary/80 transition-all duration-300"
                    onClick={() => router.push("/dashboard?tab=submissions")}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
              <CardHeader>
                <CardTitle>{existingSubmission ? "Edit Submission" : "Submit Your Project"}</CardTitle>
                <CardDescription>
                  {existingSubmission ? "Update your project submission for " : "Submit your project for "}
                  {hackathon.title}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="projectName" className="flex items-center">
                          Project Name
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="projectName"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleInputChange}
                          placeholder="Enter your project name"
                          className={`bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 ${
                            errors.projectName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.projectName && <p className="text-sm text-red-500">{errors.projectName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="flex items-center">
                          Project Description
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe your project and its features"
                          className={`bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 min-h-[120px] ${
                            errors.description ? "border-red-500" : ""
                          }`}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                      </div>

                      {userTeams.length > 0 && (
                        <div className="space-y-2">
                          <Label htmlFor="team">Submit as Team (Optional)</Label>
                          <Select value={formData.teamId} onValueChange={handleTeamChange}>
                            <SelectTrigger
                              id="team"
                              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                            >
                              <SelectValue placeholder="Select a team (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Submit as Individual</SelectItem>
                              {userTeams.map((team) => (
                                <SelectItem key={team.id} value={team.id}>
                                  {team.name} ({team.members.length} members)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            Submitting as a team will credit all team members for this project.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="repoUrl" className="flex items-center">
                          Repository URL
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="repoUrl"
                            name="repoUrl"
                            value={formData.repoUrl}
                            onChange={handleInputChange}
                            placeholder="https://github.com/yourusername/your-repo"
                            className={`bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 pl-10 ${
                              errors.repoUrl ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.repoUrl && <p className="text-sm text-red-500">{errors.repoUrl}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="demoUrl">Demo URL (Optional)</Label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="demoUrl"
                            name="demoUrl"
                            value={formData.demoUrl}
                            onChange={handleInputChange}
                            placeholder="https://your-demo-url.com"
                            className={`bg-background/50 border-primary/20 focus:border-primary transition-all duration-300 pl-10 ${
                              errors.demoUrl ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.demoUrl && <p className="text-sm text-red-500">{errors.demoUrl}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="file">Upload Project File (Optional)</Label>
                        <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                          <input id="file" type="file" onChange={handleFileChange} className="hidden" />
                          <label htmlFor="file" className="cursor-pointer">
                            <Upload className="h-10 w-10 text-primary/50 mx-auto mb-2" />
                            <p className="text-sm font-medium">
                              {selectedFile ? selectedFile.name : "Drag & drop or click to upload"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">ZIP, RAR, or PDF files up to 50MB</p>
                          </label>
                        </div>
                        {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                        {isUploading && (
                          <div className="mt-2">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-xs text-center mt-1">{uploadProgress}% uploaded</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center">
                            Project Tasks
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTask}
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Task
                          </Button>
                        </div>

                        {errors.tasks && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{errors.tasks}</AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-3">
                          {formData.tasks.map((task, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <Checkbox
                                id={`task-${index}`}
                                checked={task.completed}
                                onCheckedChange={(checked) => handleTaskChange(index, checked === true)}
                              />
                              <div className="flex-1">
                                <Input
                                  value={task.name}
                                  onChange={(e) => handleTaskNameChange(index, e.target.value)}
                                  placeholder="Task description"
                                  className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTask(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-100/10"
                                disabled={formData.tasks.length <= 1}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step === 1 ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        className="bg-primary hover:bg-primary/80 transition-all duration-300"
                        onClick={nextStep}
                      >
                        Next Step
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                      >
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/80 transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Submitting..." : existingSubmission ? "Update Submission" : "Submit Project"}
                      </Button>
                    </>
                  )}
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

