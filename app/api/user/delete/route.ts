import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Delete profile first (cascade will handle auth)
    await supabase.from("profiles").delete().eq("id", user.id)
    // Sign out
    await supabase.auth.signOut()

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 })
  }
}
