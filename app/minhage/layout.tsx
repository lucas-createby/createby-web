import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { signOut } from "@/auth"

export const metadata = { title: "Min Hage" }

export default async function MinHageLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/api/auth/signin")

  return (
    <div style={{ minHeight: "100vh", background: "#f4f7f3", fontFamily: "sans-serif" }}>
      <header
        style={{
          background: "#2d6a26",
          color: "#fff",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🌿</span>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Min Hage</span>
          <span style={{ opacity: 0.6, fontSize: 13, marginLeft: 4 }}>Mossesvei 14, Hellvik</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, opacity: 0.85 }}>{session.user.name ?? session.user.email}</span>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <button
              type="submit"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                borderRadius: 6,
                padding: "4px 12px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Logg ut
            </button>
          </form>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
