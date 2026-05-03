"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { handleDemoLogin } from "@/lib/demo-auth"
import { useToast } from "@/hooks/use-toast"

export function Hero() {
  const router = useRouter()
  const { toast } = useToast()
  const [demoLoading, setDemoLoading] = useState(false)

  const onDemoLogin = async () => {
    setDemoLoading(true)
    const { error } = await handleDemoLogin()
    if (error) {
      toast({
        title: "Demo login failed",
        description: "Please try again.",
        variant: "destructive",
      })
      setDemoLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          v1.0 — Production Ready
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
          Ship your SaaS in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            days, not months
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          LaunchFast gives you auth, billing, and a dashboard out of the box.
          Focus on your product, not the plumbing.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-shadow min-w-[180px]"
              onClick={onDemoLogin}
              disabled={demoLoading}
            >
              {demoLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>🚀 Live Demo <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="gap-2 min-w-[180px]">
                View pricing
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-700">
            No account needed · Pre-loaded with demo data · Explore freely
          </p>
        </div>


        {/* Dashboard mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
            {/* Mockup top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background rounded px-6 py-1 text-xs text-muted-foreground border border-border w-48 text-center">
                  app.launchfast.io/dashboard
                </div>
              </div>
            </div>

            {/* Mockup body */}
            <div className="flex h-80 sm:h-96">
              {/* Sidebar mock */}
              <div className="hidden sm:flex flex-col w-52 border-r border-border bg-card p-4 gap-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded" />
                  <div className="h-3 w-20 bg-muted rounded" />
                </div>
                {["Dashboard", "Settings", "Billing"].map((item, i) => (
                  <div key={item} className={`flex items-center gap-2 px-2 py-2 rounded-lg ${i === 0 ? "bg-blue-600" : "hover:bg-muted"}`}>
                    <div className={`w-4 h-4 rounded ${i === 0 ? "bg-blue-400" : "bg-muted-foreground/30"}`} />
                    <div className={`h-2.5 rounded ${i === 0 ? "bg-blue-300 w-16" : "bg-muted w-14"}`} />
                  </div>
                ))}
                <div className="mt-auto flex items-center gap-2 px-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600" />
                  <div className="space-y-1">
                    <div className="h-2 w-16 bg-muted rounded" />
                    <div className="h-1.5 w-10 bg-muted/60 rounded" />
                  </div>
                </div>
              </div>

              {/* Main mock */}
              <div className="flex-1 p-5 space-y-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-foreground/20 rounded" />
                    <div className="h-2.5 w-48 bg-muted-foreground/20 rounded" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted" />
                </div>

                {/* Upgrade banner mock */}
                <div className="h-14 rounded-xl bg-gradient-to-r from-blue-600/80 to-indigo-600/80" />

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {["Pro Plan", "June 2025", "Active"].map((label) => (
                    <div key={label} className="bg-card border border-border rounded-xl p-3 space-y-2">
                      <div className="h-2 w-16 bg-muted rounded" />
                      <div className="h-4 w-12 bg-foreground/20 rounded font-bold" />
                    </div>
                  ))}
                </div>

                {/* Activity mock */}
                <div className="bg-card border border-border rounded-xl p-3 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <div className="h-2 flex-1 bg-muted rounded" />
                      <div className="h-2 w-16 bg-muted/60 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-2xl -z-10" />
        </div>
      </div>
    </section>
  )
}
