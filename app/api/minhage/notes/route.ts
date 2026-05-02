import { auth } from "@/auth"
import { hageAdmin } from "@/lib/hage-supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await hageAdmin()
    .from("garden_notes")
    .select("*")
    .eq("user_email", session.user.email)
    .order("month", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { month, content } = body

  const { data, error } = await hageAdmin()
    .from("garden_notes")
    .upsert(
      { user_email: session.user.email, month, content, updated_at: new Date().toISOString() },
      { onConflict: "user_email,month" }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
