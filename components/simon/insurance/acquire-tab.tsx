"use client"

import { useState } from "react"
import { Shield, Car, Eye, Phone, MessageCircle, UserPlus, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import InsurancePlansScreen from "./insurance-plans-screen"
import SoatPurchaseScreen from "./soat-purchase-screen"
import QuoteFlowScreen from "./quote-flow-screen"
import { cn } from "@/lib/utils"

type AcquireView = "list" | "plans" | "quote" | "soat"

interface AcquireTabProps {
  initialView?: AcquireView
  onViewReset?: () => void
}

// ─── Advisor Contact Component ────────────────────────────────────────────────
// Rule 7: must offer Call, WhatsApp, and Leave contact information.
function AdvisorContact() {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (name.trim() && phone.trim()) setSubmitted(true)
  }

  return (
    <div className="border-t border-border pt-3 mt-1">
      <p className="text-muted-foreground text-xs font-medium mb-2.5 px-1">Habla con un asesor</p>
      <div className="flex gap-2">
        <a
          href="tel:+571234567890"
          className="flex-1 flex items-center justify-center gap-1.5 border border-border text-foreground text-xs font-medium py-2.5 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <Phone size={13} />
          Llamar
        </a>
        <a
          href="https://wa.me/571234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 border border-border text-foreground text-xs font-medium py-2.5 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <MessageCircle size={13} />
          WhatsApp
        </a>
        <button
          onClick={() => setShowForm(!showForm)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1 border text-xs font-medium py-2.5 rounded-xl transition-colors",
            showForm
              ? "border-primary bg-[var(--brand-green-light)] text-primary"
              : "border-border text-foreground hover:bg-muted/50"
          )}
        >
          <UserPlus size={13} />
          Mis datos
          {showForm ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>

      {showForm && !submitted && (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground bg-card outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
          />
          <input
            type="tel"
            placeholder="Tu numero de celular"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground bg-card outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all"
          >
            Un asesor te contactara
          </button>
        </div>
      )}

      {showForm && submitted && (
        <div className="mt-3 bg-[var(--brand-green-light)] rounded-xl p-3 text-center">
          <p className="text-primary text-sm font-semibold">Recibimos tu solicitud</p>
          <p className="text-muted-foreground text-xs mt-0.5">Te contactaremos pronto.</p>
        </div>
      )}
    </div>
  )
}

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export default function AcquireTab({ initialView = "list", onViewReset }: AcquireTabProps) {
  const [view, setView] = useState<AcquireView>(initialView)
  const [vehicleType, setVehicleType] = useState<"car" | "moto">("car")

  if (view === "soat") {
    return <SoatPurchaseScreen onBack={() => { setView("list"); onViewReset?.() }} />
  }
  if (view === "plans") {
    return (
      <InsurancePlansScreen
        onBack={() => { setView("list"); onViewReset?.() }}
        onQuote={() => setView("quote")}
        vehicleType={vehicleType}
      />
    )
  }
  if (view === "quote") {
    return <QuoteFlowScreen onBack={() => setView("plans")} />
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-background">
      <div className="px-5 pt-5 pb-8 space-y-5">
        <div>
          <h2 className="text-foreground text-lg font-bold">Protege tu vehiculo</h2>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
            Adquiere un seguro para tu carro o moto en minutos.
          </p>
        </div>

        {/* ─── SOAT Card ─── */}
        {/* Price removed — NPM backend cannot provide pricing reliably (MVP) */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <Image
              src="/images/soat-hero.jpg"
              alt="Familia protegida viajando en su vehiculo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center">
                <Shield size={16} className="text-primary" />
              </div>
              <span className="text-[10px] bg-primary text-primary-foreground font-bold px-2.5 py-1 rounded-full shadow-sm">
                Obligatorio
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-bold text-xl">SOAT</p>
              <p className="text-white/80 text-xs leading-relaxed">
                Seguro Obligatorio de Accidentes de Transito
              </p>
            </div>
          </div>

          <div className="p-4">
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Requerido por ley para circular. Cubre accidentes, fallecimiento y gastos medicos de victimas.
            </p>
            <button
              onClick={() => setView("soat")}
              className="w-full bg-primary text-primary-foreground text-sm font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
            >
              <Shield size={15} />
              Comprar SOAT
            </button>
            <AdvisorContact />
          </div>
        </div>

        {/* ─── Vehicle Insurance Card ─── */}
        {/* Removed: pricing, policy type badge ("Todo Riesgo"), detailed coverage list, duplicate Cotizar CTA */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <Image
              src="/images/vehicle-insurance-hero.jpg"
              alt="Vehiculo premium protegido"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <div className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center">
                <Car size={16} className="text-[var(--brand-teal)]" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-bold text-xl">Seguro Vehicular</p>
              <p className="text-white/80 text-xs leading-relaxed">
                Cobertura integral para tu vehiculo
              </p>
            </div>
          </div>

          <div className="p-4">
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Protege tu vehiculo ante robo, accidentes y responsabilidad civil. Elige el plan que se adapta a tus necesidades.
            </p>

            {/* Vehicle type selector — passes selection into plans/quote flow */}
            <div className="flex gap-2 mb-4">
              {[
                { id: "car" as const, label: "Automovil" },
                { id: "moto" as const, label: "Motocicleta" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setVehicleType(id)}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all",
                    vehicleType === id
                      ? "border-[var(--brand-teal)] bg-[var(--brand-blue-light)] text-[var(--brand-teal)]"
                      : "border-border bg-card text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Single CTA — "Ver Planes" is the only entry point to quotation (rule 9) */}
            <button
              onClick={() => setView("plans")}
              className="w-full bg-accent text-accent-foreground text-sm font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 active:scale-95 transition-all"
            >
              <Eye size={15} />
              Ver Planes
            </button>
            <AdvisorContact />
          </div>
        </div>

        {/* Benefits — TODO: Replace copy with exact text from Promotec website (pending marketing approval) */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
          <p className="text-foreground font-semibold text-sm mb-4">Por que Simon?</p>
          <div className="space-y-4">
            {[
              { title: "100% digital", desc: "Compra en menos de 5 minutos", color: "bg-[var(--brand-green-light)] text-primary" },
              { title: "Seguro y confiable", desc: "Aliados con las mejores aseguradoras", color: "bg-[var(--brand-blue-light)] text-accent" },
              { title: "Soporte 24/7", desc: "Asesoria personalizada siempre", color: "bg-amber-50 text-amber-500" },
            ].map(({ title, desc, color }) => (
              <div key={title} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Shield size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium">{title}</p>
                  <p className="text-muted-foreground text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
