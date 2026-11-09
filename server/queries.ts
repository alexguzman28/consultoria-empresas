import { caseFilterSchema } from '@/lib/schemas';
import type {
  AuditPracticeArea,
  CaseStudyDossier,
  IndustrySector,
  PracticePillar,
} from '@/lib/types';

const PRACTICE_PILLARS: readonly PracticePillar[] = [
  {
    id: 'reestructura-operativa',
    code: 'SEC-I · PLANTA Y CAPACIDAD',
    title: 'Desbloqueo de Capacidad OEE y Balanceo de Línea',
    thesis:
      'Eliminamos tiempos muertos ocultos, micro-paros y cuellos de botella en piso de producción sin requerir CAPEX adicional.',
    targetSymptom:
      'Plantas operando por debajo del 68% de OEE con horas extra recurrentes e incumplimiento de nivel de servicio (OTIF).',
    fieldMechanism:
      'Cronometraje industrial en turno, rediseño SMED de cambios de formato y celdas de control horario por supervisor.',
    primaryKpi: '+14 a +22 puntos de OEE en 10 semanas',
    typicalBpsRange: '+210 a +380 bps en EBITDA',
    auditArtifacts: [
      'Mapa de Pérdidas de Capacidad por Línea',
      'Matriz Estándar de Cambios de Herramental (SMED)',
      'Tablero de Control Horario de Piso',
    ],
  },
  {
    id: 'arquitectura-costos',
    code: 'SEC-II · MARGEN BRUTO Y COSTOS',
    title: 'Compresión de Merma, Costo Unitario y Fugas de Margen',
    thesis:
      'Auditamos el costo estándar frente al costo real por lote y SKU para erradicar desperdicio de materia prima y descuentos sin retorno.',
    targetSymptom:
      'Crecimiento en volumen de ventas acompañado de estancamiento o contracción en el margen bruto trimestral.',
    fieldMechanism:
      'Conciliación forense de balances de masa en planta y depuración de rentabilidad neta por cliente/SKU.',
    primaryKpi: '-35% a -52% en merma operativa',
    typicalBpsRange: '+180 a +340 bps en EBITDA',
    auditArtifacts: [
      'Árbol de Variación de Costo Estándar vs. Real',
      'Curva de Rentabilidad Neta por SKU (Deciles)',
      'Protocolo de Control de Dosificación e Insumos',
    ],
  },
  {
    id: 'capital-trabajo',
    code: 'SEC-III · CAJA Y LIQUIDEZ',
    title: 'Liberación de Capital de Trabajo y Ciclo de Efectivo',
    thesis:
      'Convertimos inventario obsoleto o sobredimensionado y cuentas por cobrar vencidas en flujo de caja libre inmediato.',
    targetSymptom:
      'Alta deuda de corto plazo para financiar operación, sobre-inventario de seguridad y baja rotación de almacén.',
    fieldMechanism:
      'Reingeniería de políticas de reorden ( S&OP ), liquidación estructurada de lento movimiento y gobernanza de cobranza.',
    primaryKpi: '-18 a -32 días en ciclo de conversión de caja',
    typicalBpsRange: 'Liberación de 8% a 14% sobre ingresos en efectivo',
    auditArtifacts: [
      'Matriz ABC-XYZ de Rotación y Obsolescencia',
      'Modelo Paramétrico de Punto de Reorden Dinámico',
      'Comité Semanal de Tesorería y S&OP',
    ],
  },
  {
    id: 'turnaround-industrial',
    code: 'SEC-IV · REESTRUCTURA INTEGRAL',
    title: 'Turnaround Corporativo y Oficina de Ejecución (PMO/CRO)',
    thesis:
      'Intervención quirúrgica de estado mayor cuando la organización enfrenta presión de covenants, fusiones o reestructuras críticas.',
    targetSymptom:
      'Erosión severa de flujo operativo, desviación presupuestal aguda o integración post-adquisición estancada.',
    fieldMechanism:
      'Instalación de War Room semanal con mandato sobre gasto, renegociación con proveedores clave y rediseño organizacional.',
    primaryKpi: 'Punto de equilibrio restablecido en 12 semanas',
    typicalBpsRange: '+350 a +620 bps en EBITDA anualizado',
    auditArtifacts: [
      'Flujo de Caja Directo a 13 Semanas (13-Week Cash Flow)',
      'Presupuesto Base Cero de Gasto Operativo (SG&A)',
      'Contrato de Mandato y Tablero de Covenants',
    ],
  },
];

