"use client"

import { useEffect, useRef, useState } from "react"

// Mosses vei 14, 1459 Nesodden
const CENTER: [number, number] = [59.8428527, 10.6787342]
const DEFAULT_ZOOM = 19
const MAX_ZOOM = 22

const MARKER_TYPES = [
  { id: "gronnsak", label: "Grønnsak", color: "#2d6a26", emoji: "🥦" },
  { id: "frukt", label: "Frukt", color: "#e67e22", emoji: "🍓" },
  { id: "drivhus", label: "Drivhus", color: "#3498db", emoji: "🏠" },
  { id: "lek", label: "Lek", color: "#9b59b6", emoji: "🎪" },
  { id: "sitte", label: "Sitte", color: "#795548", emoji: "🪑" },
  { id: "bed", label: "Bed", color: "#e91e63", emoji: "🌸" },
]

const AREA_COLORS = [
  "#2d6a26", "#e67e22", "#3498db", "#9b59b6", "#e91e63", "#795548",
]

type GardenMarker = {
  id: string
  lat: number
  lng: number
  type_id: string
  label: string
  color: string
}

type GardenArea = {
  id: string
  name: string
  color: string
  geojson: object
}

type AddForm = { type_id: string; label: string; lat: number; lng: number }

export default function MapTab({ userEmail }: { userEmail: string }) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const drawnItemsRef = useRef<any>(null)
  const layerToIdRef = useRef<Map<unknown, string>>(new Map())
  const [markers, setMarkers] = useState<GardenMarker[]>([])
  const [areas, setAreas] = useState<GardenArea[]>([])
  const [addForm, setAddForm] = useState<AddForm | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeColor, setActiveColor] = useState(AREA_COLORS[0])

  const activeColorRef = useRef(activeColor)
  useEffect(() => { activeColorRef.current = activeColor }, [activeColor])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    let aborted = false

    async function initMap() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (await import("leaflet")).default as any

      // leaflet-draw expects window.L
      if (typeof window !== "undefined") (window as any).L = L
      await import("leaflet-draw")

      if (aborted || !mapRef.current) return
      if ((mapRef.current as any)._leaflet_id) return

      // Fix default icons
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const map = L.map(mapRef.current, { maxZoom: MAX_ZOOM }).setView(CENTER, DEFAULT_ZOOM)
      mapInstanceRef.current = map

      const satellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Esri", maxZoom: MAX_ZOOM, maxNativeZoom: 19 }
      )
      const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "OpenStreetMap", maxZoom: MAX_ZOOM,
      })
      const topo = L.tileLayer(
        "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}",
        { attribution: "Kartverket", maxZoom: 20 }
      )
      satellite.addTo(map)
      L.control.layers({ Satellitt: satellite, Kart: osm, Topokart: topo }).addTo(map)

      // Feature group for drawn areas
      const drawnItems = new L.FeatureGroup()
      map.addLayer(drawnItems)
      drawnItemsRef.current = drawnItems

      // Draw control
      const drawControl = new L.Control.Draw({
        position: "topleft",
        edit: { featureGroup: drawnItems, remove: true },
        draw: {
          polygon: {
            shapeOptions: { color: activeColorRef.current, fillColor: activeColorRef.current, fillOpacity: 0.2, weight: 2 },
            allowIntersection: false,
          },
          rectangle: {
            shapeOptions: { color: activeColorRef.current, fillColor: activeColorRef.current, fillOpacity: 0.2, weight: 2 },
          },
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
        },
      })
      map.addControl(drawControl)

      // Created: save to Supabase
      map.on(L.Draw.Event.CREATED, async (e: any) => {
        const layer = e.layer
        const color = activeColorRef.current
        if (layer.setStyle) layer.setStyle({ color, fillColor: color, fillOpacity: 0.2, weight: 2 })
        drawnItems.addLayer(layer)

        const res = await fetch("/api/minhage/areas", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: "", color, geojson: layer.toGeoJSON() }),
        })
        const newArea = await res.json()
        if (newArea.id) {
          layerToIdRef.current.set(layer, newArea.id)
          setAreas(prev => [...prev, newArea])
        }
      })

      // Edited: update in Supabase
      map.on(L.Draw.Event.EDITED, async (e: any) => {
        const promises: Promise<void>[] = []
        e.layers.eachLayer((layer: any) => {
          const id = layerToIdRef.current.get(layer)
          if (id) {
            promises.push(
              fetch(`/api/minhage/areas?id=${id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ geojson: layer.toGeoJSON() }),
              }).then(() => {})
            )
          }
        })
        await Promise.all(promises)
      })

      // Deleted: remove from Supabase
      map.on(L.Draw.Event.DELETED, async (e: any) => {
        const promises: Promise<void>[] = []
        e.layers.eachLayer((layer: any) => {
          const id = layerToIdRef.current.get(layer)
          if (id) {
            layerToIdRef.current.delete(layer)
            promises.push(
              fetch(`/api/minhage/areas?id=${id}`, { method: "DELETE" }).then(() => {})
            )
            setAreas(prev => prev.filter(a => a.id !== id))
          }
        })
        await Promise.all(promises)
      })

      // Click = add point marker
      map.on("click", (e: any) => {
        setAddForm({ type_id: "gronnsak", label: "", lat: e.latlng.lat, lng: e.latlng.lng })
      })

      // Load markers
      const mRes = await fetch("/api/minhage/markers")
      const mData: GardenMarker[] = await mRes.json()
      if (Array.isArray(mData)) {
        setMarkers(mData)
        mData.forEach(m => addLeafletMarker(L, map, m))
      }

      // Load areas
      const aRes = await fetch("/api/minhage/areas")
      const aData: GardenArea[] = await aRes.json()
      if (Array.isArray(aData)) {
        setAreas(aData)
        aData.forEach(area => {
          try {
            const geoLayer = L.geoJSON(area.geojson, {
              style: { color: area.color, fillColor: area.color, fillOpacity: 0.2, weight: 2 },
            })
            geoLayer.eachLayer((l: any) => {
              drawnItems.addLayer(l)
              layerToIdRef.current.set(l, area.id)
            })
          } catch { /* skip malformed */ }
        })
      }
    }

    initMap()

    return () => {
      aborted = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        layerToIdRef.current.clear()
      }
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addLeafletMarker(L: any, map: any, m: GardenMarker) {
    const type = MARKER_TYPES.find(t => t.id === m.type_id)
    const icon = L.divIcon({
      html: `<div style="background:${m.color};width:28px;height:28px;border-radius:50%;border:3px solid #fff;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${type?.emoji ?? "📍"}</div>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })
    L.marker([m.lat, m.lng], { icon })
      .addTo(map)
      .bindPopup(`<b>${m.label || type?.label}</b><br/><small>${m.type_id}</small>`)
  }

  async function handleAddMarker() {
    if (!addForm) return
    setLoading(true)
    const type = MARKER_TYPES.find(t => t.id === addForm.type_id)
    const res = await fetch("/api/minhage/markers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...addForm, color: type?.color ?? "#2d6a26" }),
    })
    const newMarker = await res.json()
    setMarkers(prev => [...prev, newMarker])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (await import("leaflet")).default as any
    const map = mapInstanceRef.current
    if (map) addLeafletMarker(L, map, newMarker)
    setAddForm(null)
    setLoading(false)
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <h2 style={{ margin: 0, fontSize: 18, color: "#1a3a1a" }}>Hagekart</h2>
        <span style={{ fontSize: 12, color: "#6b7280" }}>Mosses vei 14, Nesodden</span>
      </div>

      {/* CSS */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css" />

      {/* Fargevalg for nye områder */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "#6b7280" }}>Farger for nye områder:</span>
        {AREA_COLORS.map(c => (
          <button
            key={c}
            onClick={() => setActiveColor(c)}
            style={{
              width: 20, height: 20, borderRadius: "50%", background: c, border: "none",
              cursor: "pointer", outline: activeColor === c ? `3px solid ${c}` : "none",
              outlineOffset: 2,
            }}
          />
        ))}
      </div>

      <div ref={mapRef} style={{ height: 520, borderRadius: 10, overflow: "hidden", border: "1px solid #c8ddc5" }} />

      <p style={{ margin: "8px 0 0", fontSize: 12, color: "#9ca3af" }}>
        Klikk i kartet for å plassere markør · Bruk ▲ ■ i verktøylinjen for å tegne områder · ✏️ for å redigere · 🗑️ for å slette
      </p>

      {/* Legg til markør */}
      {addForm && (
        <div style={{ marginTop: 12, background: "#f4f7f3", border: "1px solid #c8ddc5", borderRadius: 10, padding: 16 }}>
          <p style={{ margin: "0 0 10px", fontSize: 14, color: "#374151" }}>
            Ny markør på {addForm.lat.toFixed(5)}, {addForm.lng.toFixed(5)}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select value={addForm.type_id} onChange={e => setAddForm({ ...addForm, type_id: e.target.value })}
              style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #c8ddc5", fontSize: 14 }}>
              {MARKER_TYPES.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.label}</option>)}
            </select>
            <input placeholder="Etikett (valgfri)" value={addForm.label}
              onChange={e => setAddForm({ ...addForm, label: e.target.value })}
              style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #c8ddc5", fontSize: 14, flex: 1, minWidth: 140 }} />
            <button onClick={handleAddMarker} disabled={loading}
              style={{ background: "#2d6a26", color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", fontSize: 14, cursor: "pointer" }}>
              {loading ? "Lagrer..." : "Legg til"}
            </button>
            <button onClick={() => setAddForm(null)}
              style={{ background: "transparent", border: "1px solid #c8ddc5", borderRadius: 6, padding: "6px 12px", fontSize: 14, cursor: "pointer", color: "#6b7280" }}>
              Avbryt
            </button>
          </div>
        </div>
      )}

      {/* Markør-liste */}
      {markers.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 5 }}>
          {markers.map(m => {
            const type = MARKER_TYPES.find(t => t.id === m.type_id)
            return (
              <span key={m.id} style={{ background: m.color + "22", border: `1px solid ${m.color}66`, borderRadius: 20, padding: "2px 9px", fontSize: 12, color: "#1a3a1a" }}>
                {type?.emoji} {m.label || type?.label}
              </span>
            )
          })}
        </div>
      )}

      {/* Område-liste */}
      {areas.length > 0 && (
        <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 5 }}>
          {areas.map(a => (
            <span key={a.id} style={{ background: a.color + "22", border: `1px solid ${a.color}66`, borderRadius: 20, padding: "2px 9px", fontSize: 12, color: "#1a3a1a" }}>
              ▧ {a.name || "Område"}
            </span>
          ))}
        </div>
      )}

      <p style={{ marginTop: 8, fontSize: 12, color: "#9ca3af" }}>Innlogget som {userEmail}</p>
    </div>
  )
}
