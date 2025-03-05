import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Loader2 } from "lucide-react";

export function MatchingForm({nickname, isMatching ,setNickname, sendMatchRequest}){
    return(
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
    );
};