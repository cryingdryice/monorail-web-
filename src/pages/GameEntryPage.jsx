"use client";

import { useState } from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Loader2, HelpCircle } from "lucide-react"; // ❓아이콘 추가
import { useMatchWebSocket } from "hooks/useMatchWebSocket";

export default function GameEntryPage() {
  const [nickname, setNickname] = useState("");
  const { opponentName, isMatching, isMatched, sendMatchRequest } = useMatchWebSocket();
  const [showRules, setShowRules] = useState(false); // 🔥 게임 설명 모달 상태 추가

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="grid h-full w-full grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-gray-700" />
          ))}
        </div>
      </div>

      {/* Glowing orbs in background */}
      <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-purple-100/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-cyan-100/20 blur-3xl" />

      {/* ❓아이콘 (게임 설명 버튼) */}
      <div className="absolute top-4 right-4 z-20">
        <button onClick={() => setShowRules(true)} className="text-gray-400 hover:text-white transition-all">
          <HelpCircle size={28} />
        </button>
      </div>

      {/* Main content */}
      <div className="z-10 w-full max-w-md px-4">
        <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-sm">
          <div className="mb-4 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">MONORAIL</h1>
            <p className="text-gray-400">닉네임을 입력하세요.</p>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="h-12 rounded-xl border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
              maxLength={15}
              disabled={isMatching}
            />

            <Button
              onClick={() => sendMatchRequest(nickname)}
              disabled={!nickname || isMatching}
              className="h-12 w-full flex rounded-xl items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-all hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50"
            >
              {isMatching ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Finding opponent...</span>
                </>
              ) : (
                <span className="w-[150px] text-center">MATCH</span>
              )}
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>By clicking Match, you agree to our game rules</p>
          </div>
        </div>

        {/* Game pieces decoration */}
        <div className="mt-8 flex justify-center space-x-4">
          <div className="h-8 w-8 rounded-md bg-cyan-500/80 shadow-lg shadow-cyan-500/20" />
          <div className="h-8 w-8 rotate-45 rounded-md bg-purple-500/80 shadow-lg shadow-purple-500/20" />
          <div className="h-8 w-8 rounded-full bg-emerald-500/80 shadow-lg shadow-emerald-500/20" />
        </div>
      </div>

      {/* ✅ 매칭 완료 UI */}
      {isMatched && (
        <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md">
          <div className="w-[400px] h-[300px] flex flex-col items-center justify-center p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
            <h2 className="text-4xl font-bold text-cyan-400">매칭 성공!</h2>
            <p className="mt-4 text-2xl text-white">{opponentName} 님과 매칭되었습니다.</p>
          </div>
        </div>
      )}

      {/* ✅ 게임 설명 모달 */}
      {showRules && (
        <div className="z-30 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="w-[500px] p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700 animate-fade-in">
            <h2 className="text-2xl font-bold text-white">게임 설명</h2>
            <p className="mt-4 text-gray-300">
              - MONORAIL은 두 명이 번갈아 가며 타일을 배치하는 전략 보드 게임입니다. <br />
              - 양쪽 끝이 열린 기차역 타일 2개로 시작하며, 16개의 철로 타일을 번갈아 배치해 순환선 철로를 완성해야 합니다.<br />
              - 철로를 완성하면 승리합니다.<br />
              - 한 턴에 최대 3개의 타일을 놓을 수 있으며, 배치를 완료하면 '배치 완료' 버튼을 누르세요. <br />
              - 기존 타일과 맞닿아야 하지만, 철로가 연결될 필요는 없습니다.<br />
              - 2개 이상 놓을 경우 일렬이 되게 배치해야 합니다.<br />
              - 더 이상 유효한 배치를 할 수 없다고 판단되면 '불가능'을 선언할 수 있습니다. <br />
              - 불가능 선언 시 상대방이 철로를 완성하면 나의 패배, 철로 미완성 시 나의 승리입니다.
            </p>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowRules(false)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
