import { z } from 'zod';
import type {
  AuditPracticeArea,
  DiagnosticRequestPayload,
  IndustrySector,
  SimulatorInput,
  ValidatedPageSearchParams,
} from '@/lib/types';

export const industrySectorSchema = z.enum([
  'manufactura',
  'logistica',
  'agroindustria',
  'energia',
  'consumo',
]);

export const auditPracticeAreaSchema = z.enum([
  'reestructura-operativa',
  'capital-trabajo',
  'arquitectura-costos',
  'turnaround-industrial',
]);

export const simulatorInputSchema: z.ZodType<SimulatorInput> = z.object({
  annualRevenueMxn: z
    .number({ invalid_type_error: 'El ingreso anual debe ser numérico.' })
    .min(100, 'El rango mínimo de análisis es de $100M MXN.')
    .max(25000, 'El rango máximo del simulador es de $25,000M MXN.'),
  currentEbitdaMarginPct: z
    .number({ invalid_type_error: 'El margen EBITDA debe ser numérico.' })
    .min(2, 'El margen mínimo modelable es 2%.')
    .max(40, 'El margen máximo modelable es 40%.'),
  plantOeePct: z
    .number({ invalid_type_error: 'El OEE de planta debe ser numérico.' })
    .min(40, 'El OEE mínimo de referencia es 40%.')
    .max(92, 'El OEE máximo de referencia es 92%.'),
  scrapRatePct: z
    .number({ invalid_type_error: 'La tasa de merma debe ser numérica.' })
    .min(0.5, 'La merma mínima es 0.5%.')
    .max(18, 'La merma máxima es 18%.'),
  cashConversionDays: z
    .number({ invalid_type_error: 'El ciclo de efectivo debe ser numérico.' })
    .int('El número de días debe ser entero.')
    .min(15, 'El ciclo mínimo es 15 días.')
    .max(180, 'El ciclo máximo es 180 días.'),
  sector: industrySectorSchema,
});

export const caseFilterSchema = z.object({
  sector: z.union([industrySectorSchema, z.literal('todos')]).default('todos'),
  practice: z.union([auditPracticeAreaSchema, z.literal('todas')]).default('todas'),
  searchQuery: z
    .string()
    .trim()
    .max(80, 'La búsqueda no puede exceder 80 caracteres.')
    .default(''),
});

export const pageSearchParamsSchema = z.object({
  sector: z
    .enum(['manufactura', 'logistica', 'agroindustria', 'energia', 'consumo', 'todos'])
    .optional()
    .default('todos'),
  practice: z
    .enum([
      'reestructura-operativa',
      'capital-trabajo',
      'arquitectura-costos',
      'turnaround-industrial',
      'todas',
    ])
    .optional()
    .default('todas'),
  revenuePreset: z.coerce.number().min(100).max(25000).optional(),
});

export function parsePageSearchParams(
  rawParams: Record<string, string | string[] | undefined>
): ValidatedPageSearchParams {
  const normalized: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(rawParams)) {
    normalized[key] = Array.isArray(value) ? value[0] : value;
  }

  const parsed = pageSearchParamsSchema.safeParse(normalized);
  if (!parsed.success) {
    return {
      sector: 'todos',
      practice: 'todas',
    };
  }

  const result: ValidatedPageSearchParams = {
    sector: parsed.data.sector as IndustrySector | 'todos',
    practice: parsed.data.practice as AuditPracticeArea | 'todas',
    ...(parsed.data.revenuePreset !== undefined
      ? { revenuePreset: parsed.data.revenuePreset }
      : {}),
  };
  return result;
}

export const diagnosticRequestSchema: z.ZodType<DiagnosticRequestPayload> = z.object({
  fullName: z
    .string()
    .trim()
    .min(4, 'Ingresa tu nombre completo (mínimo 4 caracteres).')
    .max(90, 'El nombre no puede exceder 90 caracteres.'),
  roleTitle: z
    .string()
    .trim()
    .min(2, 'Especifica tu cargo directivo (ej. CEO, COO, CFO, Director General).')
    .max(70, 'El cargo no puede exceder 70 caracteres.'),
  companyName: z
    .string()
    .trim()
    .min(2, 'Ingresa la razón social o nombre comercial de la empresa.')
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres.'),
  corporateEmail: z
    .string()
    .trim()
    .email('Ingresa un correo electrónico corporativo válido.')
    .max(110, 'El correo no puede exceder 110 caracteres.'),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+\d\s()-]{8,20}$/,
      'Ingresa un teléfono de contacto válido (8 a 20 dígitos).'
    ),
  sector: industrySectorSchema,
  primaryPractice: auditPracticeAreaSchema,
  annualRevenueBand: z.enum([
    '150m-500m',
    '500m-1500m',
    '1500m-5000m',
    'mas-5000m',
  ]),
  operationalMandate: z
    .string()
    .trim()
    .min(
      25,
      'Describe brevemente el reto operativo o financiero (mínimo 25 caracteres).'
    )
    .max(800, 'La descripción no puede exceder 800 caracteres.'),
  acceptsConfidentialityTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes confirmar el protocolo de confidencialidad mutua (NDA).',
    }),
});
