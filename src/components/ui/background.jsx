import { useEffect, useState } from "react"

export function Background() {

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Enhanced grid pattern with subtle animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="grid h-full w-full grid-cols-[repeat(20,1fr)] grid-rows-[repeat(10,1fr)]"
        >
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="border border-gray-500 relative">
            </div>
          ))}
        </div>
      </div>

      {/* Digital circuit lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="absolute top-3/4 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="absolute left-1/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="absolute left-3/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
      </div>

      {/* Enhanced glowing orbs with animation */}
      <div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse"
        style={{
          transition: "transform 1s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"
        style={{
          animationDelay: "1s",
          transition: "transform 1s ease-out",
        }}
      />
    </div>
  )
}

