export interface SkeletonProps {
  readonly className?: string;
  readonly label?: string;
}

export function Skeleton({
  className = 'h-6 w-full',
  label = 'Cargando datos auditados...',
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`animate-pulse rounded-xl bg-[#18181B] border border-white/[0.08] ${className}`}
    />
  );
}

export function DossierSkeletonLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 sm:p-8 space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <span className="sr-only">Actualizando tablero de analítica...</span>
    </div>
  );
}
