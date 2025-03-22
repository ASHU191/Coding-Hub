"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, FileText, Code, Video, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Sample resources data
  const resources = [
    {
      id: "1",
      title: "Getting Started with Hackathons",
      description: "A comprehensive guide for beginners on how to prepare for hackathons",
      category: "Guide",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-01-15",
      readTime: "10 min read",
      featured: true,
    },
    {
      id: "2",
      title: "10 Tips for Winning Hackathons",
      description: "Expert advice on how to stand out and win at hackathons",
      category: "Tips",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-02-10",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: "3",
      title: "Building an Effective Demo",
      description: "Learn how to create compelling demos for your hackathon projects",
      category: "Guide",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-03-05",
      readTime: "12 min read",
    },
    {
      id: "4",
      title: "Introduction to AI for Hackathons",
      description: "A beginner's guide to implementing AI in your hackathon projects",
      category: "Tutorial",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-03-15",
      readTime: "15 min read",
    },
    {
      id: "5",
      title: "Collaborative Coding Best Practices",
      description: "How to effectively work with a team during a hackathon",
      category: "Tips",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-03-20",
      readTime: "7 min read",
    },
    {
      id: "6",
      title: "From Hackathon to Startup",
      description: "Success stories of hackathon projects that became successful startups",
      category: "Case Study",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-04-01",
      readTime: "20 min read",
      featured: true,
    },
  ]

  // Sample tutorials data
  const tutorials = [
    {
      id: "1",
      title: "Building a Real-time Chat App with Socket.io",
      description: "Learn how to create a real-time chat application using Node.js and Socket.io",
      category: "Web Development",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-02-15",
      difficulty: "Intermediate",
    },
    {
      id: "2",
      title: "Creating a Machine Learning Model with TensorFlow",
      description: "A step-by-step guide to building and training a machine learning model",
      category: "AI",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-03-10",
      difficulty: "Advanced",
    },
    {
      id: "3",
      title: "Developing a Mobile App with React Native",
      description: "Learn how to build cross-platform mobile apps using React Native",
      category: "Mobile Development",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-03-25",
      difficulty: "Intermediate",
    },
    {
      id: "4",
      title: "Introduction to Blockchain Development",
      description: "Get started with blockchain development and smart contracts",
      category: "Blockchain",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-04-05",
      difficulty: "Beginner",
    },
  ]

  // Sample videos data
  const videos = [
    {
      id: "1",
      title: "Hackathon Success Stories",
      description: "Interviews with winners of our past hackathons",
      category: "Interviews",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-02-20",
      duration: "25 min",
    },
    {
      id: "2",
      title: "How to Pitch Your Hackathon Project",
      description: "Tips and techniques for presenting your project effectively",
      category: "Tips",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-03-15",
      duration: "15 min",
    },
    {
      id: "3",
      title: "Rapid Prototyping Techniques",
      description: "Learn how to quickly build and iterate on your ideas",
      category: "Tutorial",
      image: "/placeholder.svg?height=200&width=400",
      date: "2025-04-01",
      duration: "30 min",
    },
  ]

  // Filter resources based on search term and category
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(resources.map((r) => r.category)))

  return (
    <>
      <MainNav />
      <main>
        {/* Hero Section */}
        <section className="relative bg-hero-pattern-dark py-20 text-white">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container relative mx-auto px-4 py-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-slide-down">
              Learning <span className="text-primary">Resources</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Explore our collection of guides, tutorials, and videos to help you succeed in your next hackathon.
            </p>
            <div
              className="max-w-xl mx-auto animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resources Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="articles" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <TabsList className="bg-muted/50 p-1">
                  <TabsTrigger
                    value="articles"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Articles
                  </TabsTrigger>
                  <TabsTrigger
                    value="tutorials"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Tutorials
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Videos
                  </TabsTrigger>
                </TabsList>

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

              <TabsContent value="articles" className="mt-6">
                {/* Featured Articles */}
                {filteredResources.some((r) => r.featured) && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                      {filteredResources
                        .filter((r) => r.featured)
                        .map((resource, index) => (
                          <Card
                            key={resource.id}
                            className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group animate-slide-up opacity-0"
                            style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
                          >
                            <div className="aspect-video w-full overflow-hidden">
                              <img
                                src={resource.image || "/placeholder.svg"}
                                alt={resource.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                                  {resource.category}
                                </Badge>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(resource.date).toLocaleDateString()}
                                </div>
                              </div>
                              <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                                {resource.title}
                              </CardTitle>
                              <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between">
                              <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                              <Button
                                variant="ghost"
                                className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                                asChild
                              >
                                <Link href={`/resources/${resource.id}`}>Read More</Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}

                {/* All Articles */}
                <h2 className="text-2xl font-bold mb-6">All Articles</h2>
                {filteredResources.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((resource, index) => (
                      <Card
                        key={resource.id}
                        className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group animate-slide-up opacity-0"
                        style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
                      >
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={resource.image || "/placeholder.svg"}
                            alt={resource.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                              {resource.category}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {new Date(resource.date).toLocaleDateString()}
                            </div>
                          </div>
                          <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                            {resource.title}
                          </CardTitle>
                          <CardDescription>{resource.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                          <Button
                            variant="ghost"
                            className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                            asChild
                          >
                            <Link href={`/resources/${resource.id}`}>Read More</Link>
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
                    <h3 className="mt-4 text-lg font-semibold">No articles found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("")
                        setCategoryFilter("all")
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tutorials" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tutorials.map((tutorial, index) => (
                    <Card
                      key={tutorial.id}
                      className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group animate-slide-up opacity-0"
                      style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={tutorial.image || "/placeholder.svg"}
                          alt={tutorial.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                            {tutorial.category}
                          </Badge>
                          <Badge variant="outline">{tutorial.difficulty}</Badge>
                        </div>
                        <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                          {tutorial.title}
                        </CardTitle>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(tutorial.date).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                          asChild
                        >
                          <Link href={`/resources/tutorials/${tutorial.id}`}>View Tutorial</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {videos.map((video, index) => (
                    <Card
                      key={video.id}
                      className="overflow-hidden border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 group animate-slide-up opacity-0"
                      style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
                    >
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img
                          src={video.image || "/placeholder.svg"}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center text-white group-hover:bg-primary transition-colors duration-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-8 h-8"
                            >
                              <path d="M8 5.14v14l11-7-11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-primary/80 hover:bg-primary transition-colors duration-300">
                            {video.category}
                          </Badge>
                          <div className="text-sm text-muted-foreground">{video.duration}</div>
                        </div>
                        <CardTitle className="mt-2 group-hover:text-primary transition-colors duration-300">
                          {video.title}
                        </CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(video.date).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                          asChild
                        >
                          <Link href={`/resources/videos/${video.id}`}>Watch Video</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-primary/20 py-16 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2
              className="mb-6 text-3xl font-bold animate-slide-up opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              Stay Updated
            </h2>
            <p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground animate-slide-up opacity-0"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Subscribe to our newsletter to receive the latest resources, tutorials, and hackathon announcements.
            </p>
            <div
              className="max-w-md mx-auto flex gap-2 animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <Input
                placeholder="Your email"
                className="bg-background transition-all duration-300 focus:border-primary"
              />
              <Button className="bg-primary hover:bg-primary/80 transition-colors duration-300">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

