'use client';

import { useState } from 'react';
import type { CascadeSimulationResult } from '@/lib/types';

export interface CascadeBridgeTableProps {
  readonly simulation: CascadeSimulationResult;
}

type TimeRange = '24H' | '7D' | '30D' | '90D';

const CHART_CURVES: Record<
  TimeRange,
  {
    readonly orangePath: string;
    readonly orangeArea: string;
    readonly whitePath: string;
    readonly peakX: number;
    readonly peakY: number;
    readonly peakLabel: string;
  }
> = {
  '24H': {
    orangePath:
      'M 0 155 C 65 140, 110 115, 165 128 C 220 140, 245 72, 295 72 C 345 72, 390 105, 455 98 C 510 92, 545 118, 600 102',
    orangeArea:
      'M 0 155 C 65 140, 110 115, 165 128 C 220 140, 245 72, 295 72 C 345 72, 390 105, 455 98 C 510 92, 545 118, 600 102 L 600 210 L 0 210 Z',
    whitePath:
      'M 0 112 C 75 125, 125 88, 185 95 C 240 102, 285 130, 345 110 C 405 90, 465 78, 525 92 C 565 100, 585 95, 600 90',
    peakX: 295,
    peakY: 72,
    peakLabel: '+18.4% Conversión',
  },
  '7D': {
    orangePath:
      'M 0 165 C 70 150, 120 135, 175 110 C 230 85, 265 55, 320 58 C 375 61, 415 95, 475 88 C 525 82, 560 70, 600 62',
    orangeArea:
      'M 0 165 C 70 150, 120 135, 175 110 C 230 85, 265 55, 320 58 C 375 61, 415 95, 475 88 C 525 82, 560 70, 600 62 L 600 210 L 0 210 Z',
    whitePath:
      'M 0 128 C 80 115, 140 102, 200 118 C 260 134, 310 95, 370 85 C 430 75, 490 92, 540 84 C 570 80, 585 78, 600 74',
    peakX: 320,
    peakY: 58,
    peakLabel: '+22.1% Conversión',
  },
  '30D': {
    orangePath:
      'M 0 148 C 60 132, 105 118, 160 134 C 215 150, 235 46, 285 48 C 335 50, 365 82, 420 78 C 475 74, 520 116, 600 98',
    orangeArea:
      'M 0 148 C 60 132, 105 118, 160 134 C 215 150, 235 46, 285 48 C 335 50, 365 82, 420 78 C 475 74, 520 116, 600 98 L 600 210 L 0 210 Z',
    whitePath:
      'M 0 100 C 65 118, 115 76, 175 82 C 235 88, 255 124, 305 104 C 355 84, 415 110, 475 90 C 535 70, 565 84, 600 88',
    peakX: 285,
    peakY: 48,
    peakLabel: '+26.8% EBITDA',
  },
  '90D': {
    orangePath:
      'M 0 172 C 70 155, 130 125, 195 105 C 260 85, 310 68, 375 42 C 440 16, 495 52, 545 46 C 575 42, 590 38, 600 34',
    orangeArea:
      'M 0 172 C 70 155, 130 125, 195 105 C 260 85, 310 68, 375 42 C 440 16, 495 52, 545 46 C 575 42, 590 38, 600 34 L 600 210 L 0 210 Z',
    whitePath:
      'M 0 135 C 75 122, 145 108, 215 98 C 285 88, 345 82, 410 72 C 475 62, 530 68, 570 58 C 585 54, 595 52, 600 50',
    peakX: 375,
    peakY: 42,
    peakLabel: '+34.2% Run-Rate',
  },
};

export function CascadeBridgeTable({ simulation }: CascadeBridgeTableProps) {
  const [range, setRange] = useState<TimeRange>('30D');
  const activeCurve = CHART_CURVES[range];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#141417] p-5 flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Tendencia de Ingresos vs. Margen EBITDA
          </h3>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Proyección auditada: +${simulation.totalExpansionMxn.toFixed(1)}M MXN (+{simulation.totalExpansionBps} bps)
          </p>
        </div>

        <div
          role="group"
          aria-label="Periodo de gráfica"
          className="flex items-center gap-1.5"
        >
          {(['24H', '7D', '30D', '90D'] as const).map((item) => {
            const active = range === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setRange(item)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-[#09090B] font-semibold shadow-sm'
                    : 'border border-white/[0.1] bg-transparent text-[#9CA3AF] hover:text-white'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Smooth Spline Chart matching Image 2 */}
      <div className="mt-5 relative">
        <svg
          viewBox="0 0 660 235"
          className="w-full h-[200px] sm:h-[220px] overflow-visible"
          role="img"
          aria-label="Gráfica comparativa de ingresos y tasa de conversión de EBITDA"
        >
          <defs>
            <linearGradient id="orangeAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F27427" stopOpacity="0.42" />
              <stop offset="75%" stopColor="#F27427" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#F27427" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal & Vertical Dashed Grid Lines */}
          {[35, 80, 125, 170, 210].map((y, idx) => (
            <g key={y}>
              <line
                x1="45"
                y1={y}
                x2="615"
                y2={y}
                stroke="rgba(255,255,255,0.07)"
                strokeDasharray="3 3"
              />
              <text
                x="38"
                y={y + 4}
                textAnchor="end"
                className="fill-[#71717A] text-[10px] font-mono"
              >
                {260 - idx * 65}M
              </text>
              <text
                x="622"
                y={y + 4}
                textAnchor="start"
                className="fill-[#71717A] text-[10px] font-mono"
              >
                {(18.5 - idx * 3.5).toFixed(1)}%
              </text>
            </g>
          ))}

          {[95, 195, 295, 395, 495, 595].map((x, idx) => (
            <g key={x}>
              <line
                x1={x}
                y1="35"
                x2={x}
                y2="210"
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
              />
              <text
                x={x}
                y="228"
                textAnchor="middle"
                className="fill-[#71717A] text-[10px]"
              >
                Sem {idx * 2 + 1}
              </text>
            </g>
          ))}

          <g transform="translate(45, 0)">
            {/* Orange Area Fill */}
            <path
              d={activeCurve.orangeArea}
              fill="url(#orangeAreaGrad)"
              className="transition-all duration-500"
            />
            {/* Secondary White Spline */}
            <path
              d={activeCurve.whitePath}
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="2.2"
              className="transition-all duration-500"
            />
            {/* Primary Copper-Orange Spline */}
            <path
              d={activeCurve.orangePath}
              fill="none"
              stroke="#F27427"
              strokeWidth="2.8"
              className="transition-all duration-500"
            />

            {/* Highlighted Peak Dot */}
            <circle
              cx={activeCurve.peakX}
              cy={activeCurve.peakY}
              r="7"
              fill="#09090B"
              stroke="#F27427"
              strokeWidth="3"
            />
            <circle
              cx={activeCurve.peakX}
              cy={activeCurve.peakY}
              r="3.5"
              fill="#F27427"
            />
          </g>
        </svg>
      </div>

      {/* Bottom Legend */}
      <div className="mt-2 flex items-center justify-center gap-6 text-xs text-[#D4D4D8]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white inline-block" />
          <span>Ingresos Auditados ($ MXN)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F27427] inline-block" />
          <span>Conversión de Margen EBITDA (%)</span>
        </div>
      </div>
    </div>
  );
}
