"use client";

import { useState } from "react";
import { useMatchWebSocket } from "hooks/useMatchWebSocket";
import { Background } from "components/ui/background";
import { MatchedModal } from "components/GameEntry/MatchedModal";
import { GameRulesModal } from "components/GameEntry/GameRulesModal";
import { HelpIcon } from "components/ui/help_icon";
import { MatchingForm } from "components/GameEntry/MatchingForm";

export default function GameEntryPage() {
  const [nickname, setNickname] = useState("");
  const { opponentName, isMatching, isMatched, showCancelInfo, sendMatchRequest, sendMatchCancelRequest } = useMatchWebSocket();
  const [showRules, setShowRules] = useState(false); // 🔥 게임 설명 모달 상태 추가

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <Background />

      {/* ❓아이콘 (게임 설명 버튼) */}
      <HelpIcon setShowRules={setShowRules}/>
      <button
        className="z-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
        onClick={()=>sendMatchCancelRequest(nickname)}
      >
        매칭 취소
      </button>


      {/* Main content */}
      <MatchingForm nickname={nickname} isMatching={isMatching} setNickname={setNickname} sendMatchRequest={sendMatchRequest} sendMatchCancelRequest={sendMatchCancelRequest}/>

      {/* ✅ 매칭 완료 UI */}
      {isMatched && (
        <MatchedModal sub={"매칭 성공!"} content={opponentName}/>
      )}

      {/* ✅ 매칭 취소 UI */}
      {showCancelInfo && (
        <MatchedModal sub={"매칭 실패!"} content={"매칭이 취소되었습니다."}/>
      )}

      {/* ✅ 게임 설명 모달 */}
      {showRules && (
        <GameRulesModal setShowRules={setShowRules}/>
      )}
    </div>
  );
}
