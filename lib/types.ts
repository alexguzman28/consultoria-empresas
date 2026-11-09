export type IndustrySector =
  | 'manufactura'
  | 'logistica'
  | 'agroindustria'
  | 'energia'
  | 'consumo';

export type AuditPracticeArea =
  | 'reestructura-operativa'
  | 'capital-trabajo'
  | 'arquitectura-costos'
  | 'turnaround-industrial';

export interface SimulatorInput {
  readonly annualRevenueMxn: number;
  readonly currentEbitdaMarginPct: number;
  readonly plantOeePct: number;
  readonly scrapRatePct: number;
  readonly cashConversionDays: number;
  readonly sector: IndustrySector;
}

export interface CascadeBridgeRow {
  readonly id: string;
  readonly code: string;
  readonly concept: string;
  readonly driverLabel: string;
  readonly baselineMxn: number;
  readonly deltaMxn: number;
  readonly projectedMxn: number;
  readonly impactBps: number;
  readonly category: 'base' | 'expansion' | 'target';
}

export interface CascadeSimulationResult {
  readonly baselineEbitdaMxn: number;
  readonly projectedEbitdaMxn: number;
  readonly totalExpansionMxn: number;
  readonly projectedMarginPct: number;
  readonly totalExpansionBps: number;
  readonly releasedWorkingCapitalMxn: number;
  readonly estimatedPaybackWeeks: number;
  readonly rows: readonly CascadeBridgeRow[];
}

export interface ExecutionMilestone {
  readonly weekRange: string;
  readonly title: string;
  readonly fieldAction: string;
  readonly verifiableOutput: string;
}

export interface CaseStudyDossier {
  readonly id: string;
  readonly registryCode: string;
  readonly sector: IndustrySector;
  readonly sectorLabel: string;
  readonly practice: AuditPracticeArea;
  readonly practiceLabel: string;
  readonly title: string;
  readonly clientProfile: string;
  readonly contextSummary: string;
  readonly baselineRevenueMxn: number;
  readonly ebitdaExpansionBps: number;
  readonly cashReleasedMxn: number;
  readonly cycleTimeReductionPct: number;
  readonly interventionWeeks: number;
  readonly isIllustrative: boolean;
  readonly auditLedger: readonly {
    readonly metric: string;
    readonly before: string;
    readonly after: string;
    readonly delta: string;
  }[];
  readonly milestones: readonly ExecutionMilestone[];
}

export interface PracticePillar {
  readonly id: AuditPracticeArea;
  readonly code: string;
  readonly title: string;
  readonly thesis: string;
  readonly targetSymptom: string;
  readonly fieldMechanism: string;
  readonly primaryKpi: string;
  readonly typicalBpsRange: string;
  readonly auditArtifacts: readonly string[];
}

export interface DiagnosticRequestPayload {
  readonly fullName: string;
  readonly roleTitle: string;
  readonly companyName: string;
  readonly corporateEmail: string;
  readonly phone: string;
  readonly sector: IndustrySector;
  readonly primaryPractice: AuditPracticeArea;
  readonly annualRevenueBand: '150m-500m' | '500m-1500m' | '1500m-5000m' | 'mas-5000m';
  readonly operationalMandate: string;
  readonly acceptsConfidentialityTerms: boolean;
}

export interface DiagnosticActionState {
  readonly status: 'idle' | 'success' | 'error';
  readonly message: string;
  readonly folioCode?: string;
  readonly timestampIso?: string;
  readonly fieldErrors?: Partial<Record<keyof DiagnosticRequestPayload, string>>;
}

export interface ValidatedPageSearchParams {
  readonly sector: IndustrySector | 'todos';
  readonly practice: AuditPracticeArea | 'todas';
  readonly revenuePreset?: number;
}
