import { AuditCaseExplorer } from '@/components/features/AuditCaseExplorer';
import { DiagnosticMandateForm } from '@/components/features/DiagnosticMandateForm';
import { HeaderNav } from '@/components/features/HeaderNav';
import { InstitutionalFooter } from '@/components/features/InstitutionalFooter';
import { InterventionChronology } from '@/components/features/InterventionChronology';
import { PracticeLedgerSection } from '@/components/features/PracticeLedgerSection';
import { ProspectusHero } from '@/components/features/ProspectusHero';
import { parsePageSearchParams } from '@/lib/schemas';
import {
  getFilteredCaseDossiers,
  getPracticePillars,
} from '@/server/queries';

export interface HomePageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  const validatedParams = parsePageSearchParams(resolvedParams);

  const [pillars, initialCases] = await Promise.all([
    getPracticePillars(),
    getFilteredCaseDossiers({
      sector: 'todos',
      practice: 'todas',
      searchQuery: '',
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-white">
      <HeaderNav />
      <main id="main-content" className="flex-1">
        <ProspectusHero initialRevenuePreset={validatedParams.revenuePreset} />
        <PracticeLedgerSection pillars={pillars} />
        <InterventionChronology />
        <AuditCaseExplorer
          initialCases={initialCases}
          initialSector={validatedParams.sector}
          initialPractice={validatedParams.practice}
        />
        <DiagnosticMandateForm />
      </main>
      <InstitutionalFooter />
    </div>
  );
}
