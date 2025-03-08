export function GameEndModal({ isWinner, cause }) {
  // ✅ cause에 따라 동적으로 메시지 결정
  const causeMessages = {
    completed: "모노레일이 완성되었습니다!",
    unfinished: "모노레일이 완성되지 못했습니다!",
    timeover: "시간 초과!",
    surrender: "항복했습니다.",
    disconnected: "상대방과의 연결이 끊어졌습니다.",
    default: "게임이 종료되었습니다.",
  };

  const message = causeMessages[cause] || causeMessages.default;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-[400px] h-[320px] flex flex-col items-center justify-center p-6 rounded-2xl border border-cyan-500/80 overflow-hidden">
        
        {/* 🟢 Animated neon border effect */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-500/30 [box-shadow:0_0_15px_rgba(0,255,255,0.3),inset_0_0_15px_rgba(0,255,255,0.3)]"></div>

        {/* ✨ Glowing orbs */}
        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>

        {/* 🔹 Diagonal line decoration */}
        <div className="absolute -right-4 top-0 h-[150%] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent transform rotate-[30deg]"></div>
        <div className="absolute -left-4 bottom-0 h-[150%] w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent transform rotate-[30deg]"></div>

        {/* 🏆 Game Result Text */}
        <h2 className="relative z-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 [text-shadow:0_0_10px_rgba(0,255,255,0.5)]">
          {isWinner ? "승리했습니다!" : "패배했습니다!"}
        </h2>

        {/* 🎯 Cause Message */}
        <div className="relative z-10 mt-6 px-6 py-3 w-3/4 text-center rounded-lg text-2xl font-semibold shadow-md text-white [text-shadow:0_0_5px_rgba(255,255,255,0.3)]">
          {message}
        </div>

        {/* 💠 Decorative elements */}
        <div className="absolute bottom-4 left-4 h-2 w-16 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
        <div className="absolute top-4 right-4 h-2 w-16 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
      </div>
    </div>
  );
}
