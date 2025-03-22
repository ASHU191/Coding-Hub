"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type Hackathon = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  duration: string
  fee: string
  category: string
  techStack: string[]
  teamSize: string
  difficulty: string
  prerequisites: string[]
  instructors: string[]
  modules: string[]
  image: string
  featured?: boolean
}

export type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  registeredHackathons?: string[]
  avatar?: string
  joinDate: string
  lastActive: string
  teams?: string[] // IDs of teams the user belongs to
}

export type Team = {
  id: string
  name: string
  hackathonId: string
  leaderId: string // User ID of the team leader
  members: {
    userId: string
    name: string
    email: string
    role: string // "leader" or "member"
    avatar?: string
  }[]
  createdAt: string
}

export type ProjectSubmission = {
  id: string
  userId: string
  teamId?: string // Optional team ID if submitted as a team
  hackathonId: string
  projectName: string
  description: string
  repoUrl: string
  demoUrl?: string
  fileUrl?: string // URL to the uploaded file
  submissionDate: string
  startTime?: string // When the user started working on the project
  status: "pending" | "approved" | "rejected"
  feedback?: string
  tasks: {
    name: string
    completed: boolean
  }[]
}

type DataContextType = {
  hackathons: Hackathon[]
  users: User[]
  submissions: ProjectSubmission[]
  teams: Team[]
  addHackathon: (hackathon: Omit<Hackathon, "id">) => void
  updateHackathon: (id: string, hackathon: Partial<Hackathon>) => void
  deleteHackathon: (id: string) => void
  getHackathon: (id: string) => Hackathon | undefined
  getActiveUsers: () => User[]
  registerForHackathon: (userId: string, hackathonId: string) => void
  unregisterFromHackathon: (userId: string, hackathonId: string) => void
  getUserHackathons: (userId: string) => Hackathon[]
  addSubmission: (submission: Omit<ProjectSubmission, "id">) => string
  updateSubmission: (id: string, submission: Partial<ProjectSubmission>) => void
  deleteSubmission: (id: string) => void
  getUserSubmissions: (userId: string) => ProjectSubmission[]
  getHackathonSubmissions: (hackathonId: string) => ProjectSubmission[]
  updateSubmissionStatus: (id: string, status: "pending" | "approved" | "rejected", feedback?: string) => void
  updateSubmissionTask: (submissionId: string, taskIndex: number, completed: boolean) => void
  startHackathonTimer: (userId: string, hackathonId: string) => string
  createTeam: (team: Omit<Team, "id" | "createdAt">) => string
  updateTeam: (id: string, team: Partial<Team>) => void
  deleteTeam: (id: string) => void
  getUserTeams: (userId: string) => Team[]
  getHackathonTeams: (hackathonId: string) => Team[]
  addTeamMember: (teamId: string, userId: string, name: string, email: string, avatar?: string) => void
  removeTeamMember: (teamId: string, userId: string) => void
  getTeam: (id: string) => Team | undefined
  updateUserProfile: (userId: string, userData: Partial<User>) => void
}

