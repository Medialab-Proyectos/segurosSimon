"use client"

import { useState } from "react"
import { Shield, FileText, Download, LifeBuoy, Eye, X, AlertTriangle, Bell, BellOff, Calendar, Clock, Phone, MessageCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// ─── Status types aligned with backend contract ───────────────────────────────
// EXPIRING_SOON: triggered 30 days before expiration
type InsuranceStatus = "ACTIVE" | "EXPIRING_SOON" | "EXPIRED"

interface Insurance {
  id: string
  type: string
  policyNumber: string
  status: InsuranceStatus
  expiryDate: string
  daysLeft?: number
  // premium is intentionally omitted — NPM backend cannot provide this reliably (MVP)
  icon: typeof Shield
  iconBg: string
  iconColor: string
  isSoat: boolean
}

const insurances: Insurance[] = [
  {
    id: "1",
    type: "SOAT",
    policyNumber: "SOA-2024-7721",
    status: "EXPIRING_SOON",
    expiryDate: "17 Mar 2025",
    daysLeft: 12,
    icon: Shield,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    isSoat: true,
  },
  {
    id: "2",
    type: "Seguro Todo Riesgo",
    policyNumber: "STR-2025-0334",
    status: "ACTIVE",
    expiryDate: "15 Dic 2025",
    daysLeft: 285,
    icon: Shield,
    iconBg: "bg-[var(--brand-green-light)]",
    iconColor: "text-primary",
    isSoat: false,
  },
]

const statusConfig: Record<InsuranceStatus, { label: string; class: string; dot: string }> = {
  ACTIVE: { label: "Activo", class: "bg-green-100 text-green-700", dot: "bg-green-500" },
  EXPIRING_SOON: { label: "Por vencer", class: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  EXPIRED: { label: "Vencido", class: "bg-red-100 text-red-700", dot: "bg-red-500" },
}

// ─── SOAT PDF View ────────────────────────────────────────────────────────────
// MVP: shows only the PDF viewer and download button.
// Removed: structured policy data, OCR fields, share button, policy metadata.
// TODO (renew): Add renew button here — only when status === "EXPIRED" || "EXPIRING_SOON"
//               and when the renewal provider integration is available.
function SoatPdfView({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center justify-between">
        <h2 className="text-foreground font-bold text-base">Documento SOAT</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Cerrar">
          <X size={18} className="text-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            {/* PDF Viewer area */}
            <div className="bg-muted/30 min-h-[420px] flex flex-col items-center justify-center gap-3 p-8">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <FileText size={32} className="text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold text-sm">SOAT.pdf</p>
              <p className="text-muted-foreground text-xs text-center leading-relaxed">
                Vista previa del documento
              </p>
            </div>

            <div className="p-4 border-t border-border">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-3.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all">
                <Download size={15} />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Vehicle Policy View ──────────────────────────────────────────────────────
// MVP: removes premium/price, policy type, and share button.
// TODO (renew): Add renew button — only when status === "EXPIRED" || "EXPIRING_SOON"
//               and when the renewal provider integration is available.
function PolicyView({ insurance, onClose }: { insurance: Insurance; onClose: () => void }) {
  const status = statusConfig[insurance.status]

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-bold text-base">{insurance.type}</h2>
          <p className="text-muted-foreground text-xs">Poliza {insurance.policyNumber}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Cerrar">
          <X size={18} className="text-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-5 pb-6 space-y-4">
          {/* Status + Expiry — primary data surface */}
          <div className="bg-card rounded-2xl border border-border p-4 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Vence el</p>
              <p className="text-foreground font-bold text-lg">{insurance.expiryDate}</p>
              {insurance.daysLeft !== undefined && insurance.status !== "ACTIVE" && (
                <p className={cn("text-sm mt-0.5 font-medium", insurance.status === "EXPIRED" ? "text-red-600" : "text-amber-600")}>
                  {insurance.status === "EXPIRED" ? "Vencido" : `${insurance.daysLeft} dias restantes`}
                </p>
              )}
            </div>
            <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold", status.class)}>
              <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </div>
          </div>

          {/* Policy Details */}
          <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
            <p className="text-foreground font-semibold text-sm mb-3">Detalles</p>
            <div className="space-y-0">
              {[
                { label: "Numero de poliza", value: insurance.policyNumber },
                { label: "Aseguradora", value: "Seguros Bolivar" },
                { label: "Vigencia hasta", value: insurance.expiryDate },
                { label: "Estado", value: status.label },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <p className="text-muted-foreground text-sm">{label}</p>
                  <p className="text-foreground text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PDF */}
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="bg-muted/50 h-36 flex flex-col items-center justify-center gap-2">
              <FileText size={32} className="text-muted-foreground" />
              <p className="text-muted-foreground text-sm font-medium">Poliza-{insurance.policyNumber}.pdf</p>
            </div>
            <div className="p-4 border-t border-border">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:bg-primary/90 active:scale-95 transition-all">
                <Download size={15} />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Assistance Panel ─────────────────────────────────────────────────────────
// Shows call and WhatsApp options for roadside assistance.
function AssistancePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-bold text-base">Solicitar Asistencia</h2>
          <p className="text-muted-foreground text-xs">Estamos disponibles 24/7</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Cerrar">
          <X size={18} className="text-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-6 pb-8 space-y-4">
          <div className="bg-[var(--brand-green-light)] rounded-2xl p-4 flex items-center gap-3 border border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <LifeBuoy size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">Asistencia en carretera</p>
              <p className="text-muted-foreground text-xs mt-0.5">Un equipo llegara en 30-45 minutos</p>
            </div>
          </div>

          <a
            href="tel:+571234567890"
            className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:bg-muted/30 active:scale-[0.98] transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--brand-green-light)] flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold text-sm">Llamar ahora</p>
              <p className="text-muted-foreground text-xs mt-0.5">Linea de asistencia 24/7</p>
            </div>
          </a>

          <a
            href="https://wa.me/571234567890?text=Necesito%20asistencia%20en%20carretera"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:bg-muted/30 active:scale-[0.98] transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center flex-shrink-0">
              <MessageCircle size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold text-sm">WhatsApp</p>
              <p className="text-muted-foreground text-xs mt-0.5">Chatea con un asesor</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export default function MyInsurancesTab() {
  const [selectedPolicy, setSelectedPolicy] = useState<Insurance | null>(null)
  const [assistanceFor, setAssistanceFor] = useState<string | null>(null)
  const [reminders, setReminders] = useState<Record<string, boolean>>({ "1": true, "2": true })
  const hasInsurances = insurances.length > 0

  if (selectedPolicy) {
    if (selectedPolicy.isSoat) return <SoatPdfView onClose={() => setSelectedPolicy(null)} />
    return <PolicyView insurance={selectedPolicy} onClose={() => setSelectedPolicy(null)} />
  }

  if (assistanceFor) {
    return <AssistancePanel onClose={() => setAssistanceFor(null)} />
  }

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-background">
      <div className="px-5 pt-5 pb-8 space-y-5">
        {!hasInsurances ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden mb-4">
              <Image src="/images/car-shield.jpg" alt="Vehiculo protegido" fill className="object-cover" />
            </div>
            <h3 className="text-foreground font-bold text-lg mb-2">Sin seguros activos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-balance mb-6 max-w-64">
              Aun no tienes seguros activos. Explora nuestros planes y protege tu vehiculo hoy.
            </p>
            <button className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all text-sm">
              Explorar Seguros
            </button>
          </div>
        ) : (
          <>
            {/* Expiry Alert Banner — no renew CTA (integration pending) */}
            {insurances.some((i) => i.status === "EXPIRING_SOON") && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={16} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-800 text-sm font-semibold">Tu SOAT esta por vencer</p>
                  <p className="text-amber-700 text-xs mt-0.5">Renueva pronto para evitar multas y sanciones.</p>
                </div>
              </div>
            )}

            {/* Insurance Cards */}
            {insurances.map((insurance) => {
              const status = statusConfig[insurance.status]
              const Icon = insurance.icon
              const hasReminder = reminders[insurance.id] ?? false

              return (
                <div key={insurance.id} className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                  {/* Card Header */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${insurance.iconBg}`}>
                          <Icon size={20} className={insurance.iconColor} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-foreground font-bold text-base truncate">{insurance.type}</p>
                          <p className="text-muted-foreground text-xs">{insurance.policyNumber}</p>
                        </div>
                      </div>
                      <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0", status.class)}>
                        <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </div>
                    </div>

                    {/* Expiry — primary data, always visible */}
                    <div className="bg-muted/40 rounded-xl px-3 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground text-[10px]">Vence el</p>
                          <p className="text-foreground font-semibold text-sm">{insurance.expiryDate}</p>
                        </div>
                      </div>
                      {insurance.daysLeft !== undefined && insurance.status !== "ACTIVE" && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className={insurance.status === "EXPIRED" ? "text-red-500" : "text-amber-500"} />
                          <p className={cn("text-xs font-semibold", insurance.status === "EXPIRED" ? "text-red-600" : "text-amber-600")}>
                            {insurance.status === "EXPIRED" ? "Vencido" : `${insurance.daysLeft} dias`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reminder Toggle */}
                  <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {hasReminder ? (
                        <Bell size={14} className="text-primary" />
                      ) : (
                        <BellOff size={14} className="text-muted-foreground" />
                      )}
                      <p className="text-sm text-foreground font-medium">Recordatorios</p>
                    </div>
                    <button
                      onClick={() => toggleReminder(insurance.id)}
                      className={cn(
                        "relative w-11 h-6 rounded-full transition-all duration-200",
                        hasReminder ? "bg-primary" : "bg-muted"
                      )}
                      role="switch"
                      aria-checked={hasReminder}
                      aria-label={`Recordatorios para ${insurance.type}`}
                    >
                      <div
                        className={cn(
                          "absolute top-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-all duration-200",
                          hasReminder ? "left-[22px]" : "left-0.5"
                        )}
                      />
                    </button>
                  </div>

                  {/* Card Actions */}
                  <div className="px-4 pb-4 pt-1 space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPolicy(insurance)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-foreground text-xs font-medium py-2.5 rounded-xl border border-border hover:bg-muted/50 active:scale-95 transition-all"
                      >
                        <Eye size={13} />
                        {insurance.isSoat ? "Ver SOAT" : "Ver Poliza"}
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 text-foreground text-xs font-medium py-2.5 rounded-xl border border-border hover:bg-muted/50 active:scale-95 transition-all">
                        <Download size={13} />
                        Descargar PDF
                      </button>
                    </div>

                    {/* TODO (renew): Uncomment and implement when renewal integration is ready.
                        Rule: show only when status === "EXPIRED" || status === "EXPIRING_SOON"
                        <button className="w-full ...">Renovar</button> */}

                    {insurance.status !== "EXPIRED" && (
                      <button
                        onClick={() => setAssistanceFor(insurance.id)}
                        className="w-full flex items-center justify-center gap-1.5 border border-border text-foreground text-xs font-medium py-2.5 rounded-xl hover:bg-muted/50 active:scale-95 transition-all"
                      >
                        <LifeBuoy size={13} />
                        Solicitar Asistencia
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
