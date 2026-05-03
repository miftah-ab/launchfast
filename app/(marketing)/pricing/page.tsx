import { Navbar } from "@/components/marketing/Navbar"
import { PricingCard } from "@/components/marketing/PricingCard"
import { Footer } from "@/components/marketing/Footer"

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

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel with one click from your billing page. No questions asked.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all paid plans.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe. Apple Pay and Google Pay available where supported.",
  },
  {
    q: "Can I upgrade or downgrade?",
    a: "Yes, changes take effect immediately and billing is prorated automatically.",
  },
]

export const metadata = {
  title: "Pricing — LaunchFast",
  description: "Simple, transparent pricing. Start free, upgrade when ready.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Demo banner */}
          <div className="mb-8 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              🧪 <strong>Demo mode</strong> — Use card{" "}
              <code className="font-mono bg-blue-100 dark:bg-blue-900 rounded px-1.5 py-0.5">4242 4242 4242 4242</code>
              {" "}· Any future expiry · Any CVC to test checkout
            </p>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Start free. No credit card required. Upgrade when you need more.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-24">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
