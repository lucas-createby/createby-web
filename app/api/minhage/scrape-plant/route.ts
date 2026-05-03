import { auth } from "@/auth"
import { NextResponse } from "next/server"

function extractMeta(html: string, ...properties: string[]): string {
  for (const property of properties) {
    const patterns = [
      new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
      new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, "i"),
    ]
    for (const pattern of patterns) {
      const match = html.match(pattern)
      if (match?.[1]) {
        return match[1]
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim()
      }
    }
  }
  return ""
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { url } = await req.json()
  if (!url || !url.startsWith("http")) return NextResponse.json({ error: "Ugyldig URL" }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "no,nb;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()

    const name = extractMeta(html, "og:title", "twitter:title")
    const image = extractMeta(html, "og:image", "twitter:image:src", "twitter:image")
    const description = extractMeta(html, "og:description", "twitter:description", "description")
    const price = extractMeta(html, "product:price:amount", "og:price:amount")

    // Try to extract store name from domain
    const domain = new URL(url).hostname.replace("www.", "")
    const storeMap: Record<string, string> = {
      "plantasjen.no": "Plantasjen",
      "hageland.no": "Hageland",
      "mestergronn.no": "Mester Grønn",
      "blomsterringen.no": "Blomsterringen",
      "byggmax.no": "Byggmax",
    }
    const store = storeMap[domain] ?? domain

    return NextResponse.json({ name, image, description, price, store })
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke hente siden. Fyll inn manuelt eller prøv en annen URL." },
      { status: 422 }
    )
  }
}
