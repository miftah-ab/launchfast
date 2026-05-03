import { createClient } from "@/lib/supabase/client"

export async function handleDemoLogin() {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: 'demo@launchfast.com',
    password: 'demo123456'
  })
  return { error }
}
