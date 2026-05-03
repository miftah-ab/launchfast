/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { createServerClient } from "@supabase/ssr"
import Stripe from "stripe"

const getPlanFromPriceId = (priceId: string): string => {
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) return "pro"
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID) return "business"
  return "free"
}

function createAdminSupabase() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Webhook signature error:", err.message)
    } else {
      console.error("Webhook signature error:", err)
    }
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = createAdminSupabase()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        if (!userId) break

        const subscription = (await stripe.subscriptions.retrieve(session.subscription as string)) as any
        const priceId = subscription.items.data[0].price.id
        const plan = getPlanFromPriceId(priceId)

        await supabase.from("profiles").update({
          plan,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          subscription_status: "active",
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }).eq("id", userId)
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as any
        const userId = subscription.metadata?.userId
        if (!userId) break

        const priceId = subscription.items.data[0]?.price.id
        const plan = getPlanFromPriceId(priceId)

        await supabase.from("profiles").update({
          plan,
          subscription_status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }).eq("id", userId)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any
        const userId = subscription.metadata?.userId
        if (!userId) break

        await supabase.from("profiles").update({
          plan: "free",
          subscription_status: "canceled",
          stripe_subscription_id: null,
          current_period_end: null,
        }).eq("id", userId)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: unknown) {
    console.error("Webhook handler error:", err)
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 })
  }
}
