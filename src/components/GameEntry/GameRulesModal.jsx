import { Button } from "components/ui/button";

export function GameRulesModal({setShowRules}){
    return(
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
    );
};