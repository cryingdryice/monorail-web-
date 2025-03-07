export function GameEndModal({ isWinner, cause }) {
  // ✅ cause에 따라 동적으로 메시지 결정
  const causeMessages = {
    completed: "모노레일을 완성했습니다!",
    unfinished: "모노레일을 완성하지 못했습니다!",
    timeover: "시간 초과!",
    surrender: "항복했습니다.",
    disconnected: "연결이 끊어졌습니다.",
    default: "게임이 종료되었습니다.",
  };

  const message = causeMessages[cause] || causeMessages.default;

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
      <div className="w-[400px] h-[320px] flex flex-col items-center justify-center p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
        <h2 className="text-4xl font-bold text-cyan-400">{isWinner ? "승리했습니다!" : "패배했습니다!"}</h2>
        <div className="mt-2 px-6 py-3 w-3/4 text-center rounded-lg text-2xl font-semibold shadow-md text-white">
          {message}
        </div>
      </div>
    </div>
  );
}
