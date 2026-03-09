"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import AcquireTab from "./acquire-tab"
import MyInsurancesTab from "./my-insurances-tab"

type InsuranceTab = "acquire" | "my"

interface InsuranceModuleProps {
  onBack: () => void
}

export default function InsuranceModule({ onBack }: InsuranceModuleProps) {
  const [activeTab, setActiveTab] = useState<InsuranceTab>("acquire")

  // TODO (renew): When renew integration is available, re-add handlers here to
  // deep-link from MyInsurancesTab into the acquire flow (soat or quote view).

  return (
    <div className="h-full flex flex-col">
      {/* Hero Header */}
      <div
        className="relative pb-6 px-5 flex-shrink-0 overflow-hidden"
        style={{ paddingTop: "max(env(safe-area-inset-top, 16px), 16px)" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/images/car-shield.jpg" alt="" fill className="object-cover" aria-hidden="true" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>

        {/* Decorative */}
        <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute right-8 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-y-8" />

        <div className="flex items-center gap-3 mb-4 relative">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">Seguros</h1>
        </div>

        <div className="flex items-center justify-between relative mb-4">
          <div>
            <p className="text-white/70 text-sm">Protege lo que mas importa</p>
            <p className="text-white font-bold text-base mt-0.5">Cobertura completa para tu vehiculo</p>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-1 flex relative">
          {(["acquire", "my"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                activeTab === tab
                  ? "bg-white text-[var(--brand-teal)] shadow-sm"
                  : "text-white/80 hover:text-white"
              )}
            >
              {tab === "acquire" ? "Adquirir" : "Mis Seguros"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "acquire" ? (
          <AcquireTab />
        ) : (
          <MyInsurancesTab />
        )}
      </div>
    </div>
  )
}