// Sample data
const initialHackathons: Hackathon[] = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    description: "Solve real-world AI problems using Python, TensorFlow, and OpenCV",
    startDate: "2025-04-15",
    endDate: "2025-04-17",
    duration: "48 hours",
    fee: "Free",
    category: "AI",
    techStack: ["Python", "TensorFlow", "OpenCV"],
    teamSize: "1-4",
    difficulty: "Intermediate",
    prerequisites: ["Python", "ML knowledge"],
    instructors: ["Dr. Jane Smith", "Prof. Alan Turing"],
    modules: ["Problem statement", "Data preprocessing", "Model training", "Evaluation criteria"],
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "2",
    title: "MERN Stack Hackathon",
    description: "Build a full-stack MERN app with real-time features",
    startDate: "2025-04-20",
    endDate: "2025-04-23",
    duration: "72 hours",
    fee: "Free",
    category: "Web",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    teamSize: "2-5",
    difficulty: "Intermediate",
    prerequisites: ["JavaScript", "Basic React knowledge"],
    instructors: ["John Doe", "Jane Smith"],
    modules: [
      "Backend setup (Node.js + Express)",
      "Frontend development (React)",
      "Database integration (MongoDB)",
      "Authentication and Deployment",
    ],
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "3",
    title: "Full-Stack Challenge (Next.js + Firebase)",
    description: "Develop a scalable full-stack app using Next.js and Firebase",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    duration: "48 hours",
    fee: "Free",
    category: "Web",
    techStack: ["Next.js", "Firebase", "React", "TypeScript"],
    teamSize: "1-3",
    difficulty: "Intermediate",
    prerequisites: ["JavaScript", "React knowledge"],
    instructors: ["Sarah Johnson", "Mike Peters"],
    modules: [
      "Setup and deployment with Vercel",
      "Firebase authentication and database",
      "Real-time updates",
      "Performance optimization",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: ".NET MVC Enterprise Hackathon",
    description: "Build an enterprise-grade app using .NET MVC and SQL Server",
    startDate: "2025-05-10",
    endDate: "2025-05-13",
    duration: "72 hours",
    fee: "Free",
    category: "Enterprise",
    techStack: [".NET", "C#", "SQL Server", "MVC"],
    teamSize: "2-4",
    difficulty: "Advanced",
    prerequisites: ["C#", "Basic SQL knowledge"],
    instructors: ["Mark Wilson", "Emily Clark"],
    modules: ["MVC architecture", "Backend logic", "Database integration", "API development"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    title: "Blockchain Hackathon",
    description: "Create and deploy smart contracts on Ethereum using Solidity",
    startDate: "2025-06-01",
    endDate: "2025-06-04",
    duration: "72 hours",
    fee: "Free",
    category: "Blockchain",
    techStack: ["Solidity", "Ethereum", "Hardhat", "JavaScript"],
    teamSize: "1-3",
    difficulty: "Advanced",
    prerequisites: ["JavaScript", "Basic blockchain knowledge"],
    instructors: ["Alex Johnson", "Maria Garcia"],
    modules: ["Smart contract development", "Testing with Hardhat", "Frontend integration", "Blockchain security"],
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
]

const initialUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    registeredHackathons: ["1", "3"],
    avatar: "/placeholder.svg?height=32&width=32",
    joinDate: "2025-01-15",
    lastActive: "2025-03-20",
    teams: ["team-1"],
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    registeredHackathons: ["2", "5"],
    avatar: "/placeholder.svg?height=32&width=32",
    joinDate: "2025-02-10",
    lastActive: "2025-03-21",
    teams: ["team-1"],
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@hackathonhub.com",
    role: "admin",
    avatar: "/placeholder.svg?height=32&width=32",
    joinDate: "2025-01-01",
    lastActive: "2025-03-22",
  },
]

