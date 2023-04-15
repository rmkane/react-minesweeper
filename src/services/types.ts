import { Difficulty } from './constants';

type GameDifficulty =
  | Difficulty.BEGINNER
  | Difficulty.INTERMEDIATE
  | Difficulty.EXPERT;

type Grid = {
  rowCount: number;
  columnCount: number;
};

type Minefield = {
  mineCount: number;
};

type Cell = {
  columnIndex: number;
  rowIndex: number;
  index?: number;
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

type Clickable = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu: React.MouseEventHandler<HTMLDivElement>;
};

type MinefieldGrid = Grid & Minefield;
type StatefulCell = Cell & HasNeighbors & Stateful;
type StatefulRow = StatefulCell[];
type StatefulMatrix = StatefulRow[];

type GameState = MinefieldGrid & {
  data: StatefulMatrix;
  moves: number;
  flagsUsed: number;
};

type ClickState = {
  cell: StatefulCell;
  rowIndex: number;
  columnIndex: number;
  isRevealing: boolean;
  isFlagging: boolean;
};

type UpdateState = GameState & ClickState;

export type {
  Cell,
  Clickable,
  ClickState,
  GameDifficulty,
  GameState,
  Grid,
  HasNeighbors,
  Minefield,
  MinefieldGrid,
  Stateful,
  StatefulCell,
  StatefulMatrix,
  StatefulRow,
  UpdateState,
};
