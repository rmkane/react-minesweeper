import * as React from 'react';

import {
  calcNeighbors,
  initialCellState,
  MinefieldGrid,
  plantMines,
  StatefulCell,
  StatefulMatrix,
  StatefulRow,
} from '../utils/logic';
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

  return (
    <div className="Board">
      {data.map((row: StatefulRow) => (
        <div className="Row">
          {row.map((cell: StatefulCell) => (
            <GridCellView
              columnIndex={cell.columnIndex}
              isEmpty={cell.isEmpty}
              isFlagged={cell.isFlagged}
              isMine={cell.isMine}
              isRevealed={cell.isRevealed}
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
