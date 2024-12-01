import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="h-full min-h-screen p-4 lg:px-7 lg:pt-4 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="size-10 rounded-full" />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:pr-4 max-h-[calc(100%-64px)] h-full ">
        <div className="w-full lg:min-h-full lg:w-1/2">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="w-full lg:min-h-full lg:w-1/2">
          <Skeleton className="w-full h-full" />
        </div>
      </main>
    </div>
  )
}
