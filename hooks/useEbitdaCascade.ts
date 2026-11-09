'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { computeEbitdaCascade } from '@/lib/financial-engine';
import { simulatorInputSchema } from '@/lib/schemas';
import type {
  CascadeSimulationResult,
  IndustrySector,
  SimulatorInput,
} from '@/lib/types';

export interface ScenarioPreset {
  readonly id: string;
  readonly label: string;
  readonly caption: string;
  readonly input: SimulatorInput;
}

export const SCENARIO_PRESETS: readonly ScenarioPreset[] = [
  {
    id: 'metalmecanica',
    label: 'Planta Metalmecánica ($1,850M)',
    caption: 'Saturación de línea y sobre-tiempo',
    input: {
      annualRevenueMxn: 1850,
      currentEbitdaMarginPct: 12.4,
      plantOeePct: 61,
      scrapRatePct: 5.2,
      cashConversionDays: 82,
      sector: 'manufactura',
    },
  },
  {
    id: 'logistica',
    label: 'Red Cadena de Frío ($1,400M)',
    caption: 'Flota sub-utilizada y cartera a 88 días',
    input: {
      annualRevenueMxn: 1400,
      currentEbitdaMarginPct: 10.8,
      plantOeePct: 66,
      scrapRatePct: 3.1,
      cashConversionDays: 88,
      sector: 'logistica',
    },
  },
  {
    id: 'agroindustria',
    label: 'Grupo Agroindustrial ($3,200M)',
    caption: 'Fuga de merma en envasado y mix SKU',
    input: {
      annualRevenueMxn: 3200,
      currentEbitdaMarginPct: 14.2,
      plantOeePct: 64,
      scrapRatePct: 5.8,
      cashConversionDays: 74,
      sector: 'agroindustria',
    },
  },
];

export interface UseEbitdaCascadeReturn {
  readonly input: SimulatorInput;
  readonly simulation: CascadeSimulationResult;
  readonly isAttractMode: boolean;
  readonly activePresetId: string;
  readonly validationError: string | null;
  readonly updateField: <K extends keyof SimulatorInput>(
    field: K,
    value: SimulatorInput[K]
  ) => void;
  readonly selectPreset: (presetId: string) => void;
  readonly toggleAttractMode: () => void;
}

export function useEbitdaCascade(initialRevenuePreset?: number): UseEbitdaCascadeReturn {
  const defaultPreset = SCENARIO_PRESETS[0]!;
  const [input, setInput] = useState<SimulatorInput>(() => ({
    ...defaultPreset.input,
    ...(initialRevenuePreset !== undefined
      ? { annualRevenueMxn: initialRevenuePreset }
      : {}),
  }));
  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [isAttractMode, setIsAttractMode] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAttractMode) {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePresetId((currentId) => {
        const currentIndex = SCENARIO_PRESETS.findIndex((p) => p.id === currentId);
        const nextIndex = (currentIndex + 1) % SCENARIO_PRESETS.length;
        const nextPreset = SCENARIO_PRESETS[nextIndex]!;
        setInput(nextPreset.input);
        return nextPreset.id;
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isAttractMode]);

  const updateField = useCallback(
    <K extends keyof SimulatorInput>(field: K, value: SimulatorInput[K]): void => {
      setIsAttractMode(false);
      setActivePresetId('custom');
      setInput((prev) => {
        const candidate: SimulatorInput = { ...prev, [field]: value };
        const check = simulatorInputSchema.safeParse(candidate);
        if (!check.success) {
          setValidationError(
            check.error.issues[0]?.message ?? 'Parámetro fuera de rango auditable.'
          );
          return prev;
        }
        setValidationError(null);
        return check.data;
      });
    },
    []
  );

  const selectPreset = useCallback((presetId: string): void => {
    const found = SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!found) {
      return;
    }
    setIsAttractMode(false);
    setValidationError(null);
    setActivePresetId(found.id);
    setInput(found.input);
  }, []);

  const toggleAttractMode = useCallback((): void => {
    setIsAttractMode((prev) => !prev);
  }, []);

  const simulation = useMemo(() => computeEbitdaCascade(input), [input]);

  return {
    input,
    simulation,
    isAttractMode,
    activePresetId,
    validationError,
    updateField,
    selectPreset,
    toggleAttractMode,
  };
}

export function isSectorValue(val: string): val is IndustrySector {
  return (
    val === 'manufactura' ||
    val === 'logistica' ||
    val === 'agroindustria' ||
    val === 'energia' ||
    val === 'consumo'
  );
}
