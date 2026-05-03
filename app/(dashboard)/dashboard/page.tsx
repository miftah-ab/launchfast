import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/dashboard/Header"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, ShieldCheck, ArrowUpRight, Activity } from "lucide-react"

const fakeActivity = [
  { id: 1, event: "Logged in from Chrome on macOS", time: "2 minutes ago" },
  { id: 2, event: "Profile settings updated", time: "1 hour ago" },
  { id: 3, event: "Password changed successfully", time: "2 days ago" },
  { id: 4, event: "Account created and verified", time: "5 days ago" },
  { id: 5, event: "Subscribed to the Free plan", time: "5 days ago" },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const fullName = profile?.full_name || user.user_metadata?.full_name || "there"
  const plan = profile?.plan || "free"
  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
  const isVerified = !!user.email_confirmed_at

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Dashboard" userName={fullName} />
      <main className="flex-1 p-6 space-y-6">
        {/* Upgrade banner */}
        {plan === "free" && (
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-white">
              <p className="font-semibold">Unlock unlimited projects</p>
              <p className="text-blue-100 text-sm mt-0.5">
                Upgrade to Pro for $9/month and get unlimited projects, 10 team members, and priority support.
              </p>
            </div>
            <Link href="/pricing" className="shrink-0">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-1 whitespace-nowrap">
                Upgrade now <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            title="Current Plan"
            value={plan.charAt(0).toUpperCase() + plan.slice(1)}
            icon={CreditCard}
            description={plan === "free" ? "Upgrade anytime" : "Billed monthly"}
            variant="blue"
          />
          <StatsCard
            title="Member Since"
            value={memberSince}
            icon={Calendar}
            description="Thanks for being here"
            variant="purple"
          />
          <StatsCard
            title="Account Status"
            value={isVerified ? "Active" : "Unverified"}
            icon={ShieldCheck}
            description={isVerified ? "Email verified" : "Check your inbox"}
            variant={isVerified ? "green" : "default"}
          />
        </div>

        {/* Recent activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Recent Activity
            </CardTitle>
            <Badge variant="outline" className="text-xs">Last 7 days</Badge>
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-border">
            {fakeActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <p className="text-sm text-foreground">{item.event}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-4">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