const ILLUSTRATIVE_CASES: readonly CaseStudyDossier[] = [
  {
    id: 'case-metalmecanica-norte',
    registryCode: 'EXP-2026-014 · ESCENARIO AUDITADO ILUSTRATIVO',
    sector: 'manufactura',
    sectorLabel: 'Manufactura Metalmecánica',
    practice: 'reestructura-operativa',
    practiceLabel: 'Reestructuración Operativa y OEE',
    title: 'Recuperación de capacidad instalada y eliminación de tercerización en estampado automotriz Tier-2',
    clientProfile: 'Grupo industrial con 3 plantas y $2,400M MXN de facturación anual (Escenario demostrativo).',
    contextSummary:
      'La compañía subcontrataba el 19% de su producción por saturación aparente en prensas, mientras el OEE real auditado en piso era de apenas 58.4%.',
    baselineRevenueMxn: 2400,
    ebitdaExpansionBps: 410,
    cashReleasedMxn: 142.5,
    cycleTimeReductionPct: 31.0,
    interventionWeeks: 12,
    isIllustrative: true,
    auditLedger: [
      { metric: 'OEE Global de Prensas', before: '58.4%', after: '79.2%', delta: '+20.8 pts' },
      { metric: 'Tiempo de Cambio de Troquel (SMED)', before: '114 min', after: '38 min', delta: '-66.7%' },
      { metric: 'Tasa de Merma de Acero', before: '6.1%', after: '2.9%', delta: '-3.2 pts' },
      { metric: 'Margen EBITDA Auditado', before: '11.2%', after: '15.3%', delta: '+410 bps' },
    ],
    milestones: [
      {
        weekRange: 'Semanas 01–03',
        title: 'Auditoría Forense de Tiempos y Balance de Masa',
        fieldAction: 'Medición directa en 18 líneas de prensado e identificación de paros no registrados en ERP.',
        verifiableOutput: 'Dictamen de capacidad oculta de 3,100 horas-máquina trimestrales.',
      },
      {
        weekRange: 'Semanas 04–08',
        title: 'Estandarización SMED y Secuenciación por Familia',
        fieldAction: 'Separación de preparación interna/externa de troqueles y reordenamiento de lotes mínimos.',
        verifiableOutput: 'Cancelación de contratos de maquila externa y ahorro de $8.2M MXN/mes.',
      },
      {
        weekRange: 'Semanas 09–12',
        title: 'Gobernanza de Piso y Cierre Financiero en P&L',
        fieldAction: 'Auditoría conjunta con Contraloría para certificar la absorción fija en estados financieros.',
        verifiableOutput: 'Expansión anualizada certificada de +$98.4M MXN en EBITDA.',
      },
    ],
  },
  {
    id: 'case-cadena-frio-occidente',
    registryCode: 'EXP-2026-029 · ESCENARIO AUDITADO ILUSTRATIVO',
    sector: 'logistica',
    sectorLabel: 'Logística y Cadena de Frío',
    practice: 'capital-trabajo',
    practiceLabel: 'Liberación de Capital de Trabajo',
    title: 'Compresión del ciclo de conversión de efectivo y optimización de flota refrigerada nacional',
    clientProfile: 'Operador logístico y distribuidor B2B con $1,650M MXN de ingresos anuales (Escenario demostrativo).',
    contextSummary:
      'El crecimiento en rutas regionales elevó el ciclo de caja a 89 días y disparó el costo de flete muerto y combustible por kilómetro recorrido.',
    baselineRevenueMxn: 1650,
    ebitdaExpansionBps: 365,
    cashReleasedMxn: 198.0,
    cycleTimeReductionPct: 27.5,
    interventionWeeks: 10,
    isIllustrative: true,
    auditLedger: [
      { metric: 'Ciclo de Conversión de Efectivo', before: '89 días', after: '56 días', delta: '-33 días' },
      { metric: 'Factor de Ocupación de Flota', before: '67.0%', after: '88.5%', delta: '+21.5 pts' },
      { metric: 'Costo Logístico sobre Ventas', before: '16.8%', after: '13.4%', delta: '-340 bps' },
      { metric: 'Efectivo Liberado en Balance', before: '$0M', after: '$198.0M MXN', delta: '+$198.0M' },
    ],
    milestones: [
      {
        weekRange: 'Semanas 01–02',
        title: 'Radiografía de Rutas, Tarifas y Cartera Vencida',
        fieldAction: 'Cruce de telemetría GPS con rentabilidad por ruta y antigüedad de saldos por cliente.',
        verifiableOutput: 'Identificación de 24 rutas deficitarias y $115M MXN retenidos en disputas.',
      },
      {
        weekRange: 'Semanas 03–06',
        title: 'Rediseño de Red Troncal y Política S&OP',
        fieldAction: 'Consolidación de ventanas de despacho y depuración de inventario de baja rotación en CEDIS.',
        verifiableOutput: 'Reducción de 19% en kilómetros en vacío y liberación de andenes.',
      },
      {
        weekRange: 'Semanas 07–10',
        title: 'Mesa de Control de Liquidez a 13 Semanas',
        fieldAction: 'Vinculación de bonos comerciales a cobranza efectiva y rotación de inventario.',
        verifiableOutput: 'Liberación neta de $198.0M MXN en flujo de caja libre auditado.',
      },
    ],
  },
  {
    id: 'case-agroindustrial-bajio',
    registryCode: 'EXP-2026-041 · ESCENARIO AUDITADO ILUSTRATIVO',
    sector: 'agroindustria',
    sectorLabel: 'Agroindustria y Alimentos',
    practice: 'arquitectura-costos',
    practiceLabel: 'Arquitectura de Costos y Merma',
    title: 'Blindaje de margen bruto mediante control gravimétrico de merma y depuración de portafolio SKU',
    clientProfile: 'Procesadora de alimentos e ingredientes industriales con $3,100M MXN en ventas (Escenario demostrativo).',
    contextSummary:
      'Variaciones no explicadas en rendimiento de materia prima y sobrepeso por empaque erosionaban 320 puntos base del margen bruto anual.',
    baselineRevenueMxn: 3100,
    ebitdaExpansionBps: 385,
    cashReleasedMxn: 164.0,
    cycleTimeReductionPct: 24.0,
    interventionWeeks: 11,
    isIllustrative: true,
    auditLedger: [
      { metric: 'Merma de Proceso y Sobrellenado', before: '5.4%', after: '2.1%', delta: '-3.3 pts' },
      { metric: 'SKUs con Margen de Contribución Negativo', before: '18.5%', after: '0.0%', delta: 'Eliminados' },
      { metric: 'Margen Bruto Consolidado', before: '24.1%', after: '27.6%', delta: '+350 bps' },
      { metric: 'Expansión Anualizada de EBITDA', before: '$341M', after: '$460.3M', delta: '+$119.3M' },
    ],
    milestones: [
      {
        weekRange: 'Semanas 01–03',
        title: 'Balance de Masa por Lote y Auditoría de Precios',
        fieldAction: 'Instalación de puntos de control estadístico de peso en envasado y costeo real por línea.',
        verifiableOutput: 'Cuantificación exacta de fugas por sobrellenado y descuentos comerciales.',
      },
      {
        weekRange: 'Semanas 04–07',
        title: 'Racionalización de Portafolio y Recalibración',
        fieldAction: 'Renegociación o salida de 42 SKUs deficitarios y ajuste de tolerancias en planta.',
        verifiableOutput: 'Incremento inmediato de +280 bps en margen de contribución.',
      },
      {
        weekRange: 'Semanas 08–11',
        title: 'Cierre de Costo Estándar y Gobernanza Mensual',
        fieldAction: 'Actualización de listas de materiales (BOM) e integración de alertas de desviación.',
        verifiableOutput: '+385 bps de mejora sostenida en el estado de resultados.',
      },
    ],
  },
];

export async function getPracticePillars(): Promise<readonly PracticePillar[]> {
  return PRACTICE_PILLARS;
}

export async function getFilteredCaseDossiers(rawFilter: {
  readonly sector?: IndustrySector | 'todos';
  readonly practice?: AuditPracticeArea | 'todas';
  readonly searchQuery?: string;
}): Promise<readonly CaseStudyDossier[]> {
  const parsed = caseFilterSchema.safeParse(rawFilter);
  const filter = parsed.success
    ? parsed.data
    : { sector: 'todos' as const, practice: 'todas' as const, searchQuery: '' };

  return ILLUSTRATIVE_CASES.filter((dossier) => {
    const matchesSector =
      filter.sector === 'todos' || dossier.sector === filter.sector;
    const matchesPractice =
      filter.practice === 'todas' || dossier.practice === filter.practice;
    const query = filter.searchQuery.toLowerCase();
    const matchesQuery =
      query.length === 0 ||
      dossier.title.toLowerCase().includes(query) ||
      dossier.sectorLabel.toLowerCase().includes(query) ||
      dossier.contextSummary.toLowerCase().includes(query);

    return matchesSector && matchesPractice && matchesQuery;
  });
}
