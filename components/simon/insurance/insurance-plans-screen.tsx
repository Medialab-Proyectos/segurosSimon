"use client"

import { ArrowLeft, Car, Bike } from "lucide-react"
import { cn } from "@/lib/utils"

interface InsurancePlansScreenProps {
  onBack: () => void
  onQuote: () => void
  vehicleType?: "car" | "moto"
}

// ─── Vehicle Insurance Plans Screen ──────────────────────────────────────────
// MVP rule: no pricing, no detailed coverage list, no plan comparison.
// Shows general insurance description and vehicle type confirmation before quoting.
// TODO: When backend provides plan data, restore plan cards with pricing and coverage details.
export default function InsurancePlansScreen({ onBack, onQuote, vehicleType = "car" }: InsurancePlansScreenProps) {
  const isMotorcycle = vehicleType === "moto"

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
          <p className="text-muted-foreground text-xs">
            {isMotorcycle ? "Motocicleta" : "Automovil"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-5">
          {/* Vehicle type indicator */}
          <div
            className={cn(
              "rounded-2xl p-5 flex items-center gap-4",
              isMotorcycle
                ? "bg-[var(--brand-blue-light)]"
                : "bg-[var(--brand-green-light)]"
            )}
          >
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0",
                isMotorcycle ? "bg-accent/10" : "bg-primary/10"
              )}
            >
              {isMotorcycle
                ? <Bike size={28} className="text-accent" />
                : <Car size={28} className="text-primary" />
              }
            </div>
            <div>
              <p className={cn("font-bold text-base", isMotorcycle ? "text-accent" : "text-primary")}>
                {isMotorcycle ? "Motocicleta" : "Automovil"}
              </p>
              <p className="text-muted-foreground text-sm mt-0.5">
                Cobertura integral disponible
              </p>
            </div>
          </div>

          {/* General description */}
          <div className="bg-card rounded-2xl shadow-sm border border-border p-5 space-y-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Que cubre tu seguro?</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Con un seguro vehicular proteges tu {isMotorcycle ? "moto" : "vehiculo"} y a los demas en la via.
                Contamos con planes que se adaptan a tus necesidades y presupuesto.
              </p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="text-foreground font-semibold text-sm mb-3">Tipos de cobertura disponibles</p>
              <div className="space-y-3">
                {[
                  {
                    name: "Plan Basico",
                    desc: "Cobertura esencial de responsabilidad civil y asistencia.",
                  },
                  {
                    name: "Plan Estandar",
                    desc: "Proteccion ampliada con daños propios y asistencia 24/7.",
                  },
                  {
                    name: "Plan Full",
                    desc: "Cobertura completa incluyendo robo total y fenomenos naturales.",
                  },
                ].map(({ name, desc }) => (
                  <div key={name} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground text-sm font-medium">{name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            <p className="text-muted-foreground text-xs leading-relaxed">
              Un asesor te presentara los valores exactos segun tu vehiculo y perfil de conductor.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-card border-t border-border px-5 py-4 flex-shrink-0">
        <button
          onClick={onQuote}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-sm"
        >
          Solicitar Cotizacion
        </button>
      </div>
    </div>
  )
}
