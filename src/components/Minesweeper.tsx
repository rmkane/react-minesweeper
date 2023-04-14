import * as React from 'react';

import { Difficulty } from '../services/constants';
import {
  beginnerState,
  expertState,
  intermediateState,
} from '../services/logic';
import { GameDifficulty } from '../services/types';
import GridView, { GridViewProps } from './GridView';

type MinsweeperProps = {
  difficulty: GameDifficulty;
};

function Minesweeper(props: MinsweeperProps) {
  const { difficulty } = props;

  const gameState: GridViewProps = React.useMemo(() => {
    switch (difficulty) {
      case Difficulty.BEGINNER:
        return beginnerState;
      case Difficulty.INTERMEDIATE:
        return intermediateState;
      case Difficulty.EXPERT:
        return expertState;
      default:
        return beginnerState;
    }
  }, [difficulty]);

  return (
    <div className="Minesweeper">
      <GridView
        rows={gameState.rows}
        columns={gameState.columns}
        mineCount={gameState.mineCount}
      />
    </div>
  );
}

export default Minesweeper;
