"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Home } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Floating Input ───────────────────────────────────────────────────────────
interface FloatingInputProps {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
}

function FloatingInput({ label, type = "text", value, onChange, error, placeholder }: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <div
        className={cn(
          "relative border-2 rounded-xl transition-all duration-200 bg-card",
          error ? "border-destructive" : isActive ? "border-primary" : "border-border"
        )}
      >
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none font-medium",
            isActive
              ? "top-2 text-[10px] text-muted-foreground"
              : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
          )}
        >
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isActive ? placeholder : ""}
          className="w-full bg-transparent pt-6 pb-2 px-4 text-foreground text-sm outline-none rounded-xl"
        />
      </div>
      {error && <p className="mt-1 text-destructive text-xs px-1">{error}</p>}
    </div>
  )
}

// ─── Quote Flow ───────────────────────────────────────────────────────────────
// MVP rule: no internal pricing or coverage selection. Collects vehicle info only.
// An advisor contacts the user with tailored options.
// TODO: When backend provides pricing, add coverage selection step before submission.
interface QuoteFlowScreenProps {
  onBack: () => void
}

export default function QuoteFlowScreen({ onBack }: QuoteFlowScreenProps) {
  const [done, setDone] = useState(false)
  const [vehicleType, setVehicleType] = useState<"car" | "moto">("car")
  const [plate, setPlate] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!plate.trim() || plate.length < 5) errs.plate = "Ingresa un numero de placa valido (ej: ABC123)"
    if (!model.trim()) errs.model = "Ingresa la marca y modelo"
    if (!year.trim()) errs.year = "Año del vehiculo requerido"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  /* ───── Success ───── */
  if (done) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0">
          <h2 className="text-foreground font-bold text-base">Solicitud enviada</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--brand-green-light)] flex items-center justify-center mb-5">
            <CheckCircle size={40} className="text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="text-foreground text-xl font-bold mb-2">Recibimos tu solicitud</h2>
          <p className="text-muted-foreground text-sm leading-relaxed text-balance mb-8 max-w-64">
            Un asesor revisara tu informacion y te contactara pronto para presentarte las mejores opciones.
          </p>
          <button
            onClick={onBack}
            className="w-full text-muted-foreground text-sm font-medium py-3 flex items-center justify-center gap-2 hover:text-foreground transition-colors"
          >
            <Home size={15} />
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  /* ───── Form ───── */
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Volver">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-foreground font-bold text-base">Cotizar Seguro</h2>
          <p className="text-muted-foreground text-xs">Cuentanos sobre tu vehiculo</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-4">
          <div>
            <p className="text-foreground text-base font-bold mb-1">Informacion del vehiculo</p>
            <p className="text-muted-foreground text-sm">Un asesor te contactara con las mejores opciones.</p>
          </div>

          {/* Vehicle type */}
          <div className="flex gap-2">
            {[
              { id: "car" as const, label: "Automovil" },
              { id: "moto" as const, label: "Motocicleta" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setVehicleType(id)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all",
                  vehicleType === id
                    ? "border-primary bg-[var(--brand-green-light)] text-primary"
                    : "border-border bg-card text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <FloatingInput label="Numero de placa" placeholder="Ej: ABC123" value={plate} onChange={setPlate} error={errors.plate} />
          <FloatingInput label="Marca y modelo" placeholder="Ej: Chevrolet Spark" value={model} onChange={setModel} error={errors.model} />
          <FloatingInput label="Año del vehiculo" type="number" placeholder="Ej: 2021" value={year} onChange={setYear} error={errors.year} />
        </div>
      </div>

      <div className="bg-card border-t border-border px-5 py-4 flex-shrink-0">
        <button
          onClick={() => { if (validate()) setDone(true) }}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-sm"
        >
          Solicitar Cotizacion
        </button>
      </div>
    </div>
  )
}
