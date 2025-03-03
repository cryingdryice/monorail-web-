import React from "react";

export function Tiles({ type }) {
  const commonStyle = {
    stroke: "cyan", // 네온 컬러
    strokeWidth: "10", // 선을 더 두껍게
    strokeLinecap: "round",
    filter: "drop-shadow(0px 0px 8px cyan)", // ✅ 글로우 효과 추가
  };

  const tileShapes = {
    0: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="10" y1="50" x2="90" y2="50" {...commonStyle} />
      </svg>
    ),
    1: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="50" y1="10" x2="50" y2="90" {...commonStyle} />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="90" y1="50" x2="50" y2="50" {...commonStyle} />
        <line x1="50" y1="50" x2="50" y2="10" {...commonStyle} />
      </svg>
    ),
    3: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="10" y1="50" x2="50" y2="50" {...commonStyle} />
        <line x1="50" y1="50" x2="50" y2="10" {...commonStyle} />
      </svg>
    ),
    4: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="10" y1="50" x2="50" y2="50" {...commonStyle} />
        <line x1="50" y1="50" x2="50" y2="90" {...commonStyle} />
      </svg>
    ),
    5: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <line x1="90" y1="50" x2="50" y2="50" {...commonStyle} />
        <line x1="50" y1="50" x2="50" y2="90" {...commonStyle} />
      </svg>
    ),
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {tileShapes[type]}
    </div>
  );
}
