export function ImpossibleNote(){
    return(
        <div className="z-40 absolute top-2 px-6 py-3 rounded-lg 
                shadow-[0_0_20px_rgba(255,0,0,0.7)] 
                bg-red-900/90 border border-red-500/60 backdrop-blur-md 
                animate-[fadeIn_0.1s_ease-in-out,pulse_2s_infinite]">
          <p className="text-xl font-semibold text-transparent bg-clip-text 
                        bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 
                        [text-shadow:0_0_12px_rgba(255,0,0,0.8)]">
            🚨 불가능 선언! 🚨
          </p>

          {/* 네온 테두리 효과 */}
          <div className="absolute inset-0 rounded-lg border border-red-500/60 
                          [box-shadow:0_0_25px_rgba(255,0,0,0.6),inset_0_0_20px_rgba(255,0,0,0.4)]">
          </div>

          {/* 사이버틱한 빛나는 디테일 */}
          <div className="absolute -top-2 left-4 w-6 h-[2px] bg-red-400/80 blur-sm"></div>
          <div className="absolute -bottom-2 right-4 w-6 h-[2px] bg-yellow-400/80 blur-sm"></div>
        </div>
    );
};