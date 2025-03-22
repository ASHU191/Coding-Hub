"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useData, type Team } from "@/lib/data-service"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Users, UserPlus, Trash, Copy } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function TeamsPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { getUserTeams, getHackathon, hackathons, createTeam, addTeamMember, removeTeamMember, deleteTeam } = useData()

  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState<Team[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const [newTeamForm, setNewTeamForm] = useState({
    name: "",
    hackathonId: "",
  })

  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    // Load user's teams
    const userTeams = getUserTeams(user.id)
    setTeams(userTeams)
    setIsLoading(false)
  }, [user, authLoading, router, getUserTeams])

  const handleCreateTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTeamForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleHackathonChange = (value: string) => {
    setNewTeamForm((prev) => ({ ...prev, hackathonId: value }))
  }

  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInviteForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateTeam = () => {
    if (!user) return

    if (!newTeamForm.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a team name",
        variant: "destructive",
      })
      return
    }

    if (!newTeamForm.hackathonId) {
      toast({
        title: "Error",
        description: "Please select a hackathon",
        variant: "destructive",
      })
      return
    }

    // Create the team
    const teamData = {
      name: newTeamForm.name,
      hackathonId: newTeamForm.hackathonId,
      leaderId: user.id,
      members: [
        {
          userId: user.id,
          name: user.name,
          email: user.email,
          role: "leader",
          avatar: user.avatar,
        },
      ],
    }

    createTeam(teamData)

    // Reset form and close dialog
    setNewTeamForm({
      name: "",
      hackathonId: "",
    })
    setCreateDialogOpen(false)

    // Refresh teams
    const userTeams = getUserTeams(user.id)
    setTeams(userTeams)

    toast({
      title: "Team Created",
      description: `Your team "${newTeamForm.name}" has been created successfully.`,
    })
  }

  const handleInviteMember = () => {
    if (!selectedTeam) return

    if (!inviteForm.name.trim() || !inviteForm.email.trim()) {
      toast({
        title: "Error",
        description: "Please enter both name and email",
        variant: "destructive",
      })
      return
    }

    // Generate a random user ID for the invited member
    const userId = `invited-${Date.now()}`

    // Add member to team
    addTeamMember(selectedTeam.id, userId, inviteForm.name, inviteForm.email)

    // Reset form and close dialog
    setInviteForm({
      name: "",
      email: "",
    })
    setInviteDialogOpen(false)

    // Refresh teams
    const userTeams = getUserTeams(user!.id)
    setTeams(userTeams)

    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${inviteForm.email}.`,
    })
  }

  const handleRemoveMember = (teamId: string, userId: string) => {
    if (confirm("Are you sure you want to remove this member from the team?")) {
      removeTeamMember(teamId, userId)

      // Refresh teams
      const userTeams = getUserTeams(user!.id)
      setTeams(userTeams)

      toast({
        title: "Member Removed",
        description: "The team member has been removed successfully.",
      })
    }
  }

  const handleDeleteTeam = (teamId: string) => {
    if (confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
      deleteTeam(teamId)

      // Refresh teams
      const userTeams = getUserTeams(user!.id)
      setTeams(userTeams)

      toast({
        title: "Team Deleted",
        description: "The team has been deleted successfully.",
      })
    }
  }

  const copyInviteLink = (teamId: string) => {
    const inviteLink = `${window.location.origin}/teams/join/${teamId}`
    navigator.clipboard.writeText(inviteLink)

    toast({
      title: "Invite Link Copied",
      description: "The team invite link has been copied to your clipboard.",
    })
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <>
      <MainNav />
      <main>
        {/* Hero Section */}
        <section className="relative bg-hero-pattern-dark py-20 text-white">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container relative mx-auto px-4 py-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-slide-down">
              Manage Your <span className="text-primary">Teams</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Create and manage teams for your hackathon projects
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>

            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/80 transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create a New Team</DialogTitle>
                  <DialogDescription>
                    Create a team for a hackathon and invite members to collaborate.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      name="name"
                      value={newTeamForm.name}
                      onChange={handleCreateTeamChange}
                      placeholder="Enter your team name"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hackathon">Hackathon</Label>
                    <Select value={newTeamForm.hackathonId} onValueChange={handleHackathonChange}>
                      <SelectTrigger
                        id="hackathon"
                        className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                      >
                        <SelectValue placeholder="Select a hackathon" />
                      </SelectTrigger>
                      <SelectContent>
                        {hackathons.map((hackathon) => (
                          <SelectItem key={hackathon.id} value={hackathon.id}>
                            {hackathon.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/80 transition-all duration-300"
                    onClick={handleCreateTeam}
                  >
                    Create Team
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {teams.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => {
                const hackathon = getHackathon(team.hackathonId)
                const isLeader = team.leaderId === user?.id

                return (
                  <Card
                    key={team.id}
                    className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{team.name}</CardTitle>
                        {isLeader && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-100/10"
                            onClick={() => handleDeleteTeam(team.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <CardDescription>{hackathon ? hackathon.title : "Unknown Hackathon"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Team Members ({team.members.length})</h3>
                          <div className="space-y-2">
                            {team.members.map((member) => (
                              <div
                                key={member.userId}
                                className="flex items-center justify-between p-2 rounded-md border border-primary/10 hover:bg-primary/5 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={member.role === "leader" ? "bg-primary" : "bg-muted"}>
                                    {member.role === "leader" ? "Leader" : "Member"}
                                  </Badge>
                                  {isLeader && member.userId !== user?.id && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-100/10"
                                      onClick={() => handleRemoveMember(team.id, member.userId)}
                                    >
                                      <Trash className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                        onClick={() => copyInviteLink(team.id)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Invite Link
                      </Button>

                      {isLeader && (
                        <Dialog
                          open={inviteDialogOpen && selectedTeam?.id === team.id}
                          onOpenChange={(open) => {
                            setInviteDialogOpen(open)
                            if (open) setSelectedTeam(team)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/80 transition-all duration-300">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Invite Member
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Invite Team Member</DialogTitle>
                              <DialogDescription>Invite a new member to join your team.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="member-name">Name</Label>
                                <Input
                                  id="member-name"
                                  name="name"
                                  value={inviteForm.name}
                                  onChange={handleInviteChange}
                                  placeholder="Enter member's name"
                                  className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="member-email">Email</Label>
                                <Input
                                  id="member-email"
                                  name="email"
                                  type="email"
                                  value={inviteForm.email}
                                  onChange={handleInviteChange}
                                  placeholder="Enter member's email"
                                  className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button
                                className="bg-primary hover:bg-primary/80 transition-all duration-300"
                                onClick={handleInviteMember}
                              >
                                Send Invitation
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="border-primary/10 bg-card-gradient p-6 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <Users className="h-16 w-16 text-primary/50 mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Teams Yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You haven't created or joined any teams yet. Create a team to collaborate with others on hackathon
                  projects.
                </p>
                <Button
                  className="bg-primary hover:bg-primary/80 transition-all duration-300"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Team
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-muted/50 to-muted py-12 mt-16 border-t border-primary/10">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-bold">GeeksCode</h3>
                <p className="text-muted-foreground">
                  Empowering developers to build, learn, and connect through exciting hackathons.
                </p>
                <div className="mt-4 flex space-x-4">
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-github"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/hackathons"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                      Hackathons
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/leaderboard"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Contact</h3>
                <address className="not-italic text-muted-foreground">
                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <p>Baloch Colony Rd, Karachi Administration Employees Housing Society Block 6 KAECHS, Karachi</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <p>+1-123-456-7890</p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <p>smit.edu@saylaniwelfare.com</p>
                  </div>
                </address>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Subscribe</h3>
                <p className="mb-4 text-muted-foreground">Stay updated with our latest hackathons and resources.</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Your email"
                    className="bg-background transition-all duration-300 focus:border-primary"
                  />
                  <Button
                    className="bg-primary hover:bg-primary/80 transition-colors duration-300"
                    onClick={() => {
                      toast({
                        title: "Subscribed!",
                        description: "Thank you for subscribing to our newsletter.",
                      })
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} GeeksCode. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

