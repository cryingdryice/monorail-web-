export function GameInfoBar({timeLeft, tilesCount}){
    return(
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 text-lg sm:text-2xl font-semibold z-10 text-center">
        <div>남은 시간: <span className="text-red-500">{timeLeft}초</span></div>
        <div>남은 타일: <span className="text-red-500">{tilesCount}</span></div>
      </div>
    );
};