import * as React from 'react';

import { MouseButton } from '../services/constants';
import {
  calcNeighbors,
  cloneData,
  initialCellState,
  plantMines,
} from '../services/logic';
import {
  MinefieldGrid,
  StatefulCell,
  StatefulMatrix,
  StatefulRow,
} from '../services/types';
import GridCellView from './GridCellView';

type GridViewProps = MinefieldGrid;

function GridView(props: GridViewProps) {
  const { columns, mineCount, rows } = props;

  const [data, setData] = React.useState<StatefulMatrix>([]);

  React.useEffect(() => {
    let initialData: StatefulMatrix = initialCellState(rows, columns);
    initialData = plantMines(initialData, mineCount);
    initialData = calcNeighbors(initialData);
    setData(initialData);
  }, [columns, mineCount, rows]);

  const onClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target: HTMLElement = e.target as HTMLDivElement;
    const rowIndex = parseInt(target.getAttribute('data-row-index')!, 10);
    const columnIndex = parseInt(target.getAttribute('data-column-index')!, 10);

    setData((currentData) => {
      const updatedData: StatefulMatrix = cloneData(currentData);
      const cell: StatefulCell = updatedData[rowIndex][columnIndex];

      if (!cell.isRevealed) {
        switch (e.button) {
          case MouseButton.LEFT:
            if (!cell.isFlagged) {
              cell.isRevealed = true;
            }
            break;
          case MouseButton.RIGHT:
            cell.isFlagged = !cell.isFlagged;
            break;
          default:
          // Do nothing...
        }
      }

      return updatedData;
    });
  }, []);

  const onContextMenu = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
    },
    [],
  );

  return (
    <div className="Board">
      {data.map((row: StatefulRow) => (
        <div className="Row" key={`row-${row[0].rowIndex}`}>
          {row.map((cell: StatefulCell) => (
            <GridCellView
              key={`cell-${cell.index}`}
              columnIndex={cell.columnIndex}
              index={cell.index}
              isEmpty={cell.isEmpty}
              isFlagged={cell.isFlagged}
              isMined={cell.isMined}
              isRevealed={cell.isRevealed}
              onClick={onClick}
              onContextMenu={onContextMenu}
              neighbors={cell.neighbors}
              rowIndex={cell.rowIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GridView;

export type { GridViewProps };
