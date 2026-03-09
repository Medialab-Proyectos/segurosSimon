"use client"

import { Bell, MapPin, Car, Shield, FileText, ChevronRight, TrendingUp } from "lucide-react"
import Image from "next/image"

interface HomeScreenProps {
  onNavigate?: (tab: string) => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="hero-gradient px-5 pb-10" style={{ paddingTop: "max(env(safe-area-inset-top, 16px), 16px)" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/70 text-sm font-medium">Bienvenido de vuelta</p>
            <h1 className="text-white text-xl font-bold">Carlos Rodriguez</h1>
          </div>
          <button className="relative p-2 rounded-full bg-white/20 backdrop-blur-sm" aria-label="Notificaciones">
            <Bell size={20} className="text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F6AD55]" aria-label="2 notificaciones" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <MapPin size={14} className="text-white/70" />
          <span className="text-white/70 text-xs">Bogota, Colombia</span>
        </div>

        {/* Vehicle Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-xs font-medium uppercase tracking-wide">Mi Vehiculo</span>
            <span className="text-white/70 text-xs">ABC-123</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg">Chevrolet Spark</p>
              <p className="text-white/60 text-sm">2021 - Negro - 1.2L</p>
            </div>
            <Car size={40} className="text-white/30" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 -mt-5">
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-3">Acciones rapidas</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Shield, label: "Seguros", color: "bg-[var(--brand-green-light)] text-primary", action: "services" },
              { icon: Car, label: "Asistencia", color: "bg-[var(--brand-blue-light)] text-accent", action: "" },
              { icon: FileText, label: "Documentos", color: "bg-amber-50 text-amber-500", action: "" },
            ].map(({ icon: Icon, label, color, action }) => (
              <button
                key={label}
                onClick={() => action && onNavigate?.(action)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted active:scale-95 transition-all"
              >
                <div className={`p-2.5 rounded-xl ${color}`}>
                  <Icon size={18} />
                </div>
                <span className="text-foreground text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="px-5 mt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield size={16} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-amber-800 text-sm font-semibold">Tu SOAT vence en 12 dias</p>
            <p className="text-amber-700 text-xs mt-0.5">Renueva ahora para evitar multas.</p>
          </div>
          <button
            onClick={() => onNavigate?.("services")}
            className="text-amber-700 text-xs font-bold whitespace-nowrap bg-amber-100 px-3 py-1.5 rounded-xl flex-shrink-0"
          >
            Renovar
          </button>
        </div>
      </div>

      {/* Promo Card with Image */}
      <div className="px-5 mt-4">
        <div className="relative rounded-2xl overflow-hidden h-36">
          <Image src="/images/car-shield.jpg" alt="Proteccion vehicular" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006D6F]/90 to-[#006D6F]/50" />
          <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-1">Oferta especial</p>
            <p className="text-white font-bold text-base leading-tight text-balance mb-3">SOAT con 15% de descuento</p>
            <button
              onClick={() => onNavigate?.("services")}
              className="bg-white text-[var(--brand-teal)] text-xs font-bold px-4 py-2 rounded-xl hover:bg-white/90 transition-colors w-fit"
            >
              Aprovechar
            </button>
          </div>
        </div>
      </div>

      {/* Driver Score */}
      <div className="px-5 mt-4">
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-foreground text-sm font-semibold">Driver Protection Score</p>
            <TrendingUp size={16} className="text-primary" />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#00B894" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset="40.84" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">75</span>
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-[var(--brand-green-light)] text-primary font-bold px-2 py-0.5 rounded-full">Protected Driver</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">Completa tu cobertura para subir a Premium Driver.</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {["Safe Driver", "Protected Driver", "Premium Driver"].map((level, i) => (
              <div key={level} className={`h-1.5 flex-1 rounded-full ${i <= 1 ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-5 mt-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-foreground text-sm font-semibold">Actividad reciente</p>
          <button className="text-primary text-xs font-medium flex items-center gap-0.5">
            Ver todo <ChevronRight size={12} />
          </button>
        </div>
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          {[
            { title: "SOAT Renovado", date: "15 Feb 2025", icon: Shield, color: "text-primary bg-[var(--brand-green-light)]" },
            { title: "Poliza descargada", date: "10 Ene 2025", icon: FileText, color: "text-accent bg-[var(--brand-blue-light)]" },
          ].map(({ title, date, icon: Icon, color }, i) => (
            <div key={title} className={`flex items-center gap-3 p-4 ${i > 0 ? "border-t border-border" : ""}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm font-medium">{title}</p>
                <p className="text-muted-foreground text-xs">{date}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
