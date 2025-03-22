"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth"
import { auth } from "./firebase"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
  registeredHackathons?: string[]
  joinDate: string
  lastActive: string
  teams?: string[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to convert Firebase user to our User type
const formatUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || "User",
    email: firebaseUser.email || "",
    role: firebaseUser.email === "admin@gmail.com" ? "admin" : "user",
    avatar: firebaseUser.photoURL || "/placeholder.svg?height=32&width=32",
    registeredHackathons: [],
    joinDate: new Date().toISOString().split("T")[0],
    lastActive: new Date().toISOString(),
    teams: [],
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const formattedUser = formatUser(firebaseUser)
        setUser(formattedUser)

        // Store additional user data in localStorage
        try {
          const storedUsers = JSON.parse(localStorage.getItem("hackathon-hub-users") || "[]")
          const existingUserIndex = storedUsers.findIndex((u: any) => u.id === formattedUser.id)

          if (existingUserIndex >= 0) {
            storedUsers[existingUserIndex] = {
              ...storedUsers[existingUserIndex],
              lastActive: new Date().toISOString(),
            }
          } else {
            storedUsers.push(formattedUser)
          }

          localStorage.setItem("hackathon-hub-users", JSON.stringify(storedUsers))
        } catch (error) {
          console.error("Error updating user data:", error)
        }
      } else {
        // User is signed out
        setUser(null)
      }
      setIsLoading(false)
    })

    // Clean up subscription
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const formattedUser = formatUser(userCredential.user)

      // Update last active timestamp
      formattedUser.lastActive = new Date().toISOString()

      // Update users list in localStorage
      try {
        const users = JSON.parse(localStorage.getItem("hackathon-hub-users") || "[]")
        const existingUserIndex = users.findIndex((u: any) => u.id === formattedUser.id)

        if (existingUserIndex >= 0) {
          users[existingUserIndex] = { ...users[existingUserIndex], lastActive: formattedUser.lastActive }
        } else {
          users.push(formattedUser)
        }

        localStorage.setItem("hackathon-hub-users", JSON.stringify(users))
      } catch (error) {
        console.error("Error updating user data:", error)
      }
    } catch (error: any) {
      console.error("Login error:", error)

      // Handle Firebase specific errors
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        throw new Error("Invalid email or password")
      } else if (error.code === "auth/too-many-requests") {
        throw new Error("Too many failed login attempts. Please try again later")
      } else {
        throw new Error(error.message || "Invalid credentials")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const adminLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Check if it's the admin email
      if (email !== "admin@gmail.com") {
        throw new Error("Invalid admin credentials")
      }

      // For demo purposes, we'll create a mock admin user
      // In a real app, you would verify against a secure admin database
      if (email === "admin@gmail.com" && password === "123456") {
        // Create a mock admin user
        const adminUser: User = {
          id: "admin-1",
          name: "Admin User",
          email: "admin@gmail.com",
          role: "admin",
          avatar: "/placeholder.svg?height=32&width=32",
          joinDate: new Date().toISOString().split("T")[0],
          lastActive: new Date().toISOString(),
          teams: [],
          registeredHackathons: [],
        }

        // Set the user in state
        setUser(adminUser)

        // Store in localStorage for persistence
        localStorage.setItem("hackathon-hub-user", JSON.stringify(adminUser))

        // Update users list in localStorage
        try {
          const users = JSON.parse(localStorage.getItem("hackathon-hub-users") || "[]")
          const existingUserIndex = users.findIndex((u: any) => u.id === adminUser.id)

          if (existingUserIndex >= 0) {
            users[existingUserIndex] = {
              ...users[existingUserIndex],
              lastActive: adminUser.lastActive,
              role: "admin",
            }
          } else {
            users.push(adminUser)
          }

          localStorage.setItem("hackathon-hub-users", JSON.stringify(users))
        } catch (error) {
          console.error("Error updating user data:", error)
        }

        return
      }

      throw new Error("Invalid admin credentials")
    } catch (error: any) {
      console.error("Admin login error:", error)
      throw new Error("Invalid admin credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // Remove from localStorage first
      localStorage.removeItem("hackathon-hub-user")

      // Then sign out from Firebase
      await signOut(auth)

      // Ensure user state is cleared
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      })

      // Format user data
      const formattedUser = formatUser(userCredential.user)
      formattedUser.name = name

      // Add the new user to the users list in localStorage
      try {
        const users = JSON.parse(localStorage.getItem("hackathon-hub-users") || "[]")
        users.push(formattedUser)
        localStorage.setItem("hackathon-hub-users", JSON.stringify(users))
      } catch (error) {
        console.error("Error updating user data:", error)
      }
    } catch (error: any) {
      console.error("Registration error:", error)

      // Handle Firebase specific errors
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Email is already in use")
      } else if (error.code === "auth/weak-password") {
        throw new Error("Password should be at least 6 characters")
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address")
      } else {
        throw new Error(error.message || "Registration failed")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return

    try {
      // Update Firebase profile if name is provided
      if (userData.name && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userData.name,
        })
      }

      // Update local user state
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)

      // Update user in localStorage
      try {
        localStorage.setItem("hackathon-hub-user", JSON.stringify(updatedUser))

        const users = JSON.parse(localStorage.getItem("hackathon-hub-users") || "[]")
        const userIndex = users.findIndex((u: any) => u.id === user.id)

        if (userIndex >= 0) {
          users[userIndex] = { ...users[userIndex], ...userData }
          localStorage.setItem("hackathon-hub-users", JSON.stringify(users))
        }
      } catch (error) {
        console.error("Error updating user data:", error)
      }
    } catch (error) {
      console.error("Error updating user:", error)
      throw new Error("Failed to update user")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, adminLogin, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

