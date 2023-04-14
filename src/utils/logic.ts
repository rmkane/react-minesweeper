enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
}

type GameDifficulty =
  | Difficulty.BEGINNER
  | Difficulty.INTERMEDIATE
  | Difficulty.EXPERT;

type Grid = {
  rows: number;
  columns: number;
};

type Minefield = {
  mineCount: number;
};

type Cell = {
  columnIndex: number;
  rowIndex: number;
};

type Stateful = {
  isEmpty: boolean;
  isFlagged: boolean;
  isMine: boolean;
  isRevealed: boolean;
};

type HasNeighbors = {
  neighbors: number;
};

type MinefieldGrid = Grid & Minefield;
type StatefulCell = Cell & HasNeighbors & Stateful;
type StatefulRow = StatefulCell[];
type StatefulMatrix = StatefulRow[];

const beginnerState: MinefieldGrid = {
  rows: 8,
  columns: 8,
  mineCount: 10,
};

const intermediateState: MinefieldGrid = {
  rows: 12,
  columns: 12,
  mineCount: 20,
};

const expertState: MinefieldGrid = {
  rows: 16,
  columns: 16,
  mineCount: 40,
};

function initialCellState(rows: number, columns: number): StatefulMatrix {
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

function plantMines(data: StatefulMatrix, mineCount: number): StatefulMatrix {
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

function findNeigbors(
  rowIndex: number,
  columnIndex: number,
  data: StatefulMatrix,
): StatefulRow {
  const el: StatefulRow = [];

  // top
  if (rowIndex > 0) {
    el.push(data[rowIndex - 1][columnIndex]);
  }

  // bottom
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

  // top-left
  if (rowIndex > 0 && columnIndex > 0) {
    el.push(data[rowIndex - 1][columnIndex - 1]);
  }

  // top-right
  if (rowIndex > 0 && columnIndex < data[rowIndex].length - 1) {
    el.push(data[rowIndex - 1][columnIndex + 1]);
  }

  // bottom-left
  if (rowIndex < data.length - 1 && columnIndex > 0) {
    el.push(data[rowIndex + 1][columnIndex - 1]);
  }

  // bottom-right
  if (rowIndex < data.length - 1 && columnIndex < data[rowIndex].length - 1) {
    el.push(data[rowIndex + 1][columnIndex + 1]);
  }

  return el;
}

function calcNeighbors(data: StatefulMatrix): StatefulMatrix {
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (data[i][j].isMine !== true) {
        let neighboringMines = 0;
        const neigbors: StatefulRow = findNeigbors(
          data[i][j].rowIndex,
          data[i][j].columnIndex,
          data,
        );
        neigbors.forEach((neigbor: StatefulCell) => {
          if (neigbor.isMine) {
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

export {
  Difficulty,
  beginnerState,
  intermediateState,
  expertState,
  calcNeighbors,
  initialCellState,
  plantMines,
};

export type {
  Cell,
  GameDifficulty,
  Grid,
  HasNeighbors,
  Minefield,
  MinefieldGrid,
  Stateful,
  StatefulCell,
  StatefulMatrix,
  StatefulRow,
};
