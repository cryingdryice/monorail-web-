import { useState, useEffect, useRef } from "react";
import GameBoard from "components/GameBoard/GameBoard";
import TileSelector from "components/GameBoard/TileSelector";
import { useLocation, useParams } from "react-router-dom";
import { useGameWebSocket } from "hooks/useGameWebSocket";
import { checkLoop } from "utiles/checkLoop";
import { Background } from "components/ui/background";
import { GameInfoBar } from "components/GamePlay/GameInfoBar";
import { ButtonGroup } from "components/GamePlay/ButtonGroup";
import { GameEndModal } from "components/GamePlay/GameEndModal";
import { checkStraigh, checkStraightLine } from "utiles/checkStraight";
import { checkAdjacent } from "utiles/checkAdjacent";
import { Notification } from "components/GamePlay/Notification";
import { ImpossibleNote } from "components/GamePlay/ImpossibleNote";
import bbopSound from "assets/bbop.mp3";

// 타일 종류 정의
const tileTypes = ["0", "1", "2", "3", "4", "5"];

export default function GamePlayPage() {
  const [tilesCount, setTilesCount] = useState(16);
  const [tilesPlaced, setTilesPlaced] = useState(0);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const timeRef = useRef(timeLeft);
  const [selectedTile, setSelectedTile] = useState(null);
  const [boardState, setBoardState] = useState(() => {
    const initialBoard = Array(10).fill(null).map(() => Array(10).fill(null));
    initialBoard[4][4] = "0";
    initialBoard[4][5] = "0";
    return initialBoard;
  });
  const [notification, setNotification] = useState(null);

  const { roomId } = useParams();
  const location = useLocation();
  const opponentName = location.state?.opponentName || "Unknown Player";
  const playerId = location.state?.playerId || "null";
  const { gameStatus, isMyTurn, winner, surrender, victory, endTurn, impossible } = useGameWebSocket(
    roomId,
    playerId,
    location.state?.isFirst,
    setBoardState,
    setTilesCount
  );

  // ✅ useRef를 활용하여 Audio 객체를 재사용
  const tilePlaceSoundRef = useRef(null);

  useEffect(() => {
    tilePlaceSoundRef.current = new Audio(bbopSound);
    tilePlaceSoundRef.current.volume = 0.3;
  }, []);

  // 타일 배치 함수 (GameBoard에서 호출)
  const placeTile = (row, col) => {
    if (selectedTile === null) return;

    if (!isMyTurn) {
      showNotification("지금은 상대방의 턴입니다!");
      return;
    }

    if (tilesCount <= 0) {
      showNotification("타일을 모두 소모했습니다!");
      return;
    }

    if (boardState[row][col] !== null) {
      showNotification("이미 배치된 위치입니다!");
      return;
    }

    if (gameStatus !== "impossible") {
      if (tilesPlaced >= 3) {
        showNotification("한 턴에 최대 3개의 타일만 놓을 수 있습니다!");
        return;
      }

      if (!checkAdjacent(boardState, row, col)) {
        showNotification("기존 타일과 맞닿아야 합니다!");
        return;
      }

      if (!checkStraigh(placedTiles, { row, col })) {
        showNotification("이번 턴에 놓은 타일들은 반드시 일직선을 이루어야 합니다!");
        return;
      }
    }

    // ✅ 새로운 보드 상태 생성
    const updatedBoard = boardState.map((r, rowIndex) =>
      r.map((tile, colIndex) => (rowIndex === row && colIndex === col ? selectedTile : tile))
    );

    setBoardState(updatedBoard);
    setTilesPlaced((prev) => prev + 1);
    setTilesCount((prev) => prev - 1);
    setSelectedTile(null);
    setPlacedTiles((prev) => [...prev, { row, col }]);

    // ✅ 최적화된 오디오 재생
    if (tilePlaceSoundRef.current) {
      tilePlaceSoundRef.current.currentTime = 0; // 음원 지연 방지 (즉시 재생)
      tilePlaceSoundRef.current.play().catch((err) => console.log("효과음 재생 실패:", err));
    }
  };

  // 턴 종료 함수
  const checkEnd = () => {
    if (gameStatus === "impossible") {
      // 불가능일 때 승패
      endTurn(boardState, tilesCount);
      checkLoop(boardState) ? victory("completed") : surrender("unfinished");
    } else if (tilesPlaced === 0) {
      return showNotification("최소 1개 이상의 타일을 배치해야 턴을 종료할 수 있습니다!");
    } else {
      // 일반적인 턴종료
      endTurn(boardState, tilesCount);
      if (checkLoop(boardState)) victory("completed");
    }
  
    setTilesPlaced(0);
    setTimeLeft(60);
    setPlacedTiles([]);
  };
  
  useEffect(() => {
    if (!isMyTurn) return;
  
    timeRef.current = timeLeft;
    const timer = setInterval(() => {
      if (timeRef.current === 1) {
        surrender("timeover");
        clearInterval(timer);
      } else {
        timeRef.current -= 1;
        setTimeLeft(timeRef.current); 
      }
    }, 1000);
  
    return () => clearInterval(timer);
  }, [isMyTurn]);

  // ✅ 알림 메시지 표시 함수
  const showNotification = (message, duration = 2000) => {
    setNotification(message);
    setTimeout(() => setNotification(null), duration);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      <Background />

      <div className="absolute top-2 text-2xl font-semibold text-gray-300 z-10">
        상대: <span className="text-cyan-400">{opponentName}</span>
      </div>

      <GameBoard boardState={boardState} placeTile={placeTile} />

      <TileSelector tileTypes={tileTypes} selectedTile={selectedTile} setSelectedTile={setSelectedTile} />

      <GameInfoBar timeLeft={timeLeft} tilesCount={tilesCount} />

      <ButtonGroup
        isMyTurn={isMyTurn}
        placedTiles={placedTiles}
        gameStatus={gameStatus}
        setTimeLeft={setTimeLeft}
        impossible={impossible}
        checkEnd={checkEnd}
        surrender={surrender}
      />

      {notification && <Notification notification={notification} />}
      {gameStatus === "impossible" && <ImpossibleNote />}
      {["completed", "unfinished", "timeover", "surrender", "disconnected"].includes(gameStatus) && (
        <GameEndModal isWinner={winner === playerId} cause={gameStatus} />
      )}
    </div>
  );
}
