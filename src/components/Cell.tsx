import * as React from 'react';

type CellProps = {
  x: number;
  y: number;
  isMine: boolean;
  neighbour: number;
  isRevealed: boolean;
  isEmpty: boolean;
  isFlagged: boolean;
};

function Cell(props: CellProps) {
  const { isEmpty, isFlagged, isMine, isRevealed, neighbour, x, y } = props;

  return <div className="Cell">x</div>;
}

export default Cell;

export type { CellProps };
