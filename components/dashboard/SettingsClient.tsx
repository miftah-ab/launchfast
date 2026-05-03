"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Upload, Trash2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Header } from "@/components/dashboard/Header"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface SettingsClientProps {
  user: {
    id: string
    email?: string
    full_name?: string
    avatar_url?: string
    plan?: string
  }
}

export function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || "")
  const [fullName, setFullName] = useState(user.full_name || "")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" })
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const initials = (user.full_name || user.email || "U")
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)

  const isDemoUser = user.email === "demo@launchfast.com"

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDemoUser) return
    const file = e.target.files?.[0]
    if (!file) return
    const supabase = createClient()
    const ext = file.name.split(".").pop()
    const path = `${user.id}/avatar.${ext}`
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true })
    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" })
      return
    }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path)
    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id)
    setAvatarUrl(publicUrl)
    toast({ title: "Avatar updated!", variant: "default" } as React.ComponentPropsWithoutRef<typeof import("@/components/ui/toast").Toast>)
  }

  const handleProfileSave = async () => {
    if (isDemoUser) {
      toast({ title: "Demo Mode", description: "Sign up for a real account to save changes", variant: "destructive" })
      return
    }
    setProfileLoading(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq("id", user.id)
    setProfileLoading(false)
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Profile saved!", description: "Your changes have been saved.", variant: "default" } as React.ComponentPropsWithoutRef<typeof import("@/components/ui/toast").Toast>)
      router.refresh()
    }
  }

  const handlePasswordUpdate = async () => {
    if (isDemoUser) {
      toast({ title: "Demo Mode", description: "Password change is disabled for the demo account.", variant: "destructive" })
      return
    }
    setPasswordError(null)
    if (passwords.newPass.length < 8) {
      setPasswordError("Password must be at least 8 characters.")
      return
    }
    if (passwords.newPass !== passwords.confirm) {
      setPasswordError("Passwords do not match.")
      return
    }
    setPasswordLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: passwords.newPass })
    setPasswordLoading(false)
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Password updated!", description: "Your password has been changed.", variant: "default" } as React.ComponentPropsWithoutRef<typeof import("@/components/ui/toast").Toast>)
      setPasswords({ current: "", newPass: "", confirm: "" })
    }
  }

  const handleDeleteAccount = async () => {
    if (isDemoUser) return
    setDeleteLoading(true)
    const supabase = createClient()
    const res = await fetch("/api/user/delete", { method: "DELETE" })
    if (res.ok) {
      await supabase.auth.signOut()
      router.push("/")
    } else {
      setDeleteLoading(false)
      toast({ title: "Error", description: "Failed to delete account.", variant: "destructive" })
    }
    setDeleteOpen(false)
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Settings" userName={user.full_name} />
      <main className="flex-1 p-6 space-y-6 max-w-2xl">

        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="gap-2"
                  disabled={isDemoUser}
                >
                  <Upload className="w-3.5 h-3.5" /> Upload photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG or GIF. Max 2MB.</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                disabled={isDemoUser}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" value={user.email || ""} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">Contact support to change your email address.</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleProfileSave} 
                disabled={profileLoading || isDemoUser} 
                className="gap-2 w-fit"
                title={isDemoUser ? "Sign up for a real account to save changes" : ""}
              >
                {profileLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : "Save changes"}
              </Button>
              {isDemoUser && (
                <p className="text-xs text-amber-600 font-medium">
                  Sign up for a real account to save changes
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Password */}
        <Card className={isDemoUser ? "opacity-60" : ""}>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "current", label: "Current password", show: showCurrent, toggle: () => setShowCurrent(!showCurrent), value: passwords.current, key: "current" },
              { id: "newPass", label: "New password", show: showNew, toggle: () => setShowNew(!showNew), value: passwords.newPass, key: "newPass" },
              { id: "confirm", label: "Confirm new password", show: showConfirm, toggle: () => setShowConfirm(!showConfirm), value: passwords.confirm, key: "confirm" },
            ].map(({ id, label, show, toggle, value, key }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <div className="relative">
                  <Input
                    id={id}
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    value={value}
                    onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                    className="pr-10"
                    disabled={isDemoUser}
                  />
                  {!isDemoUser && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                      onClick={toggle}
                    >
                      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {passwordError && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {passwordError}
              </div>
            )}

            <Button onClick={handlePasswordUpdate} disabled={passwordLoading || isDemoUser} className="gap-2">
              {passwordLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</> : "Update password"}
            </Button>
            {isDemoUser && (
              <p className="text-xs text-amber-600 font-medium mt-2">
                Password change is disabled for demo user
              </p>
            )}
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Permanently delete your account and all data</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="gap-2" disabled={isDemoUser}>
                  <Trash2 className="w-4 h-4" /> Delete account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete account?</DialogTitle>
                  <DialogDescription>
                    This will permanently delete your account and all associated data. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleteLoading}>
                    {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes, delete my account"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {isDemoUser && (
              <p className="text-xs text-amber-600 font-medium mt-4">
                Account deletion is disabled for demo user
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
