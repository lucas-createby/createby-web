import { auth } from "@/auth"
import { hageAdmin } from "@/lib/hage-supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await hageAdmin()
    .from("garden_areas")
    .select("*")
    .eq("user_email", session.user.email)
    .order("created_at", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { name, color, geojson } = await req.json()

  const { data, error } = await hageAdmin()
    .from("garden_areas")
    .insert({ user_email: session.user.email, name: name ?? "", color: color ?? "#2d6a26", geojson })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const { name, color, geojson } = await req.json()
  const updates: Record<string, unknown> = {}
  if (geojson !== undefined) updates.geojson = geojson
  if (name !== undefined) updates.name = name
  if (color !== undefined) updates.color = color

  const { data, error } = await hageAdmin()
    .from("garden_areas")
    .update(updates)
    .eq("id", id)
    .eq("user_email", session.user.email)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const { error } = await hageAdmin()
    .from("garden_areas")
    .delete()
    .eq("id", id)
    .eq("user_email", session.user.email)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
