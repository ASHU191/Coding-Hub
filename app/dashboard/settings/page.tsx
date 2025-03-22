"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-service"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, User, Lock, Bell, Shield, Trash, Upload, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { SiteFooter } from "@/components/site-footer"

export default function UserSettings() {
  const router = useRouter()
  const { user, isLoading, logout, updateUser } = useAuth()
  const { updateUserProfile } = useData()
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    github: "",
    twitter: "",
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        bio: "Full-stack developer passionate about web technologies and AI.",
        website: "https://example.com",
        github: "github",
        twitter: "twitter",
      })
    }
  }, [user, isLoading, router])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setIsSaving(true)

    try {
      // Update user in auth context
      await updateUser({
        name: profileForm.name,
        email: profileForm.email,
      })

      // Update user in data service
      updateUserProfile(user.id, {
        name: profileForm.name,
        email: profileForm.email,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In a real app, this would delete the user account
      logout()
      router.push("/")
    }
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
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
              Account <span className="text-primary">Settings</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-2xl text-xl animate-slide-down opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Manage your profile, security, and preferences
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" className="mb-8" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20 sticky top-24">
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 border-2 border-primary mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className={`w-full justify-start border-primary/20 hover:bg-primary/10 transition-all duration-300 ${activeTab === "profile" ? "bg-primary/10" : ""}`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="outline"
                      className={`w-full justify-start border-primary/20 hover:bg-primary/10 transition-all duration-300 ${activeTab === "security" ? "bg-primary/10" : ""}`}
                      onClick={() => setActiveTab("security")}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button
                      variant="outline"
                      className={`w-full justify-start border-primary/20 hover:bg-primary/10 transition-all duration-300 ${activeTab === "notifications" ? "bg-primary/10" : ""}`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button
                      variant="outline"
                      className={`w-full justify-start border-primary/20 hover:bg-primary/10 transition-all duration-300 ${activeTab === "privacy" ? "bg-primary/10" : ""}`}
                      onClick={() => setActiveTab("privacy")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-muted/50 p-1 mb-8">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="privacy"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    Privacy
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent
                  value="profile"
                  className="animate-slide-up opacity-0"
                  style={{ animationFillMode: "forwards" }}
                >
                  <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center gap-4 p-6 border border-dashed border-primary/20 rounded-lg">
                          <Avatar className="h-24 w-24 border-2 border-primary">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Button
                            variant="outline"
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Change Avatar
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={profileForm.name}
                              onChange={handleProfileChange}
                              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileForm.email}
                              onChange={handleProfileChange}
                              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input
                            id="bio"
                            name="bio"
                            value={profileForm.bio}
                            onChange={handleProfileChange}
                            className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                          />
                          <p className="text-xs text-muted-foreground">
                            Brief description for your profile. URLs are hyperlinked.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={profileForm.website}
                            onChange={handleProfileChange}
                            className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="github">GitHub</Label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-primary/20 bg-muted text-muted-foreground text-sm">
                                github.com/
                              </span>
                              <Input
                                id="github"
                                name="github"
                                value={profileForm.github}
                                onChange={handleProfileChange}
                                className="rounded-l-none bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-primary/20 bg-muted text-muted-foreground text-sm">
                                twitter.com/
                              </span>
                              <Input
                                id="twitter"
                                name="twitter"
                                value={profileForm.twitter}
                                onChange={handleProfileChange}
                                className="rounded-l-none bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                        onClick={() => router.push("/dashboard")}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-primary hover:bg-primary/80 transition-all duration-300"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent
                  value="security"
                  className="animate-slide-up opacity-0"
                  style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
                >
                  <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input
                              id="current-password"
                              type="password"
                              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                              id="new-password"
                              type="password"
                              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                            />
                          </div>
                          <Button
                            className="bg-primary hover:bg-primary/80 transition-all duration-300"
                            onClick={() => {
                              toast({
                                title: "Password Updated",
                                description: "Your password has been updated successfully.",
                              })
                            }}
                          >
                            Update Password
                          </Button>
                        </div>

                        <Separator className="my-6" />

                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-factor authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch />
                        </div>

                        <Separator className="my-6" />

                        <h3 className="text-lg font-medium">Login Sessions</h3>
                        <div className="space-y-4">
                          <div className="rounded-lg border border-primary/10 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                              </div>
                              <Badge className="bg-green-500">Active</Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                            onClick={() => {
                              toast({
                                title: "Sessions Cleared",
                                description: "You have been logged out of all other sessions.",
                              })
                            }}
                          >
                            Log Out of All Sessions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent
                  value="notifications"
                  className="animate-slide-up opacity-0"
                  style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                >
                  <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Email Notifications</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Hackathon announcements</p>
                                <p className="text-sm text-muted-foreground">Receive updates about new hackathons</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Hackathon reminders</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive reminders about upcoming hackathons
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Team notifications</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive updates about your team activities
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Push Notifications</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Enable push notifications</p>
                                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notification Frequency</h3>
                          <div className="space-y-2">
                            <Label htmlFor="frequency">Email Digest Frequency</Label>
                            <Select defaultValue="daily">
                              <SelectTrigger
                                id="frequency"
                                className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-300"
                              >
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
                                <SelectItem value="daily">Daily Digest</SelectItem>
                                <SelectItem value="weekly">Weekly Digest</SelectItem>
                                <SelectItem value="never">Never</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="bg-primary hover:bg-primary/80 transition-all duration-300"
                        onClick={() => {
                          toast({
                            title: "Preferences Saved",
                            description: "Your notification preferences have been updated.",
                          })
                        }}
                      >
                        Save Preferences
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Privacy Tab */}
                <TabsContent
                  value="privacy"
                  className="animate-slide-up opacity-0"
                  style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
                >
                  <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Manage your privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Profile Visibility</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Public profile</p>
                                <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Show email address</p>
                                <p className="text-sm text-muted-foreground">
                                  Display your email on your public profile
                                </p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Show social links</p>
                                <p className="text-sm text-muted-foreground">
                                  Display your social media links on your profile
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Data Usage</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Analytics cookies</p>
                                <p className="text-sm text-muted-foreground">
                                  Allow us to collect usage data to improve our service
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Personalization</p>
                                <p className="text-sm text-muted-foreground">
                                  Allow us to personalize your experience based on your activity
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                          <div className="rounded-lg border border-destructive/20 p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <p className="font-medium text-destructive">Delete Account</p>
                                <p className="text-sm text-muted-foreground">
                                  Permanently delete your account and all your data
                                </p>
                              </div>
                              <Button
                                variant="destructive"
                                onClick={handleDeleteAccount}
                                className="transition-all duration-300"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <SiteFooter />
      </main>
    </>
  )
}

