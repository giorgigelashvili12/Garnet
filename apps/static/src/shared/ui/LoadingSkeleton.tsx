export default function LoadingSkeleton() {
    return (
        <div className="animate-pulse space-y-12">
            <div className="h-10 w-32 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
            <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
                    <div className="h-40 w-full bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
                </div>
                <div className="h-64 lg:h-full bg-zinc-100 dark:bg-zinc-900 rounded-4xl" />
            </div>
        </div>
    );
}