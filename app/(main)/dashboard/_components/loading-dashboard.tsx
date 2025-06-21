import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:flex-row">
        {/* Main Content Skeleton */}
        <main className="flex flex-1 flex-col">
          {/* Header Skeleton */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <Skeleton className="h-6 w-32" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-60" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Welcome Section Skeleton */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full max-w-md" />
              </div>

              {/* Stats Cards Skeleton */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between pb-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-4" />
                      </div>
                      <Skeleton className="mb-1 h-8 w-12" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  ))}
              </div>

              {/* Project Progress Skeleton */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-full rounded-lg border p-6 lg:col-span-2">
                  <Skeleton className="mb-2 h-6 w-40" />
                  <Skeleton className="mb-4 h-4 w-64" />
                  <div className="space-y-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-8" />
                          </div>
                          <Skeleton className="h-2 w-full" />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <Skeleton className="mb-2 h-6 w-40" />
                  <Skeleton className="mb-4 h-4 w-48" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      {Array(3)
                        .fill(null)
                        .map((_, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Skeleton className="h-2 w-2 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Upcoming Skeleton */}
              <div className="grid gap-4 md:grid-cols-2">
                {Array(2)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="rounded-lg border p-6">
                      <Skeleton className="mb-2 h-6 w-40" />
                      <Skeleton className="mb-4 h-4 w-64" />
                      <div className="space-y-4">
                        {Array(4)
                          .fill(null)
                          .map((_, j) => (
                            <div key={j} className="flex gap-4">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <div className="space-y-1">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-24" />
                              </div>
                            </div>
                          ))}
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
