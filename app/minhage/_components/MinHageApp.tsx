"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import BudsjettTab from "./BudsjettTab"
import KalenderTab from "./KalenderTab"
import SaaingTab from "./SaaingTab"
import PlanterTab from "./PlanterTab"

const MapTab = dynamic(() => import("./MapTab"), { ssr: false })

const TABS = [
  { id: "kart", label: "Kart", emoji: "🗺️" },
  { id: "planter", label: "Planter", emoji: "🌿" },
  { id: "budsjett", label: "Budsjett", emoji: "💰" },
  { id: "kalender", label: "Kalender", emoji: "📅" },
  { id: "saing", label: "Såing", emoji: "🌱" },
]

type Props = { userEmail: string; userName: string }

export default function MinHageApp({ userEmail }: Props) {
  const [activeTab, setActiveTab] = useState("kart")

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", paddingBottom: 80 }}>
      {/* Desktop tab bar */}
      <nav
        style={{
          display: "flex",
          gap: 4,
          padding: "16px 16px 0",
          borderBottom: "2px solid #e0e8dc",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              background: activeTab === tab.id ? "#fff" : "transparent",
              color: activeTab === tab.id ? "#2d6a26" : "#6b7280",
              fontWeight: activeTab === tab.id ? 700 : 400,
              fontSize: 14,
              cursor: "pointer",
              borderBottom: activeTab === tab.id ? "2px solid #fff" : "none",
              marginBottom: -2,
              transition: "all 0.15s",
            }}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab content */}
      <div style={{ background: "#fff", borderRadius: "0 0 12px 12px", minHeight: 600, padding: 20 }}>
        {activeTab === "kart" && <MapTab userEmail={userEmail} />}
        {activeTab === "planter" && <PlanterTab />}
        {activeTab === "budsjett" && <BudsjettTab userEmail={userEmail} />}
        {activeTab === "kalender" && <KalenderTab />}
        {activeTab === "saing" && <SaaingTab />}
      </div>

      {/* Mobile bottom tab bar */}
      <nav
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #e0e8dc",
          zIndex: 200,
          padding: "6px 0",
        }}
        className="mobile-tab-bar"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "6px 4px",
              border: "none",
              background: "transparent",
              color: activeTab === tab.id ? "#2d6a26" : "#9ca3af",
              fontSize: 10,
              cursor: "pointer",
              fontWeight: activeTab === tab.id ? 700 : 400,
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .mobile-tab-bar { display: flex !important; }
          nav:not(.mobile-tab-bar) { display: none !important; }
        }
      `}</style>
    </div>
  )
}
