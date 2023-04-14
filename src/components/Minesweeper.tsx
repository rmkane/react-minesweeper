import * as React from 'react';

import Board, { BoardProps } from './Board.js';

type Difficulty = 'beginner' | 'intermediate' | 'expert';

type MinsweeperProps = {
  difficulty: Difficulty;
};

const beginnerState: BoardProps = {
  rows: 8,
  columns: 8,
  mineCount: 10,
};

const intermediateState: BoardProps = {
  rows: 12,
  columns: 12,
  mineCount: 20,
};

const expertState: BoardProps = {
  rows: 16,
  columns: 16,
  mineCount: 40,
};

function Minesweeper(props: MinsweeperProps) {
  const { difficulty } = props;

  const gameState: BoardProps = React.useMemo(() => {
    switch (difficulty) {
      case 'beginner':
        return beginnerState;
      case 'intermediate':
        return intermediateState;
      case 'expert':
        return expertState;
      default:
        return beginnerState;
    }
  }, [difficulty]);

  return (
    <div className="Minesweeper">
      <Board
        rows={gameState.rows}
        columns={gameState.columns}
        mineCount={gameState.mineCount}
      />
    </div>
  );
}

export default Minesweeper;

export type { Difficulty };
