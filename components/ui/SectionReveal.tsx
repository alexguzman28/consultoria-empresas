'use client';

import type { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface SectionRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delayMs?: number;
}

export function SectionReveal({
  children,
  className = '',
  delayMs = 0,
}: SectionRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}
