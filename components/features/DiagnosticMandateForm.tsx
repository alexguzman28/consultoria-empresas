'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  InputField,
  SelectField,
  TextareaField,
} from '@/components/ui/FormField';
import { Icon } from '@/components/ui/Icon';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { PRACTICE_LABELS, SECTOR_LABELS } from '@/lib/formatters';
import type { DiagnosticActionState } from '@/lib/types';
import { submitDiagnosticRequestAction } from '@/server/actions';

const INITIAL_STATE: DiagnosticActionState = {
  status: 'idle',
  message: '',
};

const SECTOR_OPTIONS = Object.entries(SECTOR_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const PRACTICE_OPTIONS = Object.entries(PRACTICE_LABELS).map(
  ([value, label]) => ({
    value,
    label,
  })
);

const REVENUE_BAND_OPTIONS = [
  { value: '150m-500m', label: '$150M – $500M MXN anuales' },
  { value: '500m-1500m', label: '$500M – $1,500M MXN anuales' },
  { value: '1500m-5000m', label: '$1,500M – $5,000M MXN anuales' },
  { value: 'mas-5000m', label: 'Más de $5,000M MXN anuales' },
] as const;

export function DiagnosticMandateForm() {
  const [state, formAction, isPending] = useActionState(
    submitDiagnosticRequestAction,
    INITIAL_STATE
  );

  return (
    <section
      id="mandato-diagnostico"
      aria-labelledby="mandate-heading"
      className="py-16 sm:py-24 bg-[#09090B]"
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8 space-y-12">
        {/* Bottom CTA Card with 3 Ascending Bar Pillars matching Reference Image 1 */}
        <SectionReveal>
          <div className="copper-card-glow rounded-3xl border border-white/[0.1] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6 space-y-4">
                <h2
                  id="mandate-heading"
                  className="text-2xl sm:text-4xl font-semibold text-white leading-tight"
                >
                  Empieza a Tomar Mejores Decisiones Operativas Hoy
                </h2>
                <p className="text-sm text-[#A1A1AA] max-w-md leading-relaxed">
                  Deja de adivinar dónde se erosiona tu margen. Utiliza datos auditados en planta para escalar tu rentabilidad más rápido.
                </p>
                <div className="pt-2">
                  <a
                    href="#formulario-registro"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-b from-[#FF8C42] to-[#E66316] px-6 py-2.5 text-xs font-semibold text-white shadow-[0_6px_24px_-4px_rgba(242,116,39,0.5)] hover:brightness-110 transition-all"
                  >
                    Solicitar Diagnóstico Gratuito
                  </a>
                </div>
              </div>

              {/* 3 Ascending Bar Pillars matching Reference Image 1 */}
              <div className="lg:col-span-6 flex items-end justify-start lg:justify-end gap-4 sm:gap-5 pt-4">
                <div className="w-28 sm:w-32 h-28 rounded-2xl border border-white/[0.08] bg-[#18181C]/90 p-3.5 flex flex-col justify-between text-center">
                  <span className="mx-auto h-1 w-10 rounded-full bg-white/[0.15]" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                      30%
                    </div>
                    <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                      Ahorro en Merma
                    </div>
                  </div>
                </div>

                <div className="w-28 sm:w-32 h-40 rounded-2xl border border-white/[0.08] bg-[#1C1C21]/90 p-3.5 flex flex-col justify-between text-center">
                  <span className="mx-auto h-1 w-10 rounded-full bg-white/[0.2]" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                      75%
                    </div>
                    <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                      Mejora de Ciclo
                    </div>
                  </div>
                </div>

                <div className="w-28 sm:w-32 h-52 rounded-2xl border border-[#F27427]/35 bg-[#221D1A]/90 p-3.5 flex flex-col justify-between text-center shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                  <span className="mx-auto h-1 w-10 rounded-full bg-[#F27427]" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                      200+
                    </div>
                    <div className="text-[11px] text-[#D4D4D8] mt-0.5">
                      Plantas Auditadas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Validated Mandate Form Card */}
        <SectionReveal delayMs={120}>
          <div
            id="formulario-registro"
            className="rounded-3xl border border-white/[0.08] bg-[#121215] p-6 sm:p-10"
          >
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Agenda tu Auditoría Operativa Confidencial (NDA)
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#9CA3AF]">
                Completa los datos de tu organización. Un Socio Director validará tu caso y enviará el convenio NDA en menos de 4 horas hábiles.
              </p>
            </div>

            {state.status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 rounded-2xl border border-[#22C55E]/50 bg-[#09090B] p-6 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#22C55E]">
                    <Icon name="check" size={16} />
                    SOLICITUD REGISTRADA Y VALIDADA
                  </span>
                  <span className="font-mono text-xs font-bold text-[#F27427]">
                    FOLIO: {state.folioCode}
                  </span>
                </div>
                <p className="text-sm text-white leading-relaxed">
                  {state.message}
                </p>
              </div>
            ) : (
              <form action={formAction} noValidate className="mt-8 space-y-5">
                {state.status === 'error' ? (
                  <div
                    role="alert"
                    className="rounded-xl border border-[#EF4444] bg-[#450A0A]/40 p-3.5 text-xs font-medium text-[#FCA5A5] flex items-start gap-2.5"
                  >
                    <Icon name="alert" size={16} className="mt-0.5" />
                    <span>{state.message}</span>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InputField
                    id="fullName"
                    name="fullName"
                    label="Nombre Completo *"
                    placeholder="Ej. Ing. Alejandro Garza"
                    required
                    errorMessage={state.fieldErrors?.fullName}
                  />
                  <InputField
                    id="roleTitle"
                    name="roleTitle"
                    label="Cargo Directivo *"
                    placeholder="Ej. CEO / COO / CFO"
                    required
                    errorMessage={state.fieldErrors?.roleTitle}
                  />
                  <InputField
                    id="companyName"
                    name="companyName"
                    label="Empresa o Grupo Industrial *"
                    placeholder="Ej. Grupo Industrial del Norte"
                    required
                    errorMessage={state.fieldErrors?.companyName}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <InputField
                    id="corporateEmail"
                    name="corporateEmail"
                    type="email"
                    label="Correo Corporativo *"
                    placeholder="direccion@empresa.com"
                    required
                    errorMessage={state.fieldErrors?.corporateEmail}
                  />
                  <InputField
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Teléfono Directo *"
                    placeholder="+52 (81) 8000 0000"
                    required
                    errorMessage={state.fieldErrors?.phone}
                  />
                  <SelectField
                    id="sector"
                    name="sector"
                    label="Sector Industrial *"
                    options={SECTOR_OPTIONS}
                    errorMessage={state.fieldErrors?.sector}
                  />
                  <SelectField
                    id="annualRevenueBand"
                    name="annualRevenueBand"
                    label="Facturación Anual *"
                    options={REVENUE_BAND_OPTIONS}
                    errorMessage={state.fieldErrors?.annualRevenueBand}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-4">
                    <SelectField
                      id="primaryPractice"
                      name="primaryPractice"
                      label="Práctica Prioritaria *"
                      options={PRACTICE_OPTIONS}
                      errorMessage={state.fieldErrors?.primaryPractice}
                    />
                  </div>
                  <div className="lg:col-span-8">
                    <TextareaField
                      id="operationalMandate"
                      name="operationalMandate"
                      rows={2}
                      label="Síntesis del Reto Operativo o Financiero *"
                      placeholder="Describe brevemente el objetivo (ej. optimizar OEE, reducir merma, liberar capital de trabajo)..."
                      required
                      errorMessage={state.fieldErrors?.operationalMandate}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
                  <label
                    htmlFor="acceptsConfidentialityTerms"
                    className="flex items-center gap-2.5 cursor-pointer text-xs text-[#A1A1AA]"
                  >
                    <input
                      id="acceptsConfidentialityTerms"
                      name="acceptsConfidentialityTerms"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 accent-[#F27427] cursor-pointer"
                    />
                    <span>
                      Solicito convenio de confidencialidad mutua (NDA) previo al intercambio de datos.
                    </span>
                  </label>

                  <Button type="submit" variant="primary" size="lg" isLoading={isPending}>
                    <span>Confirmar Solicitud de Diagnóstico</span>
                    <Icon name="arrow-up-right" size={16} />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
