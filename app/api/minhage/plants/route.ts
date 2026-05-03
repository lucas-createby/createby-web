import { auth } from "@/auth"
import { hageAdmin } from "@/lib/hage-supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await hageAdmin()
    .from("garden_plants")
    .select("*")
    .eq("user_email", session.user.email)
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  const { data, error } = await hageAdmin()
    .from("garden_plants")
    .insert({
      user_email: session.user.email,
      name: body.name,
      store: body.store ?? "",
      price: body.price ?? "",
      url: body.url ?? "",
      image_url: body.image_url ?? "",
      description: body.description ?? "",
      zone_id: body.zone_id ?? null,
      kategori: body.kategori ?? "Annet",
      bloom_start: body.bloom_start ?? null,
      bloom_end: body.bloom_end ?? null,
    })
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

  const body = await req.json()
  const updates: Record<string, unknown> = {}
  const fields = ["name", "store", "price", "url", "image_url", "description", "zone_id", "kategori", "bloom_start", "bloom_end"]
  fields.forEach((f) => { if (body[f] !== undefined) updates[f] = body[f] })

  const { data, error } = await hageAdmin()
    .from("garden_plants")
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
    .from("garden_plants")
    .delete()
    .eq("id", id)
    .eq("user_email", session.user.email)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
