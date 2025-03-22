"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal, Award, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LeaderboardPage() {
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Sample leaderboard data
  const users = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 1250,
      hackathonsWon: 3,
      hackathonsParticipated: 8,
      badges: ["AI Expert", "Team Player", "First Place"],
      category: "AI",
    },
    {
      id: "2",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 980,
      hackathonsWon: 2,
      hackathonsParticipated: 5,
      badges: ["Web Dev Guru", "Innovation Award"],
      category: "Web",
    },
    {
      id: "3",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 850,
      hackathonsWon: 1,
      hackathonsParticipated: 6,
      badges: ["Mobile Master", "UI/UX Star"],
      category: "Mobile",
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 720,
      hackathonsWon: 1,
      hackathonsParticipated: 4,
      badges: ["Blockchain Pioneer", "Second Place"],
      category: "Blockchain",
    },
    {
      id: "5",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 650,
      hackathonsWon: 0,
      hackathonsParticipated: 5,
      badges: ["Backend Wizard", "Database Expert"],
      category: "Web",
    },
    {
      id: "6",
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 580,
      hackathonsWon: 0,
      hackathonsParticipated: 3,
      badges: ["AI Enthusiast", "Third Place"],
      category: "AI",
    },
    {
      id: "7",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 520,
      hackathonsWon: 0,
      hackathonsParticipated: 4,
      badges: ["Game Dev Pro", "Creative Genius"],
      category: "Gaming",
    },
    {
      id: "8",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 480,
      hackathonsWon: 0,
      hackathonsParticipated: 2,
      badges: ["Frontend Specialist", "Rookie of the Year"],
      category: "Web",
    },
    {
      id: "9",
      name: "Daniel Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 420,
      hackathonsWon: 0,
      hackathonsParticipated: 3,
      badges: ["AR/VR Explorer", "Innovation Award"],
      category: "AR/VR",
    },
    {
      id: "10",
      name: "Sophia Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 380,
      hackathonsWon: 0,
      hackathonsParticipated: 2,
      badges: ["Data Science Whiz", "Analytics Expert"],
      category: "Data Science",
    },
  ]

  // Sample teams data
  const teams = [
    {
      id: "1",
      name: "Code Wizards",
      members: 4,
      points: 2200,
      hackathonsWon: 2,
      hackathonsParticipated: 5,
      category: "AI",
    },
    {
      id: "2",
      name: "Byte Busters",
      members: 3,
      points: 1850,
      hackathonsWon: 1,
      hackathonsParticipated: 4,
      category: "Web",
    },
    {
      id: "3",
      name: "Algorithm Aces",
      members: 5,
      points: 1600,
      hackathonsWon: 1,
      hackathonsParticipated: 3,
      category: "Data Science",
    },
    {
      id: "4",
      name: "Pixel Pioneers",
      members: 4,
      points: 1450,
      hackathonsWon: 0,
      hackathonsParticipated: 4,
      category: "Gaming",
    },
    {
      id: "5",
      name: "Stack Overflow",
      members: 3,
      points: 1300,
      hackathonsWon: 0,
      hackathonsParticipated: 3,
      category: "Web",
    },
    {
      id: "6",
      name: "Neural Network",
      members: 4,
      points: 1150,
      hackathonsWon: 0,
      hackathonsParticipated: 2,
      category: "AI",
    },
    {
      id: "7",
      name: "Blockchain Bandits",
      members: 3,
      points: 980,
      hackathonsWon: 0,
      hackathonsParticipated: 2,
      category: "Blockchain",
    },
    {
      id: "8",
      name: "Mobile Mavericks",
      members: 4,
      points: 850,
      hackathonsWon: 0,
      hackathonsParticipated: 2,
      category: "Mobile",
    },
  ]

  // Sample hackathons data
  const hackathons = [
    {
      id: "1",
      title: "AI Innovation Challenge",
      date: "2025-01-15",
      participants: 120,
      category: "AI",
      winners: [
        { name: "Alex Johnson", team: "Code Wizards", project: "Neural Voice Assistant" },
        { name: "Lisa Wang", team: "Neural Network", project: "AI Image Generator" },
        { name: "Michael Chen", team: "Algorithm Aces", project: "Predictive Analytics Dashboard" },
      ],
    },
    {
      id: "2",
      title: "MERN Stack Hackathon",
      date: "2025-02-10",
      participants: 85,
      category: "Web",
      winners: [
        { name: "Sarah Williams", team: "Byte Busters", project: "Real-time Collaboration Platform" },
        { name: "David Kim", team: "Stack Overflow", project: "Developer Community Portal" },
        { name: "Olivia Martinez", team: "Web Wizards", project: "E-learning Platform" },
      ],
    },
    {
      id: "3",
      title: "Blockchain Hackathon",
      date: "2025-03-05",
      participants: 65,
      category: "Blockchain",
      winners: [
        { name: "Emily Rodriguez", team: "Blockchain Bandits", project: "Decentralized Marketplace" },
        { name: "James Wilson", team: "Crypto Coders", project: "NFT Trading Platform" },
        { name: "Daniel Lee", team: "Chain Gang", project: "Smart Contract Auditor" },
      ],
    },
  ]

  // Get unique categories for filter
  const categories = Array.from(new Set([...users.map((u) => u.category), ...teams.map((t) => t.category)]))

  // Filter users based on category
  const filteredUsers = users
    .filter((user) => categoryFilter === "all" || user.category === categoryFilter)
    .sort((a, b) => b.points - a.points)

  // Filter teams based on category
  const filteredTeams = teams
    .filter((team) => categoryFilter === "all" || team.category === categoryFilter)
    .sort((a, b) => b.points - a.points)

  return (
    <>
      <MainNav />
      <main>
        {/* Hero Section */}
        <section className="relative bg-hero-pattern-dark py-20 text-white">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container relative mx-auto px-4 py-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-slide-down">
              <span className="text-primary">Leaderboard</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Discover our top performers and see where you stand in the rankings.
            </p>
          </div>
        </section>

        {/* Top Performers */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center relative inline-block">
              <span className="relative z-10">Top Performers</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {/* 2nd Place */}
              <div
                className="flex flex-col items-center order-1 md:order-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Medal className="h-8 w-8 text-[#C0C0C0]" />
                  </div>
                  <Avatar className="h-24 w-24 border-4 border-[#C0C0C0]">
                    <AvatarImage src={users[1].avatar} alt={users[1].name} />
                    <AvatarFallback>{users[1].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="mt-4 text-xl font-bold">{users[1].name}</h3>
                <p className="text-primary font-medium">{users[1].points} points</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {users[1].badges.slice(0, 2).map((badge, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 1st Place */}
              <div
                className="flex flex-col items-center order-0 md:order-0 animate-slide-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <div className="relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <Trophy className="h-10 w-10 text-[#FFD700]" />
                  </div>
                  <Avatar className="h-32 w-32 border-4 border-[#FFD700]">
                    <AvatarImage src={users[0].avatar} alt={users[0].name} />
                    <AvatarFallback>{users[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{users[0].name}</h3>
                <p className="text-primary font-medium text-lg">{users[0].points} points</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {users[0].badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 3rd Place */}
              <div
                className="flex flex-col items-center order-2 md:order-2 animate-slide-up opacity-0"
                style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
              >
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Award className="h-8 w-8 text-[#CD7F32]" />
                  </div>
                  <Avatar className="h-24 w-24 border-4 border-[#CD7F32]">
                    <AvatarImage src={users[2].avatar} alt={users[2].name} />
                    <AvatarFallback>{users[2].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="mt-4 text-xl font-bold">{users[2].name}</h3>
                <p className="text-primary font-medium">{users[2].points} points</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {users[2].badges.slice(0, 2).map((badge, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Tables */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold relative inline-block">
                <span className="relative z-10">Rankings</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
              </h2>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="individuals" className="w-full">
              <TabsList className="bg-background/50 p-1 mb-8">
                <TabsTrigger
                  value="individuals"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Individual Rankings
                </TabsTrigger>
                <TabsTrigger
                  value="teams"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Team Rankings
                </TabsTrigger>
                <TabsTrigger
                  value="hackathons"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Past Hackathons
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="individuals"
                className="animate-slide-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <Card className="border-primary/10 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Individual Leaderboard</CardTitle>
                    <CardDescription>
                      Rankings based on points earned from hackathon participation and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Rank</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Hackathons</TableHead>
                          <TableHead className="text-right">Wins</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user, index) => (
                          <TableRow key={user.id} className="transition-colors duration-300 hover:bg-primary/5">
                            <TableCell className="font-medium">
                              {index === 0 ? (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#FFD700]/20 text-[#FFD700]">
                                  1
                                </div>
                              ) : index === 1 ? (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#C0C0C0]/20 text-[#C0C0C0]">
                                  2
                                </div>
                              ) : index === 2 ? (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#CD7F32]/20 text-[#CD7F32]">
                                  3
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                                  {index + 1}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{user.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/10">
                                {user.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{user.hackathonsParticipated}</TableCell>
                            <TableCell className="text-right">{user.hackathonsWon}</TableCell>
                            <TableCell className="text-right font-bold">{user.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="teams"
                className="animate-slide-up opacity-0"
                style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
              >
                <Card className="border-primary/10 bg-card-gradient">
                  <CardHeader>
                    <CardTitle>Team Leaderboard</CardTitle>
                    <CardDescription>Rankings based on team performance in hackathons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Rank</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Members</TableHead>
                          <TableHead className="text-right">Hackathons</TableHead>
                          <TableHead className="text-right">Wins</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTeams.map((team, index) => (
                          <TableRow key={team.id} className="transition-colors duration-300 hover:bg-primary/5">
                            <TableCell className="font-medium">
                              {index === 0 ? (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#FFD700]/20 text-[#FFD700]">
                                  1
                                </div>
                              ) : index === 1 ? (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#C0C0C0]/20 text-[#C0C0C0]">
                                  2
                                </div>
                              ) : index === 2 ? (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#CD7F32]/20 text-[#CD7F32]">
                                  3
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                                  {index + 1}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{team.name}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/10">
                                {team.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{team.members}</TableCell>
                            <TableCell className="text-right">{team.hackathonsParticipated}</TableCell>
                            <TableCell className="text-right">{team.hackathonsWon}</TableCell>
                            <TableCell className="text-right font-bold">{team.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="hackathons"
                className="animate-slide-up opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <div className="space-y-8">
                  {hackathons.map((hackathon) => (
                    <Card key={hackathon.id} className="border-primary/10 bg-card-gradient">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{hackathon.title}</CardTitle>
                            <CardDescription>
                              {new Date(hackathon.date).toLocaleDateString()} • {hackathon.participants} participants
                            </CardDescription>
                          </div>
                          <Badge>{hackathon.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                          <Trophy className="mr-2 h-5 w-5 text-[#FFD700]" />
                          Winners
                        </h3>
                        <div className="grid gap-4 md:grid-cols-3">
                          {hackathon.winners.map((winner, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-bold">{winner.name}</p>
                                <p className="text-sm text-muted-foreground">Team: {winner.team}</p>
                                <p className="text-sm text-muted-foreground">Project: {winner.project}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 py-16 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2
              className="mb-6 text-3xl font-bold animate-slide-up opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              Join the Competition
            </h2>
            <p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground animate-slide-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Participate in our hackathons to earn points, win badges, and climb the leaderboard rankings.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105 transform animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              asChild
            >
              <a href="/hackathons">Browse Hackathons</a>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}

