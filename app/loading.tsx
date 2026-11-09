import { DossierSkeletonLoader, Skeleton } from '@/components/ui/Skeleton';

export default function LoadingPage() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-[#09090B] px-4 sm:px-8 py-10 max-w-[1180px] mx-auto space-y-8"
    >
      <Skeleton className="h-14 w-full" />
      <div className="space-y-6">
        <Skeleton className="h-16 w-2/3 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <DossierSkeletonLoader />
      </div>
    </div>
  );
}
