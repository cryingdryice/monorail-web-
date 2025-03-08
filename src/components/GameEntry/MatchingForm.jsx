"use client"

import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Loader2 } from "lucide-react"

export function MatchingForm({ nickname, isMatching, setNickname, sendMatchRequest, sendMatchCancelRequest }) {
  return (
    <div className="z-10 w-full max-w-md px-4">
      <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/70 p-6 backdrop-blur-sm">
        {/* Neon border effect */}
        <div className="absolute inset-0 rounded-xl border border-cyan-500/20 [box-shadow:0_0_15px_rgba(6,182,212,0.15),inset_0_0_10px_rgba(6,182,212,0.05)]"></div>

        {/* Glowing accents */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>

        {/* Diagonal line decorations */}
        <div className="absolute -right-10 top-0 h-[200%] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent transform rotate-[30deg]"></div>
        <div className="absolute -left-10 bottom-0 h-[200%] w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent transform rotate-[30deg]"></div>

        {/* Horizontal accent lines */}
        <div className="absolute top-16 left-0 h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        <div className="absolute bottom-16 right-0 h-[1px] w-12 bg-gradient-to-l from-purple-500/50 to-transparent"></div>

        <div className="relative z-10">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 [text-shadow:0_0_10px_rgba(6,182,212,0.4)]">
              MONORAIL
            </h1>
            <p className="text-gray-300">닉네임을 입력하세요.</p>
          </div>

          <div className="space-y-5">
            <div className="relative">
              <Input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="h-12 rounded-xl border-gray-700/80 bg-gray-800/90 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 focus:ring-opacity-50 focus:[box-shadow:0_0_8px_rgba(6,182,212,0.3)]"
                maxLength={15}
                disabled={isMatching}
              />
              {/* Input side decoration */}
              <div className="absolute right-0 top-0 h-full w-[3px] rounded-r-xl bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-cyan-500/40 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"></div>
            </div>

            <Button
              onClick={() => {
                if (isMatching) {
                  sendMatchCancelRequest(nickname)
                } else {
                  sendMatchRequest(nickname)
                }
              }}
              disabled={!nickname}
              className={`relative h-12 w-full flex rounded-xl items-center justify-center gap-2 
                bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-all 
                hover:from-cyan-600 hover:to-purple-700 
                ${!nickname ? "opacity-50 cursor-not-allowed" : ""}
                [box-shadow:0_0_15px_rgba(6,182,212,0.3)] hover:[box-shadow:0_0_20px_rgba(6,182,212,0.4)]`}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-sm"></div>

              <div className="relative z-10 flex items-center justify-center gap-2">
                {isMatching ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="font-medium tracking-wide">MATCH CANCEL</span>
                  </>
                ) : (
                  <span className="w-[150px] text-center font-medium tracking-wide">MATCH</span>
                )}
              </div>
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>By clicking Match, you agree to our game rules</p>
          </div>
        </div>
      </div>

      {/* Enhanced game pieces decoration */}
      <div className="mt-8 flex justify-center space-x-6">
        {/* 블루 네온 박스 */}
        <div className="group relative h-8 w-8 rounded-md bg-cyan-500/90 
                        shadow-[0_0_20px_rgba(6,182,212,0.7)] 
                        before:absolute before:inset-0 before:rounded-md before:border-2 before:border-cyan-400 
                        before:opacity-60 before:animate-glowEffect"></div>

        {/* 퍼플 네온 다이아몬드 */}
        <div className="group relative h-8 w-8 rotate-45 rounded-md bg-purple-500/90 
                        shadow-[0_0_20px_rgba(168,85,247,0.7)] 
                        before:absolute before:inset-0 before:rounded-md before:border-2 before:border-purple-400 
                        before:opacity-60 before:animate-glowEffect"></div>

        {/* 그린 네온 원형 */}
        <div className="group relative h-8 w-8 rounded-full bg-emerald-500/90 
                        shadow-[0_0_20px_rgba(52,211,153,0.7)] 
                        before:absolute before:inset-0 before:rounded-full before:border-2 before:border-emerald-400 
                        before:opacity-60 before:animate-glowEffect"></div>
      </div>
    </div>
  )
}

