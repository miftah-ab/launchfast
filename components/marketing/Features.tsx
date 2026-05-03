import { ShieldCheck, CreditCard, Lock, User, Palette, Rocket } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Authentication",
    description: "Sign up, login, password reset, email verification. All handled with Supabase Auth — rock solid and secure.",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: CreditCard,
    title: "Billing & Subscriptions",
    description: "Stripe integration with plans, upgrades, and invoices. Webhooks sync subscription state to your database automatically.",
    color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  },
  {
    icon: Lock,
    title: "Protected Dashboard",
    description: "Role-based access with secure, server-side route protection via Next.js middleware. No client-side tricks.",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
  {
    icon: User,
    title: "User Settings",
    description: "Let users update their profile, upload an avatar to Supabase Storage, and change their password — all with live validation.",
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description: "Built with shadcn/ui and Tailwind. Dark mode out of the box. Looks professional on every screen size.",
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
  },
  {
    icon: Rocket,
    title: "Deploy Instantly",
    description: "One-click deploy to Vercel. Environment variables documented. Production ready from day one.",
    color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Everything you need to launch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop reinventing the wheel. LaunchFast ships with all the hard parts done.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
