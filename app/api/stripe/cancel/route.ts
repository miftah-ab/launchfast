import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_subscription_id")
      .eq("id", user.id)
      .single()

    if (!profile?.stripe_subscription_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 400 })
    }

    await stripe.subscriptions.cancel(profile.stripe_subscription_id)
    await supabase.from("profiles").update({
      plan: "free",
      subscription_status: "canceled",
      stripe_subscription_id: null,
      current_period_end: null,
    }).eq("id", user.id)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 })
  }
}
