"use client"

import { useState } from "react"
import { useData } from "@/lib/data-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Calendar,
  Users,
  Activity,
  TrendingUp,
  Eye,
  Plus,
  Settings,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  Filter,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function AdminDashboard() {
  const { hackathons, users, getActiveUsers } = useData()
  const activeUsers = getActiveUsers()
  const [selectedTab, setSelectedTab] = useState("overview")

  // Sample analytics data
  const analyticsData = {
    userGrowth: [
      { month: "Jan", users: 120 },
      { month: "Feb", users: 150 },
      { month: "Mar", users: 200 },
      { month: "Apr", users: 220 },
      { month: "May", users: 280 },
      { month: "Jun", users: 310 },
    ],
    hackathonParticipation: [
      { name: "AI Innovation Challenge", participants: 85 },
      { name: "MERN Stack Hackathon", participants: 62 },
      { name: "Blockchain Hackathon", participants: 45 },
      { name: "Full-Stack Challenge", participants: 58 },
      { name: ".NET MVC Enterprise Hackathon", participants: 40 },
    ],
    recentActivities: [
      { user: "John Doe", action: "registered for", target: "AI Innovation Challenge", time: "2 hours ago" },
      {
        user: "Sarah Williams",
        action: "submitted a project for",
        target: "MERN Stack Hackathon",
        time: "5 hours ago",
      },
      { user: "Michael Chen", action: "completed", target: "Blockchain Hackathon", time: "1 day ago" },
      { user: "Emily Rodriguez", action: "joined team", target: "Code Wizards", time: "2 days ago" },
      { user: "David Kim", action: "earned badge", target: "First Place", time: "3 days ago" },
    ],
  }

  return (
    <div className="p-6">
      <div className="mb-8 animate-slide-down">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Manage hackathons, users, and resources.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="bg-muted/50 p-1 mb-8">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hackathons</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hackathons.length}</div>
                <p className="text-xs text-muted-foreground">
                  {hackathons.filter((h) => new Date(h.startDate) > new Date()).length} upcoming
                </p>
              </CardContent>
            </Card>
            <Card
              className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">{activeUsers.length} currently active</p>
              </CardContent>
            </Card>
            <Card
              className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Hackathons</CardTitle>
                <BarChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hackathons.filter((h) => h.featured).length}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((hackathons.filter((h) => h.featured).length / hackathons.length) * 100)}% of total
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card
              className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Recently active users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeUsers.slice(0, 5).map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-2 rounded-lg transition-colors duration-300 hover:bg-primary/5"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-white">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last active: {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card
              className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <CardHeader>
                <CardTitle>Upcoming Hackathons</CardTitle>
                <CardDescription>Hackathons starting soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hackathons
                    .filter((h) => new Date(h.startDate) > new Date())
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .slice(0, 5)
                    .map((hackathon, index) => (
                      <div
                        key={hackathon.id}
                        className="flex items-center gap-4 p-2 rounded-lg transition-colors duration-300 hover:bg-primary/5"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-white">
                          {hackathon.title.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{hackathon.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{hackathon.category}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Starts: {new Date(hackathon.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card
            className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button asChild className="h-auto py-4 bg-primary/80 hover:bg-primary transition-all duration-300">
                  <Link href="/admin/hackathons" className="flex flex-col items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    <span>Manage Hackathons</span>
                  </Link>
                </Button>
                <Button asChild className="h-auto py-4 bg-primary/80 hover:bg-primary transition-all duration-300">
                  <Link href="/admin/users" className="flex flex-col items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>Manage Users</span>
                  </Link>
                </Button>
                <Button asChild className="h-auto py-4 bg-primary/80 hover:bg-primary transition-all duration-300">
                  <Link href="/admin/resources" className="flex flex-col items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span>Manage Resources</span>
                  </Link>
                </Button>
                <Button asChild className="h-auto py-4 bg-primary/80 hover:bg-primary transition-all duration-300">
                  <Link href="/admin/settings" className="flex flex-col items-center gap-2">
                    <Settings className="h-6 w-6" />
                    <span>Settings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent
          value="users"
          className="space-y-8 animate-slide-up opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          <Card className="border-primary/10 bg-card-gradient">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage and monitor user accounts</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button className="bg-primary/80 hover:bg-primary transition-all duration-300">
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border border-primary/10 transition-all duration-300 hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                    <div className="text-sm text-muted-foreground">
                      Joined: {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>Overview of user activity and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Active Users</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Hackathon Participation</span>
                      <span className="text-sm text-muted-foreground">62%</span>
                    </div>
                    <Progress value={62} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Project Submissions</span>
                      <span className="text-sm text-muted-foreground">48%</span>
                    </div>
                    <Progress value={48} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Resource Usage</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-primary/10" indicatorClassName="bg-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <div className="flex h-full items-end gap-2">
                    {analyticsData.userGrowth.map((item, index) => (
                      <div key={index} className="relative flex h-full flex-1 flex-col justify-end">
                        <div
                          className="bg-primary/80 hover:bg-primary transition-all duration-300 rounded-t-md w-full"
                          style={{ height: `${(item.users / 310) * 100}%` }}
                        ></div>
                        <span className="mt-1 text-xs text-center text-muted-foreground">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent
          value="analytics"
          className="space-y-8 animate-slide-up opacity-0"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,892</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">12%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">310</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">8%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hackathon Registrations</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">185</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">15%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Project Submissions</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">5%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
              <CardHeader>
                <CardTitle>Hackathon Participation</CardTitle>
                <CardDescription>Number of participants per hackathon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.hackathonParticipation.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium truncate">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.participants}</span>
                      </div>
                      <Progress
                        value={(item.participants / 85) * 100}
                        className="h-2 bg-primary/10"
                        indicatorClassName="bg-primary"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>User distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full flex items-center justify-center">
                  <div className="relative h-[200px] w-[200px] rounded-full border-8 border-primary/10">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <div className="absolute top-0 left-0 h-1/2 w-1/2 bg-primary/80 rounded-tl-full transform origin-bottom-right rotate-0"></div>
                      <div className="absolute top-0 right-0 h-1/2 w-1/2 bg-primary/60 rounded-tr-full transform origin-bottom-left rotate-0"></div>
                      <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-primary/40 rounded-bl-full transform origin-top-right rotate-0"></div>
                      <div className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-primary/20 rounded-br-full transform origin-top-left rotate-0"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background h-3/5 w-3/5 m-auto"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/80"></div>
                    <span className="text-xs">Web (40%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/60"></div>
                    <span className="text-xs">AI (25%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/40"></div>
                    <span className="text-xs">Mobile (20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                    <span className="text-xs">Other (15%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent
          value="activity"
          className="space-y-8 animate-slide-up opacity-0"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <Card className="border-primary/10 bg-card-gradient">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions from users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-primary/10 before:content-['']">
                {analyticsData.recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-primary/10 group-odd:md:translate-x-5 group-even:md:-translate-x-5">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-card-gradient border border-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold">{activity.user}</div>
                        <time className="text-xs text-muted-foreground">{activity.time}</time>
                      </div>
                      <div className="text-muted-foreground">
                        {activity.action} <span className="text-primary">{activity.target}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 bg-card-gradient">
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">System update completed successfully</span>
                  </div>
                  <p className="text-xs mt-1 ml-6">Today at 09:42 AM</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Database backup in progress</span>
                  </div>
                  <p className="text-xs mt-1 ml-6">Today at 08:15 AM</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span className="font-medium">New hackathon created: "Mobile App Challenge"</span>
                  </div>
                  <p className="text-xs mt-1 ml-6">Yesterday at 04:30 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Failed login attempts detected</span>
                  </div>
                  <p className="text-xs mt-1 ml-6">Yesterday at 02:12 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

