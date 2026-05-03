import Link from "next/link"
import { Navbar } from "@/components/marketing/Navbar"
import { Hero } from "@/components/marketing/Hero"
import { Features } from "@/components/marketing/Features"
import { Testimonials } from "@/components/marketing/Testimonials"
import { PricingCard } from "@/components/marketing/PricingCard"
import { Footer } from "@/components/marketing/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for side projects and early validation.",
    features: [
      "Up to 3 projects",
      "1 team member",
      "Basic analytics",
      "Community support",
    ],
    cta: "Get started free",
    ctaHref: "/signup",
  },
  {
    name: "Pro",
    price: "$9",
    description: "For builders shipping real products.",
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "Advanced analytics",
      "Priority email support",
      "Custom domain",
    ],
    cta: "Start Pro",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Business",
    price: "$29",
    description: "For teams that need it all.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "White-label option",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Start Business",
    priceId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />

      {/* Pricing preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free. Upgrade when you&apos;re ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-10">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/pricing">
              <Button variant="outline" className="gap-2">
                See full pricing <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to launch?</h2>
          <p className="text-blue-100 text-xl mb-8">
            Join hundreds of developers shipping faster with LaunchFast.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold gap-2">
              Get started free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
