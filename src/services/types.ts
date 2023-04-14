import { Difficulty } from './constants';

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
  index?: number;
  rowIndex: number;
};

type Stateful = {
  isEmpty: boolean;
  isFlagged: boolean;
  isMined: boolean;
  isRevealed: boolean;
};

type HasNeighbors = {
  neighbors: number;
};

type MinefieldGrid = Grid & Minefield;
type StatefulCell = Cell & HasNeighbors & Stateful;
type StatefulRow = StatefulCell[];
type StatefulMatrix = StatefulRow[];

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
