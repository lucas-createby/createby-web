"use client"

import { useEffect, useRef, useState } from "react"

// ─── Store links ────────────────────────────────────────────────────────────

const STORE_LINKS = [
  { name: "Plantasjen", url: "https://www.plantasjen.no", color: "#1b7a3e" },
  { name: "Hageland", url: "https://www.hageland.no", color: "#e8590c" },
  { name: "Mester Grønn", url: "https://www.mestergronn.no", color: "#2d6a26" },
  { name: "Blomsterringen", url: "https://www.blomsterringen.no", color: "#c0392b" },
  { name: "Byggmax", url: "https://www.byggmax.no", color: "#e74c3c" },
  { name: "Jernia", url: "https://www.jernia.no", color: "#2980b9" },
  { name: "Biltema", url: "https://www.biltema.no", color: "#e67e22" },
  { name: "K-Rauta", url: "https://www.k-rauta.no", color: "#27ae60" },
  { name: "Maxbo", url: "https://www.maxbo.no", color: "#8e44ad" },
  { name: "Coop", url: "https://www.coop.no", color: "#e74c3c" },
]

// ─── Built-in plant database ───────────────────────────────────────────────

type PlantDB = {
  name: string
  kategori: "stauder" | "busker"
  bloomStart: number
  bloomEnd: number
  height: string
  sun: "sol" | "halvskygge" | "skygge"
  note: string
}

