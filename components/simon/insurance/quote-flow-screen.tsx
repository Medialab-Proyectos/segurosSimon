"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle, Search, Shield, ChevronRight, Loader2, Car, Bike, Star, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = "plate" | "vehicle-data" | "personal-data" | "searching" | "policies" | "confirm" | "done"

interface Policy {
  id: string
  insurer: string
  plan: string
  price: string
  annualPrice: string
  coverages: string[]
  rating: number
  recommended: boolean
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: Replace with real Promotec/aseguradoras API when available
const MOCK_POLICIES: Policy[] = [
  {
    id: "1",
    insurer: "Seguros Bolivar",
    plan: "Plan Basico",
    price: "$89.900/mes",
    annualPrice: "$1.078.800/ano",
    coverages: ["Responsabilidad civil", "Asistencia en carretera", "Grua"],
    rating: 4.2,
    recommended: false,
  },
  {
    id: "2",
    insurer: "Seguros del Estado",
    plan: "Plan Estandar",
    price: "$148.500/mes",
    annualPrice: "$1.782.000/ano",
    coverages: ["Responsabilidad civil", "Danos propios", "Robo parcial", "Asistencia 24/7"],
    rating: 4.7,
    recommended: true,
  },
  {
    id: "3",
    insurer: "Sura",
    plan: "Plan Full",
    price: "$215.000/mes",
    annualPrice: "$2.580.000/ano",
    coverages: ["Cobertura total", "Robo total", "Fenomenos naturales", "Auto de reemplazo"],
    rating: 4.9,
    recommended: false,
  },
]

const INSURERS_TO_SEARCH = [
  "Consultando Seguros Bolivar...",
  "Consultando Seguros del Estado...",
  "Consultando Sura...",
  "Calculando mejores opciones...",
]

// ─── Shared: Floating Input ───────────────────────────────────────────────────
function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  inputMode,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  maxLength?: number
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
}) {
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
          maxLength={maxLength}
          inputMode={inputMode}
          className="w-full bg-transparent pt-6 pb-2 px-4 text-foreground text-sm outline-none rounded-xl"
        />
      </div>
      {error && <p className="mt-1 text-destructive text-xs px-1">{error}</p>}
    </div>
  )
}

// ─── Shared: Step Progress Bar ────────────────────────────────────────────────
function StepProgress({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="px-5 pt-4 pb-1 flex-shrink-0">
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn("h-1 flex-1 rounded-full transition-all", i < current ? "bg-primary" : "bg-muted")}
          />
        ))}
      </div>
      <p className="text-muted-foreground text-xs mt-1.5">{label}</p>
    </div>
  )
}

