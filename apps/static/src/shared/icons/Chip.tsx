export const Chip = () => {
    return (
        <div className="relative w-12 h-9 bg-linear-to-br from-gray-300 via-gray-400 to-gray-500 rounded-md overflow-hidden border border-black/20 shadow-inner">
            <div className="absolute top-1/2 left-0 w-full h-px bg-black/30 -translate-y-1/2" />

            <div className="absolute top-0 left-1/3 w-px h-full bg-black/30" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-black/30" />

            <div className="absolute inset-1.5 border border-black/20 rounded-sm bg-linear-to-tl from-gray-400 to-gray-200 shadow-sm" />

            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(110deg,transparent_40%,white_50%,transparent_60%)]" />
        </div>
    );
};