const PLANTE_DB: PlantDB[] = [
  // Stauder
  { name: "Pion", kategori: "stauder", bloomStart: 5, bloomEnd: 6, height: "60–100 cm", sun: "sol", note: "Langlivet, kan stå i 50+ år. Dufter nydelig." },
  { name: "Ridderspore", kategori: "stauder", bloomStart: 6, bloomEnd: 7, height: "100–180 cm", sun: "sol", note: "Høy og dramatisk. Klipp ned etter blomstring for ny blomst." },
  { name: "Echinacea", kategori: "stauder", bloomStart: 7, bloomEnd: 9, height: "60–90 cm", sun: "sol", note: "Pollinatorfavoritt. Tørketolerант." },
  { name: "Daglilje", kategori: "stauder", bloomStart: 7, bloomEnd: 8, height: "50–80 cm", sun: "sol", note: "Enkel å dyrke. Mange blomster over lang periode." },
  { name: "Kattemynte", kategori: "stauder", bloomStart: 5, bloomEnd: 8, height: "30–50 cm", sun: "sol", note: "Lang blomstringstid. Bier elsker den. Klipp tilbake for ny blomst." },
  { name: "Storkenebb", kategori: "stauder", bloomStart: 6, bloomEnd: 8, height: "30–60 cm", sun: "halvskygge", note: "Solid kantplante. Fin høstfarge på bladene." },
  { name: "Hosta", kategori: "stauder", bloomStart: 7, bloomEnd: 8, height: "30–80 cm", sun: "skygge", note: "Primært for vakre blad. Perfekt under trær." },
  { name: "Akeleie", kategori: "stauder", bloomStart: 5, bloomEnd: 6, height: "40–70 cm", sun: "halvskygge", note: "Kortlivet stauder, men selvsprer seg villig." },
  { name: "Klokkesøster", kategori: "stauder", bloomStart: 6, bloomEnd: 8, height: "40–80 cm", sun: "halvskygge", note: "Mange sorter og farger. Tåler kalk i jorda." },
  { name: "Bergenia", kategori: "stauder", bloomStart: 4, bloomEnd: 5, height: "20–40 cm", sun: "halvskygge", note: "En av de første i vår. Vintergrønn." },
  { name: "Iris", kategori: "stauder", bloomStart: 5, bloomEnd: 6, height: "60–100 cm", sun: "sol", note: "Elegant blomst. Trenger godt drenert jord." },
  { name: "Astilbe", kategori: "stauder", bloomStart: 7, bloomEnd: 8, height: "50–100 cm", sun: "halvskygge", note: "Liker fuktig jord. Fjærlett blomsterstand." },
  { name: "Solhatt (Rudbeckia)", kategori: "stauder", bloomStart: 8, bloomEnd: 9, height: "60–100 cm", sun: "sol", note: "Sen blomstring — fyller gapet i august–september." },
  { name: "Lavendel", kategori: "stauder", bloomStart: 7, bloomEnd: 8, height: "30–60 cm", sun: "sol", note: "Dufter. Trenger godt drenert, kalkholdig jord." },
  { name: "Salvia", kategori: "stauder", bloomStart: 6, bloomEnd: 9, height: "40–80 cm", sun: "sol", note: "Lang blomstringstid. Mange sorter." },
  { name: "Brudeslør", kategori: "stauder", bloomStart: 6, bloomEnd: 8, height: "60–100 cm", sun: "sol", note: "Luftig skyer av små hvite blomster." },
  { name: "Veronika", kategori: "stauder", bloomStart: 6, bloomEnd: 8, height: "30–90 cm", sun: "sol", note: "Spir-formet blomsterstand. Bier og sommerfugler." },
  { name: "Høstfloks", kategori: "stauder", bloomStart: 8, bloomEnd: 9, height: "60–100 cm", sun: "sol", note: "Avslutter sesongen med riktig blomstring." },
  { name: "Gullstjerne (Coreopsis)", kategori: "stauder", bloomStart: 7, bloomEnd: 9, height: "30–60 cm", sun: "sol", note: "Gule blomster hele sommeren. Meget hardføre." },
  { name: "Jonsokkoll", kategori: "stauder", bloomStart: 6, bloomEnd: 7, height: "40–80 cm", sun: "halvskygge", note: "Norsk villblomst. Vakker i naturlignende beplantning." },
  // Busker
  { name: "Syrin", kategori: "busker", bloomStart: 5, bloomEnd: 6, height: "2–4 m", sun: "sol", note: "Uforglemmelig duft. Plasser i sol for best blomstring." },
  { name: "Hortensia", kategori: "busker", bloomStart: 7, bloomEnd: 9, height: "1–2 m", sun: "halvskygge", note: "Storblomstret og lang blomstringstid. Mange sorter." },
  { name: "Rosebusk", kategori: "busker", bloomStart: 6, bloomEnd: 9, height: "0,5–2 m", sun: "sol", note: "Velg hardfør sort (Parks/Rugosa). Krever litt stell." },
  { name: "Sommerfuglbusk", kategori: "busker", bloomStart: 7, bloomEnd: 9, height: "1,5–3 m", sun: "sol", note: "Trekker sommerfugler og bier. Klipp hardt ned om våren." },
  { name: "Spirea", kategori: "busker", bloomStart: 5, bloomEnd: 6, height: "0,5–2 m", sun: "sol", note: "Svært hardfør. Ulike arter blomstrer vår og sommer." },
  { name: "Viburnum", kategori: "busker", bloomStart: 5, bloomEnd: 6, height: "1,5–3 m", sun: "halvskygge", note: "Duftende blomster. Flotte høstbær for fuglene." },
  { name: "Påskelyng (Forsythia)", kategori: "busker", bloomStart: 4, bloomEnd: 4, height: "1,5–3 m", sun: "sol", note: "Første busk som blomstrer om våren. Gult i aprils." },
  { name: "Fingerbuskas", kategori: "busker", bloomStart: 6, bloomEnd: 9, height: "0,5–1,5 m", sun: "sol", note: "Blomstrer hele sommeren. Tørketolerант og hardfør." },
  { name: "Skjærsmin", kategori: "busker", bloomStart: 6, bloomEnd: 7, height: "2–3 m", sun: "halvskygge", note: "Hvite, duftende blomster. Klassisk hageplante." },
  { name: "Veigelabusk", kategori: "busker", bloomStart: 5, bloomEnd: 6, height: "1–2 m", sun: "sol", note: "Rosa/rød blomstring. Trekker kolibrier (i varme land)." },
]

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]

