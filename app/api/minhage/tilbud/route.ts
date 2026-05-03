import { auth } from "@/auth"
import { NextResponse } from "next/server"

const BUTIKKER = ["Plantasjen", "Hageland", "Byggmax", "Coop Byggmix"]

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const butikk = BUTIKKER.includes(body.butikk) ? body.butikk : null

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY mangler i .env.local" }, { status: 500 })

  const prompt = butikk
    ? `Finn aktuelle hagetilbud fra ${butikk} mai 2026. Svar KUN som JSON: { "tilbud": [{"produkt": string, "pris": string, "spar": string, "kategori": string}], "kilde": string }`
    : `Finn aktuelle hagetilbud fra Plantasjen, Hageland, Byggmax og Coop Byggmix mai 2026. Svar KUN som JSON: { "tilbud": [{"produkt": string, "butikk": string, "pris": string, "spar": string, "kategori": string}], "kilde": string }`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000)

  let response: Response
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    })
  } catch (err) {
    clearTimeout(timeout)
    const msg = err instanceof Error && err.name === "AbortError" ? "Forespørselen tok for lang tid." : "Nettverksfeil."
    return NextResponse.json({ error: msg }, { status: 504 })
  }
  clearTimeout(timeout)

  if (!response.ok) {
    const errText = await response.text()
    let userMsg = "Kunne ikke hente tilbud."
    try {
      const parsed = JSON.parse(errText)
      if (parsed?.error?.message?.includes("credit")) userMsg = "API-kreditt er oppbrukt. Legg til kreditt på Anthropic-kontoen."
      else userMsg = parsed?.error?.message ?? userMsg
    } catch { /* ignore */ }
    console.error("[tilbud] Anthropic error:", errText)
    return NextResponse.json({ error: userMsg }, { status: response.status })
  }

  const result = await response.json()

  // Extract the last text block from the response
  const textBlock = result.content?.findLast((b: { type: string }) => b.type === "text")
  if (!textBlock) return NextResponse.json({ tilbud: [], kilde: "" })

  try {
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/)
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { tilbud: [], kilde: "" }
    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({ tilbud: [], kilde: textBlock.text })
  }
}
