import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { Calendar, Clock, Users, Code, Trophy, Star } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Home() {
  // Featured hackathons (in a real app, this would come from a database)
  const featuredHackathons = [
    {
      id: "1",
      title: "AI Innovation Challenge",
      description: "Solve real-world AI problems using Python, TensorFlow, and OpenCV",
      startDate: "2025-04-15",
      duration: "48 hours",
      teamSize: "1-4",
      category: "AI",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "MERN Stack Hackathon",
      description: "Build a full-stack MERN app with real-time features",
      startDate: "2025-04-20",
      duration: "72 hours",
      teamSize: "2-5",
      category: "Web",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "5",
      title: "Blockchain Hackathon",
      description: "Create and deploy smart contracts on Ethereum using Solidity",
      startDate: "2025-06-01",
      duration: "72 hours",
      teamSize: "1-3",
      category: "Blockchain",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <>
      <MainNav />
      <main>
        {/* Hero Section */}
        <section className="relative bg-hero-pattern-dark py-20 text-white">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container relative mx-auto px-4 py-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-slide-down">
              🚀 <span className="text-primary">Code.</span> <span className="text-primary/80">Compete.</span>{" "}
              <span className="text-primary/60">Conquer!</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Join our hackathons to harness cutting-edge tech and connect with fellow innovators. Build projects that
              matter and showcase your skills to the world.
            </p>
            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105 transform"
                asChild
              >
                <Link href="/hackathons">Join Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 transform border-primary"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div
              className="mt-12 rounded-lg bg-black/40 p-4 backdrop-blur-sm animate-slide-up opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <p className="text-lg font-semibold">Next Hackathon Starts In:</p>
              <div className="mt-2 flex justify-center gap-4">
                <div className="rounded-md bg-primary/20 p-3 animate-pulse-slow">
                  <span className="block text-3xl font-bold">15</span>
                  <span className="text-sm">Days</span>
                </div>
                <div className="rounded-md bg-primary/20 p-3 animate-pulse-slow" style={{ animationDelay: "0.2s" }}>
                  <span className="block text-3xl font-bold">08</span>
                  <span className="text-sm">Hours</span>
                </div>
                <div className="rounded-md bg-primary/20 p-3 animate-pulse-slow" style={{ animationDelay: "0.4s" }}>
                  <span className="block text-3xl font-bold">45</span>
                  <span className="text-sm">Minutes</span>
                </div>
                <div className="rounded-md bg-primary/20 p-3 animate-pulse-slow" style={{ animationDelay: "0.6s" }}>
                  <span className="block text-3xl font-bold">30</span>
                  <span className="text-sm">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Hackathons */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold relative inline-block mx-auto">
              <span className="relative z-10">Featured Hackathons</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredHackathons.map((hackathon, index) => (
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
                      <div className="text-sm text-muted-foreground">
                        {new Date(hackathon.startDate).toLocaleDateString()}
                      </div>
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
                  <CardFooter>
                    <div className="flex justify-between items-center mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/hackathons/${hackathon.id}`}>Details</Link>
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" size="sm" asChild>
                        <Link href={`/hackathons/${hackathon.id}`}>Join Now</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 transform"
              >
                <Link href="/hackathons">View All Hackathons</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold relative inline-block mx-auto">
              <span className="relative z-10">Why Join Our Hackathons?</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div
                className="rounded-lg bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground animate-pulse-slow">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Connect with Peers</h3>
                <p className="text-muted-foreground">
                  Network with like-minded developers and form lasting professional relationships.
                </p>
              </div>
              <div
                className="rounded-lg bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground animate-pulse-slow"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Learn New Skills</h3>
                <p className="text-muted-foreground">
                  Challenge yourself with cutting-edge technologies and expand your skill set.
                </p>
              </div>
              <div
                className="rounded-lg bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground animate-pulse-slow"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Build Your Portfolio</h3>
                <p className="text-muted-foreground">
                  Create impressive projects that showcase your abilities to potential employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold relative inline-block mx-auto">
              <span className="relative z-10">What Participants Say</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "Participating in the AI Innovation Challenge was a game-changer for my career. I learned so much in
                    just 48 hours and made connections that led to my current job."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold">
                      SJ
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">AI Engineer at TechCorp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "The MERN Stack Hackathon pushed me to learn new technologies and collaborate with amazing
                    developers. Our project even won first place!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold">
                      MC
                    </div>
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mb-4 italic text-muted-foreground">
                    "As a beginner, I was nervous about joining a hackathon, but the community was so supportive. I
                    gained confidence and valuable experience."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold">
                      ER
                    </div>
                    <div>
                      <p className="font-medium">Emily Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Computer Science Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/20 py-16 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2
              className="mb-6 text-3xl font-bold animate-slide-up opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              Ready to Join Our Next Hackathon?
            </h2>
            <p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground animate-slide-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Sign up now to secure your spot and start preparing for an amazing coding experience.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105 transform animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              asChild
            >
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12">
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
                <p>123 Baloch Colony Rd, Karachi Administration Employees Housing Society Block 6 KAECHS, Karachi</p>
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
    </>
  )
}

