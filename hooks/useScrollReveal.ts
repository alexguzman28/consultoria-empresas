'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseScrollRevealOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    setIsVisible(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible, hasAnimated };
}
