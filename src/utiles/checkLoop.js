export function checkLoop(boardState) {
    const BOARD_SIZE = 10;

    // ✅ 각 타일의 허용 가능한 인접 타일 매핑 (문자열 비교로 수정)
    const TILE_RULES = {
        "0": { left: ["0", "2", "5"], right: ["0", "3", "4"], required: ["left", "right"] },
        "1": { top: ["1", "4", "5"], bottom: ["1", "2", "3"], required: ["top", "bottom"] },
        "2": { top: ["1", "4", "5"], right: ["0", "3", "4"], required: ["top", "right"] },
        "3": { top: ["1", "4", "5"], left: ["0", "2", "5"], required: ["top", "left"] },
        "4": { left: ["0", "2", "5"], bottom: ["1", "2", "3"], required: ["left", "bottom"] },
        "5": { bottom: ["1", "2", "3"], right: ["0", "3", "4"], required: ["bottom", "right"] },
    };

    // ✅ 상하좌우 방향 정의
    const DIRECTIONS = {
        top: [-1, 0],
        bottom: [1, 0],
        left: [0, -1],
        right: [0, 1],
    };

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const tile = boardState[row][col];

            if (tile === null) continue; // ✅ 빈 칸은 검사할 필요 없음

            // ✅ 보드에 존재하는 타일이 문자열인지 숫자인지 확인 후 변환
            const tileStr = String(tile);
            const rules = TILE_RULES[tileStr]; 
            if (!rules) continue; // 잘못된 타일이면 무시

            for (const dir of rules.required) {
                const [dx, dy] = DIRECTIONS[dir];
                const newRow = row + dx;
                const newCol = col + dy;

                // ✅ 보드 경계 체크 (필수 방향인데 범위를 벗어나면 규칙 위배)
                if (newRow < 0 || newRow >= BOARD_SIZE || newCol < 0 || newCol >= BOARD_SIZE) {
                    // console.log(`❌ ${tileStr} (${row},${col}) 필수 방향 ${dir}이 경계를 벗어남!`);
                    return false;
                }

                const adjacentTile = boardState[newRow][newCol];

                // ✅ 필수 방향에 타일이 존재해야 함
                if (adjacentTile === null) {
                    // console.log(`❌ ${tileStr} (${row},${col}) 필수 방향 ${dir}에 인접 타일이 없음!`);
                    return false;
                }

                // ✅ 인접 타일이 허용된 범위 내에 있는지 확인
                if (!rules[dir].includes(String(adjacentTile))) {
                    // console.log(`❌ ${tileStr} (${row},${col}) 필수 방향 ${dir}의 ${adjacentTile} 타일과 연결될 수 없음!`);
                    return false;
                }
            }
        }
    }

    // console.log("✅ 보드 상태 유효함!");
    return true; // ✅ 모든 필수 조건이 충족되면 true 반환
}
