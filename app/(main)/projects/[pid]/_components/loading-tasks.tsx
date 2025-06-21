import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingTasks() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:flex-row">
        {/* Main Content Skeleton */}
        <main className="flex flex-1 flex-col">
          {/* Header Skeleton */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-32" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-60" />
              <Skeleton className="h-9 w-24" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Project Info Skeleton */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-9 w-36" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-8 w-8 rounded-full border-2 border-background" />
                      ))}
                  </div>
                  <Skeleton className="h-6 w-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              {/* Kanban Board Skeleton */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col rounded-lg border bg-muted/30">
                      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-6" />
                      </div>
                      <div className="flex flex-col gap-2 p-2">
                        {Array(3)
                          .fill(null)
                          .map((_, j) => (
                            <div key={j} className="rounded-md border bg-background p-3">
                              <Skeleton className="mb-2 h-5 w-full" />
                              <Skeleton className="mb-3 h-4 w-3/4" />
                              <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-6 w-6 rounded-full" />
                              </div>
                            </div>
                          ))}
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
