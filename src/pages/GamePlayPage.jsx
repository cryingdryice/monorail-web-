"use client";

import { useState, useEffect } from "react";
import GameBoard from "components/GameBoard/GameBoard";
import TileSelector from "components/GameBoard/TileSelector";
import { useLocation, useParams } from "react-router-dom";
import { useGameWebSocket } from "hooks/useGameWebSocket";
import { checkLoop } from "utiles/checkLoop";
import usePreventRefresh from "hooks/usePreventRefresh";
import { Background } from "components/ui/background";
import { GameInfoBar } from "components/GamePlay/GameInfoBar";
import { ButtonGroup } from "components/GamePlay/ButtonGroup";
import { GameEndModal } from "components/GamePlay/GameEndModal";

// 타일 종류 정의
const tileTypes = ["0", "1", "2", "3", "4", "5"];

export default function GamePlayPage() {
  const [tilesCount, setTilesCount] = useState(16);
  const [tilesPlaced, setTilesPlaced] = useState(0); // 현재 턴에서 배치한 타일 개수
  const [placedTiles, setPlacedTiles] = useState([]); // 이번 턴에서 놓은 타일들의 좌표 저장
  const [timeLeft, setTimeLeft] = useState(60); // 타이머 (30초)
  const [selectedTile, setSelectedTile] = useState(null); // 현재 선택한 타일
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
  const playerId = location.state?.playerId || "null"; // ✅ playerId 확인
  const { gameStatus, isMyTurn, winner, surrender, victory, endTurn, impossible } = useGameWebSocket(roomId, playerId, location.state?.isFirst, setBoardState, setTilesCount);
  usePreventRefresh(surrender);

  // 타일 배치 함수 (GameBoard에서 호출)
  const placeTile = (row, col) => {
    if (selectedTile === null) return;
  
    // 🚫 현재 턴이 아닌 플레이어는 타일을 놓을 수 없음
    if (!isMyTurn) {
      showNotification("지금은 상대방의 턴입니다!");
      return;
    }

    if(tilesCount <= 0){
      showNotification("타일을 모두 소모했습니다!");
      return;
    }
  
    // 🚫 이미 배치된 타일이 있는 경우 배치 불가
    if (boardState[row][col] !== null) {
      showNotification("이미 배치된 위치입니다!");
      return;
    }
  
    if(gameStatus !== "impossible"){
      // 🚫 한 턴에 3개 이상 배치할 수 없음
      if (tilesPlaced >= 3) {
        showNotification("한 턴에 최대 3개의 타일만 놓을 수 있습니다!");
        return;
      }
    
      // ✅ 기존 타일과 인접한지 확인
      const adjacentTiles = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1]
      ];
    
      const isAdjacent = adjacentTiles.some(([r, c]) => {
        return r >= 0 && r < 10 && c >= 0 && c < 10 && boardState[r][c] !== null;
      });
    
      if (!isAdjacent) {
        showNotification("기존 타일과 맞닿아야 합니다!");
        return;
      }

      // ✅ 이번 턴에서 놓은 타일들이 일직선인지 확인
      if (!checkStraightLine(placedTiles, { row, col })) {
        showNotification("이번 턴에 놓은 타일들은 반드시 일직선을 이루어야 합니다!");
        return;
      }
    }

    // ✅ 새로운 보드 상태 생성
    const updatedBoard = boardState.map((r, rowIndex) =>
      r.map((tile, colIndex) => (rowIndex === row && colIndex === col ? selectedTile : tile))
    );

    setBoardState(updatedBoard); // ✅ UI 상태 업데이트
    setTilesPlaced(prev => prev + 1); // 현재 턴에서 배치한 타일 개수 증가
    setTilesCount(prev => prev - 1);
    setSelectedTile(null);

    // ✅ 이번 턴에서 놓은 타일 좌표 저장
    setPlacedTiles(prev => [...prev, { row, col }]);
  };

  const checkStraightLine = (tiles, newTile) => {
    if (tiles.length === 0) return true; // ✅ 첫 번째 타일은 무조건 배치 가능

    // ✅ 기존 놓은 타일들의 행(row)과 열(col) 배열
    const rows = tiles.map(t => t.row);
    const cols = tiles.map(t => t.col);

    // ✅ 새 타일을 포함한 모든 타일이 같은 행에 있는지 확인
    const sameRow = [...rows, newTile.row].every(r => r === tiles[0].row);

    // ✅ 새 타일을 포함한 모든 타일이 같은 열에 있는지 확인
    const sameCol = [...cols, newTile.col].every(c => c === tiles[0].col);

    // 🚨 일직선이 아니면 false 반환
    if (!(sameRow || sameCol)) return false;

    // ✅ 이번 턴에서 놓은 타일들과 연결(인접)되어 있는지 확인
    const allTiles = [...tiles, newTile].sort((a, b) => 
        sameRow ? a.col - b.col : a.row - b.row
    );

    for (let i = 0; i < allTiles.length - 1; i++) {
        const curr = allTiles[i];
        const next = allTiles[i + 1];

        if (sameRow && Math.abs(curr.col - next.col) !== 1) return false; // 🚨 열이 1칸 차이 아니면 false
        if (sameCol && Math.abs(curr.row - next.row) !== 1) return false; // 🚨 행이 1칸 차이 아니면 false
    }

    return true; // ✅ 모든 조건을 만족하면 true 반환
  };

  // 턴 종료 함수
  const checkEnd = () => {
    if(gameStatus === "impossible"){
      if(checkLoop(boardState)){
        victory();
      }else{
        surrender();
      }

      setTilesPlaced(0);
      setTimeLeft(60);
      setPlacedTiles([]);
      return;
    }

    if (tilesPlaced === 0) {
        showNotification("최소 1개 이상의 타일을 배치해야 턴을 종료할 수 있습니다!");
        return;
    }

    setTilesPlaced(0);
    setTimeLeft(60);
    setPlacedTiles([]);
    endTurn(boardState, tilesCount);

    // 길이 이어져 이겼다면 승리 메시지 전송
    if(checkLoop(boardState)){
      victory();
    }
  };
  
  useEffect(() => {
    if (!isMyTurn) return; // 🚫 내 턴이 아닐 때는 타이머 정지
  
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          surrender(); // ✅ 시간 초과 시 자동 항복
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer); // ✅ 컴포넌트 언마운트 시 타이머 제거
  }, [isMyTurn]);

  // ✅ 알림 메시지 표시 함수
  const showNotification = (message, duration = 2000) => {
    setNotification(message);
    setTimeout(() => setNotification(null), duration);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      <Background />

      {/* 상대방 닉네임 */}
      <div className="absolute top-2 text-2xl font-semibold text-gray-300 z-10">
        상대: <span className="text-cyan-400">{opponentName}</span>
      </div>

      {/* 게임 보드 */}
      <GameBoard boardState={boardState} placeTile={placeTile} />

      {/* 타일 선택 컴포넌트 */}
      <TileSelector tileTypes={tileTypes} selectedTile={selectedTile} setSelectedTile={setSelectedTile} />

      {/* 타이머 & 남은 타일 */}
      <GameInfoBar timeLeft={timeLeft} tilesCount={tilesCount} />

      {/* 버튼 그룹 */}
      <ButtonGroup isMyTurn={isMyTurn} placedTiles={placedTiles} gameStatus={gameStatus} setTimeLeft={setTimeLeft} impossible={impossible} checkEnd={checkEnd} surrender={surrender}/>

      {notification && (
        <div className="z-20 absolute top-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      {gameStatus === "impossible" && (
        <div className="z-20 absolute top-2 right-0 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          불가능 선언!
        </div>
      )}

      {gameStatus === "ended" && (
        <GameEndModal isWinner={winner===playerId} />
      )}
    </div>
  );
}
