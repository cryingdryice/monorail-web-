import { memo } from "react";

// 타일별 기본 스타일 정의
const trackBaseStyle = {
  stroke: "#3052af",
  strokeWidth: "12",
  strokeLinecap: "round",
};

const trackInnerStyle = {
  stroke: "#4eeaff",
  strokeWidth: "4",
  strokeLinecap: "round",
  filter: "drop-shadow(0px 0px 5px rgba(78, 234, 255, 0.8)) drop-shadow(0px 0px 12px rgba(78, 234, 255, 0.5))",
};

const Tiles = memo(({ type }) => {

  const tileShapes = {
    0: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Track base */}
        <line x1="10" y1="50" x2="90" y2="50" style={trackBaseStyle} />
        
        {/* Track inner */}
        <line x1="10" y1="50" x2="90" y2="50" style={trackInnerStyle} />
        
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

  return tileShapes[type] || null;
});

export { Tiles };