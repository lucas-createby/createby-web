"use client"

import { useEffect, useState } from "react"

const KATEGORIER = ["Frø/planter", "Gjødsel/jord", "Verktøy", "Infrastruktur", "Drivhus", "Annet"]

type BudgetEntry = {
  id: string
  what: string
  shop: string
  amount: number
  category: string
  year: number
  date: string
  created_at: string
}

const YEAR = new Date().getFullYear()

export default function BudsjettTab({ userEmail }: { userEmail: string }) {
  const [entries, setEntries] = useState<BudgetEntry[]>([])
  const [form, setForm] = useState({
    what: "",
    shop: "",
    amount: "",
    category: "Frø/planter",
    date: new Date().toISOString().slice(0, 10),
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/minhage/budget")
      .then((r) => r.json())
      .then(setEntries)
  }, [])

  const total = entries.filter((e) => e.year === YEAR).reduce((sum, e) => sum + e.amount, 0)
  const byKat = KATEGORIER.map((k) => ({
    k,
    sum: entries.filter((e) => e.year === YEAR && e.category === k).reduce((s, e) => s + e.amount, 0),
  })).filter((r) => r.sum > 0)

  async function handleAdd(ev: React.FormEvent) {
    ev.preventDefault()
    if (!form.what || !form.amount) return
    setLoading(true)
    setError("")

    const res = await fetch("/api/minhage/budget", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        what: form.what,
        shop: form.shop,
        amount: Number(form.amount),
        category: form.category,
        year: YEAR,
        date: form.date,
      }),
    })

    if (!res.ok) {
      setError("Kunne ikke lagre.")
    } else {
      const newEntry = await res.json()
      setEntries((prev) => [newEntry, ...prev])
      setForm({ what: "", shop: "", amount: "", category: "Frø/planter", date: new Date().toISOString().slice(0, 10) })
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await fetch(`/api/minhage/budget?id=${id}`, { method: "DELETE" })
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, color: "#1a3a1a" }}>Budsjett {YEAR}</h2>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#2d6a26" }}>
          {total.toLocaleString("nb-NO")} kr
        </span>
      </div>

      {/* Category summary */}
      {byKat.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {byKat.map(({ k, sum }) => (
            <span
              key={k}
              style={{
                background: "#e8f5e8",
                border: "1px solid #c8ddc5",
                borderRadius: 20,
                padding: "3px 10px",
                fontSize: 13,
                color: "#1a3a1a",
              }}
            >
              {k}: {sum.toLocaleString("nb-NO")} kr
            </span>
          ))}
        </div>
      )}

      {/* Add form */}
      <form
        onSubmit={handleAdd}
        style={{
          background: "#f4f7f3",
          border: "1px solid #c8ddc5",
          borderRadius: 10,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <p style={{ margin: "0 0 10px", fontWeight: 600, fontSize: 14, color: "#1a3a1a" }}>Ny utgift</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <input
            placeholder="Hva *"
            value={form.what}
            onChange={(e) => setForm({ ...form, what: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            placeholder="Butikk"
            value={form.shop}
            onChange={(e) => setForm({ ...form, shop: e.target.value })}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Beløp (kr) *"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            min={0}
            style={inputStyle}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={inputStyle}
          >
            {KATEGORIER.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            style={inputStyle}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#2d6a26",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 16px",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {loading ? "Lagrer..." : "Legg til"}
          </button>
        </div>
        {error && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 6 }}>{error}</p>}
      </form>

      {/* Entries list */}
      {entries.length === 0 ? (
        <p style={{ color: "#9ca3af", fontSize: 14 }}>Ingen utgifter registrert ennå.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e0e8dc", textAlign: "left" }}>
              <th style={thStyle}>Dato</th>
              <th style={thStyle}>Hva</th>
              <th style={thStyle}>Butikk</th>
              <th style={thStyle}>Kategori</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Beløp</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={tdStyle}>{e.date || "-"}</td>
                <td style={tdStyle}>{e.what}</td>
                <td style={{ ...tdStyle, color: "#6b7280" }}>{e.shop || "-"}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#e8f5e8",
                      borderRadius: 10,
                      padding: "1px 8px",
                      fontSize: 12,
                    }}
                  >
                    {e.category}
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 600 }}>
                  {e.amount.toLocaleString("nb-NO")} kr
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleDelete(e.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontSize: 16,
                      padding: "2px 4px",
                    }}
                    title="Slett"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ marginTop: 8, fontSize: 12, color: "#9ca3af" }}>Innlogget som {userEmail}</p>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #c8ddc5",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
}

const thStyle: React.CSSProperties = {
  padding: "6px 8px",
  color: "#6b7280",
  fontWeight: 600,
  fontSize: 12,
}

const tdStyle: React.CSSProperties = {
  padding: "8px 8px",
  verticalAlign: "middle",
}
