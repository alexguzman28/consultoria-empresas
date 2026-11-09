import type { AuditPracticeArea, IndustrySector } from '@/lib/types';

const CURRENCY_FORMATTER = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const INTEGER_FORMATTER = new Intl.NumberFormat('es-MX', {
  maximumFractionDigits: 0,
});

export function formatMillionsMxn(valueInMillions: number): string {
  return `${CURRENCY_FORMATTER.format(valueInMillions)}M`;
}

export function formatDeltaMillionsMxn(valueInMillions: number): string {
  const prefix = valueInMillions >= 0 ? '+' : '';
  return `${prefix}${CURRENCY_FORMATTER.format(valueInMillions)}M`;
}

export function formatBasisPoints(bps: number): string {
  const prefix = bps >= 0 ? '+' : '';
  return `${prefix}${INTEGER_FORMATTER.format(bps)} bps`;
}

export function formatPercentage(pct: number, decimals = 1): string {
  return `${pct.toFixed(decimals)}%`;
}

export const SECTOR_LABELS: Record<IndustrySector, string> = {
  manufactura: 'Manufactura y Transformación Metalmecánica',
  logistica: 'Logística, Cadena de Frío y Distribución',
  agroindustria: 'Agroindustria y Procesamiento de Alimentos',
  energia: 'Energía, Infraestructura y Química Industrial',
  consumo: 'Bienes de Consumo y Retail Multicanal',
};

export const PRACTICE_LABELS: Record<AuditPracticeArea, string> = {
  'reestructura-operativa': 'Reestructuración Operativa y OEE en Planta',
  'capital-trabajo': 'Liberación de Capital de Trabajo y Liquidez',
  'arquitectura-costos': 'Arquitectura de Costos, Merma y Margen Bruto',
  'turnaround-industrial': 'Turnaround Integral y Dirección Interina (CRO)',
};
