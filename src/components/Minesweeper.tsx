import * as React from 'react';

import { Difficulty, MouseButton } from '../services/constants';
import {
  beginnerState,
  calcNeighbors,
  cloneData,
  countFlags,
  expertState,
  initialCellState,
  intermediateState,
  plantMines,
  processCellAndUpdateData,
} from '../services/logic';
import {
  GameDifficulty,
  MinefieldGrid,
  StatefulCell,
  StatefulMatrix,
} from '../services/types';
import GridView, { GridViewProps } from './GridView';

type MinsweeperProps = {
  difficulty: GameDifficulty;
};

function Minesweeper(props: MinsweeperProps) {
  const { difficulty } = props;

  const [rowCount, setRowCount] = React.useState<number>(0);
  const [columnCount, setColumnCount] = React.useState<number>(0);
  const [mineCount, setMineCount] = React.useState<number>(0);
  const [flagsUsed, setFlagsUsed] = React.useState<number>(0);
  const [data, setData] = React.useState<StatefulMatrix>([]);
  const [moves, setMoves] = React.useState<number>(0);

  const setInitialState = React.useCallback((presets: MinefieldGrid) => {
    setRowCount(presets.rowCount);
    setColumnCount(presets.columnCount);
    setMineCount(presets.mineCount);
    setFlagsUsed(0);
    setData(initialCellState(presets.rowCount, presets.columnCount));
    setMoves(0);
  }, []);

  React.useEffect(() => {
    switch (difficulty) {
      case Difficulty.EXPERT:
        setInitialState(expertState);
        return;
      case Difficulty.INTERMEDIATE:
        setInitialState(intermediateState);
        return;
      case Difficulty.BEGINNER:
      default:
        setInitialState(beginnerState);
    }
  }, [difficulty, setInitialState]);

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target: HTMLElement = e.target as HTMLDivElement;
      const rowIndex = parseInt(target.getAttribute('data-row-index')!, 10);
      const columnIndex = parseInt(
        target.getAttribute('data-column-index')!,
        10,
      );
      const isRevealing = e.button === MouseButton.LEFT;
      const isFlagging = e.button === MouseButton.RIGHT;

      setData((currentData) => {
        let updatedData: StatefulMatrix = cloneData(currentData);
        let cell: StatefulCell = updatedData[rowIndex][columnIndex];

        // Plant mines, if first move
        if (moves === 0) {
          updatedData = calcNeighbors(
            plantMines(updatedData, mineCount, rowIndex, columnIndex),
          );
          cell = updatedData[rowIndex][columnIndex];
        }

        // Update the board
        const updatedState = processCellAndUpdateData({
          cell,
          rowIndex,
          columnIndex,
          data: updatedData,
          isRevealing,
          isFlagging,
          mineCount,
          moves,
          flagsUsed,
          rowCount,
          columnCount,
        });

        setFlagsUsed(countFlags(updatedState.data));

        return updatedState.data;
      });

      setMoves((currentMoves) => currentMoves + 1);
    },
    [columnCount, flagsUsed, mineCount, moves, rowCount],
  );

  const onContextMenu = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
    },
    [],
  );

  return (
    <div className="Minesweeper">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>Moves</div>
        <div>{moves}</div>
        <div>Flags Remaining</div>
        <div>{mineCount - flagsUsed}</div>
      </div>
      <GridView data={data} onClick={onClick} onContextMenu={onContextMenu} />
    </div>
  );
}

export default Minesweeper;
