export const checkAdjacent = (boardState, row, col) => {
    const adjacentTiles = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1]
    ];
  
    return adjacentTiles.some(([r, c]) => {
      return r >= 0 && r < boardState.length && c >= 0 && c < boardState[0].length && boardState[r][c] !== null;
    });
  };
  