// ─── Types ─────────────────────────────────────────────────────────────────

type GardenPlant = {
  id: string
  name: string
  store: string
  price: string
  url: string
  image_url: string
  description: string
  zone_id: string | null
  kategori: string
  bloom_start: number | null
  bloom_end: number | null
  created_at: string
}

type GardenArea = {
  id: string
  name: string
  zone_type: string
  color: string
}

type AddForm = {
  name: string
  store: string
  price: string
  url: string
  image_url: string
  description: string
  zone_id: string
  kategori: string
  bloom_start: string
  bloom_end: string
}

const EMPTY_FORM: AddForm = {
  name: "", store: "", price: "", url: "", image_url: "",
  description: "", zone_id: "", kategori: "Stauder", bloom_start: "", bloom_end: "",
}

function guessKategori(name: string): string {
  const n = name.toLowerCase()
  if (n.includes("hage") && (n.includes("slange") || n.includes("vann"))) return "Hageutstyr"
  if (n.includes("gjødsel") || n.includes("jord") || n.includes("torv") || n.includes("kompost")) return "Gjødsel/jord"
  if (n.includes("spade") || n.includes("harv") || n.includes("rake") || n.includes("saks") || n.includes("kniv")) return "Verktøy"
  if (n.includes("drivhus") || n.includes("plantekasse") || n.includes("bed") || n.includes("gjerde")) return "Drivhus/bygg"
  if (n.includes("slange") || n.includes("vanning") || n.includes("spreder")) return "Hageutstyr"
  if (n.includes("frø") || n.includes("såfrø")) return "Frø"
  return "Stauder" // default to plant
}

// Categories that have bloom time (plants)
const PLANTE_KAT = new Set(["Stauder", "Busker", "Grønnsaker", "Frukt", "Urter", "Blomster", "Frø"])

const KATEGORIER = [
  // Planter
  { group: "Planter", items: ["Stauder", "Busker", "Grønnsaker", "Frukt", "Urter", "Blomster", "Frø"] },
  // Utstyr
  { group: "Utstyr", items: ["Verktøy", "Materialer", "Hageutstyr", "Gjødsel/jord", "Drivhus/bygg", "Annet"] },
]
const ALLE_KAT = KATEGORIER.flatMap(g => g.items)

// ─── StoreBrowser overlay ──────────────────────────────────────────────────

type ScrapedProduct = {
  name: string; store: string; price: string; image: string; description: string
}

