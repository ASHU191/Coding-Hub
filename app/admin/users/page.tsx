"use client"

import { useState, useEffect } from "react"
import { useData } from "@/lib/data-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Plus, Search, Eye, Edit, Trash, RefreshCw } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function AdminUsers() {
  const { users, hackathons } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [localUsers, setLocalUsers] = useState(users)

  useEffect(() => {
    setLocalUsers(users)
  }, [users])

  // Function to refresh users from localStorage
  const refreshUsers = () => {
    setIsRefreshing(true)
    try {
      const storedUsers = localStorage.getItem("hackathon-hub-users")
      if (storedUsers) {
        setLocalUsers(JSON.parse(storedUsers))
        toast({
          title: "Users Refreshed",
          description: "The users list has been updated with the latest data.",
        })
      }
    } catch (error) {
      console.error("Error refreshing users:", error)
      toast({
        title: "Error",
        description: "There was an error refreshing the users list.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Filter users based on search and role
  const filteredUsers = localUsers.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">Manage your users here</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
              onClick={refreshUsers}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button className="bg-primary hover:bg-primary/80 transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10 border-primary/20 focus:border-primary transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px] border-primary/20 focus:border-primary transition-all duration-300">
              <Filter className="mr-2 h-4 w-4 text-primary" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-primary/10 bg-card-gradient transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users on your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Registered Hackathons</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="transition-colors hover:bg-primary/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "admin" ? "default" : "outline"}
                        className={user.role === "admin" ? "bg-primary" : ""}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.registeredHackathons?.map((hackathonId) => {
                          const hackathon = hackathons.find((h) => h.id === hackathonId)
                          return hackathon ? (
                            <Badge
                              key={hackathonId}
                              variant="outline"
                              className="bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                            >
                              {hackathon.title}
                            </Badge>
                          ) : null
                        })}
                        {!user.registeredHackathons?.length && (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                        >
                          <Link href={`/admin/users/${user.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
                        >
                          <Link href={`/admin/users/${user.id}?edit=true`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No users found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

