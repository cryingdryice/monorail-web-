"use client"

export function Tiles({ type }) {
  // Railway track base style
  const trackBaseStyle = {
    stroke: "#3052af", // Dark blue base for the track
    strokeWidth: "12",
    strokeLinecap: "round",
  }
  
  // Railway track inner line style
  const trackInnerStyle = {
    stroke: "#2a3f4d", // Slightly lighter than base for dimension
    strokeWidth: "8",
    strokeLinecap: "round",
  }
  
  // Energy flow glow effect (ALWAYS MOVING)
  const energyGlowStyle = {
    stroke: "#4eeaff", // Bright cyan for energy
    strokeWidth: "4",
    strokeLinecap: "round",
    filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8)) drop-shadow(0px 0px 12px rgba(78, 234, 255, 0.5))",
    strokeDasharray: "20, 20", // Glow segments
    strokeDashoffset: "0",
    animation: "energyFlow 1.5s linear infinite", // Always animated
  }

  const tileShapes = {
    0: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Track base */}
        <line x1="10" y1="50" x2="90" y2="50" style={trackBaseStyle} />
        
        {/* Track inner */}
        <line x1="10" y1="50" x2="90" y2="50" style={trackInnerStyle} />
        
        {/* Energy flow */}
        <line x1="10" y1="50" x2="90" y2="50" style={energyGlowStyle} />
        
        {/* Connection nodes */}
        <circle cx="10" cy="50" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="10" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        <circle cx="90" cy="50" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="90" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
      </svg>
    ),
    1: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Track base */}
        <line x1="50" y1="10" x2="50" y2="90" style={trackBaseStyle} />
        
        {/* Track inner */}
        <line x1="50" y1="10" x2="50" y2="90" style={trackInnerStyle} />
        
        {/* Energy flow */}
        <line x1="50" y1="10" x2="50" y2="90" style={energyGlowStyle} />
        
        {/* Connection nodes */}
        <circle cx="50" cy="10" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="10" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        <circle cx="50" cy="90" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="90" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Track base */}
        <line x1="90" y1="50" x2="50" y2="50" style={trackBaseStyle} />
        <line x1="50" y1="50" x2="50" y2="10" style={trackBaseStyle} />
        
        {/* Track inner */}
        <line x1="90" y1="50" x2="50" y2="50" style={trackInnerStyle} />
        <line x1="50" y1="50" x2="50" y2="10" style={trackInnerStyle} />
        
        {/* Energy flow */}
        <line x1="90" y1="50" x2="50" y2="50" style={energyGlowStyle} />
        <line x1="50" y1="50" x2="50" y2="10" style={energyGlowStyle} />
        
        {/* Connection nodes */}
        <circle cx="90" cy="50" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="90" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        <circle cx="50" cy="10" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="10" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        {/* Junction node */}
        <circle cx="50" cy="50" r="8" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="50" r="5" style={{ fill: "#2a3f4d" }} />
        <circle cx="50" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 8px rgba(78, 234, 255, 0.8))" }} />
      </svg>
    ),
    3: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Track base */}
        <line x1="10" y1="50" x2="50" y2="50" style={trackBaseStyle} />
        <line x1="50" y1="50" x2="50" y2="10" style={trackBaseStyle} />
        
        {/* Track inner */}
        <line x1="10" y1="50" x2="50" y2="50" style={trackInnerStyle} />
        <line x1="50" y1="50" x2="50" y2="10" style={trackInnerStyle} />
        
        {/* Energy flow */}
        <line x1="10" y1="50" x2="50" y2="50" style={energyGlowStyle} />
        <line x1="50" y1="50" x2="50" y2="10" style={energyGlowStyle} />
        
        {/* Connection nodes */}
        <circle cx="10" cy="50" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="10" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        <circle cx="50" cy="10" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="10" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        {/* Junction node */}
        <circle cx="50" cy="50" r="8" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="50" r="5" style={{ fill: "#2a3f4d" }} />
        <circle cx="50" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 8px rgba(78, 234, 255, 0.8))" }} />
      </svg>
    ),
    4: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Track base */}
        <line x1="10" y1="50" x2="50" y2="50" style={trackBaseStyle} />
        <line x1="50" y1="50" x2="50" y2="90" style={trackBaseStyle} />
        
        {/* Track inner */}
        <line x1="10" y1="50" x2="50" y2="50" style={trackInnerStyle} />
        <line x1="50" y1="50" x2="50" y2="90" style={trackInnerStyle} />
        
        {/* Energy flow */}
        <line x1="10" y1="50" x2="50" y2="50" style={energyGlowStyle} />
        <line x1="50" y1="50" x2="50" y2="90" style={energyGlowStyle} />
        
        {/* Connection nodes */}
        <circle cx="10" cy="50" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="10" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        <circle cx="50" cy="90" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="90" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        {/* Junction node */}
        <circle cx="50" cy="50" r="8" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="50" r="5" style={{ fill: "#2a3f4d" }} />
        <circle cx="50" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 8px rgba(78, 234, 255, 0.8))" }} />
      </svg>
    ),
    5: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Track base */}
        <line x1="90" y1="50" x2="50" y2="50" style={trackBaseStyle} />
        <line x1="50" y1="50" x2="50" y2="90" style={trackBaseStyle} />
        
        {/* Track inner */}
        <line x1="90" y1="50" x2="50" y2="50" style={trackInnerStyle} />
        <line x1="50" y1="50" x2="50" y2="90" style={trackInnerStyle} />
        
        {/* Energy flow */}
        <line x1="90" y1="50" x2="50" y2="50" style={energyGlowStyle} />
        <line x1="50" y1="50" x2="50" y2="90" style={energyGlowStyle} />
        
        {/* Connection nodes */}
        <circle cx="90" cy="50" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="90" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        <circle cx="50" cy="90" r="6" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="90" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8))" }} />
        
        {/* Junction node */}
        <circle cx="50" cy="50" r="8" style={{ fill: "#1a2e3b" }} />
        <circle cx="50" cy="50" r="5" style={{ fill: "#2a3f4d" }} />
        <circle cx="50" cy="50" r="3" style={{ fill: "#4eeaff", filter: "drop-shadow(0px 0px 8px rgba(78, 234, 255, 0.8))" }} />
      </svg>
    ),
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {tileShapes[type]}

      {/* ✅ 항상 실행되는 에너지 흐름 애니메이션 추가 */}
      <style jsx>{`
        @keyframes energyFlow {
          0% {
            stroke-dashoffset: 40;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}
