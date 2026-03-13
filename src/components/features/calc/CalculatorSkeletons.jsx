import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton() {
  return (
    <div className="md:pt-4 flex flex-col font-bold text-xs gap-2 md:gap-4 text-foreground">
      {[...Array(6)].map((_, i) => (
        <article key={i} className="flex flex-col">
          <Skeleton className="h-10 w-full" />
        </article>
      ))}
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="w-full h-full overflow-y-auto relative z-10">
      <div className="w-full flex flex-col overflow-y-auto gap-4 md:gap-4 pt-4 pb-8 p-4 md:p-6">
        <div className="w-full">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6 max-h-[80%] overflow-hidden">
          <Skeleton className="w-full h-64" />
          <Skeleton className="w-full h-64" />
        </div>
      </div>
    </div>
  );
}
