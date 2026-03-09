"use client"

import { useState } from "react"
import { ArrowLeft, ExternalLink, AlertCircle } from "lucide-react"

// Seguros Mundial — SOAT provider. All pricing, payment, and issuance handled externally.
const SOAT_PROVIDER_URL = "https://soatmundial.com.co/"

interface SoatPurchaseScreenProps {
  onBack: () => void
}

// ─── SOAT Purchase — External Provider ───────────────────────────────────────
// Embeds soatmundial.com.co via iframe. If the site blocks framing (X-Frame-Options),
// a fallback prompts the user to open in the browser.
export default function SoatPurchaseScreen({ onBack }: SoatPurchaseScreenProps) {
  const [blocked, setBlocked] = useState(false)

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="bg-card border-b border-border px-5 py-4 flex-shrink-0 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-foreground font-bold text-base">Comprar SOAT</h2>
          <p className="text-muted-foreground text-xs">Seguros Mundial</p>
        </div>
        <a
          href={SOAT_PROVIDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Abrir en navegador"
        >
          <ExternalLink size={16} className="text-muted-foreground" />
        </a>
      </div>

      <div className="flex-1 relative">
        {blocked ? (
          // Fallback when the provider blocks iframe embedding
          <div className="h-full flex flex-col items-center justify-center px-8 text-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
              <AlertCircle size={28} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground font-bold text-base mb-1">
                No se puede mostrar aqui
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                El sitio de Seguros Mundial no permite cargarse dentro de la app.
                Puedes completar tu compra directamente en el navegador.
              </p>
            </div>
            <a
              href={SOAT_PROVIDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
            >
              <ExternalLink size={16} />
              Ir a Seguros Mundial
            </a>
          </div>
        ) : (
          <iframe
            src={SOAT_PROVIDER_URL}
            title="Comprar SOAT — Seguros Mundial"
            className="w-full h-full border-0"
            // allow-top-navigation-by-user-activation lets the provider redirect on form submit
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            onError={() => setBlocked(true)}
          />
        )}
      </div>
    </div>
  )
}
