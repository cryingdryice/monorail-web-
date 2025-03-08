export function Notification({notification}){
    return (
        <div className="z-50 absolute top-2 px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] 
        bg-gray-900/90 border border-cyan-500/50 backdrop-blur-md animate-[fadeIn_0.5s_ease-in-out]">
          <p className="text-xl font-semibold text-transparent bg-clip-text 
                  bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 
                  [text-shadow:0_0_10px_rgba(6,182,212,0.7)]">
          {notification}
          </p>

          {/* 네온 글로우 효과 */}
          <div className="absolute inset-0 rounded-lg border border-cyan-500/50 
                    [box-shadow:0_0_20px_rgba(6,182,212,0.5),inset_0_0_20px_rgba(6,182,212,0.3)]">
          </div>

          {/* 사이버틱한 빛나는 선 */}
          <div className="absolute -top-2 left-4 w-6 h-[2px] bg-cyan-400/80 blur-sm"></div>
          <div className="absolute -bottom-2 right-4 w-6 h-[2px] bg-purple-400/80 blur-sm"></div>
        </div>
    );
};