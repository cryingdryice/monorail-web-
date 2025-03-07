export function checkStraigh(tiles, newTile){
    if (tiles.length === 0) return true; // ✅ 첫 번째 타일은 무조건 배치 가능

    // ✅ 기존 놓은 타일들의 행(row)과 열(col) 배열
    const rows = tiles.map(t => t.row);
    const cols = tiles.map(t => t.col);

    // ✅ 새 타일을 포함한 모든 타일이 같은 행에 있는지 확인
    const sameRow = [...rows, newTile.row].every(r => r === tiles[0].row);

    // ✅ 새 타일을 포함한 모든 타일이 같은 열에 있는지 확인
    const sameCol = [...cols, newTile.col].every(c => c === tiles[0].col);

    // 🚨 일직선이 아니면 false 반환
    if (!(sameRow || sameCol)) return false;

    // ✅ 이번 턴에서 놓은 타일들과 연결(인접)되어 있는지 확인
    const allTiles = [...tiles, newTile].sort((a, b) => 
        sameRow ? a.col - b.col : a.row - b.row
    );

    for (let i = 0; i < allTiles.length - 1; i++) {
        const curr = allTiles[i];
        const next = allTiles[i + 1];

        if (sameRow && Math.abs(curr.col - next.col) !== 1) return false; // 🚨 열이 1칸 차이 아니면 false
        if (sameCol && Math.abs(curr.row - next.row) !== 1) return false; // 🚨 행이 1칸 차이 아니면 false
    }

    return true; // ✅ 모든 조건을 만족하면 true 반환
};