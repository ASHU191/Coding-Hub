"use client"

import { useState } from "react"
import Link from "next/link"
import { useData } from "@/lib/data-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { Calendar, Clock, Filter, Search, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HackathonsPage() {
  const { hackathons } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [teamSizeFilter, setTeamSizeFilter] = useState("")

  // Get unique categories, difficulties, and team sizes for filters
  const categories = Array.from(new Set(hackathons.map((h) => h.category)))
  const difficulties = Array.from(new Set(hackathons.map((h) => h.difficulty)))
  const teamSizes = Array.from(new Set(hackathons.map((h) => h.teamSize)))

  // Filter hackathons based on search term and filters
  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch =
      searchTerm === "" ||
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "" || hackathon.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "" || hackathon.difficulty === difficultyFilter
    const matchesTeamSize = teamSizeFilter === "" || hackathon.teamSize === teamSizeFilter

    return matchesSearch && matchesCategory && matchesDifficulty && matchesTeamSize
  })

  return (
    <>
      <MainNav />
      <main>
        {/* Hero Section */}
        <section className="relative bg-hero-pattern-dark py-20 text-white">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container relative mx-auto px-4 py-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-slide-down">
              <span className="text-primary">Hackathons</span> & Challenges
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Browse and join our upcoming hackathons to showcase your skills, learn new technologies, and connect with
              fellow developers.
            </p>
            <div
              className="max-w-xl mx-auto animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search hackathons..."
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-wrap gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] border-primary/20 focus:border-primary transition-all duration-300 hover:bg-primary/5">
                    <Filter className="mr-2 h-4 w-4 text-primary" />
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
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[180px] border-primary/20 focus:border-primary transition-all duration-300 hover:bg-primary/5">
                    <Filter className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={teamSizeFilter} onValueChange={setTeamSizeFilter}>
                  <SelectTrigger className="w-[180px] border-primary/20 focus:border-primary transition-all duration-300 hover:bg-primary/5">
                    <Filter className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="Team Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Team Sizes</SelectItem>
                    {teamSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Hackathons Grid */}
          {filteredHackathons.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredHackathons.map((hackathon, index) => (
                <Card
                  key={hackathon.id}
                  className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group animate-slide-up opacity-0"
                  style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
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
                      <Badge variant="outline">{hackathon.difficulty}</Badge>
                    </div>
                    <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                      {hackathon.title}
                    </CardTitle>
                    <CardDescription>{hackathon.description}</CardDescription>
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
                      <div className="flex items-center gap-1 text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                        <Calendar className="h-4 w-4" />
                        <span>Starts {new Date(hackathon.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/hackathons/${hackathon.id}`}>View Details</Link>
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" size="sm" asChild>
                      <Link href={`/hackathons/${hackathon.id}`}>Join Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No hackathons found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                className="mt-4 bg-primary hover:bg-primary/80 transition-all duration-300"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("")
                  setDifficultyFilter("")
                  setTeamSizeFilter("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-muted py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-bold">GeeksCode</h3>
                <p className="text-muted-foreground">
                  Empowering developers to build, learn, and connect through exciting hackathons.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/hackathons"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      Hackathons
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/leaderboard"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Contact</h3>
                <address className="not-italic text-muted-foreground">
                  <p>Baloch Colony Rd, Karachi Administration Employees Housing Society Block 6 KAECHS, Karachi</p>
                  {/* <p>Silicon Valley</p> */}
                  <p>smit.edu@saylaniwelfare.com</p>
                  <p>+1-123-456-7890</p>
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
                  <Button className="bg-primary hover:bg-primary/80 transition-colors duration-300">Subscribe</Button>
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

