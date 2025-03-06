import { Button } from "components/ui/button";

export function ButtonGroup({isMyTurn, placedTiles, gameStatus, setTimeLeft, impossible, checkEnd, surrender}){
    console.log(placedTiles)
    return(
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 z-10">
            {isMyTurn && (placedTiles.length === 0) && (gameStatus !== "impossible") ? (
            <Button className="w-28 h-10 sm:w-32 sm:h-12 md:w-40 md:h-14 text-lg sm:text-xl bg-red-600 hover:bg-red-700 rounded-xl" 
                onClick={() => {setTimeLeft(60); impossible()}}>불가능</Button>
            ) : (
            <Button className="w-28 h-10 sm:w-32 sm:h-12 md:w-40 md:h-14 text-lg sm:text-xl bg-red-600 hover:bg-red-700 rounded-xl" disabled>
                불가능
            </Button>
            )}
            {isMyTurn ? (
            <Button className="w-28 h-10 sm:w-32 sm:h-12 md:w-40 md:h-14 text-lg sm:text-xl bg-yellow-500 hover:bg-yellow-600 rounded-xl" onClick={checkEnd}>
                배치 완료
            </Button>
            ) : (
            <Button className="w-28 h-10 sm:w-32 sm:h-12 md:w-40 md:h-14 text-lg sm:text-xl bg-yellow-500 hover:bg-yellow-600 rounded-xl" disabled>
                상대 턴...
            </Button>
            )}
            <Button className="w-28 h-10 sm:w-32 sm:h-12 md:w-40 md:h-14 text-lg sm:text-xl bg-gray-700 hover:bg-gray-800 rounded-xl" onClick={surrender}>
            항복
            </Button>
        </div>
    );
};