"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Zap } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse rounded-full" />
            <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 rotate-12 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <Image src="/logo.png" alt="LaunchFast Logo" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-8xl font-black text-foreground mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Houston, we have a problem.
        </h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          The page you&apos;re looking for has either been moved to another galaxy or never existed in the first place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg" className="gap-2 font-semibold">
            <Link href="/">
              <Home className="w-4 h-4" /> Go back home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 font-semibold">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" /> Go back
            </button>
          </Button>
        </div>

        {/* Footer Link */}
        <p className="mt-12 text-sm text-muted-foreground">
          Think this is a mistake? <Link href="/support" className="text-blue-600 hover:underline">Contact support</Link>
        </p>
      </div>
    </div>
  )
}
