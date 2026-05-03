import { auth } from "@/auth"
import { NextResponse } from "next/server"

function decode(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

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
      if (match?.[1]) return decode(match[1])
    }
  }
  return ""
}

// Parse JSON-LD blocks — most e-commerce sites use schema.org/Product
function extractJsonLd(html: string) {
  const result: { name?: string; image?: string; description?: string; price?: string } = {}
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  for (const block of blocks) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = JSON.parse(block[1])
      const items = Array.isArray(data) ? data : [data]
      for (const item of items) {
        // Support @graph arrays
        const candidates = item["@graph"] ? [item, ...item["@graph"]] : [item]
        for (const c of candidates) {
          if (c["@type"] === "Product" || c["@type"]?.includes?.("Product")) {
            if (!result.name && c.name) result.name = c.name
            if (!result.description && c.description) result.description = c.description
            if (!result.image) {
              const img = Array.isArray(c.image) ? c.image[0] : c.image
              if (typeof img === "string") result.image = img
              else if (img?.url) result.image = img.url
            }
            if (!result.price) {
              const offers = Array.isArray(c.offers) ? c.offers[0] : c.offers
              if (offers?.price != null) result.price = String(offers.price)
            }
          }
        }
      }
    } catch { /* malformed JSON-LD — skip */ }
  }
  return result
}

const STORE_MAP: Record<string, string> = {
  "plantasjen.no": "Plantasjen",
  "hageland.no": "Hageland",
  "mestergronn.no": "Mester Grønn",
  "blomsterringen.no": "Blomsterringen",
  "byggmax.no": "Byggmax",
  "coop.no": "Coop",
  "jernia.no": "Jernia",
  "biltema.no": "Biltema",
  "k-rauta.no": "K-Rauta",
  "maxbo.no": "Maxbo",
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { url } = await req.json()
  if (!url || !url.startsWith("http")) return NextResponse.json({ error: "Ugyldig URL" }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "no,nb;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()

    // 1. Try JSON-LD first (most accurate for e-commerce)
    const jsonLd = extractJsonLd(html)

    // 2. Fall back to OG/meta tags
    const name = jsonLd.name || extractMeta(html, "og:title", "twitter:title")
    const image = jsonLd.image || extractMeta(html, "og:image", "twitter:image:src", "twitter:image")
    const description = jsonLd.description || extractMeta(html, "og:description", "twitter:description", "description")
    const price = jsonLd.price || extractMeta(html, "product:price:amount", "og:price:amount")

    const domain = new URL(url).hostname.replace("www.", "")
    const store = STORE_MAP[domain] ?? domain

    return NextResponse.json({ name, image, description, price, store })
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke hente siden. Fyll inn manuelt eller prøv en annen URL." },
      { status: 422 }
    )
  }
}
