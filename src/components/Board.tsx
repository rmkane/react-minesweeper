import * as React from 'react';

import Cell, { CellProps } from './Cell';

type BoardProps = {
  rows: number;
  columns: number;
  mineCount: number;
};

function Board(props: BoardProps) {
  const { columns, mineCount, rows } = props;

  const [data, setData] = React.useState<CellProps[][]>([]);

  React.useEffect(() => {
    const initialData: CellProps[][] = Array.from(
      { length: rows },
      (_a, rowIndex) =>
        Array.from({ length: columns }, (_b, colIndex) => ({
          x: colIndex,
          y: rowIndex,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        })),
    );
    setData(initialData);
  }, [columns, mineCount, rows]);

  return (
    <div className="Board">
      {data.map((row) => (
        <div className="Row">
          {row.map((col) => (
            <Cell
              isEmpty={col.isEmpty}
              isFlagged={col.isFlagged}
              isMine={col.isMine}
              isRevealed={col.isRevealed}
              neighbour={col.neighbour}
              x={col.x}
              y={col.y}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

export type { BoardProps };
