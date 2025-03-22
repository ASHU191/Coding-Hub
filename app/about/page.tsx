import { MainNav } from "@/components/main-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Users, Trophy, Zap, Heart, Globe } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Muhammad Arsalan",
      role: "Founder & CEO",
      bio: "Former software engineer with a passion for community building and hackathons.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      bio: "Full-stack developer and AI enthusiast who has organized over 50 hackathons.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Chen",
      role: "Community Manager",
      bio: "Developer advocate who loves connecting people and fostering collaboration.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Developer",
      bio: "Experienced engineer specializing in web technologies and real-time applications.",
      image: "/placeholder.svg?height=200&width=200",
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
              About <span className="text-primary">GeeksCode</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              We're on a mission to empower developers and foster innovation through collaborative coding events.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="animate-slide-in-right opacity-0" style={{ animationFillMode: "forwards" }}>
                <h2 className="text-3xl font-bold mb-6 relative inline-block">
                  <span className="relative z-10">Our Story</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
                </h2>
                <p className="text-muted-foreground mb-4">
                  GeeksCode was founded in 2020 by a group of passionate developers who believed in the power of
                  hackathons to drive innovation and build community.
                </p>
                <p className="text-muted-foreground mb-4">
                  What started as a small local event has grown into a global platform connecting thousands of
                  developers, designers, and innovators from around the world.
                </p>
                <p className="text-muted-foreground">
                  Our platform has hosted over 200 hackathons, with participants from more than 50 countries, resulting
                  in countless innovative projects and startups.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg shadow-primary/20 animate-float">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hackathon participants"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 relative inline-block">
              <span className="relative z-10">Our Mission</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Foster Innovation</h3>
                  <p className="text-muted-foreground">
                    Create an environment where new ideas can flourish and innovative solutions can be developed.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Build Community</h3>
                  <p className="text-muted-foreground">
                    Connect developers, designers, and innovators from diverse backgrounds and skill levels.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up opacity-0"
                style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Accelerate Learning</h3>
                  <p className="text-muted-foreground">
                    Provide opportunities for participants to learn new technologies and skills in a hands-on
                    environment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center relative inline-block">
              <span className="relative z-10">Meet Our Team</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 overflow-hidden group animate-slide-up opacity-0"
                  style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary/80 font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center relative inline-block">
              <span className="relative z-10">Our Values</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div
                className="flex gap-4 items-start animate-slide-in-right opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
                  <p className="text-muted-foreground">
                    We believe that everyone, regardless of background or experience level, should have the opportunity
                    to participate in hack regardless of background or experience level, should have the opportunity to
                    participate in hackathons and contribute to innovative projects. We strive to create a welcoming
                    environment for all.
                  </p>
                </div>
              </div>
              <div
                className="flex gap-4 items-start animate-slide-in-right opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                  <p className="text-muted-foreground">
                    We believe that the best solutions come from diverse teams working together. Our hackathons
                    emphasize teamwork and cross-disciplinary collaboration.
                  </p>
                </div>
              </div>
              <div
                className="flex gap-4 items-start animate-slide-in-right opacity-0"
                style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We push participants to do their best work and provide the resources and support they need to
                    achieve excellence in their projects.
                  </p>
                </div>
              </div>
              <div
                className="flex gap-4 items-start animate-slide-in-right opacity-0"
                style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We encourage creative thinking and novel approaches to problem-solving, fostering an environment
                    where innovation can thrive.
                  </p>
                </div>
              </div>
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
              Join Our Community
            </h2>
            <p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground animate-slide-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Be part of our growing community of developers, designers, and innovators. Participate in hackathons,
              share your knowledge, and build amazing projects together.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105 transform animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              asChild
            >
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}

