import { BrandLogoMark } from '@/components/ui/Icon';

export function HeaderNav() {
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-8">
      <div className="mx-auto max-w-[1180px] rounded-2xl border border-white/[0.08] bg-[#121215]/85 backdrop-blur-xl px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
        <nav
          aria-label="Navegación principal"
          className="flex items-center justify-between gap-4"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 text-white focus-visible:outline-2 focus-visible:outline-[#F27427]"
          >
            <BrandLogoMark size={26} />
            <span className="text-lg font-bold tracking-tight text-white">
              Vértice
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A1A1AA]">
            <a
              href="#simulador-ebitda"
              className="hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#practicas-intervencion"
              className="hover:text-white transition-colors"
            >
              Soluciones
            </a>
            <a
              href="#expedientes-auditados"
              className="hover:text-white transition-colors"
            >
              Casos Reales
            </a>
            <a
              href="#protocolo-semanal"
              className="hover:text-white transition-colors"
            >
              Planes
            </a>
            <a
              href="#preguntas-frecuentes"
              className="hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#mandato-diagnostico"
              className="inline-flex min-h-[38px] items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white hover:bg-white/[0.1] hover:border-white/[0.25] transition-all"
            >
              Iniciar Diagnóstico
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
