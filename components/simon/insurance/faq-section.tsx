"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "¿Cuándo se activa mi póliza?",
    answer:
      "Tu póliza se activa inmediatamente después de completar el proceso de compra y recibir la confirmación de pago. Recibirás un correo con todos los documentos.",
  },
  {
    question: "¿Cuánto tiempo dura la cobertura?",
    answer:
      "El SOAT tiene una vigencia de 1 año desde la fecha de expedición. Los seguros vehiculares pueden ser mensuales o anuales según el plan elegido.",
  },
  {
    question: "¿Puedo cancelar mi póliza?",
    answer:
      "Sí, puedes cancelar tu póliza en cualquier momento desde la app. Para pólizas anuales, se aplicará un reembolso proporcional al tiempo no utilizado.",
  },
  {
    question: "¿Cómo solicito asistencia en carretera?",
    answer:
      "Desde la app, ve a Servicios → Asistencia, o llama a nuestra línea 24/7. Un equipo llegará a tu ubicación en un tiempo estimado de 30-45 minutos.",
  },
  {
    question: "¿El seguro cubre actos de terceros?",
    answer:
      "Sí, los planes Estándar y Full incluyen cobertura de responsabilidad civil frente a terceros por daños a personas y bienes.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <p className="text-foreground font-semibold text-sm">Preguntas frecuentes</p>
      </div>
      {faqs.map(({ question, answer }, i) => (
        <div key={question} className={cn("border-b border-border last:border-0")}>
          <button
            className="w-full flex items-center justify-between p-4 text-left gap-3 hover:bg-muted/30 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <p className="text-foreground text-sm font-medium leading-relaxed flex-1">{question}</p>
            {openIndex === i
              ? <ChevronUp size={16} className="text-primary flex-shrink-0" />
              : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
            }
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4">
              <p className="text-muted-foreground text-sm leading-relaxed">{answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