// ─── Step 1: Plate Entry ──────────────────────────────────────────────────────
function PlateStep({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: (plate: string, vehicleType: "car" | "moto") => void
}) {
  const [plate, setPlate] = useState("")
  const [vehicleType, setVehicleType] = useState<"car" | "moto">("car")
  const [error, setError] = useState("")

  const handlePlateChange = (v: string) => {
    setPlate(v.toUpperCase().replace(/[^A-Z0-9]/g, ""))
    setError("")
  }

  const handleNext = () => {
    const cleaned = plate.trim()
    if (cleaned.length < 5 || cleaned.length > 7) {
      setError("Ingresa un numero de placa valido (ej: ABC123)")
      return
    }
    onNext(cleaned, vehicleType)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Volver">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-foreground font-bold text-base">Cotizar Seguro</h2>
          <p className="text-muted-foreground text-xs">Ingresa los datos de tu vehiculo</p>
        </div>
      </div>

      <StepProgress current={1} total={3} label="Paso 1 de 3 — Tu vehiculo" />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-5">
          <div>
            <p className="text-foreground text-base font-bold mb-1">Placa del vehiculo</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Consultaremos tus datos en el RUNT automaticamente.
            </p>
          </div>

          {/* Plate visual */}
          <div className="flex justify-center py-2">
            <div className="bg-amber-400 rounded-xl px-8 py-3 border-2 border-amber-500 shadow-md min-w-[180px] text-center">
              <p className="text-[8px] font-bold text-amber-800 mb-1 tracking-widest uppercase">Colombia</p>
              <p className="text-2xl font-black text-gray-900 tracking-[0.2em] font-mono min-h-[32px]">
                {plate || "ABC·123"}
              </p>
            </div>
          </div>

          {/* Plate input */}
          <div>
            <div
              className={cn(
                "relative border-2 rounded-xl transition-all duration-200 bg-card",
                error ? "border-destructive" : plate ? "border-primary" : "border-border"
              )}
            >
              <label
                className={cn(
                  "absolute left-4 transition-all duration-200 pointer-events-none font-medium",
                  plate
                    ? "top-2 text-[10px] text-muted-foreground"
                    : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                )}
              >
                Numero de placa
              </label>
              <input
                type="text"
                value={plate}
                onChange={(e) => handlePlateChange(e.target.value)}
                placeholder={plate ? "Ej: ABC123" : ""}
                maxLength={7}
                className="w-full bg-transparent pt-6 pb-2 px-4 text-foreground text-sm outline-none rounded-xl uppercase tracking-widest font-mono"
              />
            </div>
            {error && <p className="mt-1 text-destructive text-xs px-1">{error}</p>}
          </div>

          {/* Vehicle type */}
          <div>
            <p className="text-foreground text-sm font-semibold mb-2">Tipo de vehiculo</p>
            <div className="flex gap-2">
              {[
                { id: "car" as const, label: "Automovil", Icon: Car },
                { id: "moto" as const, label: "Motocicleta", Icon: Bike },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setVehicleType(id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 py-4 rounded-xl text-sm font-semibold border-2 transition-all",
                    vehicleType === id
                      ? "border-primary bg-[var(--brand-green-light)] text-primary"
                      : "border-border bg-card text-foreground"
                  )}
                >
                  <Icon size={22} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border-t border-border px-5 py-4 flex-shrink-0">
        <button
          onClick={handleNext}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Search size={16} />
          Consultar vehiculo
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: Vehicle Data Confirmation ───────────────────────────────────────
function VehicleDataStep({
  plate,
  vehicleType,
  onBack,
  onNext,
}: {
  plate: string
  vehicleType: "car" | "moto"
  onBack: () => void
  onNext: () => void
}) {
  const [model, setModel] = useState("Chevrolet Spark GT")
  const [year, setYear] = useState("2021")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!model.trim()) errs.model = "Ingresa la marca y modelo"
    if (!year.trim() || isNaN(Number(year)) || Number(year) < 1990 || Number(year) > new Date().getFullYear() + 1)
      errs.year = "Ingresa un ano valido (ej: 2021)"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Volver">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-foreground font-bold text-base">Datos del vehiculo</h2>
          <p className="text-muted-foreground text-xs">Confirma o corrige la informacion</p>
        </div>
      </div>

      <StepProgress current={2} total={3} label="Paso 2 de 3 — Confirma tu vehiculo" />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-4">
          {/* RUNT result */}
          <div className="bg-[var(--brand-green-light)] rounded-2xl p-4 flex items-center gap-3 border border-primary/20">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              {vehicleType === "car"
                ? <Car size={20} className="text-primary" />
                : <Bike size={20} className="text-primary" />
              }
            </div>
            <div>
              <p className="text-primary font-semibold text-sm">Vehiculo encontrado en RUNT</p>
              <p className="text-muted-foreground text-xs">Placa: {plate}</p>
            </div>
          </div>

          {/* Basic vehicle info from RUNT (mock) */}
          <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
            <p className="text-foreground font-semibold text-sm mb-3">Informacion del RUNT</p>
            <div className="space-y-0">
              {[
                { label: "Placa", value: plate },
                { label: "Tipo", value: vehicleType === "car" ? "Automovil" : "Motocicleta" },
                { label: "Color", value: "Blanco" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
                  <p className="text-muted-foreground text-sm">{label}</p>
                  <p className="text-foreground text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-foreground text-sm font-semibold">Confirma o corrige:</p>
          <FloatingInput
            label="Marca y modelo"
            value={model}
            onChange={setModel}
            error={errors.model}
            placeholder="Ej: Chevrolet Spark"
          />
          <FloatingInput
            label="Ano del vehiculo"
            type="number"
            value={year}
            onChange={setYear}
            error={errors.year}
            placeholder="Ej: 2021"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="bg-card border-t border-border px-5 py-4 flex-shrink-0">
        <button
          onClick={() => { if (validate()) onNext() }}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-sm"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Personal Data ────────────────────────────────────────────────────
function PersonalDataStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Ingresa tu nombre completo"
    if (!email.trim() || !email.includes("@")) errs.email = "Ingresa un correo valido"
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) errs.phone = "Ingresa tu numero de celular (10 digitos)"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Volver">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-foreground font-bold text-base">Datos de contacto</h2>
          <p className="text-muted-foreground text-xs">Para enviarte las cotizaciones</p>
        </div>
      </div>

      <StepProgress current={3} total={3} label="Paso 3 de 3 — Tus datos" />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Un asesor de Promotec se contactara contigo para confirmar tu cotizacion.
          </p>
          <FloatingInput
            label="Nombre completo"
            value={name}
            onChange={setName}
            error={errors.name}
            placeholder="Ej: Juan Perez"
          />
          <FloatingInput
            label="Correo electronico"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            placeholder="tu@correo.com"
          />
          <FloatingInput
            label="Celular"
            type="tel"
            value={phone}
            onChange={setPhone}
            error={errors.phone}
            placeholder="3XX XXX XXXX"
            inputMode="tel"
          />
          <div className="bg-muted/40 rounded-xl p-3">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Al continuar, autorizas a Promotec a consultar tus datos en las aseguradoras para presentarte las mejores opciones disponibles.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border-t border-border px-5 py-4 flex-shrink-0">
        <button
          onClick={() => { if (validate()) onNext() }}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-sm"
        >
          Consultar aseguradoras
        </button>
      </div>
    </div>
  )
}

// ─── Searching Screen ─────────────────────────────────────────────────────────
function SearchingScreen({ onDone }: { onDone: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setCurrentStep(i)
      if (i >= INSURERS_TO_SEARCH.length) {
        clearInterval(interval)
        const timeout = setTimeout(onDone, 600)
        return () => clearTimeout(timeout)
      }
    }, 700)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className="h-full flex flex-col items-center justify-center bg-background px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-[var(--brand-green-light)] flex items-center justify-center mb-6">
        <Loader2 size={36} className="text-primary animate-spin" />
      </div>
      <h2 className="text-foreground font-bold text-xl mb-2">Buscando opciones</h2>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
        Consultando las mejores aseguradoras para tu vehiculo
      </p>
      <div className="w-full max-w-xs space-y-3">
        {INSURERS_TO_SEARCH.map((label, i) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-3 text-sm transition-all duration-300",
              i < currentStep
                ? "text-primary"
                : i === currentStep
                ? "text-foreground"
                : "text-muted-foreground/40"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                i < currentStep ? "bg-[var(--brand-green-light)]" : "bg-muted"
              )}
            >
              {i < currentStep ? (
                <CheckCircle size={12} className="text-primary" />
              ) : (
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    i === currentStep ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Policies List ────────────────────────────────────────────────────────────
function PoliciesStep({
  plate,
  onBack,
  onSelect,
}: {
  plate: string
  onBack: () => void
  onSelect: (policy: Policy) => void
}) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Volver">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-foreground font-bold text-base">Polizas disponibles</h2>
          <p className="text-muted-foreground text-xs">Placa {plate} · {MOCK_POLICIES.length} opciones encontradas</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-4">
          {MOCK_POLICIES.map((policy) => (
            <div
              key={policy.id}
              className={cn(
                "bg-card rounded-2xl shadow-sm border-2 overflow-hidden",
                policy.recommended ? "border-primary" : "border-border"
              )}
            >
              {policy.recommended && (
                <div className="bg-primary px-4 py-1.5 flex items-center gap-1.5">
                  <Star size={11} className="text-primary-foreground" fill="currentColor" />
                  <p className="text-primary-foreground text-[11px] font-bold">Recomendado para ti</p>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-bold text-sm">{policy.plan}</p>
                    <p className="text-muted-foreground text-xs">{policy.insurer}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-primary font-bold text-base">{policy.price}</p>
                    <p className="text-muted-foreground text-[10px]">{policy.annualPrice}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                  <p className="text-foreground text-xs font-medium">{policy.rating}</p>
                  <p className="text-muted-foreground text-xs">/ 5.0</p>
                </div>

                <div className="space-y-1.5 mb-4">
                  {policy.coverages.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[var(--brand-green-light)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={9} className="text-primary" />
                      </div>
                      <p className="text-foreground text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelect(policy)}
                  className={cn(
                    "w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2",
                    policy.recommended
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-muted/50"
                  )}
                >
                  Solicitar cotizacion
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Quote Confirmation ───────────────────────────────────────────────────────
function QuoteConfirmStep({
  policy,
  onBack,
  onConfirm,
}: {
  policy: Policy
  onBack: () => void
  onConfirm: () => void
}) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Volver">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-foreground font-bold text-base">Confirmar cotizacion</h2>
          <p className="text-muted-foreground text-xs">{policy.insurer}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-4">
          {/* Selected plan summary */}
          <div className="bg-[var(--brand-green-light)] rounded-2xl p-4 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground font-bold text-sm">{policy.plan}</p>
                <p className="text-muted-foreground text-xs">{policy.insurer}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Valor estimado</p>
              <p className="text-primary font-bold text-lg">{policy.price}</p>
            </div>
          </div>

          {/* Coverage summary */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <p className="text-foreground font-semibold text-sm mb-3">Coberturas incluidas</p>
            <div className="space-y-2">
              {policy.coverages.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[var(--brand-green-light)] flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={10} className="text-primary" />
                  </div>
                  <p className="text-foreground text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Document preview reference */}
          <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-sm font-medium">Recibirás tu poliza por correo</p>
              <p className="text-muted-foreground text-xs mt-0.5">PDF con todos los detalles de cobertura y vigencia</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-amber-800 text-xs leading-relaxed">
              Un asesor de Promotec validara tu informacion y te enviara la cotizacion definitiva por correo y WhatsApp.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border-t border-border px-5 py-4 flex-shrink-0">
        <button
          onClick={onConfirm}
          className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-sm"
        >
          Confirmar y solicitar cotizacion
        </button>
      </div>
    </div>
  )
}

// ─── Done / Quote Generated ───────────────────────────────────────────────────
function DoneScreen({ policy, onBack }: { policy: Policy; onBack: () => void }) {
  const quoteRef = `COT-${Date.now().toString().slice(-6)}`
  const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0">
        <h2 className="text-foreground font-bold text-base">Cotizacion generada</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-8 pb-6 flex flex-col items-center text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-[var(--brand-green-light)] flex items-center justify-center">
            <CheckCircle size={40} className="text-primary" strokeWidth={1.5} />
          </div>

          <div>
            <h2 className="text-foreground text-xl font-bold mb-2">Cotizacion enviada</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px] text-balance">
              Un asesor de Promotec te contactara pronto para confirmar tu poliza.
            </p>
          </div>

          {/* Quote detail */}
          <div className="w-full bg-card rounded-2xl border border-border p-4 text-left">
            <p className="text-foreground font-semibold text-sm mb-3">Detalle de cotizacion</p>
            <div className="space-y-0">
              {[
                { label: "Referencia", value: quoteRef },
                { label: "Plan", value: policy.plan },
                { label: "Aseguradora", value: policy.insurer },
                { label: "Valor estimado", value: policy.price },
                { label: "Valida hasta", value: formatDate(validUntil) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
                  <p className="text-muted-foreground text-sm">{label}</p>
                  <p className="text-foreground text-sm font-medium text-right max-w-[180px]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Document preview hint */}
          <div className="w-full bg-muted/40 rounded-2xl p-4 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Tu cotizacion y poliza estaran disponibles en <span className="font-semibold text-foreground">Mis Seguros</span> una vez aprobadas.
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full text-muted-foreground text-sm font-medium py-3 flex items-center justify-center gap-2 hover:text-foreground transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Quote Flow Screen ───────────────────────────────────────────────────
// Agente Motor: flujo completo de cotizacion vehicular con Promotec
interface QuoteFlowScreenProps {
  onBack: () => void
}

export default function QuoteFlowScreen({ onBack }: QuoteFlowScreenProps) {
  const [step, setStep] = useState<Step>("plate")
  const [plate, setPlate] = useState("")
  const [vehicleType, setVehicleType] = useState<"car" | "moto">("car")
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)

  const handleDoneSearch = () => setStep("policies")

  if (step === "plate") {
    return (
      <PlateStep
        onBack={onBack}
        onNext={(p, vt) => { setPlate(p); setVehicleType(vt); setStep("vehicle-data") }}
      />
    )
  }

  if (step === "vehicle-data") {
    return (
      <VehicleDataStep
        plate={plate}
        vehicleType={vehicleType}
        onBack={() => setStep("plate")}
        onNext={() => setStep("personal-data")}
      />
    )
  }

  if (step === "personal-data") {
    return (
      <PersonalDataStep
        onBack={() => setStep("vehicle-data")}
        onNext={() => setStep("searching")}
      />
    )
  }

  if (step === "searching") {
    return <SearchingScreen onDone={handleDoneSearch} />
  }

  if (step === "policies") {
    return (
      <PoliciesStep
        plate={plate}
        onBack={() => setStep("personal-data")}
        onSelect={(policy) => { setSelectedPolicy(policy); setStep("confirm") }}
      />
    )
  }

  if (step === "confirm" && selectedPolicy) {
    return (
      <QuoteConfirmStep
        policy={selectedPolicy}
        onBack={() => setStep("policies")}
        onConfirm={() => setStep("done")}
      />
    )
  }

  if (step === "done" && selectedPolicy) {
    return <DoneScreen policy={selectedPolicy} onBack={onBack} />
  }

  return null
}
