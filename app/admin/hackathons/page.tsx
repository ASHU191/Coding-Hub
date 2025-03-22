"use client"

import type React from "react"

import { useState } from "react"
import { useData, type Hackathon } from "@/lib/data-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Trash } from "lucide-react"

export default function AdminHackathons() {
  const { hackathons, addHackathon, updateHackathon, deleteHackathon } = useData()
  const [open, setOpen] = useState(false)
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null)
  const [formData, setFormData] = useState<Partial<Hackathon>>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: "",
    fee: "",
    category: "",
    techStack: [],
    teamSize: "",
    difficulty: "",
    prerequisites: [],
    instructors: [],
    modules: [],
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  })

  const handleEdit = (hackathon: Hackathon) => {
    setEditingHackathon(hackathon)
    setFormData({
      title: hackathon.title,
      description: hackathon.description,
      startDate: hackathon.startDate,
      endDate: hackathon.endDate,
      duration: hackathon.duration,
      fee: hackathon.fee,
      category: hackathon.category,
      techStack: hackathon.techStack,
      teamSize: hackathon.teamSize,
      difficulty: hackathon.difficulty,
      prerequisites: hackathon.prerequisites,
      instructors: hackathon.instructors,
      modules: hackathon.modules,
      image: hackathon.image,
      featured: hackathon.featured,
    })
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this hackathon?")) {
      deleteHackathon(id)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingHackathon) {
      updateHackathon(editingHackathon.id, formData)
    } else {
      addHackathon(formData as Omit<Hackathon, "id">)
    }

    setOpen(false)
    setEditingHackathon(null)
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      duration: "",
      fee: "",
      category: "",
      techStack: [],
      teamSize: "",
      difficulty: "",
      prerequisites: [],
      instructors: [],
      modules: [],
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Hackathon) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }))
  }

  const handleAddNew = () => {
    setEditingHackathon(null)
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      duration: "",
      fee: "",
      category: "",
      techStack: [],
      teamSize: "",
      difficulty: "",
      prerequisites: [],
      instructors: [],
      modules: [],
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    })
    setOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hackathons</h1>
          <p className="text-muted-foreground">Manage your hackathons here</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Hackathon
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Hackathons</CardTitle>
          <CardDescription>A list of all hackathons on your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hackathons.map((hackathon) => (
                <TableRow key={hackathon.id}>
                  <TableCell className="font-medium">{hackathon.title}</TableCell>
                  <TableCell>{hackathon.category}</TableCell>
                  <TableCell>{new Date(hackathon.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{hackathon.duration}</TableCell>
                  <TableCell>{hackathon.featured ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(hackathon)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(hackathon.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingHackathon ? "Edit Hackathon" : "Add New Hackathon"}</DialogTitle>
            <DialogDescription>
              {editingHackathon
                ? "Edit the details of your hackathon below"
                : "Fill in the details to create a new hackathon"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Fee</Label>
                  <Input id="fee" name="fee" value={formData.fee} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Input
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured">Featured</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Mark as featured hackathon
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                <Input
                  id="techStack"
                  value={formData.techStack?.join(", ")}
                  onChange={(e) => handleArrayChange(e, "techStack")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites (comma separated)</Label>
                <Input
                  id="prerequisites"
                  value={formData.prerequisites?.join(", ")}
                  onChange={(e) => handleArrayChange(e, "prerequisites")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructors">Instructors (comma separated)</Label>
                <Input
                  id="instructors"
                  value={formData.instructors?.join(", ")}
                  onChange={(e) => handleArrayChange(e, "instructors")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modules">Modules (comma separated)</Label>
                <Input
                  id="modules"
                  value={formData.modules?.join(", ")}
                  onChange={(e) => handleArrayChange(e, "modules")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingHackathon ? "Save Changes" : "Add Hackathon"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

