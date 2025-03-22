"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useData } from "@/lib/data-service"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Calendar, Clock, Code, FileText, GraduationCap, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { SiteFooter } from "@/components/site-footer"

export default function HackathonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getHackathon, registerForHackathon, unregisterFromHackathon } = useData()
  const { user, isLoading: authLoading } = useAuth()
  const [hackathon, setHackathon] = useState<any>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    if (authLoading) return

    const hackathonData = getHackathon(params.id as string)
    if (hackathonData) {
      setHackathon(hackathonData)

      // Check if user is registered - only if user exists
      if (user) {
        const userIsRegistered = user.registeredHackathons?.includes(hackathonData.id) || false
        setIsRegistered(userIsRegistered)
      }
    }

    setIsLoading(false)
  }, [params.id, getHackathon, authLoading, user])

  if (isLoading || authLoading) {
    return (
      <>
        <MainNav />
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Loading hackathon details...</p>
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

  const handleRegistration = () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/hackathons/${hackathon.id}/submit`)}`)
      return
    }

    setIsRegistering(true)

    try {
      if (isRegistered) {
        unregisterFromHackathon(user.id, hackathon.id)
        toast({
          title: "Unregistered",
          description: `You have been unregistered from ${hackathon.title}`,
          variant: "destructive",
        })
        setIsRegistering(false)
        setIsRegistered(false)
      } else {
        registerForHackathon(user.id, hackathon.id)
        // Don't update state here, just redirect
        router.push(`/hackathons/${hackathon.id}/submit`)
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Error",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      })
      setIsRegistering(false)
    }
  }

  const handleSubmitProject = () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/hackathons/${hackathon.id}/submit`)}`)
      return
    }

    // Don't check registration status here, let the submission page handle it
    router.push(`/hackathons/${hackathon.id}/submit`)
  }

  return (
    <>
      <MainNav />
      <main>
        {/* Hero Section */}
        <section className="relative bg-hero-pattern-dark py-20 text-white">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container relative mx-auto px-4 py-16 text-center">
            <Badge className="mb-4 bg-primary/80 text-white text-sm px-3 py-1 animate-slide-down">
              {hackathon.category}
            </Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-slide-down">{hackathon.title}</h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              {hackathon.description}
            </p>
            <div
              className="flex flex-wrap justify-center gap-4 animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Starts {new Date(hackathon.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
                <span>{hackathon.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
                <span>{hackathon.teamSize} members</span>
              </div>
            </div>

            {/* Add a prominent CTA button in the hero section */}
            <div className="mt-8">
              {user ? (
                isRegistered ? (
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/80 text-lg px-8 py-6 animate-pulse"
                    onClick={handleSubmitProject}
                  >
                    Submit Your Project Now
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6 animate-pulse"
                    onClick={handleRegistration}
                    disabled={isRegistering}
                  >
                    {isRegistering ? "Processing..." : "Join Hackathon & Submit Project"}
                  </Button>
                )
              ) : (
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6 animate-pulse"
                  onClick={() =>
                    router.push(`/login?redirect=${encodeURIComponent(`/hackathons/${hackathon.id}/submit`)}`)
                  }
                >
                  Sign In to Join & Submit
                </Button>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div
                  className="flex flex-col items-center rounded-lg border border-primary/10 p-4 text-center transition-all duration-300 hover:bg-primary/5 animate-slide-up opacity-0"
                  style={{ animationFillMode: "forwards" }}
                >
                  <Calendar className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Start Date</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(hackathon.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div
                  className="flex flex-col items-center rounded-lg border border-primary/10 p-4 text-center transition-all duration-300 hover:bg-primary/5 animate-slide-up opacity-0"
                  style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
                >
                  <Clock className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Duration</span>
                  <span className="text-sm text-muted-foreground">{hackathon.duration}</span>
                </div>
                <div
                  className="flex flex-col items-center rounded-lg border border-primary/10 p-4 text-center transition-all duration-300 hover:bg-primary/5 animate-slide-up opacity-0"
                  style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                >
                  <Users className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Team Size</span>
                  <span className="text-sm text-muted-foreground">{hackathon.teamSize}</span>
                </div>
                <div
                  className="flex flex-col items-center rounded-lg border border-primary/10 p-4 text-center transition-all duration-300 hover:bg-primary/5 animate-slide-up opacity-0"
                  style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
                >
                  <FileText className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Fee</span>
                  <span className="text-sm text-muted-foreground">{hackathon.fee}</span>
                </div>
              </div>
            </div>
            <div>
              <div
                className="sticky top-20 rounded-lg border border-primary/10 p-6 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
                style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
              >
                <div className="mb-6 aspect-video w-full overflow-hidden rounded-md">
                  <img
                    src={hackathon.image || "/placeholder.svg"}
                    alt={hackathon.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Registration Closes</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(hackathon.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Hackathon Starts</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(hackathon.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Hackathon Ends</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {user ? (
                  <div className="space-y-3">
                    {isRegistered ? (
                      <>
                        <div className="flex items-center justify-center gap-2 p-3 bg-green-600/20 rounded-lg mb-3 text-green-500">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">You are registered</span>
                        </div>
                        <Button
                          className="w-full bg-primary hover:bg-primary/80 transition-all duration-300 text-lg py-6"
                          onClick={handleSubmitProject}
                        >
                          Submit Your Project
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-full text-lg py-6 bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 transform"
                        size="lg"
                        onClick={handleRegistration}
                        disabled={isRegistering}
                      >
                        {isRegistering ? "Processing..." : "Join & Submit Project"}
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 transition-all duration-300 hover:scale-105 transform"
                      size="lg"
                      onClick={() =>
                        router.push(`/login?redirect=${encodeURIComponent(`/hackathons/${hackathon.id}/submit`)}`)
                      }
                    >
                      Sign In to Join & Submit
                    </Button>
                    <p className="mt-2 text-xs text-center text-muted-foreground">
                      <Link href="/login" className="text-primary hover:underline">
                        Sign in
                      </Link>{" "}
                      or{" "}
                      <Link href="/register" className="text-primary hover:underline">
                        create an account
                      </Link>{" "}
                      to register
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="modules"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Modules
              </TabsTrigger>
              <TabsTrigger
                value="instructors"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Instructors
              </TabsTrigger>
              <TabsTrigger
                value="prerequisites"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Prerequisites
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="mt-6 animate-slide-up opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Hackathon Overview</CardTitle>
                  <CardDescription>Everything you need to know about this hackathon</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">About this Hackathon</h3>
                    <p className="text-muted-foreground">{hackathon.description}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {hackathon.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="bg-primary/10 hover:bg-primary/20 transition-all duration-300"
                        >
                          <Code className="mr-1 h-3 w-3" />
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">What You'll Learn</h3>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                      <li>Build a complete project from scratch in {hackathon.duration}</li>
                      <li>Work with the latest technologies in {hackathon.category}</li>
                      <li>Collaborate with other developers in a team environment</li>
                      <li>Receive feedback from industry experts</li>
                      <li>Add a valuable project to your portfolio</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="modules"
              className="mt-6 animate-slide-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Hackathon Modules</CardTitle>
                  <CardDescription>The structure and components of this hackathon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hackathon.modules.map((module, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-primary/10 p-4 transition-all duration-300 hover:bg-primary/5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{module}</h3>
                            <p className="text-sm text-muted-foreground">
                              {index === 0
                                ? "Start by understanding the challenge and planning your approach."
                                : index === hackathon.modules.length - 1
                                  ? "Finalize your project and prepare for submission."
                                  : `Work on ${module.toLowerCase()} to build your solution.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="instructors"
              className="mt-6 animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Hackathon Instructors</CardTitle>
                  <CardDescription>Meet the experts who will guide you through this hackathon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {hackathon.instructors.map((instructor, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg border border-primary/10 transition-all duration-300 hover:bg-primary/5"
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {instructor.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{instructor}</h3>
                          <p className="text-sm text-muted-foreground">
                            {index % 2 === 0
                              ? `Expert in ${hackathon.techStack[0]} and ${hackathon.category}`
                              : `Specialist in ${hackathon.techStack[1] || hackathon.techStack[0]} development`}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {index % 2 === 0
                              ? "Has led multiple successful hackathons and mentored winning teams."
                              : "Industry professional with years of experience in building production applications."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="prerequisites"
              className="mt-6 animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                  <CardDescription>What you need to know before joining this hackathon</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Required Knowledge</h3>
                    <div className="flex flex-wrap gap-2">
                      {hackathon.prerequisites.map((prereq) => (
                        <Badge
                          key={prereq}
                          variant="outline"
                          className="bg-primary/10 hover:bg-primary/20 transition-all duration-300"
                        >
                          <GraduationCap className="mr-1 h-3 w-3" />
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Recommended Resources</h3>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                      <li>Official documentation for {hackathon.techStack.join(", ")}</li>
                      <li>Basic understanding of {hackathon.category} concepts</li>
                      <li>Familiarity with collaborative development tools</li>
                      <li>A computer with the necessary development environment set up</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Difficulty Level</h3>
                    <p className="text-muted-foreground">
                      This hackathon is rated as <span className="font-medium">{hackathon.difficulty}</span>.
                      {hackathon.difficulty === "Beginner"
                        ? " Perfect for those new to hackathons or the technologies involved."
                        : hackathon.difficulty === "Intermediate"
                          ? " Suitable for those with some experience in the technologies involved."
                          : " Designed for experienced developers looking for a challenge."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Hackathons */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Hackathons</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* This would typically be dynamically generated based on category or tags */}
              <Card className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Related Hackathon"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                      {hackathon.category}
                    </Badge>
                    <div className="text-sm text-muted-foreground">Upcoming</div>
                  </div>
                  <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                    Advanced {hackathon.category} Challenge
                  </CardTitle>
                  <CardDescription>Take your {hackathon.category} skills to the next level</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full bg-primary/80 hover:bg-primary transition-all duration-300">
                    <Link href="/hackathons">View Details</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Related Hackathon"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                      {hackathon.category}
                    </Badge>
                    <div className="text-sm text-muted-foreground">Upcoming</div>
                  </div>
                  <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                    {hackathon.category} for Beginners
                  </CardTitle>
                  <CardDescription>
                    Learn the basics of {hackathon.category} in this beginner-friendly hackathon
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full bg-primary/80 hover:bg-primary transition-all duration-300">
                    <Link href="/hackathons">View Details</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Related Hackathon"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                      {hackathon.category}
                    </Badge>
                    <div className="text-sm text-muted-foreground">Upcoming</div>
                  </div>
                  <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                    Team {hackathon.category} Challenge
                  </CardTitle>
                  <CardDescription>
                    Collaborate with others to build amazing {hackathon.category} projects
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full bg-primary/80 hover:bg-primary transition-all duration-300">
                    <Link href="/hackathons">View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          {user ? (
            isRegistered ? (
              <Button
                className="rounded-full p-6 shadow-lg bg-primary hover:bg-primary/80"
                size="lg"
                onClick={handleSubmitProject}
              >
                Submit
              </Button>
            ) : (
              <Button
                className="rounded-full p-6 shadow-lg bg-green-600 hover:bg-green-700"
                size="lg"
                onClick={handleRegistration}
                disabled={isRegistering}
              >
                {isRegistering ? "..." : "Join"}
              </Button>
            )
          ) : (
            <Button
              className="rounded-full p-6 shadow-lg bg-green-600 hover:bg-green-700"
              size="lg"
              onClick={() => router.push(`/login?redirect=${encodeURIComponent(`/hackathons/${hackathon.id}/submit`)}`)}
            >
              Join
            </Button>
          )}
        </div>

        <SiteFooter />
      </main>
    </>
  )
}

