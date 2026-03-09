"use client"

import { useState } from "react"
import { Home, Wrench, User } from "lucide-react"
import { cn } from "@/lib/utils"
import HomeScreen from "./screens/home-screen"
import ServicesScreen from "./screens/services-screen"
import ProfileScreen from "./screens/profile-screen"

type Tab = "home" | "services" | "profile"

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>("home")

  return (
    <div className="relative flex flex-col bg-background w-full" style={{ height: "100dvh" }}>
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "home" && <HomeScreen onNavigate={(tab) => setActiveTab(tab as Tab)} />}
        {activeTab === "services" && <ServicesScreen />}
        {activeTab === "profile" && <ProfileScreen />}
      </main>

      {/* Bottom Navigation */}
      <nav
        className="flex items-center justify-around bg-card border-t border-border px-4 pb-safe"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)", paddingTop: 8 }}
        aria-label="Main navigation"
      >
        {(
          [
            { id: "home", icon: Home, label: "Inicio" },
            { id: "services", icon: Wrench, label: "Servicios" },
            { id: "profile", icon: User, label: "Perfil" },
          ] as { id: Tab; icon: typeof Home; label: string }[]
        ).map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex flex-col items-center gap-1 px-6 py-1.5 rounded-2xl transition-all duration-200 min-w-[64px]",
              activeTab === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={activeTab === id ? "page" : undefined}
            aria-label={label}
          >
            <div className={cn("p-1.5 rounded-xl transition-all duration-200", activeTab === id ? "bg-[var(--brand-green-light)]" : "")}>
              <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 1.8} />
            </div>
            <span className={cn("text-[10px] font-medium transition-all", activeTab === id ? "font-semibold" : "")}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
