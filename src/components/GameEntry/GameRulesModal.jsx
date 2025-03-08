"use client"

import { X } from "lucide-react"

export function GameRulesModal({ setShowRules }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md md:max-w-[500px] rounded-xl border border-gray-800/80 bg-gray-900/90 p-6 shadow-lg backdrop-blur-sm overflow-hidden">
        {/* Enhanced glowing accents */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Neon border effect */}
        <div className="absolute inset-0 rounded-xl border border-cyan-500/20 [box-shadow:0_0_10px_rgba(6,182,212,0.2),inset_0_0_10px_rgba(6,182,212,0.1)]"></div>

        {/* Horizontal accent lines */}
        <div className="absolute top-14 left-0 h-[1px] w-16 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        <div className="absolute bottom-14 right-0 h-[1px] w-16 bg-gradient-to-l from-purple-500/50 to-transparent"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 [text-shadow:0_0_8px_rgba(6,182,212,0.4)]">
              게임 설명
            </h2>
            <button
              onClick={() => setShowRules(false)}
              className="rounded-full p-1.5 text-gray-400 transition-all hover:bg-gray-800/80 hover:text-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)] border border-transparent hover:border-cyan-500/30"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-2.5 text-gray-300">
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              MONORAIL은 두 명이 번갈아 가며 타일을 배치하는 전략 보드 게임입니다.
            </p>
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              양쪽 끝이 열린 기차역 타일 2개로 시작하며, 16개의 철로 타일을 번갈아 배치해 순환선 철로를 완성해야 합니다.
            </p>
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              철로를 완성하면 승리합니다.
            </p>
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              한 턴에 최대 3개의 타일을 놓을 수 있으며, 배치를 완료하면 '배치 완료' 버튼을 누르세요.
            </p>
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              기존 타일과 맞닿아야 하지만, 철로가 연결될 필요는 없습니다.
            </p>
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              2개 이상 놓을 경우 일렬이 되게 배치해야 합니다.
            </p>
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              더 이상 유효한 배치를 할 수 없다고 판단되면 '불가능'을 선언할 수 있습니다.
            </p>
            <p className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:bg-cyan-500/70 before:rounded-full">
              불가능 선언 시 상대방이 철로를 완성하면 나의 패배, 철로 미완성 시 나의 승리입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

