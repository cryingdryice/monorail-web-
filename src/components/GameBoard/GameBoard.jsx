import React from "react";
import { Tiles } from "components/tiles";

export default function GameBoard({ boardState, placeTile }) {
  return (
    <div
      className="grid grid-cols-10 grid-rows-10 gap-1 border-4 border-gray-700 rounded-lg p-2 z-10"
      style={{
        width: "min(95vw, 600px)", // 최대 600px, 모바일에서는 90vw로 조정
        height: "min(95vw, 600px)",
        backgroundColor: "#1f2937", // bg-gray-900
      }}
    >
      {boardState.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="flex items-center justify-center border border-gray-600 cursor-pointer"
            onClick={() => placeTile(rowIndex, colIndex)}
            style={{
              backgroundColor: "#374151", // bg-gray-800
              width: "100%", // 그리드 셀 크기 자동 조정
              height: "100%",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent", // 모바일 터치 깜빡임 방지
            }}
          >
            {tile && <Tiles type={tile} />}
          </div>
        ))
      )}
    </div>
  );
}
