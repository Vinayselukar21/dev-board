import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingOrgMembers() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:flex-row">

        {/* Main Content Skeleton */}
        <main className="flex flex-1 flex-col">
          {/* Header Skeleton */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-16" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-60" />
              <Skeleton className="h-9 w-24" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Team Info Skeleton */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full max-w-md" />
              </div>

              {/* Tabs Skeleton */}
              <div>
                <div className="flex border-b">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton key={i} className="mx-1 h-10 w-24" />
                    ))}
                </div>
                <div className="pt-4">
                  <div className="rounded-lg border p-4">
                    <div className="mb-4 flex flex-col gap-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="overflow-hidden rounded-lg border">
                      <div className="bg-muted/50 p-3">
                        <div className="grid grid-cols-6 gap-4">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                        </div>
                      </div>
                      <div className="divide-y">
                        {Array(8)
                          .fill(null)
                          .map((_, i) => (
                            <div key={i} className="p-4">
                              <div className="grid grid-cols-6 gap-4">
                                <div className="flex items-center gap-2">
                                  <Skeleton className="h-8 w-8 rounded-full" />
                                  <Skeleton className="h-5 w-20" />
                                </div>
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-16" />
                              </div>
                            </div>
                          ))}
                      </div>
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
