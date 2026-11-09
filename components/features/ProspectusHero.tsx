import { EbitdaCascadeSimulator } from '@/components/features/EbitdaCascadeSimulator';

export interface ProspectusHeroProps {
  readonly initialRevenuePreset?: number;
}

const TRUSTED_COMPANIES = [
  'Grupo Alfa Industrial',
  'Ferromex Logística',
  'Cemex Operaciones',
  'Sigma Alimentos',
  'Nemak Powertrain',
  'Vitro Corporativo',
] as const;

export function ProspectusHero({ initialRevenuePreset }: ProspectusHeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 hero-spotlight-beams"
    >
      <div className="relative mx-auto max-w-[1220px] px-4 sm:px-8">
        {/* Centered Spotlight Hero Header matching Image 1 */}
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white leading-[1.12] tracking-[-0.03em]"
          >
            Toma Decisiones Empresariales Más Inteligentes con Datos, No Suposiciones
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Transforma operaciones complejas en hallazgos claros, predice escenarios de rentabilidad y optimiza tu EBITDA en tiempo real con nuestra consultoría de ejecución e inteligencia operativa.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#mandato-diagnostico"
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-gradient-to-b from-[#FF8C42] to-[#E66316] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-4px_rgba(242,116,39,0.55)] hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              Diagnóstico Gratuito
            </a>
            <a
              href="#simulador-ebitda"
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white hover:bg-white/[0.09] hover:border-white/[0.24] hover:-translate-y-0.5 transition-all"
            >
              Agendar Demo
            </a>
          </div>
        </div>

        {/* Full Interactive Dashboard Showcase below Hero CTA */}
        <div className="mt-12 sm:mt-14">
          <EbitdaCascadeSimulator initialRevenuePreset={initialRevenuePreset} />
        </div>

        {/* Trusted By Logos Strip matching Image 1 */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Respaldado por más de 200+ consejos directivos y equipos industriales en crecimiento
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75">
            {TRUSTED_COMPANIES.map((brand) => (
              <div
                key={brand}
                className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#A1A1AA] hover:text-white transition-colors"
              >
                <span className="h-2 w-2 rounded-sm rotate-45 bg-[#F27427]/80" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
