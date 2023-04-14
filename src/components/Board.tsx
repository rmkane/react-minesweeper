import * as React from 'react';

import Cell, { CellProps } from './Cell';

type BoardProps = {
  rows: number;
  columns: number;
  mineCount: number;
};

type Cells = CellProps[][];

function initialCellState(rows: number, columns: number): Cells {
  return Array.from({ length: rows }, (_a, rowIndex) =>
    Array.from({ length: columns }, (_b, columnIndex) => ({
      columnIndex,
      isMine: false,
      neighbors: 0,
      isRevealed: false,
      isEmpty: false,
      isFlagged: false,
      rowIndex,
    })),
  );
}

function random(): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}

function getRandomNumber(min: number, max?: number): number {
  if (max === undefined) {
    // eslint-disable-next-line no-param-reassign
    max = min;
    // eslint-disable-next-line no-param-reassign
    min = 0;
  }
  return Math.floor(min + random() * (max - min + 1));
}

function plantMines(data: Cells, mineCount: number): Cells {
  let randomX: number;
  let randomY: number;
  let minesPlanted = 0;

  while (minesPlanted < mineCount) {
    randomY = getRandomNumber(data.length - 1);
    randomX = getRandomNumber(data[0].length - 1);
    if (!data[randomY][randomX].isMine) {
      // eslint-disable-next-line no-param-reassign
      data[randomY][randomX].isMine = true;
      minesPlanted += 1;
    }
  }
  return data;
}

function traverseBoard(
  rowIndex: number,
  columnIndex: number,
  data: Cells,
): CellProps[] {
  const el: CellProps[] = [];

  // up
  if (rowIndex > 0) {
    el.push(data[rowIndex - 1][columnIndex]);
  }

  // down
  if (rowIndex < data.length - 1) {
    el.push(data[rowIndex + 1][columnIndex]);
  }

  // left
  if (columnIndex > 0) {
    el.push(data[rowIndex][columnIndex - 1]);
  }

  // right
  if (columnIndex < data[rowIndex].length - 1) {
    el.push(data[rowIndex][columnIndex + 1]);
  }

  // top left
  if (rowIndex > 0 && columnIndex > 0) {
    el.push(data[rowIndex - 1][columnIndex - 1]);
  }

  // top right
  if (rowIndex > 0 && columnIndex < data[rowIndex].length - 1) {
    el.push(data[rowIndex - 1][columnIndex + 1]);
  }

  // bottom left
  if (rowIndex < data.length - 1 && columnIndex > 0) {
    el.push(data[rowIndex + 1][columnIndex - 1]);
  }

  // bottom right
  if (rowIndex < data.length - 1 && columnIndex < data[rowIndex].length - 1) {
    el.push(data[rowIndex + 1][columnIndex + 1]);
  }

  return el;
}

function calcNeighbors(data: Cells): Cells {
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (data[i][j].isMine !== true) {
        let neighboringMines = 0;
        const area: CellProps[] = traverseBoard(
          data[i][j].rowIndex,
          data[i][j].columnIndex,
          data,
        );
        area.forEach((value: CellProps) => {
          if (value.isMine) {
            neighboringMines += 1;
          }
        });
        if (neighboringMines === 0) {
          // eslint-disable-next-line no-param-reassign
          data[i][j].isEmpty = true;
        }
        // eslint-disable-next-line no-param-reassign
        data[i][j].neighbors = neighboringMines;
      }
    }
  }
  return data;
}

function Board(props: BoardProps) {
  const { columns, mineCount, rows } = props;

  const [data, setData] = React.useState<Cells>([]);

  React.useEffect(() => {
    let initialData: Cells = initialCellState(rows, columns);
    initialData = plantMines(initialData, mineCount);
    initialData = calcNeighbors(initialData);
    setData(initialData);
  }, [columns, mineCount, rows]);

  return (
    <div className="Board">
      {data.map((row: CellProps[]) => (
        <div className="Row">
          {row.map((cell: CellProps) => (
            <Cell
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

export default Board;

export type { BoardProps };
