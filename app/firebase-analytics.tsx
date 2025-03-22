"use client"

import { useEffect } from "react"
import { initializeAnalytics } from "@/lib/firebase"

export function FirebaseAnalytics() {
  useEffect(() => {
    // Initialize Firebase Analytics
    initializeAnalytics()
  }, [])

  return null
}

