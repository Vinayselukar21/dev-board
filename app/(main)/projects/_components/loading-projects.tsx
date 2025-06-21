import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingProjects() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:flex-row">

        {/* Main Content Skeleton */}
        <main className="flex flex-1 flex-col">
          {/* Header Skeleton */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <Skeleton className="h-8 w-40" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-60" />
              <Skeleton className="h-9 w-24" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Title Skeleton */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full max-w-md" />
              </div>

              {/* Cards Skeleton */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <Skeleton className="mb-2 h-6 w-32" />
                      <Skeleton className="mb-4 h-4 w-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-5/6" />
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
