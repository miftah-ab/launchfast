import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  description?: string
  variant?: "default" | "blue" | "green" | "purple"
}

const variantStyles = {
  default: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
}

export function StatsCard({ title, value, icon: Icon, description, variant = "blue" }: StatsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", variantStyles[variant])}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
