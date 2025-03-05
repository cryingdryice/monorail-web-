export function Background(){
    return (
        <div>
            {/* Background grid pattern */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="grid h-full w-full grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border border-gray-700" />
                ))}
                </div>
            </div>

            {/* Glowing orbs in background */}
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-purple-100/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-cyan-100/20 blur-3xl" />
        </div>
    );
};