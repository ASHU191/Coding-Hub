"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-service"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Clock, Code, Trophy, Users, Award, Star, BookOpen, Lock, CheckSquare, XSquare } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"

export default function UserDashboard() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { hackathons, getUserHackathons, getUserSubmissions, updateSubmissionTask } = useData()
  const [activeTab, setActiveTab] = useState("hackathons")
  const [isLoading, setIsLoading] = useState(true)
  const [userHackathons, setUserHackathons] = useState([])
  const [userSubmissions, setUserSubmissions] = useState([])

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    try {
      // Get user's registered hackathons
      const hackathons = getUserHackathons(user.id)
      setUserHackathons(hackathons)

      // Get user's submissions
      const submissions = getUserSubmissions(user.id)
      setUserSubmissions(submissions)
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [user, authLoading, router, getUserHackathons, getUserSubmissions])

  if (authLoading || isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  // Sample user data for the dashboard
  const userStats = {
    points: 750,
    rank: 24,
    badgesEarned: 5,
    hackathonsCompleted: userSubmissions.filter((s) => s.status === "approved").length,
    hackathonsInProgress: userSubmissions.filter((s) => s.status === "pending").length,
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "React", level: 75 },
      { name: "Node.js", level: 60 },
      { name: "Python", level: 40 },
      { name: "UI/UX", level: 70 },
    ],
    badges: [
      { name: "First Hackathon", icon: Award, description: "Completed your first hackathon" },
      { name: "Team Player", icon: Users, description: "Participated in a team of 3+ members" },
      { name: "Code Wizard", icon: Code, description: "Wrote over 1000 lines of code" },
      { name: "Quick Learner", icon: BookOpen, description: "Learned a new technology during a hackathon" },
      { name: "Innovator", icon: Star, description: "Created a unique solution to a problem" },
    ],
    completedHackathons: [
      {
        id: "past-1",
        title: "Web3 Innovation Challenge",
        date: "2024-12-10",
        position: "2nd Place",
        project: "Decentralized Marketplace",
        feedback: "Great implementation of smart contracts. UI could use improvement.",
      },
      {
        id: "past-2",
        title: "Mobile App Hackathon",
        date: "2024-11-05",
        position: "Participant",
        project: "Fitness Tracker App",
        feedback: "Good concept but lacked some key features.",
      },
      {
        id: "past-3",
        title: "Data Science Challenge",
        date: "2024-10-15",
        position: "Honorable Mention",
        project: "Predictive Analytics Dashboard",
        feedback: "Excellent data visualization. Algorithm needs refinement.",
      },
    ],
  }

  const handleTaskToggle = (submissionId, taskIndex, completed) => {
    try {
      updateSubmissionTask(submissionId, taskIndex, completed)

      // Update local state to reflect the change
      setUserSubmissions((prev) =>
        prev.map((submission) => {
          if (submission.id === submissionId) {
            const updatedTasks = [...submission.tasks]
            updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed }
            return { ...submission, tasks: updatedTasks }
          }
          return submission
        }),
      )
    } catch (error) {
      console.error("Error updating task:", error)
    }
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
              Your <span className="text-primary">Dashboard</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Track your progress, manage your hackathons, and view your achievements.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* User Profile Overview */}
          <div className="mb-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge className="bg-primary/80">{userStats.rank}th Place</Badge>
                    <Badge variant="outline">{userStats.points} Points</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                    asChild
                  >
                    <Link href="/dashboard/settings">Edit Profile</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                    asChild
                  >
                    <Link href="/dashboard/teams">Manage Teams</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 h-full animate-slide-up opacity-0"
                style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
              >
                <CardHeader>
                  <CardTitle>Stats Overview</CardTitle>
                  <CardDescription>Your hackathon journey at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="flex flex-col items-center rounded-lg border border-primary/10 p-3 text-center transition-all duration-300 hover:bg-primary/5">
                      <Trophy className="mb-2 h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Completed</span>
                      <span className="text-2xl font-bold">{userStats.hackathonsCompleted}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border border-primary/10 p-3 text-center transition-all duration-300 hover:bg-primary/5">
                      <Award className="mb-2 h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Badges</span>
                      <span className="text-2xl font-bold">{userStats.badgesEarned}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border border-primary/10 p-3 text-center transition-all duration-300 hover:bg-primary/5">
                      <Star className="mb-2 h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Points</span>
                      <span className="text-2xl font-bold">{userStats.points}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border border-primary/10 p-3 text-center transition-all duration-300 hover:bg-primary/5">
                      <Users className="mb-2 h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Rank</span>
                      <span className="text-2xl font-bold">#{userStats.rank}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-medium">Skills</h3>
                    <div className="space-y-4">
                      {userStats.skills.map((skill, index) => (
                        <div key={index}>
                          <div className="mb-1 flex justify-between">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-muted/50 p-1 mb-8">
              <TabsTrigger
                value="hackathons"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                My Hackathons
              </TabsTrigger>
              <TabsTrigger
                value="submissions"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Submissions
              </TabsTrigger>
              <TabsTrigger
                value="badges"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Badges & Achievements
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                History
              </TabsTrigger>
            </TabsList>

            {/* My Hackathons Tab */}
            <TabsContent
              value="hackathons"
              className="animate-slide-up opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Upcoming Hackathons</h2>
                {userHackathons.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {userHackathons.map((hackathon, index) => (
                      <Card
                        key={hackathon.id}
                        className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group"
                      >
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={hackathon.image || "/placeholder.svg"}
                            alt={hackathon.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                              {hackathon.category}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {new Date(hackathon.startDate).toLocaleDateString()}
                            </div>
                          </div>
                          <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                            {hackathon.title}
                          </CardTitle>
                          <CardDescription>{hackathon.description.substring(0, 100)}...</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                              <Clock className="h-4 w-4" />
                              <span>{hackathon.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                              <Users className="h-4 w-4" />
                              <span>{hackathon.teamSize} members</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                            asChild
                          >
                            <Link href={`/hackathons/${hackathon.id}/submit`}>Submit Project</Link>
                          </Button>
                          <Button asChild className="bg-primary/80 hover:bg-primary transition-all duration-300">
                            <Link href={`/hackathons/${hackathon.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-primary/10 bg-card-gradient p-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any upcoming hackathons yet.
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/80 transition-all duration-300">
                      <Link href="/hackathons">Browse Hackathons</Link>
                    </Button>
                  </Card>
                )}
              </div>

              {userSubmissions.filter((s) => s.status === "pending").length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">In Progress</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {userSubmissions
                      .filter((s) => s.status === "pending")
                      .map((submission, index) => {
                        const hackathon = hackathons.find((h) => h.id === submission.hackathonId)
                        if (!hackathon) return null

                        const completedTasks = submission.tasks.filter((t) => t.completed).length
                        const totalTasks = submission.tasks.length
                        const progress = Math.round((completedTasks / totalTasks) * 100)

                        return (
                          <Card
                            key={submission.id}
                            className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
                          >
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <Badge className="bg-primary/80">{hackathon.category}</Badge>
                                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                </Badge>
                              </div>
                              <CardTitle className="mt-2">{hackathon.title}</CardTitle>
                              <CardDescription>Project: {submission.projectName}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="mb-4">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Progress</span>
                                  <span className="text-sm text-muted-foreground">{progress}%</span>
                                </div>
                                <Progress
                                  value={progress}
                                  className="h-2 bg-primary/10"
                                  indicatorClassName="bg-primary"
                                />
                              </div>

                              <h4 className="text-sm font-medium mb-2">Tasks:</h4>
                              <div className="space-y-2">
                                {submission.tasks.map((task, taskIndex) => (
                                  <div key={taskIndex} className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleTaskToggle(submission.id, taskIndex, !task.completed)}
                                    >
                                      {task.completed ? (
                                        <CheckSquare className="h-5 w-5 text-green-500" />
                                      ) : (
                                        <XSquare className="h-5 w-5 text-red-500" />
                                      )}
                                    </Button>
                                    <span className={task.completed ? "text-muted-foreground line-through" : ""}>
                                      {task.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full bg-primary/80 hover:bg-primary transition-all duration-300"
                                asChild
                              >
                                <Link href={`/hackathons/${hackathon.id}/submit?edit=${submission.id}`}>
                                  Edit Submission
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        )
                      })}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent
              value="submissions"
              className="animate-slide-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              {userSubmissions.length > 0 ? (
                <div className="space-y-6">
                  {userSubmissions.map((submission, index) => {
                    const hackathon = hackathons.find((h) => h.id === submission.hackathonId)
                    if (!hackathon) return null

                    const completedTasks = submission.tasks.filter((t) => t.completed).length
                    const totalTasks = submission.tasks.length
                    const progress = Math.round((completedTasks / totalTasks) * 100)

                    return (
                      <Card
                        key={submission.id}
                        className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
                      >
                        <CardHeader>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <CardTitle>{submission.projectName}</CardTitle>
                              <CardDescription>
                                {hackathon.title} • Submitted on{" "}
                                {new Date(submission.submissionDate).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <Badge
                              className={
                                submission.status === "pending"
                                  ? "bg-yellow-500/80"
                                  : submission.status === "approved"
                                    ? "bg-green-500/80"
                                    : "bg-red-500/80"
                              }
                            >
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Completion</span>
                              <span className="text-sm text-muted-foreground">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Tasks:</h4>
                              <div className="space-y-2">
                                {submission.tasks.map((task, taskIndex) => (
                                  <div key={taskIndex} className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleTaskToggle(submission.id, taskIndex, !task.completed)}
                                      disabled={submission.status !== "pending"}
                                    >
                                      {task.completed ? (
                                        <CheckSquare className="h-5 w-5 text-green-500" />
                                      ) : (
                                        <XSquare className="h-5 w-5 text-red-500" />
                                      )}
                                    </Button>
                                    <span className={task.completed ? "text-muted-foreground line-through" : ""}>
                                      {task.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Project Details:</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Category:</span>
                                  <span>{hackathon.category}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Tech Stack:</span>
                                  <span>{hackathon.techStack.join(", ")}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Team Size:</span>
                                  <span>{hackathon.teamSize}</span>
                                </div>
                                {submission.feedback && (
                                  <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                                    <h5 className="font-medium mb-1">Admin Feedback:</h5>
                                    <p className="text-muted-foreground">{submission.feedback}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                            asChild
                          >
                            <Link href={submission.repoUrl} target="_blank" rel="noopener noreferrer">
                              View Code
                            </Link>
                          </Button>
                          {submission.status === "pending" ? (
                            <Button className="bg-primary/80 hover:bg-primary transition-all duration-300" asChild>
                              <Link href={`/hackathons/${hackathon.id}/submit?edit=${submission.id}`}>
                                Edit Submission
                              </Link>
                            </Button>
                          ) : (
                            <Button className="bg-primary/80 hover:bg-primary transition-all duration-300" asChild>
                              <Link href={submission.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                                View Demo
                              </Link>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card className="border-primary/10 bg-card-gradient p-6 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any submissions yet.</p>
                  <Button asChild className="bg-primary hover:bg-primary/80 transition-all duration-300">
                    <Link href="/hackathons">Join a Hackathon</Link>
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent
              value="badges"
              className="animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userStats.badges.map((badge, index) => (
                  <Card
                    key={index}
                    className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1"
                  >
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <badge.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                      <p className="text-muted-foreground">{badge.description}</p>
                    </CardContent>
                  </Card>
                ))}

                {/* Locked badges */}
                {[1, 2, 3].map((_, index) => (
                  <Card
                    key={`locked-${index}`}
                    className="border-primary/10 bg-card-gradient/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 opacity-60"
                  >
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Locked Badge</h3>
                      <p className="text-muted-foreground">Complete more hackathons to unlock</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent
              value="history"
              className="animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <div className="space-y-6">
                {userSubmissions
                  .filter((s) => s.status === "approved" || s.status === "rejected")
                  .map((submission, index) => {
                    const hackathon = hackathons.find((h) => h.id === submission.hackathonId)
                    if (!hackathon) return null

                    return (
                      <Card
                        key={submission.id}
                        className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
                      >
                        <CardHeader>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <CardTitle>{hackathon.title}</CardTitle>
                              <CardDescription>
                                Completed on {new Date(submission.submissionDate).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <Badge className={submission.status === "approved" ? "bg-green-500/80" : "bg-red-500/80"}>
                              {submission.status === "approved" ? "Approved" : "Rejected"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Project:</h4>
                              <p className="text-muted-foreground">{submission.projectName}</p>
                              <p className="text-muted-foreground mt-2">{submission.description}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Feedback:</h4>
                              <p className="text-muted-foreground">{submission.feedback || "No feedback provided."}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                            asChild
                          >
                            <Link href={submission.repoUrl} target="_blank" rel="noopener noreferrer">
                              View Code
                            </Link>
                          </Button>
                          <Button className="bg-primary/80 hover:bg-primary transition-all duration-300" asChild>
                            <Link href={submission.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                              View Demo
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}

                {userStats.completedHackathons.map((hackathon, index) => (
                  <Card
                    key={index}
                    className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
                  >
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <CardTitle>{hackathon.title}</CardTitle>
                          <CardDescription>
                            Completed on {new Date(hackathon.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge
                          className={
                            hackathon.position.includes("1st")
                              ? "bg-[#FFD700]/80"
                              : hackathon.position.includes("2nd")
                                ? "bg-[#C0C0C0]/80"
                                : hackathon.position.includes("3rd")
                                  ? "bg-[#CD7F32]/80"
                                  : "bg-primary/80"
                          }
                        >
                          {hackathon.position}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Project:</h4>
                          <p className="text-muted-foreground">{hackathon.project}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Feedback:</h4>
                          <p className="text-muted-foreground">{hackathon.feedback}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                      >
                        View Certificate
                      </Button>
                      <Button className="bg-primary/80 hover:bg-primary transition-all duration-300">
                        View Project
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <SiteFooter />
      </main>
    </>
  )
}

