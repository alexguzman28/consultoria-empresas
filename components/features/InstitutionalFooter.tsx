import { BrandLogoMark } from '@/components/ui/Icon';

export function InstitutionalFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#09090B] text-white border-t border-white/[0.07]">
      {/* Warm copper ambient glow at bottom matching Reference Image 1 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(ellipse_55%_70%_at_30%_100%,rgba(242,116,39,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-8 py-14 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Large Brand Emblem & Name matching Reference Image 1 */}
          <div>
            <a href="#top" className="inline-flex items-center gap-4">
              <BrandLogoMark size={48} />
              <span className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Vértice
              </span>
            </a>
            <p className="mt-4 text-xs text-[#9CA3AF] max-w-md">
              © 2026 Vértice Partners. Todos los derechos reservados. Los tableros y métricas en vivo representan escenarios demostrativos de nuestra metodología de consultoría operativa.
            </p>
          </div>

          {/* Right 2-Column Navigation Links matching Reference Image 1 */}
          <div className="grid grid-cols-2 gap-12 text-xs sm:text-sm text-[#D4D4D8]">
            <ul className="space-y-2.5">
              <li>
                <a href="#simulador-ebitda" className="hover:text-[#F27427] transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#practicas-intervencion" className="hover:text-[#F27427] transition-colors">
                  Soluciones
                </a>
              </li>
              <li>
                <a href="#protocolo-semanal" className="hover:text-[#F27427] transition-colors">
                  Planes
                </a>
              </li>
            </ul>
            <ul className="space-y-2.5">
              <li>
                <a href="#expedientes-auditados" className="hover:text-[#F27427] transition-colors">
                  Casos Auditados
                </a>
              </li>
              <li>
                <a href="#preguntas-frecuentes" className="hover:text-[#F27427] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#mandato-diagnostico" className="hover:text-[#F27427] transition-colors">
                  Contacto NDA
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
