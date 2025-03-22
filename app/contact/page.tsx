"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
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
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Have questions about our hackathons? Want to partner with us? We'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Contact Information */}
              <div className="animate-slide-in-right opacity-0" style={{ animationFillMode: "forwards" }}>
                <h2 className="text-3xl font-bold mb-6 relative inline-block">
                  <span className="relative z-10">Contact Information</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help! Reach out to us through any of the following channels, and we'll get back to you
                  as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">smit.edu@saylaniwelfare.com</p>
                      <p className="text-muted-foreground">partnerships@hackathonhub.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1-123-456-7890</p>
                      <p className="text-muted-foreground">Mon-Fri, 9am-5pm PST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Address</h3>
                      <p className="text-muted-foreground">123 Developer Street</p>
                      <p className="text-muted-foreground">Silicon Valley, CA 94000</p>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-12 h-64 rounded-lg overflow-hidden border border-primary/20 animate-pulse-slow"> */}
                  {/* This would be a Google Map in a real implementation */}
                  {/* <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive Map</p>
                  </div> */}
                {/* </div> */}
              </div>

              {/* Contact Form */}
              <div
                className="animate-slide-up opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                          <Send className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. We'll get back to you shortly.
                        </p>
                        <Button
                          className="mt-6 bg-primary hover:bg-primary/80 transition-colors duration-300"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              required
                              className="transition-all duration-300 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              required
                              className="transition-all duration-300 focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="What is this regarding?"
                            required
                            className="transition-all duration-300 focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Your message..."
                            rows={5}
                            required
                            className="transition-all duration-300 focus:border-primary"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/80 transition-colors duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center relative inline-block">
              <span className="relative z-10">Frequently Asked Questions</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 -z-10"></span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
                style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">How do I register for a hackathon?</h3>
                  <p className="text-muted-foreground">
                    You can register for any of our hackathons by creating an account and visiting the hackathon's page.
                    Click the "Register" button and follow the instructions.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Are your hackathons free to join?</h3>
                  <p className="text-muted-foreground">
                    Most of our hackathons are free to join. Some premium events may have a registration fee, which will
                    be clearly indicated on the event page.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
                style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Can I participate as a beginner?</h3>
                  <p className="text-muted-foreground">
                    We have hackathons for all skill levels, including beginners. Look for events labeled
                    "Beginner-Friendly" or check the difficulty level on the event page.
                  </p>
                </CardContent>
              </Card>
              <Card
                className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 animate-slide-up opacity-0"
                style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
              >
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">How can my company sponsor a hackathon?</h3>
                  <p className="text-muted-foreground">
                    We offer various sponsorship packages for companies interested in supporting our events. Please
                    contact us at partnerships@hackathonhub.com for more information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

