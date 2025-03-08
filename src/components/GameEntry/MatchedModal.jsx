"use client"

export function MatchedModal({ sub, content }) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 animate-in fade-in duration-300">
      <div className="relative w-full max-w-[400px] h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl border border-gray-700 bg-gray-900/80 shadow-[0_0_25px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden">
        {/* Animated neon border effect */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-500/30 [box-shadow:0_0_15px_rgba(6,182,212,0.3),inset_0_0_15px_rgba(6,182,212,0.3)]"></div>

        {/* Glowing orbs */}
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>

        {/* Diagonal line decoration */}
        <div className="absolute -right-4 top-0 h-[150%] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent transform rotate-[30deg]"></div>
        <div className="absolute -left-4 bottom-0 h-[150%] w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent transform rotate-[30deg]"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 [text-shadow:0_0_10px_rgba(6,182,212,0.5)]">
            {sub}
          </h2>
          <p className="mt-6 text-2xl text-white [text-shadow:0_0_5px_rgba(255,255,255,0.3)]">{content}</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-4 h-2 w-16 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
        <div className="absolute top-4 right-4 h-2 w-16 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
      </div>
    </div>
  )
}

