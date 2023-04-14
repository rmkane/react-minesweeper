import * as React from 'react';

import { StatefulCell } from '../utils/logic';

type CellProps = StatefulCell;

function GridCellView(props: CellProps) {
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
      className="GridCellView"
      data-column-index={columnIndex}
      data-row-index={rowIndex}
      data-neighbors={neighbors}
    >
      {isMine ? '💣' : neighbors || ''}
    </div>
  );
}

export default GridCellView;

export type { CellProps };
