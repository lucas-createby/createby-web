"use client"

import { useState } from "react"
import { getSunTimes } from "@/lib/hage-sun"

const LAT = 59.836
const LON = 10.626

const MONTHS = [
  "Januar", "Februar", "Mars", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Desember",
]

type Task = { text: string; type: "sa" | "plant" | "host" | "stell" }

const CALENDAR: { tasks: Task[]; note: string }[] = [
  {
    tasks: [
      { text: "Bestill frø og planter", type: "stell" },
      { text: "Planlegg vekstskifte", type: "stell" },
    ],
    note: "Jorda hviler. Gjennomgå fjorårets erfaringer.",
  },
  {
    tasks: [
      { text: "Forvarm drivhuset", type: "stell" },
      { text: "Så tomater og paprika innendørs", type: "sa" },
      { text: "Så selleri innendørs", type: "sa" },
    ],
    note: "Start tidligkultur i drivhus fra slutten av måneden.",
  },
  {
    tasks: [
      { text: "Så løk og purreløk innendørs", type: "sa" },
      { text: "Pott om tomater og paprika", type: "stell" },
      { text: "Gjødsle jord i bedet", type: "stell" },
      { text: "Beskjær frukttrær (før knoppskyting)", type: "stell" },
    ],
    note: "Vær obs på nattefrost. Dekk til uteplanter ved behov.",
  },
  {
    tasks: [
      { text: "Plant poteter (etter 15. april)", type: "plant" },
      { text: "Så gulrot, pastinakk, spinat", type: "sa" },
      { text: "Plant løk utendørs", type: "plant" },
      { text: "Så erter utendørs", type: "sa" },
      { text: "Gjødsle hagen", type: "stell" },
    ],
    note: "Nesodden: relativt milde aprilnetter, men vær forberedt på frost.",
  },
  {
    tasks: [
      { text: "Plant ut tomater og paprika (etter 15. mai)", type: "plant" },
      { text: "Så bønner, squash, agurk", type: "sa" },
      { text: "Plant jordbær", type: "plant" },
      { text: "Vann regelmessig", type: "stell" },
      { text: "Ugras — ukentlig rydding", type: "stell" },
    ],
    note: "Frostrisiko avtar. Kan plante ut varmekjære vekster fra midten av måneden.",
  },
  {
    tasks: [
      { text: "Høst salat, spinat og erter", type: "host" },
      { text: "Jordbær — høst og fjern løpere", type: "host" },
      { text: "Vann daglig ved varme perioder", type: "stell" },
      { text: "Knivsett tomater", type: "stell" },
    ],
    note: "Lange dagslengder. Sol fra ~04:30 til ~22:00 på Nesodden.",
  },
  {
    tasks: [
      { text: "Høst tomater (de første)", type: "host" },
      { text: "Høst poteter (prøv fra slutten av måneden)", type: "host" },
      { text: "Sår nykål og kinarot for høsthøsting", type: "sa" },
      { text: "Tynn og vann gulrot", type: "stell" },
    ],
    note: "Juli er høysesong. Hold vanningen jevn.",
  },
  {
    tasks: [
      { text: "Høst poteter", type: "host" },
      { text: "Høst gulrot, bønner, squash", type: "host" },
      { text: "Høst epler og pærer (etter modningstid)", type: "host" },
      { text: "Lagre rotgrønnsaker kjølig", type: "stell" },
    ],
    note: "Stor høst. Start innlagring.",
  },
  {
    tasks: [
      { text: "Høst siste tomater og paprika", type: "host" },
      { text: "Høst kål", type: "host" },
      { text: "Rydd bedet og tilsett kompost", type: "stell" },
      { text: "Plant høstløk til neste år", type: "plant" },
    ],
    note: "Dagslengden avtar raskt. Forbered hagen på høst.",
  },
  {
    tasks: [
      { text: "Rydd og vask drivhuset", type: "stell" },
      { text: "Tilsett høstgjødsel / kompost", type: "stell" },
      { text: "Dekk jordbær med halm", type: "stell" },
      { text: "Beskjær bærbusker", type: "stell" },
    ],
    note: "Oktober: første frost mulig. Dekk til frostømfintlige vekster.",
  },
  {
    tasks: [
      { text: "Plant vinterroser / julerose", type: "plant" },
      { text: "Forbered kompostbinge", type: "stell" },
      { text: "Rydd løvfall fra bedet", type: "stell" },
    ],
    note: "Sesongen er over. Hagen hviler.",
  },
  {
    tasks: [
      { text: "Gjennomgå frøbeholdningen", type: "stell" },
      { text: "Bestill nye frø til neste sesong", type: "stell" },
      { text: "Planlegg neste års layout", type: "stell" },
    ],
    note: "Desember: julequieter i hagen.",
  },
]

const TYPE_COLORS: Record<string, string> = {
  sa: "#2563eb",
  plant: "#2d6a26",
  host: "#d97706",
  stell: "#7c3aed",
}
const TYPE_LABELS: Record<string, string> = {
  sa: "Så",
  plant: "Plant",
  host: "Høst",
  stell: "Stell",
}

export default function KalenderTab() {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth())

  const sunDate = new Date(2026, activeMonth, 15)
  const sun = getSunTimes(LAT, LON, sunDate)

  return (
    <div>
      <h2 style={{ margin: "0 0 16px", fontSize: 18, color: "#1a3a1a" }}>Plantekalender — Nesodden H3</h2>

      {/* Month selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 20 }}>
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setActiveMonth(i)}
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              border: "1px solid",
              borderColor: activeMonth === i ? "#2d6a26" : "#c8ddc5",
              background: activeMonth === i ? "#2d6a26" : "transparent",
              color: activeMonth === i ? "#fff" : "#374151",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: activeMonth === i ? 700 : 400,
            }}
          >
            {m.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Month content */}
      <div
        style={{
          background: "#f4f7f3",
          border: "1px solid #c8ddc5",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 20, color: "#1a3a1a" }}>{MONTHS[activeMonth]}</h3>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            Sol: {sun.sunrise} — {sun.sunset} ({sun.daylightHours}t dagslys)
          </span>
        </div>

        {CALENDAR[activeMonth].note && (
          <p style={{ margin: "0 0 14px", fontSize: 14, color: "#4b5563", fontStyle: "italic" }}>
            {CALENDAR[activeMonth].note}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CALENDAR[activeMonth].tasks.map((task, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#fff",
                borderRadius: 8,
                padding: "8px 12px",
                border: "1px solid #e0e8dc",
              }}
            >
              <span
                style={{
                  background: TYPE_COLORS[task.type] + "22",
                  color: TYPE_COLORS[task.type],
                  borderRadius: 10,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  minWidth: 40,
                  textAlign: "center",
                }}
              >
                {TYPE_LABELS[task.type]}
              </span>
              <span style={{ fontSize: 14, color: "#1a3a1a" }}>{task.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
        {Object.entries(TYPE_LABELS).map(([k, v]) => (
          <span key={k} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: TYPE_COLORS[k],
                display: "inline-block",
              }}
            />
            {v}
          </span>
        ))}
      </div>
    </div>
  )
}
