"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  ctaHref?: string
  priceId?: string
  highlighted?: boolean
  badge?: string
}

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  ctaHref,
  priceId,
  highlighted,
  badge,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    if (!priceId) {
      toast({
        title: "Configuration Required",
        description: "Please add your Stripe Price IDs to the .env file to enable checkout.",
        variant: "destructive",
      })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({ title: "Error", description: err.message, variant: "destructive" })
      } else {
        toast({ title: "Error", description: "An unknown error occurred", variant: "destructive" })
      }
      setLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:-translate-y-1",
        highlighted
          ? "border-blue-500 bg-blue-600 text-white shadow-2xl shadow-blue-600/30 scale-105"
          : "border-border bg-card hover:shadow-lg"
      )}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={cn("text-lg font-bold mb-1", highlighted ? "text-white" : "text-foreground")}>{name}</h3>
        <p className={cn("text-sm mb-4", highlighted ? "text-blue-100" : "text-muted-foreground")}>{description}</p>
        <div className="flex items-end gap-1">
          <span className={cn("text-4xl font-bold", highlighted ? "text-white" : "text-foreground")}>{price}</span>
          {price !== "$0" && (
            <span className={cn("text-sm mb-1", highlighted ? "text-blue-200" : "text-muted-foreground")}>/month</span>
          )}
        </div>
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className={cn("w-4 h-4 mt-0.5 shrink-0", highlighted ? "text-blue-200" : "text-green-500")} />
            <span className={highlighted ? "text-blue-50" : "text-muted-foreground"}>{feature}</span>
          </li>
        ))}
      </ul>

      {ctaHref ? (
        <Link href={ctaHref}>
          <Button
            className={cn(
              "w-full",
              highlighted
                ? "bg-white text-blue-600 hover:bg-blue-50 font-bold"
                : ""
            )}
            variant={highlighted ? "outline" : "default"}
          >
            {cta}
          </Button>
        </Link>
      ) : (
        <Button
          className={cn(
            "w-full",
            highlighted ? "bg-white text-blue-600 hover:bg-blue-50 font-bold" : ""
          )}
          variant={highlighted ? "outline" : "default"}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</> : cta}
        </Button>
      )}
    </div>
  )
}
