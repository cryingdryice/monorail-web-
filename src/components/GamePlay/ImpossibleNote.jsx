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
        </div>
    );
};