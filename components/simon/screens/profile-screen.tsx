"use client"

import { ChevronRight, User, Car, Bell, Shield, HelpCircle, LogOut, Star, Settings } from "lucide-react"

export default function ProfileScreen() {
  const menuSections = [
    {
      title: "Cuenta",
      items: [
        { icon: User, label: "Información personal", detail: "Actualizar datos" },
        { icon: Car, label: "Mis vehículos", detail: "1 vehículo" },
        { icon: Bell, label: "Notificaciones", detail: "Activas" },
      ],
    },
    {
      title: "Seguridad",
      items: [
        { icon: Shield, label: "Seguridad y privacidad", detail: "" },
        { icon: Settings, label: "Configuración", detail: "" },
      ],
    },
    {
      title: "Soporte",
      items: [
        { icon: Star, label: "Calificar la app", detail: "" },
        { icon: HelpCircle, label: "Centro de ayuda", detail: "" },
      ],
    },
  ]

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="hero-gradient px-5 pb-10" style={{ paddingTop: "max(env(safe-area-inset-top, 16px), 16px)" }}>
        <h1 className="text-white text-xl font-bold mb-4">Perfil</h1>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">CR</span>
          </div>
          <div>
            <p className="text-white font-bold text-lg">Carlos Rodríguez</p>
            <p className="text-white/70 text-sm">carlos@email.com</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full">Protected Driver</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-5 mb-4">
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border grid grid-cols-3 gap-3">
          {[
            { value: "2", label: "Seguros activos" },
            { value: "75", label: "Score conductor" },
            { value: "3 años", label: "Con Simon" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-foreground text-xl font-bold">{value}</p>
              <p className="text-muted-foreground text-[10px] leading-tight mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-5 space-y-4 mb-4">
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-2 px-1">{section.title}</p>
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
              {section.items.map(({ icon: Icon, label, detail }, i) => (
                <button
                  key={label}
                  className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 transition-colors text-left ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                    <Icon size={17} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-medium">{label}</p>
                    {detail && <p className="text-muted-foreground text-xs">{detail}</p>}
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-red-50 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <LogOut size={17} className="text-destructive" />
            </div>
            <p className="text-destructive text-sm font-medium flex-1 text-left">Cerrar sesión</p>
          </button>
        </div>

        <p className="text-center text-muted-foreground text-xs pb-2">Simon v2.4.1 · Términos · Privacidad</p>
      </div>
    </div>
  )
}
