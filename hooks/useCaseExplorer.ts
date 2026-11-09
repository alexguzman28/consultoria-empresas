'use client';

import { useCallback, useMemo, useState } from 'react';
import { caseFilterSchema } from '@/lib/schemas';
import type {
  AuditPracticeArea,
  CaseStudyDossier,
  IndustrySector,
} from '@/lib/types';

export interface UseCaseExplorerProps {
  readonly initialCases: readonly CaseStudyDossier[];
  readonly initialSector?: IndustrySector | 'todos';
  readonly initialPractice?: AuditPracticeArea | 'todas';
}

export interface UseCaseExplorerReturn {
  readonly selectedSector: IndustrySector | 'todos';
  readonly selectedPractice: AuditPracticeArea | 'todas';
  readonly searchQuery: string;
  readonly selectedDossier: CaseStudyDossier | null;
  readonly filteredCases: readonly CaseStudyDossier[];
  readonly isTransitioning: boolean;
  readonly filterError: string | null;
  readonly handleSectorChange: (sector: IndustrySector | 'todos') => void;
  readonly handlePracticeChange: (practice: AuditPracticeArea | 'todas') => void;
  readonly handleSearchChange: (query: string) => void;
  readonly handleSelectDossier: (id: string) => void;
  readonly resetFilters: () => void;
  readonly simulateAuditErrorTest: () => void;
}

export function useCaseExplorer({
  initialCases,
  initialSector = 'todos',
  initialPractice = 'todas',
}: UseCaseExplorerProps): UseCaseExplorerReturn {
  const [selectedSector, setSelectedSector] = useState<IndustrySector | 'todos'>(
    initialSector
  );
  const [selectedPractice, setSelectedPractice] = useState<
    AuditPracticeArea | 'todas'
  >(initialPractice);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDossierId, setActiveDossierId] = useState<string>(
    initialCases[0]?.id ?? ''
  );
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [filterError, setFilterError] = useState<string | null>(null);

  const triggerBriefTransition = useCallback((): void => {
    setIsTransitioning(true);
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 180);
  }, []);

  const handleSectorChange = useCallback(
    (sector: IndustrySector | 'todos'): void => {
      setFilterError(null);
      setSelectedSector(sector);
      triggerBriefTransition();
    },
    [triggerBriefTransition]
  );

  const handlePracticeChange = useCallback(
    (practice: AuditPracticeArea | 'todas'): void => {
      setFilterError(null);
      setSelectedPractice(practice);
      triggerBriefTransition();
    },
    [triggerBriefTransition]
  );

  const handleSearchChange = useCallback((query: string): void => {
    const validation = caseFilterSchema.safeParse({
      sector: 'todos',
      practice: 'todas',
      searchQuery: query,
    });
    if (!validation.success) {
      setFilterError(
        validation.error.issues[0]?.message ?? 'Criterio de búsqueda inválido.'
      );
      return;
    }
    setFilterError(null);
    setSearchQuery(query);
  }, []);

  const resetFilters = useCallback((): void => {
    setFilterError(null);
    setSelectedSector('todos');
    setSelectedPractice('todas');
    setSearchQuery('');
    triggerBriefTransition();
  }, [triggerBriefTransition]);

  const simulateAuditErrorTest = useCallback((): void => {
    setFilterError(
      'No fue posible sincronizar el repositorio remoto de expedientes históricos. Mostrando caché local verificada.'
    );
  }, []);

  const filteredCases = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return initialCases.filter((item) => {
      const sectorMatch =
        selectedSector === 'todos' || item.sector === selectedSector;
      const practiceMatch =
        selectedPractice === 'todas' || item.practice === selectedPractice;
      const queryMatch =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.sectorLabel.toLowerCase().includes(normalizedQuery) ||
        item.contextSummary.toLowerCase().includes(normalizedQuery) ||
        item.registryCode.toLowerCase().includes(normalizedQuery);
      return sectorMatch && practiceMatch && queryMatch;
    });
  }, [initialCases, selectedSector, selectedPractice, searchQuery]);

  const selectedDossier = useMemo(() => {
    if (filteredCases.length === 0) {
      return null;
    }
    const found = filteredCases.find((c) => c.id === activeDossierId);
    return found ?? filteredCases[0] ?? null;
  }, [filteredCases, activeDossierId]);

  const handleSelectDossier = useCallback((id: string): void => {
    setActiveDossierId(id);
  }, []);

  return {
    selectedSector,
    selectedPractice,
    searchQuery,
    selectedDossier,
    filteredCases,
    isTransitioning,
    filterError,
    handleSectorChange,
    handlePracticeChange,
    handleSearchChange,
    handleSelectDossier,
    resetFilters,
    simulateAuditErrorTest,
  };
}
