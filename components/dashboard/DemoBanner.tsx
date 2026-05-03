"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDemoUser, setIsDemoUser] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email === "demo@launchfast.com") {
        setIsDemoUser(true)
        const dismissed = localStorage.getItem("demo-banner-dismissed")
        if (!dismissed) {
          setIsVisible(true)
        }
      }
    }
    checkUser()
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("demo-banner-dismissed", "true")
  }

  if (!isVisible || !isDemoUser) return null

  return (
    <div className="bg-amber-100 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800/50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          👋 You are viewing a demo account. Data is reset every 24 hours.{" "}
          <Link href="/signup" className="font-semibold underline hover:text-amber-900 dark:hover:text-amber-100 transition-colors">
            Sign up free
          </Link>{" "}
          to create your own account.
        </p>
        <button
          onClick={handleDismiss}
          className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
