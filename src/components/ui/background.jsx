"use client"

import { useEffect, useState } from "react"

export function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Subtle parallax effect based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Enhanced grid pattern with subtle animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="grid h-full w-full grid-cols-[repeat(40,1fr)] grid-rows-[repeat(20,1fr)]"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: "transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        >
          {Array.from({ length: 800 }).map((_, i) => (
            <div key={i} className="border border-gray-500 relative">
              {/* Random glowing dots at grid intersections */}
              {Math.random() > 0.96 && (
                <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-cyan-100 blur-[4px] animate-pulse"></div>
              )}
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

