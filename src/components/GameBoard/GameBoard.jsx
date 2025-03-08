"use client"

import { useState } from "react"
import { Tiles } from "components/tiles"

export default function GameBoard({ boardState, placeTile }) {
  const [hoverCell, setHoverCell] = useState(null)

  return (
    <div className="relative z-10">
      {/* Outer glow effect */}
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-md"></div>

      <div
        className="relative grid grid-cols-10 grid-rows-10 gap-0.5 border-[3px] border-gray-800 rounded-lg p-2 bg-gray-900/90 backdrop-blur-sm overflow-hidden"
        style={{
          width: "min(95vw, 600px)",
          height: "min(95vw, 600px)",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/70 rounded-tl-sm"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500/70 rounded-tr-sm"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-500/70 rounded-bl-sm"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/70 rounded-br-sm"></div>

        {/* Game cells */}
        {boardState.map((row, rowIndex) =>
          row.map((tile, colIndex) => {
            const isHovered = hoverCell === `${rowIndex}-${colIndex}`
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`relative flex items-center justify-center transition-all duration-150 ${
                  isHovered ? "z-10" : "z-0"
                }`}
                onMouseEnter={() => setHoverCell(`${rowIndex}-${colIndex}`)}
                onMouseLeave={() => setHoverCell(null)}
                onClick={() => placeTile(rowIndex, colIndex)}
              >
                {/* Cell background with hover effect */}
                <div
                  className={`absolute inset-0 border border-gray-400/50 bg-gray-850/80 transition-all duration-150 ${
                    isHovered ? "bg-gray-700/90 border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]" : ""
                  }`}
                ></div>

                {/* Highlight effect on hover */}
                {isHovered && !tile && <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>}

                {/* Tile content */}
                <div className="relative">{tile && <Tiles type={tile} />}</div>
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}

