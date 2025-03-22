"use client"

import type React from "react"

import { useState } from "react"
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

// Sample resource data
type Resource = {
  id: string
  title: string
  description: string
  category: string
  url: string
  createdAt: string
}

const initialResources: Resource[] = [
  {
    id: "1",
    title: "Getting Started with Hackathons",
    description: "A comprehensive guide for beginners on how to prepare for hackathons",
    category: "Guide",
    url: "/resources/getting-started",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "10 Tips for Winning Hackathons",
    description: "Expert advice on how to stand out and win at hackathons",
    category: "Tips",
    url: "/resources/winning-tips",
    createdAt: "2025-02-10",
  },
  {
    id: "3",
    title: "Building an Effective Demo",
    description: "Learn how to create compelling demos for your hackathon projects",
    category: "Guide",
    url: "/resources/effective-demos",
    createdAt: "2025-03-05",
  },
]

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [open, setOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [formData, setFormData] = useState<Partial<Resource>>({
    title: "",
    description: "",
    category: "",
    url: "",
  })

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      url: resource.url,
    })
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter((r) => r.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingResource) {
      setResources(resources.map((r) => (r.id === editingResource.id ? { ...r, ...formData } : r)))
    } else {
      const newResource: Resource = {
        id: Date.now().toString(),
        title: formData.title || "",
        description: formData.description || "",
        category: formData.category || "",
        url: formData.url || "",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setResources([...resources, newResource])
    }

    setOpen(false)
    setEditingResource(null)
    setFormData({
      title: "",
      description: "",
      category: "",
      url: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddNew = () => {
    setEditingResource(null)
    setFormData({
      title: "",
      description: "",
      category: "",
      url: "",
    })
    setOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Manage your resources and blog posts</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Resource
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
          <CardDescription>A list of all resources and blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>{new Date(resource.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{resource.url}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(resource)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(resource.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
            <DialogDescription>
              {editingResource
                ? "Edit the details of your resource below"
                : "Fill in the details to create a new resource"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
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
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" name="url" value={formData.url} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingResource ? "Save Changes" : "Add Resource"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

