import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingCalendar() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:flex-row">

        {/* Main Content Skeleton */}
        <main className="flex flex-1 flex-col">
          {/* Header Skeleton */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-24" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-60" />
              <Skeleton className="h-9 w-24" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Calendar Controls Skeleton */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-48" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>

              {/* Calendar View Skeleton */}
              <div className="rounded-lg border bg-background">
                {/* Month View Skeleton */}
                <div className="grid grid-cols-7 border-b bg-muted/50">
                  {Array(7)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="p-3 text-center">
                        <Skeleton className="mx-auto h-5 w-8" />
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 auto-rows-fr">
                  {Array(35)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="min-h-[120px] border-b border-r p-1">
                        <div className="flex justify-between p-1">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-6 w-6" />
                        </div>
                        <div className="mt-1 space-y-1">
                          {i % 5 === 0 && (
                            <>
                              <Skeleton className="h-4 w-full rounded-sm" />
                              <Skeleton className="h-4 w-3/4 rounded-sm" />
                            </>
                          )}
                          {i % 7 === 3 && <Skeleton className="h-4 w-full rounded-sm" />}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
