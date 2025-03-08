import { Tiles } from "components/tiles"

export default function TileSelector({ tileTypes, selectedTile, setSelectedTile }) {
  return (
    <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-4 z-10">
      {tileTypes.map((tile, index) => {
        const isSelected = selectedTile === tile

        return (
          <div key={index} className="relative group">
            {/* Selection indicator with animation */}
            {isSelected && (
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50 rounded-lg blur-sm animate-pulse"></div>
            )}

            <button
              className={`relative flex items-center justify-center border-2 transition-all duration-200 
                ${
                  isSelected
                    ? "border-cyan-500 [box-shadow:0_0_15px_rgba(6,182,212,0.5),inset_0_0_5px_rgba(6,182,212,0.3)]"
                    : "border-gray-700 hover:border-gray-500"
                } 
                bg-gray-800/90 backdrop-blur-sm rounded-lg overflow-hidden`}
              onClick={() => setSelectedTile(tile)}
            >
              {/* Button background with hover effect */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 
                ${isSelected ? "opacity-100" : ""}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              </div>

              {/* Corner accents */}
              <div
                className={`absolute top-0 left-0 w-3 h-3 border-t-[1px] border-l-[1px] 
                ${isSelected ? "border-cyan-400" : "border-gray-600"} 
                transition-colors duration-200 group-hover:border-cyan-400`}
              ></div>
              <div
                className={`absolute top-0 right-0 w-3 h-3 border-t-[1px] border-r-[1px] 
                ${isSelected ? "border-purple-400" : "border-gray-600"} 
                transition-colors duration-200 group-hover:border-purple-400`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-3 h-3 border-b-[1px] border-l-[1px] 
                ${isSelected ? "border-purple-400" : "border-gray-600"} 
                transition-colors duration-200 group-hover:border-purple-400`}
              ></div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 border-b-[1px] border-r-[1px] 
                ${isSelected ? "border-cyan-400" : "border-gray-600"} 
                transition-colors duration-200 group-hover:border-cyan-400`}
              ></div>

              {/* Tile container */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center relative z-10">
                {/* Subtle glow effect behind tile */}
                {isSelected && <div className="absolute inset-0 bg-cyan-500/10 rounded-md"></div>}
                <Tiles type={tile} />
              </div>
            </button>
          </div>
        )
      })}
    </div>
  )
}

