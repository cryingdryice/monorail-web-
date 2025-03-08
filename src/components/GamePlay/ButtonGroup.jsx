import { Button } from "components/ui/button";

export function ButtonGroup({ isMyTurn, placedTiles, gameStatus, setTimeLeft, impossible, checkEnd, surrender }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-6 z-10">
      
      {/* 🚫 불가능 버튼 (강렬한 레드 네온) */}
      <Button
        className="relative w-28 h-12 sm:w-36 sm:h-14 md:w-44 md:h-16 text-lg sm:text-xl font-semibold text-white 
                   bg-red-600/80 border border-red-500 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.6)] 
                   transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_25px_rgba(255,0,0,1)]
                   disabled:opacity-50 disabled:shadow-none"
        onClick={() => { setTimeLeft(60); impossible(); }}
        disabled={!isMyTurn || placedTiles.length > 0 || gameStatus === "impossible"}
      >
        불가능
      </Button>

      {/* ✅ 배치 완료 버튼 (사이버틱한 블루 네온) */}
      <Button
        className="relative w-28 h-12 sm:w-36 sm:h-14 md:w-44 md:h-16 text-lg sm:text-xl font-semibold text-white 
                   bg-cyan-500/80 border border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.6)] 
                   transition-all duration-300 hover:bg-cyan-600 hover:shadow-[0_0_25px_rgba(0,255,255,1)]
                   disabled:opacity-50 disabled:shadow-none"
        onClick={checkEnd}
        disabled={!isMyTurn}
      >
        {isMyTurn ? "배치완료" : "상대 턴..."}
      </Button>

      {/* 🏳 항복 버튼 (딥 퍼플 네온) */}
      <Button
        className="relative w-28 h-12 sm:w-36 sm:h-14 md:w-44 md:h-16 text-lg sm:text-xl font-semibold text-white 
                   bg-purple-600/80 border border-purple-500 rounded-lg shadow-[0_0_15px_rgba(160,32,240,0.6)] 
                   transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(160,32,240,1)]"
        onClick={() => surrender("surrender")}
      >
        항복
      </Button>

    </div>
  );
}
