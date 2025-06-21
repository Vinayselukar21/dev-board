import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingEvent() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header Skeleton */}
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
        <Skeleton className="mr-2 h-8 w-8" />
        <Skeleton className="h-6 w-48" />
      </header>

      {/* Content Skeleton */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-3xl py-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-24 w-full" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <div className="flex flex-wrap gap-2 mb-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-28" />
                </div>

                <div className="mt-2 max-h-[200px] overflow-y-auto rounded-md border p-2">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="flex items-center space-x-2 py-2">
                        <Skeleton className="h-5 w-5 rounded-md" />
                        <div className="flex flex-1 items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <div className="flex flex-1 justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Skeleton className="h-10 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
