'use server';

import { diagnosticRequestSchema } from '@/lib/schemas';
import type {
  DiagnosticActionState,
  DiagnosticRequestPayload,
} from '@/lib/types';

function extractFormString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

export async function submitDiagnosticRequestAction(
  _prevState: DiagnosticActionState,
  formData: FormData
): Promise<DiagnosticActionState> {
  const rawCandidate = {
    fullName: extractFormString(formData, 'fullName'),
    roleTitle: extractFormString(formData, 'roleTitle'),
    companyName: extractFormString(formData, 'companyName'),
    corporateEmail: extractFormString(formData, 'corporateEmail'),
    phone: extractFormString(formData, 'phone'),
    sector: extractFormString(formData, 'sector'),
    primaryPractice: extractFormString(formData, 'primaryPractice'),
    annualRevenueBand: extractFormString(formData, 'annualRevenueBand'),
    operationalMandate: extractFormString(formData, 'operationalMandate'),
    acceptsConfidentialityTerms:
      formData.get('acceptsConfidentialityTerms') === 'on' ||
      formData.get('acceptsConfidentialityTerms') === 'true',
  };

  const validation = diagnosticRequestSchema.safeParse(rawCandidate);

  if (!validation.success) {
    const fieldErrors: Partial<Record<keyof DiagnosticRequestPayload, string>> = {};
    for (const issue of validation.error.issues) {
      const pathKey = issue.path[0];
      if (typeof pathKey === 'string' && !(pathKey in fieldErrors)) {
        fieldErrors[pathKey as keyof DiagnosticRequestPayload] = issue.message;
      }
    }

    return {
      status: 'error',
      message:
        'Existen campos con formato incompleto en el expediente. Verifica las observaciones señaladas.',
      fieldErrors,
    };
  }

  const validData = validation.data;
  const deterministicHash = Array.from(validData.companyName)
    .reduce((acc, char) => acc + char.charCodeAt(0), 1040)
    .toString(16)
    .toUpperCase()
    .slice(0, 4);

  const folioCode = `VRT-2026-${deterministicHash}`;

  return {
    status: 'success',
    message: `Mandato de evaluación registrado para ${validData.companyName}. Un Socio Director de Práctica Operativa enviará el convenio NDA y la propuesta de diagnóstico en campo dentro de las próximas 4 horas hábiles.`,
    folioCode,
    timestampIso: new Date().toISOString(),
  };
}
