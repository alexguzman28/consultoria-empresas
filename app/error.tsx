'use client';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export interface ErrorPageProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div
      role="alert"
      className="min-h-screen bg-[#09090B] text-white flex items-center justify-center p-6"
    >
      <div className="max-w-lg w-full rounded-3xl border border-white/[0.1] bg-[#121215] p-8 space-y-5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-2.5 text-[#FCA5A5] text-xs font-bold uppercase">
          <Icon name="alert" size={18} />
          <span>Interrupción en el Panel Operativo</span>
        </div>
        <h1 className="text-2xl font-semibold text-white">
          No fue posible cargar la vista solicitada
        </h1>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          {error.message ||
            'Ocurrió un error temporal al procesar la solicitud. Tus parámetros permanecen resguardados.'}
        </p>
        <div className="pt-2">
          <Button variant="primary" onClick={reset}>
            <Icon name="refresh" size={16} />
            <span>Reintentar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
