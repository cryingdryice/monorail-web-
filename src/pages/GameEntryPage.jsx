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
  const { opponentName, isMatching, isMatched, sendMatchRequest } = useMatchWebSocket();
  const [showRules, setShowRules] = useState(false); // 🔥 게임 설명 모달 상태 추가

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <Background />

      {/* ❓아이콘 (게임 설명 버튼) */}
      <HelpIcon setShowRules={setShowRules}/>

      {/* Main content */}
      <MatchingForm nickname={nickname} isMatching={isMatching} setNickname={setNickname} sendMatchRequest={sendMatchRequest}/>

      {/* ✅ 매칭 완료 UI */}
      {isMatched && (
        <MatchedModal opponentName={opponentName}/>
      )}

      {/* ✅ 게임 설명 모달 */}
      {showRules && (
        <GameRulesModal setShowRules={setShowRules}/>
      )}
    </div>
  );
}
