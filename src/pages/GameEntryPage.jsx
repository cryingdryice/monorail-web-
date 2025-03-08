"use client";

import { useEffect, useState } from "react";
import { useMatchWebSocket } from "hooks/useMatchWebSocket";
import { Background } from "components/ui/background";
import { MatchedModal } from "components/GameEntry/MatchedModal";
import { GameRulesModal } from "components/GameEntry/GameRulesModal";
import { HelpIcon } from "components/ui/help_icon";
import { MatchingForm } from "components/GameEntry/MatchingForm";
import { FaGithub, FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import bgmFile from "assets/monorail_bgm.mp3";

export default function GameEntryPage() {
  const [nickname, setNickname] = useState("");
  const { opponentName, isMatching, isMatched, showCancelInfo, sendMatchRequest, sendMatchCancelRequest } = useMatchWebSocket();
  const [showRules, setShowRules] = useState(false); // 🔥 게임 설명 모달 상태 추가
  const [bgm, setBgm] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const bgmAudio = new Audio(bgmFile);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.2;

    const playBgm = () => {
      bgmAudio.play().catch(err => console.log("자동 재생이 차단됨:", err));
      setIsMuted(false);
    };

    document.addEventListener("click", playBgm, { once: true });

    setBgm(bgmAudio);

    return () => {
      bgmAudio.pause();
      bgmAudio.currentTime = 0;
    };
  }, []);

  // 소리 끄기/켜기 핸들러
  const toggleMute = () => {
    if (bgm) {
      bgm.muted = !bgm.muted;
      setIsMuted(bgm.muted);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <Background />

      {/* ❓아이콘 (게임 설명 버튼) */}
      <HelpIcon setShowRules={setShowRules}/>

      {/* 🐙 GitHub 아이콘 (우측 상단 고정) */}
      <a href="https://github.com/cryingdryice/monorail-web-" 
         target="_blank" rel="noopener noreferrer" 
         className="absolute top-16 right-4 text-gray-400 text-3xl transition-transform transform hover:text-white">
        <FaGithub />
      </a>

      {/* 음소거 버튼 (아이콘 적용) */}
      <button
        onClick={toggleMute}
        className="absolute top-28 right-4 text-gray-400 text-3xl transition-transform transform hover:text-white"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
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
