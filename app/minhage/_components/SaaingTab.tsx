"use client"

import { useState } from "react"

type Plant = {
  name: string
  kategori: "gronnsak" | "frukt" | "urt" | "blomst"
  indoors: string | null  // e.g. "Feb–Mar"
  outdoors: string | null  // e.g. "Apr–Mai"
  plant_out: string | null  // e.g. "Mai–Jun"
  harvest: string
  note: string
}

const PLANTS: Plant[] = [
  { name: "Tomat", kategori: "gronnsak", indoors: "Feb–Mar", outdoors: null, plant_out: "Mai (etter 15.)", harvest: "Jul–Sep", note: "Varmekjær. Drivhus anbefalt på Nesodden." },
  { name: "Paprika", kategori: "gronnsak", indoors: "Feb–Mar", outdoors: null, plant_out: "Mai (etter 15.)", harvest: "Aug–Sep", note: "Trenger lang sesong. Start tidlig innendørs." },
  { name: "Agurk", kategori: "gronnsak", indoors: "Apr", outdoors: null, plant_out: "Mai (etter 15.)", harvest: "Jul–Aug", note: "Drivhus gir best resultat." },
  { name: "Squash", kategori: "gronnsak", indoors: "Apr–Mai", outdoors: "Mai", plant_out: "Mai–Jun", harvest: "Jul–Sep", note: "Rask vekst. Høst mens liten for best smak." },
  { name: "Potet", kategori: "gronnsak", indoors: null, outdoors: "Apr (etter 15.)", plant_out: null, harvest: "Aug–Sep", note: "Forvarm settepoteter i mars. Vekstskifte viktig." },
  { name: "Gulrot", kategori: "gronnsak", indoors: null, outdoors: "Apr–Jun", plant_out: null, harvest: "Aug–Okt", note: "Løs jord uten stein. Løs med sand ved behov." },
  { name: "Løk", kategori: "gronnsak", indoors: "Jan–Feb", outdoors: "Apr", plant_out: "Apr", harvest: "Aug", note: "Sett sæteløk ute fra april." },
  { name: "Purreløk", kategori: "gronnsak", indoors: "Feb–Mar", outdoors: null, plant_out: "Mai", harvest: "Sep–Nov", note: "Tett vekst innendørs, tynn ved utplanting." },
  { name: "Erter", kategori: "gronnsak", indoors: null, outdoors: "Apr–Mai", plant_out: null, harvest: "Jul–Aug", note: "Tåler litt frost. Støttepinner for klatreerter." },
  { name: "Bønner", kategori: "gronnsak", indoors: null, outdoors: "Mai", plant_out: null, harvest: "Jul–Aug", note: "Etter siste frostrisiko. Buskbønner krever ikke støtte." },
  { name: "Salat", kategori: "gronnsak", indoors: "Mar–Apr", outdoors: "Apr–Jul", plant_out: "Apr–Jun", harvest: "Mai–Sep", note: "Kan sås løpende for kontinuerlig høst." },
  { name: "Spinat", kategori: "gronnsak", indoors: null, outdoors: "Apr–Jun", plant_out: null, harvest: "Mai–Jul", note: "Tåler frost. Sår høst-spinat også i august." },
  { name: "Kål (grønnkål)", kategori: "gronnsak", indoors: "Mar–Apr", outdoors: null, plant_out: "Mai", harvest: "Sep–Des", note: "Smaker bedre etter frost." },
  { name: "Jordbær", kategori: "frukt", indoors: null, outdoors: null, plant_out: "Apr–Mai", harvest: "Jun–Jul", note: "Plant sommerstiklinger samme år for høst neste år." },
  { name: "Bringebær", kategori: "frukt", indoors: null, outdoors: null, plant_out: "Vår/Høst", harvest: "Jul–Aug", note: "Krev godt oppsett med støttepinner." },
  { name: "Eple", kategori: "frukt", indoors: null, outdoors: null, plant_out: "Vår/Høst", harvest: "Aug–Okt", note: "Sorter tilpasset Østlandet: f.eks. Discovery, Prins." },
  { name: "Basilikum", kategori: "urt", indoors: "Apr–Mai", outdoors: null, plant_out: "Mai (innendørs/drivhus)", harvest: "Jun–Sep", note: "Varmekjær. Klipp regelmessig for å hindre blomstring." },
  { name: "Persille", kategori: "urt", indoors: "Mar", outdoors: "Apr–Mai", plant_out: "Mai", harvest: "Jun–Okt", note: "Toårig. Kan overvintre i drivhus." },
  { name: "Dill", kategori: "urt", indoors: null, outdoors: "Mai–Jun", plant_out: null, harvest: "Jul–Aug", note: "Liker sol. Selvsprer seg." },
  { name: "Gressløk", kategori: "urt", indoors: null, outdoors: "Apr", plant_out: null, harvest: "Mai–Okt", note: "Flerårig. Svært enkel å dyrke." },
  { name: "Solsikke", kategori: "blomst", indoors: "Apr–Mai", outdoors: null, plant_out: "Mai–Jun", harvest: "Aug–Sep", note: "Pollinatortiltrekker. Binder frø til fuglene." },
  { name: "Ringblomst", kategori: "blomst", indoors: "Mar–Apr", outdoors: "Mai", plant_out: "Mai–Jun", harvest: "Jun–Sep", note: "Beskytter mot skadedyr. God hagevenn." },
]

