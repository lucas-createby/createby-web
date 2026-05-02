"use client"

import { useState } from "react"

const BUTIKKER = ["Alle butikker", "Plantasjen", "Hageland", "Byggmax", "Coop Byggmix"]

type Tilbud = {
  produkt: string
  butikk?: string
  pris: string
  spar: string
  kategori: string
}

export default function TilbudTab() {
  const [butikk, setButikk] = useState("Alle butikker")
  const [loading, setLoading] = useState(false)
  const [tilbud, setTilbud] = useState<Tilbud[]>([])
  const [kilde, setKilde] = useState("")
  const [error, setError] = useState("")

  async function fetchTilbud() {
    setLoading(true)
    setError("")
    setTilbud([])
    setKilde("")

    const res = await fetch("/api/minhage/tilbud", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ butikk: butikk === "Alle butikker" ? null : butikk }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? "Kunne ikke hente tilbud. Prøv igjen.")
      setLoading(false)
      return
    }

    setTilbud(data.tilbud ?? [])
    setKilde(data.kilde ?? "")
    setLoading(false)
  }

  return (
    <div>
      <h2 style={{ margin: "0 0 6px", fontSize: 18, color: "#1a3a1a" }}>Hagetilbud</h2>
      <p style={{ margin: "0 0 16px", fontSize: 14, color: "#6b7280" }}>
        Søker etter aktuelle tilbud via AI + web-søk.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <select
          value={butikk}
          onChange={(e) => setButikk(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #c8ddc5",
            fontSize: 14,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {BUTIKKER.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <button
          onClick={fetchTilbud}
          disabled={loading}
          style={{
            background: loading ? "#9ca3af" : "#2d6a26",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.15s",
          }}
        >
          {loading ? "Søker..." : "Finn tilbud"}
        </button>
      </div>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, color: "#dc2626", fontSize: 14 }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <p style={{ margin: 0, fontSize: 14 }}>Søker etter tilbud hos {butikk}...</p>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#9ca3af" }}>Dette tar noen sekunder</p>
        </div>
      )}

      {!loading && tilbud.length > 0 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {tilbud.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #e0e8dc",
                  borderRadius: 10,
                  padding: 14,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
                  {t.butikk ?? butikk} · {t.kategori}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a3a1a", marginBottom: 6 }}>{t.produkt}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#2d6a26" }}>{t.pris}</span>
                  {t.spar && t.spar !== "0" && t.spar !== "" && (
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#d97706",
                        borderRadius: 6,
                        padding: "1px 6px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Spar {t.spar}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {kilde && (
            <p style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>Kilde: {kilde}</p>
          )}
        </>
      )}

      {!loading && tilbud.length === 0 && !error && (
        <div style={{ textAlign: "center", padding: 48, color: "#9ca3af" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏷️</div>
          <p style={{ margin: 0, fontSize: 14 }}>Velg butikk og klikk &quot;Finn tilbud&quot; for å søke.</p>
        </div>
      )}
    </div>
  )
}
