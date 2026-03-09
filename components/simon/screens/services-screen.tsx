"use client"

import { useState } from "react"
import { Shield, Car, FileText, ChevronRight } from "lucide-react"
import InsuranceModule from "../insurance/insurance-module"

type ServiceView = "list" | "insurance" | "assistance" | "documents"

export default function ServicesScreen() {
  const [view, setView] = useState<ServiceView>("list")

  if (view === "insurance") {
    return <InsuranceModule onBack={() => setView("list")} />
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="hero-gradient px-5 pb-10" style={{ paddingTop: "max(env(safe-area-inset-top, 16px), 16px)" }}>
        <h1 className="text-white text-xl font-bold">Servicios</h1>
        <p className="text-white/70 text-sm mt-1">Todo para tu vehículo</p>
      </div>

      <div className="px-5 -mt-5 pb-6">
        <div className="space-y-3">
          {[
            {
              id: "insurance" as ServiceView,
              icon: Shield,
              title: "Seguros",
              description: "SOAT y seguros todo riesgo para tu vehículo",
              badge: "2 activos",
              badgeColor: "bg-[var(--brand-green-light)] text-primary",
              iconBg: "bg-[var(--brand-green-light)] text-primary",
            },
            {
              id: "assistance" as ServiceView,
              icon: Car,
              title: "Asistencia",
              description: "Grúa, llanta pinchada y más en minutos",
              badge: "",
              badgeColor: "",
              iconBg: "bg-[var(--brand-blue-light)] text-accent",
            },
            {
              id: "documents" as ServiceView,
              icon: FileText,
              title: "Documentos",
              description: "Cartera virtual para todos tus papeles del vehículo",
              badge: "5 docs",
              badgeColor: "bg-amber-50 text-amber-600",
              iconBg: "bg-amber-50 text-amber-500",
            },
          ].map(({ id, icon: Icon, title, description, badge, badgeColor, iconBg }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4 hover:shadow-md transition-all text-left active:scale-[0.98]"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-foreground font-semibold text-base">{title}</p>
                  {badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="mt-4 teal-gradient rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full -translate-y-4 translate-x-4" />
          <div className="absolute right-8 bottom-0 w-16 h-16 bg-white/5 rounded-full translate-y-4" />
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-1">Oferta especial</p>
          <p className="text-white font-bold text-lg leading-tight text-balance mb-3">Obtén tu SOAT con 15% de descuento</p>
          <button className="bg-white text-[var(--brand-teal)] text-sm font-bold px-4 py-2 rounded-xl hover:bg-white/90 transition-colors">
            Aprovechar
          </button>
        </div>
      </div>
    </div>
  )
}