const KATEGORIER = [
  { id: "alle", label: "Alle" },
  { id: "gronnsak", label: "Grønnsaker" },
  { id: "frukt", label: "Frukt" },
  { id: "urt", label: "Urter" },
  { id: "blomst", label: "Blomster" },
]

const KAT_COLOR: Record<string, string> = {
  gronnsak: "#2d6a26",
  frukt: "#e67e22",
  urt: "#16a085",
  blomst: "#e91e63",
}

export default function SaaingTab() {
  const [filter, setFilter] = useState("alle")
  const [search, setSearch] = useState("")

  const visible = PLANTS.filter(
    (p) =>
      (filter === "alle" || p.kategori === filter) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <h2 style={{ margin: "0 0 16px", fontSize: 18, color: "#1a3a1a" }}>Såplan — Nesodden H3</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {KATEGORIER.map((k) => (
            <button
              key={k.id}
              onClick={() => setFilter(k.id)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: filter === k.id ? "#2d6a26" : "#c8ddc5",
                background: filter === k.id ? "#2d6a26" : "transparent",
                color: filter === k.id ? "#fff" : "#374151",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: filter === k.id ? 700 : 400,
              }}
            >
              {k.label}
            </button>
          ))}
        </div>
        <input
          placeholder="Søk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "5px 12px",
            borderRadius: 20,
            border: "1px solid #c8ddc5",
            fontSize: 13,
            outline: "none",
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e0e8dc", textAlign: "left" }}>
              <th style={thStyle}>Plante</th>
              <th style={thStyle}>Innendørs</th>
              <th style={thStyle}>Utendørs/direkte</th>
              <th style={thStyle}>Utplanting</th>
              <th style={thStyle}>Høst</th>
              <th style={{ ...thStyle, maxWidth: 200 }}>Notat</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.name} style={{ borderBottom: "1px solid #f0f4ef" }}>
                <td style={tdStyle}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: KAT_COLOR[p.kategori],
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    <strong>{p.name}</strong>
                  </span>
                </td>
                <td style={tdStyle}>{p.indoors ?? <span style={{ color: "#9ca3af" }}>—</span>}</td>
                <td style={tdStyle}>{p.outdoors ?? <span style={{ color: "#9ca3af" }}>—</span>}</td>
                <td style={tdStyle}>{p.plant_out ?? <span style={{ color: "#9ca3af" }}>—</span>}</td>
                <td style={{ ...tdStyle, color: "#d97706", fontWeight: 600 }}>{p.harvest}</td>
                <td style={{ ...tdStyle, color: "#6b7280", fontSize: 12, maxWidth: 200 }}>{p.note}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 20, color: "#9ca3af", textAlign: "center" }}>
                  Ingen resultater.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
        {visible.length} av {PLANTS.length} planter · Hardiness sone H3 (Nesodden)
      </p>
    </div>
  )
}

const thStyle: React.CSSProperties = { padding: "6px 10px", color: "#6b7280", fontWeight: 600, fontSize: 12 }
const tdStyle: React.CSSProperties = { padding: "8px 10px", verticalAlign: "top" }
