import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSettings() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:flex-row">
        {/* Main Content Skeleton */}
        <main className="flex flex-1 flex-col">
          {/* Header Skeleton */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <Skeleton className="h-6 w-24" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-60" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Settings Info Skeleton */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full max-w-md" />
              </div>

              {/* Settings Tabs Skeleton */}
              <div>
                <div className="grid grid-cols-2 gap-1 md:grid-cols-6">
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
                <div className="pt-4">
                  <div className="rounded-lg border p-6">
                    <div className="mb-4 flex flex-col gap-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Skeleton className="h-6 w-48" />
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-10 w-full" />
                          </div>
                          <div className="grid gap-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-24 w-full" />
                          </div>
                          <div className="grid gap-2">
                            <Skeleton className="h-5 w-32" />
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-5 w-40" />
                              <Skeleton className="h-10 flex-1" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-10 w-full" />
                          </div>
                          <div className="grid gap-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-10 w-full" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Skeleton className="h-5 w-24" />
                              <Skeleton className="h-4 w-48" />
                            </div>
                            <Skeleton className="h-6 w-10" />
                          </div>
                        </div>
                      </div>

                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
