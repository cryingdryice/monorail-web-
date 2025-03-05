export function MatchedModal({opponentName}){
    return (
        <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md">
          <div className="w-[400px] h-[300px] flex flex-col items-center justify-center p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
            <h2 className="text-4xl font-bold text-cyan-400">매칭 성공!</h2>
            <p className="mt-4 text-2xl text-white">{opponentName} 님과 매칭되었습니다.</p>
          </div>
        </div>
    );
};