function StoreBrowser({
  onAdd,
  onClose,
}: {
  onAdd: (product: ScrapedProduct & { url: string }) => void
  onClose: () => void
}) {
  const [url, setUrl] = useState("")
  const [scraping, setScraping] = useState(false)
  const [scrapeError, setScrapeError] = useState("")
  const [scraped, setScraped] = useState<(ScrapedProduct & { url: string }) | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  async function doScrape(rawUrl: string) {
    const trimmed = rawUrl.trim()
    if (!trimmed.startsWith("http")) return
    setScraping(true)
    setScrapeError("")
    setScraped(null)
    try {
      const res = await fetch("/api/minhage/scrape-plant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) { setScrapeError(data.error ?? "Feil ved henting"); return }
      setScraped({ name: data.name ?? "", store: data.store ?? "", price: data.price ?? "",
        image: data.image ?? "", description: data.description ?? "", url: trimmed })
    } finally {
      setScraping(false)
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").trim()
    if (pasted.startsWith("http")) {
      setUrl(pasted)
      // Let React update state first, then scrape
      setTimeout(() => doScrape(pasted), 30)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          zIndex: 1000, backdropFilter: "blur(2px)",
        }}
      />

      {/* Panel */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        zIndex: 1001,
        background: "#fff",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.18)",
        maxHeight: "90dvh",
        overflowY: "auto",
        padding: "0 0 env(safe-area-inset-bottom)",
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#e0e8dc" }} />
        </div>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 20px 0",
        }}>
          <h3 style={{ margin: 0, fontSize: 17, color: "#1a3a1a", fontWeight: 700 }}>Finn produkt</h3>
          <button
            onClick={onClose}
            style={{
              background: "#f4f7f3", border: "none", borderRadius: "50%",
              width: 32, height: 32, fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6b7280", fontWeight: 700,
            }}
          >×</button>
        </div>

        <div style={{ padding: "16px 20px 28px" }}>
          {/* Store shortcuts */}
          <p style={{ margin: "0 0 10px", fontSize: 12, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Åpne butikk
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {STORE_LINKS.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "7px 12px", borderRadius: 20,
                  background: s.color + "12",
                  border: `1.5px solid ${s.color}30`,
                  color: s.color, fontSize: 13, fontWeight: 600,
                  textDecoration: "none", whiteSpace: "nowrap",
                }}
              >
                {s.name} ↗
              </a>
            ))}
          </div>

          {/* URL paste input */}
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Lim inn produktlenke
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              ref={inputRef}
              type="url"
              placeholder="https://www.plantasjen.no/..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={e => e.key === "Enter" && doScrape(url)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={() => doScrape(url)}
              disabled={scraping || !url.trim()}
              style={{ ...btnStyle, padding: "8px 14px", opacity: scraping || !url.trim() ? 0.5 : 1 }}
            >
              {scraping ? "..." : "Hent"}
            </button>
          </div>
          {scrapeError && (
            <p style={{ color: "#dc2626", fontSize: 13, margin: "4px 0 0" }}>{scrapeError}</p>
          )}

          {/* Scraping indicator */}
          {scraping && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0", color: "#6b7280", fontSize: 13 }}>
              <div style={{
                width: 16, height: 16, border: "2px solid #e0e8dc", borderTopColor: "#2d6a26",
                borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0,
              }} />
              Henter produktinfo...
            </div>
          )}

          {/* Scraped product preview */}
          {scraped && !scraping && (
            <div style={{
              marginTop: 16, border: "1.5px solid #c8ddc5", borderRadius: 14,
              background: "#f8fdf7", overflow: "hidden",
            }}>
              {scraped.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={scraped.image} alt={scraped.name} referrerPolicy="no-referrer"
                  style={{ width: "100%", height: 180, objectFit: "contain", background: "#fff", padding: 8 }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              )}
              <div style={{ padding: "12px 16px" }}>
                {scraped.store && (
                  <span style={{ fontSize: 11, color: "#6b7280", background: "#e8f5e8", borderRadius: 8, padding: "2px 7px" }}>
                    {scraped.store}
                  </span>
                )}
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1a3a1a", margin: "6px 0 2px" }}>
                  {scraped.name || "(ukjent navn)"}
                </div>
                {scraped.price && (
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#2d6a26", marginBottom: 4 }}>
                    {scraped.price} kr
                  </div>
                )}
                {scraped.description && (
                  <p style={{
                    fontSize: 13, color: "#6b7280", margin: "4px 0 0",
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {scraped.description}
                  </p>
                )}
              </div>
              <div style={{ padding: "0 16px 16px" }}>
                <button
                  onClick={() => { onAdd(scraped); onClose() }}
                  style={{ ...btnStyle, width: "100%", fontSize: 15, padding: "11px 18px" }}
                >
                  + Legg til hagen
                </button>
              </div>
            </div>
          )}

          {/* Hint when no URL yet */}
          {!scraped && !scraping && !url && (
            <div style={{
              marginTop: 12, padding: "16px", background: "#f4f7f3", borderRadius: 10,
              fontSize: 13, color: "#6b7280", lineHeight: 1.5,
            }}>
              1. Åpne en butikk ovenfor<br />
              2. Finn produktet du vil ha<br />
              3. Kopier URL-en fra adressefeltet<br />
              4. Lim inn her — produktinfo hentes automatisk
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

// ─── Bloom bar ─────────────────────────────────────────────────────────────

function BloomBar({ start, end, small }: { start: number | null; end: number | null; small?: boolean }) {
  if (!start || !end) return null
  const size = small ? 12 : 16
  const gap = small ? 1 : 2
  return (
    <div style={{ display: "flex", gap, alignItems: "center", marginTop: small ? 4 : 6 }}>
      {MONTHS_SHORT.map((m, i) => {
        const month = i + 1
        const active = month >= start && month <= end
        return (
          <div
            key={m}
            title={m}
            style={{
              width: size,
              height: size,
              borderRadius: 3,
              background: active ? "#2d6a26" : "#e0e8dc",
              flexShrink: 0,
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function PlanterTab() {
  const [view, setView] = useState<"plan" | "database">("plan")
  const [plants, setPlants] = useState<GardenPlant[]>([])
  const [areas, setAreas] = useState<GardenArea[]>([])
  const [addForm, setAddForm] = useState<AddForm | null>(null)
  const [saving, setSaving] = useState(false)
  const [dbFilter, setDbFilter] = useState<"alle" | "stauder" | "busker">("alle")
  const [dbMonthFilter, setDbMonthFilter] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)

  useEffect(() => {
    fetch("/api/minhage/plants").then(r => r.json()).then(d => { if (Array.isArray(d)) setPlants(d) })
    fetch("/api/minhage/areas").then(r => r.json()).then(d => { if (Array.isArray(d)) setAreas(d) })
  }, [])

  function handleBrowserAdd(product: ScrapedProduct & { url: string }) {
    setAddForm({
      ...EMPTY_FORM,
      name: product.name,
      store: product.store,
      price: product.price,
      url: product.url,
      image_url: product.image,
      description: product.description,
      kategori: guessKategori(product.name),
    })
    setShowAddForm(true)
  }

  async function handleSave() {
    if (!addForm || !addForm.name.trim()) return
    setSaving(true)
    const res = await fetch("/api/minhage/plants", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...addForm,
        zone_id: addForm.zone_id || null,
        bloom_start: addForm.bloom_start ? Number(addForm.bloom_start) : null,
        bloom_end: addForm.bloom_end ? Number(addForm.bloom_end) : null,
      }),
    })
    const newPlant = await res.json()
    if (newPlant.id) setPlants(prev => [newPlant, ...prev])
    setAddForm(null)
    setShowAddForm(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    await fetch(`/api/minhage/plants?id=${id}`, { method: "DELETE" })
    setPlants(prev => prev.filter(p => p.id !== id))
  }

  const dbVisible = PLANTE_DB.filter(p =>
    (dbFilter === "alle" || p.kategori === dbFilter) &&
    (!dbMonthFilter || (p.bloomStart <= dbMonthFilter && p.bloomEnd >= dbMonthFilter))
  )

  const areaById = Object.fromEntries(areas.map(a => [a.id, a]))

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, color: "#1a3a1a" }}>Planter</h2>
        <div style={{ display: "flex", gap: 4 }}>
          {(["plan", "database"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "5px 14px", borderRadius: 20, border: "1px solid",
              borderColor: view === v ? "#2d6a26" : "#c8ddc5",
              background: view === v ? "#2d6a26" : "transparent",
              color: view === v ? "#fff" : "#374151",
              fontSize: 13, cursor: "pointer", fontWeight: view === v ? 700 : 400,
            }}>
              {v === "plan" ? "🌿 Min plan" : "📚 Plantedatabase"}
            </button>
          ))}
        </div>
      </div>

      {/* ── MIN PLAN ── */}
      {view === "plan" && (
        <div>
          {/* Add actions */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <button
              onClick={() => setShowBrowser(true)}
              style={{ ...btnStyle, display: "flex", alignItems: "center", gap: 7, fontSize: 14 }}
            >
              <span style={{ fontSize: 16 }}>🛍️</span> Finn i butikk
            </button>
            <button
              onClick={() => { setAddForm({ ...EMPTY_FORM }); setShowAddForm(true) }}
              style={{ ...btnStyle, background: "transparent", color: "#2d6a26", border: "1.5px solid #2d6a26" }}
            >
              + Legg til manuelt
            </button>
          </div>

          {/* In-app browser overlay */}
          {showBrowser && (
            <StoreBrowser
              onAdd={handleBrowserAdd}
              onClose={() => setShowBrowser(false)}
            />
          )}

          {/* Add/edit form */}
          {showAddForm && addForm && (
            <div style={{ background: "#fff", border: "2px solid #2d6a26", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#1a3a1a" }}>
                  {addForm.url ? "Hentet fra nettbutikk" : "Ny plante"}
                </p>
                <button onClick={() => { setShowAddForm(false); setAddForm(null) }}
                  style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#6b7280" }}>×</button>
              </div>

              {/* Preview */}
              {addForm.image_url && (
                <div style={{ marginBottom: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={addForm.image_url} alt={addForm.name} referrerPolicy="no-referrer"
                    style={{ height: 120, objectFit: "contain", borderRadius: 8, background: "#f4f7f3", padding: 4 }} />
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <input placeholder="Navn *" value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                  style={{ ...inputStyle, gridColumn: "1 / -1" }} />
                <input placeholder="Butikk" value={addForm.store} onChange={e => setAddForm({ ...addForm, store: e.target.value })} style={inputStyle} />
                <input placeholder="Pris (valgfri)" value={addForm.price} onChange={e => setAddForm({ ...addForm, price: e.target.value })} style={inputStyle} />
                <input placeholder="Produktlenke (URL)" value={addForm.url} onChange={e => setAddForm({ ...addForm, url: e.target.value })}
                  style={{ ...inputStyle, gridColumn: "1 / -1" }} />
                <input placeholder="Bildelenke (URL)" value={addForm.image_url} onChange={e => setAddForm({ ...addForm, image_url: e.target.value })}
                  style={{ ...inputStyle, gridColumn: "1 / -1" }} />
                <textarea placeholder="Beskrivelse" value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })}
                  rows={2} style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }} />

                <select value={addForm.kategori} onChange={e => setAddForm({ ...addForm, kategori: e.target.value })} style={inputStyle}>
                  {KATEGORIER.map(g => (
                    <optgroup key={g.group} label={g.group}>
                      {g.items.map(k => <option key={k}>{k}</option>)}
                    </optgroup>
                  ))}
                </select>
                <select value={addForm.zone_id} onChange={e => setAddForm({ ...addForm, zone_id: e.target.value })} style={inputStyle}>
                  <option value="">Ingen sone</option>
                  {areas.map(a => <option key={a.id} value={a.id}>{a.name || "Sone uten navn"}</option>)}
                </select>

                {PLANTE_KAT.has(addForm.kategori) && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>Blomstringstid (månedsnummer 1–12, valgfri)</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <input type="number" min={1} max={12} placeholder="Fra" value={addForm.bloom_start}
                        onChange={e => setAddForm({ ...addForm, bloom_start: e.target.value })}
                        style={{ ...inputStyle, width: 70 }} />
                      <span style={{ color: "#9ca3af" }}>→</span>
                      <input type="number" min={1} max={12} placeholder="Til" value={addForm.bloom_end}
                        onChange={e => setAddForm({ ...addForm, bloom_end: e.target.value })}
                        style={{ ...inputStyle, width: 70 }} />
                      <BloomBar
                        start={addForm.bloom_start ? Number(addForm.bloom_start) : null}
                        end={addForm.bloom_end ? Number(addForm.bloom_end) : null}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={handleSave} disabled={saving || !addForm.name.trim()} style={{ ...btnStyle, flex: 1 }}>
                  {saving ? "Lagrer..." : "Lagre plante"}
                </button>
              </div>
            </div>
          )}

          {/* Plant grid */}
          {plants.length === 0 && !showAddForm ? (
            <div style={{ textAlign: "center", padding: 48, color: "#9ca3af" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🛍️</div>
              <p style={{ margin: "0 0 14px", fontSize: 14 }}>
                Trykk «Finn i butikk» for å bla i Plantasjen, Hageland og mer — og legg til direkte i hagen din.
              </p>
              <button onClick={() => setShowBrowser(true)} style={{ ...btnStyle, fontSize: 14 }}>
                Finn i butikk →
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {plants.map(p => {
                const zone = p.zone_id ? areaById[p.zone_id] : null
                return (
                  <div key={p.id} style={{
                    background: "#fff", border: "1px solid #e0e8dc", borderRadius: 12,
                    overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    display: "flex", flexDirection: "column",
                  }}>
                    {/* Image */}
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={p.name} referrerPolicy="no-referrer"
                        style={{ width: "100%", height: 160, objectFit: "cover" }}
                        onError={e => { (e.target as HTMLImageElement).style.display = "none" }} />
                    ) : (
                      <div style={{ height: 100, background: "#f4f7f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                        🌱
                      </div>
                    )}

                    <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          {p.kategori && p.kategori !== "Annet" && (
                            <span style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5 }}>
                              {p.kategori}
                            </span>
                          )}
                          <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a1a", marginTop: 2 }}>{p.name}</div>
                        </div>
                        <button onClick={() => handleDelete(p.id)}
                          style={{ background: "none", border: "none", color: "#d1d5db", cursor: "pointer", fontSize: 16, padding: "0 0 0 4px", lineHeight: 1 }}
                          title="Slett">×</button>
                      </div>

                      {p.description && (
                        <p style={{ fontSize: 12, color: "#6b7280", margin: "6px 0 0", lineClamp: 2,
                          overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                          {p.description}
                        </p>
                      )}

                      <BloomBar start={p.bloom_start} end={p.bloom_end} small />

                      <div style={{ marginTop: "auto", paddingTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {p.store && (
                            <span style={{ fontSize: 11, color: "#6b7280", background: "#f4f7f3", borderRadius: 10, padding: "2px 7px" }}>
                              {p.store}
                            </span>
                          )}
                          {p.price && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#2d6a26" }}>{p.price} kr</span>
                          )}
                          {zone && (
                            <span style={{ fontSize: 11, background: zone.color + "22", border: `1px solid ${zone.color}66`, borderRadius: 10, padding: "2px 7px", color: "#374151" }}>
                              {zone.name || "Sone"}
                            </span>
                          )}
                        </div>
                        {p.url && (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                            fontSize: 12, color: "#2d6a26", fontWeight: 600, whiteSpace: "nowrap",
                            textDecoration: "none", background: "#e8f5e8", borderRadius: 6, padding: "3px 8px",
                          }}>
                            Kjøp →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── PLANTEDATABASE ── */}
      {view === "database" && (
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280" }}>
            30 stauder og busker tilpasset norsk klima (H3–H4). Klikk «+» for å legge til i din plan.
          </p>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
            {(["alle", "stauder", "busker"] as const).map(k => (
              <button key={k} onClick={() => setDbFilter(k)} style={{
                padding: "4px 12px", borderRadius: 20, border: "1px solid",
                borderColor: dbFilter === k ? "#2d6a26" : "#c8ddc5",
                background: dbFilter === k ? "#2d6a26" : "transparent",
                color: dbFilter === k ? "#fff" : "#374151",
                fontSize: 13, cursor: "pointer", textTransform: "capitalize",
              }}>
                {k === "alle" ? "Alle" : k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
            <div style={{ width: 1, height: 20, background: "#e0e8dc" }} />
            <span style={{ fontSize: 12, color: "#6b7280" }}>Blomstrer i:</span>
            {MONTHS_SHORT.map((m, i) => (
              <button key={m} onClick={() => setDbMonthFilter(dbMonthFilter === i + 1 ? null : i + 1)} style={{
                padding: "3px 8px", borderRadius: 20, border: "1px solid",
                borderColor: dbMonthFilter === i + 1 ? "#2d6a26" : "#e0e8dc",
                background: dbMonthFilter === i + 1 ? "#2d6a26" : "transparent",
                color: dbMonthFilter === i + 1 ? "#fff" : "#9ca3af",
                fontSize: 11, cursor: "pointer",
              }}>
                {m}
              </button>
            ))}
          </div>

          {/* Bloom overview bar */}
          <div style={{ background: "#f4f7f3", borderRadius: 8, padding: "10px 14px", marginBottom: 16, overflowX: "auto" }}>
            <p style={{ margin: "0 0 6px", fontSize: 11, color: "#6b7280", fontWeight: 600 }}>
              BLOMSTRINGSOVERSIKT — {dbVisible.length} planter
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "4px 8px", alignItems: "center", minWidth: 600 }}>
              {/* Month headers */}
              <div />
              <div style={{ display: "flex", gap: 2 }}>
                {MONTHS_SHORT.map(m => (
                  <div key={m} style={{ width: 16, fontSize: 9, color: "#9ca3af", textAlign: "center", flexShrink: 0 }}>{m}</div>
                ))}
              </div>
              {/* Plant rows */}
              {dbVisible.map(p => (
                <div key={p.name} style={{ display: "contents" }}>
                  <span style={{ fontSize: 12, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.name}
                  </span>
                  <BloomBar start={p.bloomStart} end={p.bloomEnd} small />
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e0e8dc" }}>
                  <th style={thStyle}>Plante</th>
                  <th style={thStyle}>Blomstrer</th>
                  <th style={thStyle}>Høyde</th>
                  <th style={thStyle}>Sol</th>
                  <th style={{ ...thStyle, maxWidth: 220 }}>Notat</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {dbVisible.map(p => (
                  <tr key={p.name} style={{ borderBottom: "1px solid #f0f4ef" }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600, color: "#1a3a1a" }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: p.kategori === "stauder" ? "#2d6a26" : "#9b59b6", textTransform: "capitalize" }}>
                        {p.kategori}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: 12, color: "#374151", marginBottom: 2 }}>
                        {MONTHS_SHORT[p.bloomStart - 1]}–{MONTHS_SHORT[p.bloomEnd - 1]}
                      </div>
                      <BloomBar start={p.bloomStart} end={p.bloomEnd} small />
                    </td>
                    <td style={{ ...tdStyle, fontSize: 12, color: "#6b7280" }}>{p.height}</td>
                    <td style={{ ...tdStyle, fontSize: 12 }}>
                      {p.sun === "sol" ? "☀️" : p.sun === "halvskygge" ? "🌤️" : "🌥️"}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 12, color: "#6b7280", maxWidth: 220 }}>{p.note}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => {
                          setAddForm({ ...EMPTY_FORM, name: p.name, kategori: p.kategori === "stauder" ? "Stauder" : "Busker",
                            bloom_start: String(p.bloomStart), bloom_end: String(p.bloomEnd) })
                          setShowAddForm(true)
                          setView("plan")
                        }}
                        style={{ background: "#e8f5e8", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12,
                          color: "#2d6a26", cursor: "pointer", fontWeight: 600 }}>
                        + Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {dbVisible.length === 0 && (
            <p style={{ textAlign: "center", color: "#9ca3af", padding: 24 }}>Ingen planter matcher filteret.</p>
          )}
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px", borderRadius: 6, border: "1px solid #c8ddc5",
  fontSize: 14, width: "100%", boxSizing: "border-box",
}
const btnStyle: React.CSSProperties = {
  background: "#2d6a26", color: "#fff", border: "none", borderRadius: 8,
  padding: "8px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer",
}
const thStyle: React.CSSProperties = { padding: "6px 10px", color: "#6b7280", fontWeight: 600, fontSize: 12, textAlign: "left" }
const tdStyle: React.CSSProperties = { padding: "8px 10px", verticalAlign: "top" }
