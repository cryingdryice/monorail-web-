import React from "react";
import { Tiles } from "components/tiles";

export default function TileSelector({ tileTypes, selectedTile, setSelectedTile }) {
  return (
    <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-4 z-10">
      {tileTypes.map((tile, index) => (
        <button
          key={index}
          className={`flex items-center justify-center border-4 transition-all 
            ${selectedTile === tile ? "border-cyan-500" : "border-gray-500"} 
            bg-gray-800 rounded-lg hover:bg-gray-700`}
          onClick={() => setSelectedTile(tile)}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
            <Tiles type={tile} />
          </div>
        </button>
      ))}
    </div>
  );
}
