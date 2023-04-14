import * as React from 'react';

type CellProps = {
  columnIndex: number;
  isMine: boolean;
  neighbors: number;
  isRevealed: boolean;
  isEmpty: boolean;
  isFlagged: boolean;
  rowIndex: number;
};

function Cell(props: CellProps) {
  const {
    columnIndex,
    isEmpty,
    isFlagged,
    isMine,
    isRevealed,
    neighbors,
    rowIndex,
  } = props;

  return (
    <div
      className="Cell"
      data-column-index={columnIndex}
      data-row-index={rowIndex}
      data-neighbors={neighbors}
    >
      {isMine ? '💣' : neighbors || ''}
    </div>
  );
}

export default Cell;

export type { CellProps };