// Sample teams
const initialTeams: Team[] = [
  {
    id: "team-1",
    name: "Code Wizards",
    hackathonId: "1",
    leaderId: "user-1",
    members: [
      {
        userId: "user-1",
        name: "John Doe",
        email: "john@example.com",
        role: "leader",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        userId: "user-2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "member",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    createdAt: "2025-03-15",
  },
]

// Sample project submissions
const initialSubmissions: ProjectSubmission[] = [
  {
    id: "submission-1",
    userId: "user-1",
    teamId: "team-1",
    hackathonId: "1",
    projectName: "AI Voice Assistant",
    description: "A voice assistant that can understand natural language and perform tasks",
    repoUrl: "https://github.com/johndoe/ai-voice-assistant",
    demoUrl: "https://ai-voice-assistant.vercel.app",
    submissionDate: "2025-04-17",
    startTime: "2025-04-15T09:00:00Z",
    status: "pending",
    tasks: [
      { name: "Project Setup", completed: true },
      { name: "Core Functionality", completed: true },
      { name: "UI Implementation", completed: true },
      { name: "Testing", completed: false },
      { name: "Documentation", completed: false },
    ],
  },
  {
    id: "submission-2",
    userId: "user-2",
    hackathonId: "2",
    projectName: "Real-time Collaboration Platform",
    description: "A platform for teams to collaborate in real-time on projects",
    repoUrl: "https://github.com/janesmith/collab-platform",
    demoUrl: "https://collab-platform.vercel.app",
    submissionDate: "2025-04-23",
    startTime: "2025-04-20T10:30:00Z",
    status: "approved",
    feedback: "Excellent implementation of real-time features. Great UI/UX design.",
    tasks: [
      { name: "Project Setup", completed: true },
      { name: "Backend Development", completed: true },
      { name: "Frontend Development", completed: true },
      { name: "Real-time Features", completed: true },
      { name: "Testing", completed: true },
      { name: "Documentation", completed: true },
    ],
  },
  {
    id: "submission-3",
    userId: "user-1",
    hackathonId: "3",
    projectName: "Next.js E-commerce",
    description: "A full-stack e-commerce platform built with Next.js and Firebase",
    repoUrl: "https://github.com/johndoe/nextjs-ecommerce",
    demoUrl: "https://nextjs-ecommerce.vercel.app",
    submissionDate: "2025-05-03",
    startTime: "2025-05-01T08:15:00Z",
    status: "rejected",
    feedback: "The project is incomplete. Missing key features like checkout and user authentication.",
    tasks: [
      { name: "Project Setup", completed: true },
      { name: "Product Listing", completed: true },
      { name: "Shopping Cart", completed: true },
      { name: "User Authentication", completed: false },
      { name: "Checkout Process", completed: false },
      { name: "Testing", completed: false },
    ],
  },
]

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([])
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use our sample data
    const storedHackathons = localStorage.getItem("hackathon-hub-hackathons")
    const storedUsers = localStorage.getItem("hackathon-hub-users")
    const storedSubmissions = localStorage.getItem("hackathon-hub-submissions")
    const storedTeams = localStorage.getItem("hackathon-hub-teams")

    if (storedHackathons) {
      setHackathons(JSON.parse(storedHackathons))
    } else {
      setHackathons(initialHackathons)
      localStorage.setItem("hackathon-hub-hackathons", JSON.stringify(initialHackathons))
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    } else {
      setUsers(initialUsers)
      localStorage.setItem("hackathon-hub-users", JSON.stringify(initialUsers))
    }

    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions))
    } else {
      setSubmissions(initialSubmissions)
      localStorage.setItem("hackathon-hub-submissions", JSON.stringify(initialSubmissions))
    }

    if (storedTeams) {
      setTeams(JSON.parse(storedTeams))
    } else {
      setTeams(initialTeams)
      localStorage.setItem("hackathon-hub-teams", JSON.stringify(initialTeams))
    }
  }, [])

  const addHackathon = (hackathon: Omit<Hackathon, "id">) => {
    const newHackathon = {
      ...hackathon,
      id: Date.now().toString(),
    }
    const updatedHackathons = [...hackathons, newHackathon]
    setHackathons(updatedHackathons)
    localStorage.setItem("hackathon-hub-hackathons", JSON.stringify(updatedHackathons))
  }

  const updateHackathon = (id: string, hackathon: Partial<Hackathon>) => {
    const updatedHackathons = hackathons.map((h) => (h.id === id ? { ...h, ...hackathon } : h))
    setHackathons(updatedHackathons)
    localStorage.setItem("hackathon-hub-hackathons", JSON.stringify(updatedHackathons))
  }

  const deleteHackathon = (id: string) => {
    const updatedHackathons = hackathons.filter((h) => h.id !== id)
    setHackathons(updatedHackathons)
    localStorage.setItem("hackathon-hub-hackathons", JSON.stringify(updatedHackathons))
  }

  const getHackathon = (id: string) => {
    return hackathons.find((h) => h.id === id)
  }

  const getActiveUsers = () => {
    // In a real app, this would return users who are currently online
    // For demo purposes, we'll return a random subset of users
    return users.filter(() => Math.random() > 0.5)
  }

  const registerForHackathon = (userId: string, hackathonId: string) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const registeredHackathons = user.registeredHackathons || []
        if (!registeredHackathons.includes(hackathonId)) {
          return {
            ...user,
            registeredHackathons: [...registeredHackathons, hackathonId],
          }
        }
      }
      return user
    })
    setUsers(updatedUsers)
    localStorage.setItem("hackathon-hub-users", JSON.stringify(updatedUsers))
  }

  const unregisterFromHackathon = (userId: string, hackathonId: string) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId && user.registeredHackathons) {
        return {
          ...user,
          registeredHackathons: user.registeredHackathons.filter((id) => id !== hackathonId),
        }
      }
      return user
    })
    setUsers(updatedUsers)
    localStorage.setItem("hackathon-hub-users", JSON.stringify(updatedUsers))
  }

  const getUserHackathons = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user || !user.registeredHackathons) return []
    return hackathons.filter((h) => user.registeredHackathons?.includes(h.id))
  }

  const addSubmission = (submission: Omit<ProjectSubmission, "id">) => {
    const submissionId = `submission-${Date.now()}`
    const newSubmission = {
      ...submission,
      id: submissionId,
    }
    const updatedSubmissions = [...submissions, newSubmission]
    setSubmissions(updatedSubmissions)
    localStorage.setItem("hackathon-hub-submissions", JSON.stringify(updatedSubmissions))
    return submissionId
  }

  const updateSubmission = (id: string, submission: Partial<ProjectSubmission>) => {
    const updatedSubmissions = submissions.map((s) => (s.id === id ? { ...s, ...submission } : s))
    setSubmissions(updatedSubmissions)
    localStorage.setItem("hackathon-hub-submissions", JSON.stringify(updatedSubmissions))
  }

  const deleteSubmission = (id: string) => {
    const updatedSubmissions = submissions.filter((s) => s.id !== id)
    setSubmissions(updatedSubmissions)
    localStorage.setItem("hackathon-hub-submissions", JSON.stringify(updatedSubmissions))
  }

  const getUserSubmissions = (userId: string) => {
    return submissions.filter(
      (s) => s.userId === userId || (s.teamId && getUserTeams(userId).some((t) => t.id === s.teamId)),
    )
  }

  const getHackathonSubmissions = (hackathonId: string) => {
    return submissions.filter((s) => s.hackathonId === hackathonId)
  }

  const updateSubmissionStatus = (id: string, status: "pending" | "approved" | "rejected", feedback?: string) => {
    const updatedSubmissions = submissions.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          status,
          feedback: feedback || s.feedback,
        }
      }
      return s
    })
    setSubmissions(updatedSubmissions)
    localStorage.setItem("hackathon-hub-submissions", JSON.stringify(updatedSubmissions))
  }

  const updateSubmissionTask = (submissionId: string, taskIndex: number, completed: boolean) => {
    const updatedSubmissions = submissions.map((s) => {
      if (s.id === submissionId && s.tasks[taskIndex]) {
        const updatedTasks = [...s.tasks]
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed }
        return {
          ...s,
          tasks: updatedTasks,
        }
      }
      return s
    })
    setSubmissions(updatedSubmissions)
    localStorage.setItem("hackathon-hub-submissions", JSON.stringify(updatedSubmissions))
  }

  const startHackathonTimer = (userId: string, hackathonId: string) => {
    // Check if there's already a submission for this user and hackathon
    const existingSubmission = submissions.find((s) => s.userId === userId && s.hackathonId === hackathonId)

    if (existingSubmission) {
      return existingSubmission.id
    }

    // Create a new submission with a start time
    const submissionId = `submission-${Date.now()}`
    const newSubmission = {
      id: submissionId,
      userId,
      hackathonId,
      projectName: "Untitled Project",
      description: "No description yet",
      repoUrl: "",
      startTime: new Date().toISOString(),
      submissionDate: new Date().toISOString().split("T")[0],
      status: "pending" as const,
      tasks: [
        { name: "Project Setup", completed: false },
        { name: "Core Functionality", completed: false },
        { name: "UI Implementation", completed: false },
        { name: "Testing", completed: false },
        { name: "Documentation", completed: false },
      ],
    }

    const updatedSubmissions = [...submissions, newSubmission]
    setSubmissions(updatedSubmissions)
    localStorage.setItem("hackathon-hub-submissions", JSON.stringify(updatedSubmissions))
    return submissionId
  }

  const createTeam = (team: Omit<Team, "id" | "createdAt">) => {
    const teamId = `team-${Date.now()}`
    const newTeam = {
      ...team,
      id: teamId,
      createdAt: new Date().toISOString(),
    }

    const updatedTeams = [...teams, newTeam]
    setTeams(updatedTeams)
    localStorage.setItem("hackathon-hub-teams", JSON.stringify(updatedTeams))

    // Update users' teams array
    const updatedUsers = users.map((user) => {
      if (team.members.some((member) => member.userId === user.id)) {
        return {
          ...user,
          teams: [...(user.teams || []), teamId],
        }
      }
      return user
    })

    setUsers(updatedUsers)
    localStorage.setItem("hackathon-hub-users", JSON.stringify(updatedUsers))

    return teamId
  }

  const updateTeam = (id: string, team: Partial<Team>) => {
    const updatedTeams = teams.map((t) => (t.id === id ? { ...t, ...team } : t))
    setTeams(updatedTeams)
    localStorage.setItem("hackathon-hub-teams", JSON.stringify(updatedTeams))
  }

  const deleteTeam = (id: string) => {
    const teamToDelete = teams.find((t) => t.id === id)
    if (!teamToDelete) return

    // Remove team from users' teams array
    const memberUserIds = teamToDelete.members.map((m) => m.userId)
    const updatedUsers = users.map((user) => {
      if (memberUserIds.includes(user.id) && user.teams) {
        return {
          ...user,
          teams: user.teams.filter((teamId) => teamId !== id),
        }
      }
      return user
    })

    setUsers(updatedUsers)
    localStorage.setItem("hackathon-hub-users", JSON.stringify(updatedUsers))

    // Delete the team
    const updatedTeams = teams.filter((t) => t.id !== id)
    setTeams(updatedTeams)
    localStorage.setItem("hackathon-hub-teams", JSON.stringify(updatedTeams))
  }

  const getUserTeams = (userId: string) => {
    return teams.filter((t) => t.members.some((member) => member.userId === userId))
  }

  const getHackathonTeams = (hackathonId: string) => {
    return teams.filter((t) => t.hackathonId === hackathonId)
  }

  const addTeamMember = (teamId: string, userId: string, name: string, email: string, avatar?: string) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        // Check if user is already a member
        if (team.members.some((member) => member.userId === userId)) {
          return team
        }

        return {
          ...team,
          members: [
            ...team.members,
            {
              userId,
              name,
              email,
              role: "member",
              avatar,
            },
          ],
        }
      }
      return team
    })

    setTeams(updatedTeams)
    localStorage.setItem("hackathon-hub-teams", JSON.stringify(updatedTeams))

    // Update user's teams array
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          teams: [...(user.teams || []), teamId],
        }
      }
      return user
    })

    setUsers(updatedUsers)
    localStorage.setItem("hackathon-hub-users", JSON.stringify(updatedUsers))
  }

  const removeTeamMember = (teamId: string, userId: string) => {
    const team = teams.find((t) => t.id === teamId)
    if (!team) return

    // Cannot remove the team leader
    if (team.leaderId === userId) return

    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter((member) => member.userId !== userId),
        }
      }
      return team
    })

    setTeams(updatedTeams)
    localStorage.setItem("hackathon-hub-teams", JSON.stringify(updatedTeams))

    // Update user's teams array
    const updatedUsers = users.map((user) => {
      if (user.id === userId && user.teams) {
        return {
          ...user,
          teams: user.teams.filter((t) => t !== teamId),
        }
      }
      return user
    })

    setUsers(updatedUsers)
    localStorage.setItem("hackathon-hub-users", JSON.stringify(updatedUsers))
  }

  const getTeam = (id: string) => {
    return teams.find((t) => t.id === id)
  }

  const updateUserProfile = (userId: string, userData: Partial<User>) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, ...userData }
      }
      return user
    })

    setUsers(updatedUsers)
    localStorage.setItem("hackathon-hub-users", JSON.stringify(updatedUsers))
  }

  return (
    <DataContext.Provider
      value={{
        hackathons,
        users,
        submissions,
        teams,
        addHackathon,
        updateHackathon,
        deleteHackathon,
        getHackathon,
        getActiveUsers,
        registerForHackathon,
        unregisterFromHackathon,
        getUserHackathons,
        addSubmission,
        updateSubmission,
        deleteSubmission,
        getUserSubmissions,
        getHackathonSubmissions,
        updateSubmissionStatus,
        updateSubmissionTask,
        startHackathonTimer,
        createTeam,
        updateTeam,
        deleteTeam,
        getUserTeams,
        getHackathonTeams,
        addTeamMember,
        removeTeamMember,
        getTeam,
        updateUserProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

