"use client"

import { useState } from "react"
import { ArrowLeft, Check, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface InsurancePlansScreenProps {
  onBack: () => void
  onQuote: () => void
}

// ─── Plan data ────────────────────────────────────────────────────────────────
// Req: una sola experiencia de planes, sin diferenciacion por tipo de vehiculo.
// Precios de referencia — el valor exacto se calcula segun vehiculo y perfil.
const plans = [
  {
    id: "basic",
    name: "Plan Basico",
    insurer: "Seguros Bolivar",
    description: "Cobertura esencial de responsabilidad civil con asistencia fundamental en via.",
    priceRef: "Desde $85.000/mes",
    badge: null as string | null,
    badgeClass: "",
    borderClass: "border-border",
    priceClass: "text-muted-foreground",
    coverages: [
      "Responsabilidad civil extracontractual",
      "Asistencia juridica basica",
      "Asistencia en carretera",
      "Grua en caso de accidente",
    ],
    exclusions: [
      "Danos propios del vehiculo",
      "Robo total o parcial",
      "Fenomenos naturales",
    ],
  },
  {
    id: "standard",
    name: "Plan Estandar",
    insurer: "Seguros del Estado",
    description: "Proteccion ampliada con danos propios y asistencia 24/7. Ideal para uso diario en ciudad.",
    priceRef: "Desde $145.000/mes",
    badge: "Mas popular",
    badgeClass: "bg-primary text-primary-foreground",
    borderClass: "border-primary",
    priceClass: "text-primary",
    coverages: [
      "Responsabilidad civil extracontractual",
      "Danos propios por accidente",
      "Robo parcial de partes",
      "Asistencia juridica",
      "Asistencia en carretera 24/7",
      "Grua en caso de accidente",
      "Vehiculo de reemplazo (hasta 3 dias)",
    ],
    exclusions: [
      "Robo total del vehiculo",
      "Fenomenos naturales",
    ],
  },
  {
    id: "full",
    name: "Plan Full",
    insurer: "Sura",
    description: "Cobertura completa con la mayor proteccion disponible. Sin preocupaciones en la via.",
    priceRef: "Desde $210.000/mes",
    badge: "Cobertura total",
    badgeClass: "bg-[var(--brand-teal)] text-white",
    borderClass: "border-[var(--brand-teal)]",
    priceClass: "text-[var(--brand-teal)]",
    coverages: [
      "Responsabilidad civil extracontractual",
      "Danos propios por accidente",
      "Robo total del vehiculo",
      "Robo parcial de partes",
      "Fenomenos naturales",
      "Asistencia juridica premium",
      "Asistencia en carretera 24/7",
      "Grua en caso de accidente",
      "Vehiculo de reemplazo (hasta 7 dias)",
      "Conductor designado",
      "Proteccion de accesorios",
    ],
    exclusions: [],
  },
]

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({ plan, onQuote }: { plan: typeof plans[0]; onQuote: () => void }) {
  const [expanded, setExpanded] = useState(plan.id === "standard")

  return (
    <div className={cn("bg-card rounded-2xl shadow-sm border-2 overflow-hidden", plan.borderClass)}>
      {/* Header */}
      <div className={cn("p-4", plan.id === "standard" ? "bg-[var(--brand-green-light)]/20" : "")}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold text-base">{plan.name}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{plan.insurer}</p>
          </div>
          {plan.badge && (
            <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap", plan.badgeClass)}>
              {plan.badge}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed mb-2">{plan.description}</p>
        <p className={cn("text-sm font-bold", plan.priceClass)}>{plan.priceRef}</p>
      </div>

      {/* Coverage toggle */}
      <div className="px-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-3 border-t border-border text-sm font-medium text-foreground"
        >
          <span>
            Ver coberturas
            <span className="ml-1.5 text-muted-foreground font-normal text-xs">({plan.coverages.length} incluidas)</span>
          </span>
          {expanded
            ? <ChevronUp size={15} className="text-muted-foreground" />
            : <ChevronDown size={15} className="text-muted-foreground" />
          }
        </button>

        {expanded && (
          <div className="pb-4 space-y-1.5">
            {plan.coverages.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[var(--brand-green-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={10} className="text-primary" strokeWidth={3} />
                </div>
                <p className="text-foreground text-xs leading-relaxed">{item}</p>
              </div>
            ))}
            {plan.exclusions.length > 0 && (
              <>
                <div className="h-px bg-border my-2" />
                <p className="text-muted-foreground text-[10px] font-semibold mb-1">No incluye:</p>
                {plan.exclusions.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={10} className="text-red-500" strokeWidth={3} />
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4 border-t border-border pt-3">
        <button
          onClick={onQuote}
          className={cn(
            "w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-95",
            plan.id === "standard"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border text-foreground hover:bg-muted/50"
          )}
        >
          Solicitar Cotizacion
        </button>
      </div>
    </div>
  )
}

// ─── Insurance Plans Screen ───────────────────────────────────────────────────
export default function InsurancePlansScreen({ onBack, onQuote }: InsurancePlansScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-foreground font-bold text-base">Seguro Vehicular</h2>
          <p className="text-muted-foreground text-xs">Elige el plan que mejor se adapta a ti</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Compara los planes disponibles. Un asesor de Promotec calculara el valor exacto segun tu vehiculo y perfil de conductor.
          </p>

          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onQuote={onQuote} />
          ))}

          <p className="text-muted-foreground text-xs text-center leading-relaxed px-4">
            * Los precios son referencias. El valor final se calcula segun tu vehiculo, modelo y historial.
          </p>
        </div>
      </div>
    </div>
  )
}
