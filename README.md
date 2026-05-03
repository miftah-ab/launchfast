![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-green?style=flat-square&logo=supabase)
![Stripe](https://img.shields.io/badge/Stripe-purple?style=flat-square&logo=stripe)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

# LaunchFast
### Ship your SaaS in days, not months.

> [!IMPORTANT]
> 🚀 **One-click demo** — No account needed. Click "Live Demo" on the homepage to explore instantly.
> Or use: `demo@launchfast.com` / `demo123456`
> Live Demo URL: [https://launchfast.vercel.app](https://launchfast.vercel.app)

![LaunchFast Dashboard](./public/screenshot.png)
*Note: Dashboard preview showcasing stats, activity feed, and responsive sidebar.*

## Features
- ✅ **Authentication** — signup, login, email verification, password reset
- ✅ **Supabase integration** — PostgreSQL database with Row Level Security
- ✅ **Stripe subscriptions** — checkout, webhooks, billing portal
- ✅ **Protected routes** — middleware-based auth protection
- ✅ **Dashboard** — stats, activity feed, upgrade prompts
- ✅ **User settings** — profile update, avatar upload, password change
- ✅ **Billing page** — subscription management, payment history
- ✅ **Dark mode** — system preference + manual toggle
- ✅ **Fully responsive** — mobile, tablet, desktop
- ✅ **One-click demo** — instant access without registration
- 🔜 Google OAuth
- 🔜 Team collaboration
- 🔜 Usage analytics

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Payments | Stripe |
| Deployment | Vercel |
| Storage | Supabase Storage |

## Project Structure
```
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── reset-password/page.tsx
│   ├── signup/page.tsx
│   └── verify-email/page.tsx
├── (dashboard)/
│   ├── dashboard/
│   │   ├── billing/page.tsx
│   │   ├── settings/page.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── (marketing)/
│   ├── pricing/page.tsx
│   └── page.tsx
├── api/
│   ├── stripe/
│   │   ├── checkout/route.ts
│   │   └── webhook/route.ts
│   └── ...
└── layout.tsx

components/
├── auth/
├── dashboard/
├── marketing/
└── ui/

lib/
├── supabase/
├── stripe.ts
└── utils.ts
```

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account (free)
- A Stripe account (free, test mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/launchfast.git
   cd launchfast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Copy environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

### Environment Variables

| Variable | Description | Where to find it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Supabase dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Supabase dashboard → Settings → API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Stripe dashboard → Developers → API keys |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Stripe dashboard → Webhooks |
| `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` | Stripe Pro plan price ID | Stripe dashboard → Products |
| `NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID` | Stripe Business plan price ID | Stripe dashboard → Products |
| `NEXT_PUBLIC_URL` | Your app URL | `http://localhost:3000` for local |

### Database Setup
1. Create a new Supabase project.
2. Go to the **SQL Editor** in your Supabase dashboard and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Create a storage bucket called **"avatars"** and set its access to **Public**.

### Stripe Setup
1. Create two products in the Stripe dashboard (Test Mode): **Pro** ($9/mo) and **Business** ($29/mo).
2. Copy the resulting **Price IDs** into your `.env.local`.
3. Set up a webhook endpoint (using Stripe CLI for local testing) pointing to `/api/stripe/webhook`.
4. Add these webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.

### Run Locally
```bash
# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Payments
> [!TIP]
> Use Stripe test card: `4242 4242 4242 4242` · Any future expiry · Any CVC

## Deployment

### Deploy to Vercel (recommended)
1. Push your code to GitHub.
2. Import the repository on [vercel.com](https://vercel.com).
3. Add all environment variables in the Vercel dashboard.
4. Deploy.

**For production:**
- Switch Stripe keys from test to live mode.
- Update `NEXT_PUBLIC_URL` to your real domain.
- Set up Stripe webhook for your production URL.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/launchfast)

## Branch Strategy

| Branch | Purpose | Environment |
|---|---|---|
| `main` | Production — live site | Stripe live keys |
| `dev` | Development — preview | Stripe test keys |

All development happens on the `dev` branch. Merge to `main` only when ready to go live.

## Roadmap
- [x] Email/password authentication
- [x] Stripe subscriptions
- [x] Protected dashboard
- [x] Dark mode
- [x] One-click demo
- [ ] Google OAuth
- [ ] Team workspaces
- [ ] Usage analytics dashboard
- [ ] API access for paid plans
- [ ] Email notifications

## License
MIT License — feel free to use this as a starting point for your own SaaS.
