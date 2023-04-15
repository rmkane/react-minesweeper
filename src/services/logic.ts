import {
  MinefieldGrid,
  StatefulCell,
  StatefulMatrix,
  StatefulRow,
  UpdateState,
} from './types';

const beginnerState: MinefieldGrid = {
  rowCount: 8,
  columnCount: 8,
  mineCount: 10,
};

const intermediateState: MinefieldGrid = {
  rowCount: 12,
  columnCount: 12,
  mineCount: 20,
};

const expertState: MinefieldGrid = {
  rowCount: 16,
  columnCount: 16,
  mineCount: 40,
};

function cloneData(data: StatefulMatrix): StatefulMatrix {
  return data.map((row) => row.map((cell) => ({ ...cell })));
}

function initialCellState(rows: number, columns: number): StatefulMatrix {
  return Array.from({ length: rows }, (_a, rowIndex) =>
    Array.from({ length: columns }, (_b, columnIndex) => ({
      columnIndex,
      isMined: false,
      neighbors: 0,
      index: rowIndex * rows + columnIndex,
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

function plantMines(
  data: StatefulMatrix,
  mineCount: number,
  rowIndex: number,
  columnIndex: number,
): StatefulMatrix {
  let randomColumnIndex: number;
  let randomRowIndex: number;
  let minesPlanted = 0;

  while (minesPlanted < mineCount) {
    randomRowIndex = getRandomNumber(data.length - 1);
    randomColumnIndex = getRandomNumber(data[0].length - 1);
    if (
      randomRowIndex !== rowIndex &&
      randomColumnIndex !== columnIndex &&
      !data[randomRowIndex][randomColumnIndex].isMined
    ) {
      // eslint-disable-next-line no-param-reassign
      data[randomRowIndex][randomColumnIndex].isMined = true;
      minesPlanted += 1;
    }
  }
  return data;
}

function isValidCell(
  rowIndex: number,
  columnIndex: number,
  data: StatefulMatrix,
): boolean {
  return (
    rowIndex > -1 &&
    rowIndex < data.length &&
    columnIndex > -1 &&
    columnIndex < data[0].length
  );
}

function findNeigbors(
  rowIndex: number,
  columnIndex: number,
  data: StatefulMatrix,
): StatefulRow {
  const neighbors: StatefulRow = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (!(rowOffset === 0 && columnOffset === 0)) {
        const nextRowIndex = rowIndex + rowOffset;
        const nextColumnIndex = columnIndex + columnOffset;
        if (isValidCell(nextRowIndex, nextColumnIndex, data)) {
          neighbors.push(data[nextRowIndex][nextColumnIndex]);
        }
      }
    }
  }

  return neighbors;
}

function calculateNeigboringMineCount(
  cell: StatefulCell,
  data: StatefulMatrix,
): number {
  const neigbors: StatefulRow = findNeigbors(
    cell.rowIndex,
    cell.columnIndex,
    data,
  );
  return neigbors.reduce(
    (mineCount: number, neigbor: StatefulCell) =>
      mineCount + (neigbor.isMined ? 1 : 0),
    0,
  );
}

function calcNeighbors(data: StatefulMatrix): StatefulMatrix {
  let mineCount: number;
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      if (!data[i][j].isMined) {
        mineCount = calculateNeigboringMineCount(data[i][j], data);
        if (mineCount === 0) {
          // eslint-disable-next-line no-param-reassign
          data[i][j].isEmpty = true;
        }
        // eslint-disable-next-line no-param-reassign
        data[i][j].neighbors = mineCount;
      }
    }
  }
  return data;
}

function revealAll(data: StatefulMatrix): StatefulMatrix {
  return data.map(
    (row: StatefulRow): StatefulRow =>
      row.map(
        (cell: StatefulCell): StatefulCell => ({ ...cell, isRevealed: true }),
      ),
  );
}

function revealEmpty(
  rowIndex: number,
  columnIndex: number,
  data: StatefulMatrix,
): StatefulMatrix {
  const neighbors: StatefulRow = findNeigbors(rowIndex, columnIndex, data);
  neighbors.forEach((neighbor: StatefulCell) => {
    if (!neighbor.isRevealed && !neighbor.isMined) {
      // eslint-disable-next-line no-param-reassign
      data[rowIndex][columnIndex].isRevealed = true;
      if (neighbor.isEmpty) {
        revealEmpty(neighbor.rowIndex, neighbor.columnIndex, data);
      }
    }
  });
  return data;
}

function handleReveal(state: UpdateState): UpdateState {
  if (!state.cell.isRevealed) {
    // eslint-disable-next-line no-param-reassign
    state.cell.isRevealed = true;

    if (state.cell.isMined) {
      // eslint-disable-next-line no-param-reassign
      state.data = revealAll(state.data);
    }
    if (state.cell.isEmpty) {
      // eslint-disable-next-line no-param-reassign
      state.data = revealEmpty(state.rowIndex, state.columnIndex, state.data);
    }
  }
  return state;
}

function processCellAndUpdateData(state: UpdateState): UpdateState {
  if (state.cell.isRevealed) {
    return state;
  }
  if (state.isFlagging && state.flagsUsed !== state.mineCount) {
    // eslint-disable-next-line no-param-reassign
    state.cell.isFlagged = !state.cell.isFlagged;
  }
  if (state.isRevealing) {
    return handleReveal(state);
  }
  return state;
}

function countFlags(data: StatefulMatrix) {
  let count = 0;
  data.forEach((row) =>
    row.forEach((cell) => {
      if (cell.isFlagged) {
        count += 1;
      }
    }),
  );
  return count;
}

export {
  beginnerState,
  intermediateState,
  expertState,
  calcNeighbors,
  cloneData,
  countFlags,
  handleReveal,
  initialCellState,
  plantMines,
  processCellAndUpdateData,
};
