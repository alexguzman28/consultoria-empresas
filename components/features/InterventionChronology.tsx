'use client';

import { useState } from 'react';
import { BrandLogoMark, Icon } from '@/components/ui/Icon';
import { SectionReveal } from '@/components/ui/SectionReveal';

export function InterventionChronology() {
  const [billingCycle, setBillingCycle] = useState<'sprint' | 'anual'>('sprint');

  const plans = [
    {
      name: 'Diagnóstico Flash',
      subtitle: 'Para empresas que requieren radiografía operativa rápida',
      price: billingCycle === 'sprint' ? '$185k' : '$155k',
      period: '/mes',
      featured: false,
      ctaLabel: 'Iniciar Diagnóstico',
      features: [
        'Auditoría en hasta 2 plantas o CEDIS',
        'Conciliación de merma y OEE en turno',
        'Tablero ejecutivo de fugas de margen',
        'Soporte directo de Socio de Práctica',
        'Dictamen de puente EBITDA en 3 semanas',
        'Integración estándar con tu ERP actual',
      ],
    },
    {
      name: 'Growth & Reestructura',
      subtitle: 'Para organizaciones escalando rentabilidad y liquidez',
      price: billingCycle === 'sprint' ? '$390k' : '$330k',
      period: '/mes',
      featured: true,
      ctaLabel: 'Comenzar Intervención',
      features: [
        'Cobertura multi-planta y cadena logística',
        'Implementación SMED y balanceo en piso',
        'Simulador predictivo de flujo a 13 semanas',
        'Acompañamiento diario con supervisores',
        'Liberación de capital de trabajo auditada',
        'Garantía contractual de retorno mínimo 3x',
      ],
    },
    {
      name: 'Enterprise Turnaround',
      subtitle: 'Para grandes grupos industriales y mandatos CRO',
      price: 'Custom',
      period: '',
      featured: false,
      ctaLabel: 'Contactar Socios',
      features: [
        'Oficina de transformación (PMO/CRO) dedicada',
        'Reingeniería integral de costos y SG&A',
        'Negociación con proveedores y acreedores',
        'Tableros de telemetría OEE en tiempo real',
        'Gobernanza mensual ante Consejo Directivo',
        'Estructura de honorarios vinculada a éxito',
      ],
    },
  ] as const;

  return (
    <section
      id="protocolo-semanal"
      aria-labelledby="pricing-heading"
      className="py-20 sm:py-28 bg-[#09090B]"
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <SectionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pricing-heading"
              className="text-3xl sm:text-5xl font-semibold text-white tracking-tight"
            >
              Modalidades de Intervención Simples y Transparentes
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9CA3AF]">
              Comienza con un diagnóstico focalizado y escala según el retorno auditado en libros. Sin costos ocultos.
            </p>

            {/* Monthly / Annual Toggle Pill matching Reference Image 1 */}
            <div className="mt-8 inline-flex items-center rounded-xl border border-white/[0.08] bg-[#121215] p-1">
              <button
                type="button"
                onClick={() => setBillingCycle('sprint')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  billingCycle === 'sprint'
                    ? 'bg-gradient-to-b from-[#FF8C42] to-[#E66316] text-white shadow-sm'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Por Sprint
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('anual')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  billingCycle === 'anual'
                    ? 'bg-gradient-to-b from-[#FF8C42] to-[#E66316] text-white shadow-sm'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Programa Anual
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* 3 Pricing Cards matching Reference Image 1 */}
        <SectionReveal delayMs={120}>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? 'copper-card-glow border border-[#F27427]/45 shadow-[0_24px_60px_-15px_rgba(242,116,39,0.25)]'
                    : 'bg-[#121215] border border-white/[0.08] hover:border-white/[0.16]'
                }`}
              >
                <div>
                  {/* Top Icon Circle */}
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                      plan.featured
                        ? 'border-[#F27427]/60 bg-[#F27427]/20'
                        : 'border-white/[0.1] bg-white/[0.04]'
                    }`}
                  >
                    {plan.featured ? (
                      <BrandLogoMark size={20} />
                    ) : (
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-[#A1A1AA]" />
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#9CA3AF]">{plan.subtitle}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white tabular-nums">
                      {plan.price}
                    </span>
                    {plan.period ? (
                      <span className="text-sm text-[#9CA3AF]">
                        {plan.period}
                      </span>
                    ) : null}
                  </div>

                  <a
                    href="#mandato-diagnostico"
                    className={`mt-6 flex min-h-[44px] w-full items-center justify-center rounded-xl text-xs font-semibold transition-all ${
                      plan.featured
                        ? 'bg-gradient-to-b from-[#FF8C42] to-[#E66316] text-white shadow-[0_6px_24px_-4px_rgba(242,116,39,0.55)] hover:brightness-110'
                        : 'border border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.09]'
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-6">
                  <div className="text-xs font-semibold text-white mb-4">
                    Qué incluye el mandato
                  </div>
                  <ul className="space-y-3 text-xs text-[#A1A1AA]">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/[0.2] text-[#D4D4D8]">
                          <Icon name="check" size={10} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
