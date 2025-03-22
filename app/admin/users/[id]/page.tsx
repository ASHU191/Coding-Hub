"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useData } from "@/lib/data-service"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Save,
  Trash,
  User,
  Users,
  Award,
  Star,
  BookOpen,
  Lock,
  Code,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser, isLoading: authLoading } = useAuth()
  const { users, hackathons } = useData()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "active",
    notes: "",
  })

  // Sample user activity data
  const userActivity = [
    { action: "Registered for", target: "AI Innovation Challenge", date: "2025-03-15" },
    { action: "Completed", target: "Web Development Bootcamp", date: "2025-02-20" },
    { action: "Joined team", target: "Code Wizards", date: "2025-02-10" },
    { action: "Earned badge", target: "First Hackathon", date: "2025-01-25" },
    { action: "Created account", target: "", date: "2025-01-15" },
  ]

  // Sample user stats
  const userStats = {
    points: 750,
    rank: 24,
    hackathonsCompleted: 3,
    hackathonsInProgress: 1,
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
  }

  useEffect(() => {
    if (authLoading) return

    if (!currentUser || currentUser.role !== "admin") {
      router.push("/login")
      return
    }

    const userId = params.id as string
    const foundUser = users.find((u) => u.id === userId)

    if (foundUser) {
      setUser(foundUser)
      setFormData({
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        status: "active", // Assuming all users are active by default
        notes: "",
      })
    } else {
      router.push("/admin/users")
    }

    setIsLoading(false)
  }, [params.id, users, currentUser, authLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, this would update the user in the database
    // For now, we'll just update our local state
    setUser((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }))
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      // In a real app, this would delete the user from the database
      router.push("/admin/users")
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
          <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/admin/users">Back to Users</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get user's registered hackathons
  const userHackathons = user.registeredHackathons
    ? hackathons.filter((h) => user.registeredHackathons.includes(h.id))
    : []

  return (
    <div className="p-6">
      <div className="mb-8">
        <Button variant="outline" className="mb-4" asChild>
          <Link href="/admin/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
            <p className="text-muted-foreground">View and manage user information</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/80 transition-all duration-300">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                  onClick={handleDelete}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete User
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary hover:bg-primary/80 transition-all duration-300"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* User Profile Card */}
        <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>User information and status</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-2 border-primary mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {isEditing ? (
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                    <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Admin Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add private notes about this user"
                    className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground mb-4">{user.email}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                    className={user.role === "admin" ? "bg-primary" : ""}
                  >
                    {user.role}
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>

                <div className="w-full space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Joined</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Active</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hackathons</span>
                    <span className="text-sm text-muted-foreground">{user.registeredHackathons?.length || 0}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          {!isEditing && (
            <CardFooter className="flex-col space-y-2">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium">Email Verified</span>
                <Switch checked={true} disabled />
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium">2FA Enabled</span>
                <Switch checked={false} disabled />
              </div>
              <Button
                variant="outline"
                className="w-full mt-2 border-primary/20 hover:bg-primary/10 transition-all duration-300"
              >
                <Lock className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* User Details Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="bg-muted/50 p-1 mb-4">
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="hackathons"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Hackathons
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Stats
              </TabsTrigger>
              <TabsTrigger
                value="badges"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Badges
              </TabsTrigger>
            </TabsList>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Recent actions and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-primary/10 before:content-['']">
                    {userActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-primary/10 group-odd:md:translate-x-5 group-even:md:-translate-x-5">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-card-gradient border border-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold">{activity.action}</div>
                            <time className="text-xs text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString()}
                            </time>
                          </div>
                          {activity.target && (
                            <div className="text-muted-foreground">
                              <span className="text-primary">{activity.target}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hackathons Tab */}
            <TabsContent value="hackathons">
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Registered Hackathons</CardTitle>
                  <CardDescription>Hackathons this user has joined</CardDescription>
                </CardHeader>
                <CardContent>
                  {userHackathons.length > 0 ? (
                    <div className="space-y-4">
                      {userHackathons.map((hackathon) => (
                        <div
                          key={hackathon.id}
                          className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border border-primary/10 transition-all duration-300 hover:bg-primary/5"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                              {hackathon.title.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-medium">{hackathon.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(hackathon.startDate).toLocaleDateString()}</span>
                                <Clock className="h-3 w-3 ml-2" />
                                <span>{hackathon.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge>{hackathon.category}</Badge>
                            <Badge variant="outline">{hackathon.difficulty}</Badge>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                          >
                            <Link href={`/hackathons/${hackathon.id}`}>View Hackathon</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-8 w-8 text-primary/60" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No Hackathons</h3>
                      <p className="text-muted-foreground">This user hasn't registered for any hackathons yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats">
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                  <CardDescription>Performance and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
                    <div className="flex flex-col items-center rounded-lg border border-primary/10 p-3 text-center transition-all duration-300 hover:bg-primary/5">
                      <Trophy className="mb-2 h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Hackathons</span>
                      <span className="text-2xl font-bold">{userStats.hackathonsCompleted}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border border-primary/10 p-3 text-center transition-all duration-300 hover:bg-primary/5">
                      <Award className="mb-2 h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Badges</span>
                      <span className="text-2xl font-bold">{userStats.badges.length}</span>
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges">
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>User Badges</CardTitle>
                  <CardDescription>Achievements and recognitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {userStats.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-primary/10 p-4 transition-all duration-300 hover:bg-primary/5 flex flex-col items-center text-center"
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                          <badge.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

