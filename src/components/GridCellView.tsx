import * as React from 'react';

import { Cell, HasNeighbors, StatefulCell } from '../services/types';

type Clickable = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu: React.MouseEventHandler<HTMLDivElement>;
};

type CellProps = Clickable & StatefulCell;

function formatCellLabel(cell: Cell): string {
  const { columnIndex, rowIndex } = cell;
  return `Cell (${columnIndex + 1}, ${rowIndex + 1})`;
}

type UnrevealedCellProps = Cell & Clickable;
function UnrevealedCell(props: UnrevealedCellProps) {
  const { columnIndex, index, onClick, onContextMenu, rowIndex } = props;
  const labelText = formatCellLabel({ columnIndex, rowIndex });
  return (
    <div
      className="GridCellView"
      aria-label={labelText}
      data-column-index={columnIndex}
      data-is-unrevealed
      data-row-index={rowIndex}
      onMouseDown={onClick}
      onContextMenu={onContextMenu}
      onKeyDown={() => {
        // Do nothing...
      }}
      role="button"
      tabIndex={index}
    />
  );
}

type FlaggedCellProps = Cell & Clickable;
function FlaggedCell(props: FlaggedCellProps) {
  const { columnIndex, index, onClick, onContextMenu, rowIndex } = props;
  const labelText = formatCellLabel({ columnIndex, rowIndex });
  return (
    <div
      className="GridCellView"
      aria-label={labelText}
      data-column-index={columnIndex}
      data-row-index={rowIndex}
      data-is-flagged
      data-is-unrevealed
      onMouseDown={onClick}
      onContextMenu={onContextMenu}
      onKeyDown={() => {
        // Do nothing...
      }}
      role="button"
      tabIndex={index}
    >
      🚩
    </div>
  );
}

type MinedCellProps = Cell;
function MinedCell(props: MinedCellProps) {
  const { columnIndex, rowIndex } = props;
  return (
    <div
      className="GridCellView"
      data-column-index={columnIndex}
      data-row-index={rowIndex}
      data-row-is-mined
    >
      💣
    </div>
  );
}

type NeigborCellProps = Cell & HasNeighbors;
function NeigborCell(props: NeigborCellProps) {
  const { columnIndex, neighbors, rowIndex } = props;
  return (
    <div
      className="GridCellView"
      data-column-index={columnIndex}
      data-row-index={rowIndex}
      data-neighbors={neighbors}
    >
      {neighbors}
    </div>
  );
}

type EmptyCellProps = Cell;
function EmptyCell(props: EmptyCellProps) {
  const { columnIndex, rowIndex } = props;
  return (
    <div
      className="GridCellView"
      data-column-index={columnIndex}
      data-row-index={rowIndex}
      data-row-is-empty
    />
  );
}

function GridCellView(props: CellProps) {
  const {
    columnIndex,
    index,
    isFlagged,
    isMined,
    isRevealed,
    onClick,
    onContextMenu,
    neighbors,
    rowIndex,
  } = props;

  // eslint-disable-next-line no-console
  console.log(`Cell at index: ${index} is flagged? ${isFlagged}`);

  if (isFlagged) {
    return (
      <FlaggedCell
        columnIndex={columnIndex}
        index={index}
        onClick={onClick}
        onContextMenu={onContextMenu}
        rowIndex={rowIndex}
      />
    );
  }

  if (!isRevealed) {
    return (
      <UnrevealedCell
        columnIndex={columnIndex}
        index={index}
        onClick={onClick}
        onContextMenu={onContextMenu}
        rowIndex={rowIndex}
      />
    );
  }

  if (isMined) {
    return (
      <MinedCell columnIndex={columnIndex} index={index} rowIndex={rowIndex} />
    );
  }

  if (neighbors > 0) {
    return (
      <NeigborCell
        columnIndex={columnIndex}
        index={index}
        neighbors={neighbors}
        rowIndex={rowIndex}
      />
    );
  }

  return (
    <EmptyCell columnIndex={columnIndex} index={index} rowIndex={rowIndex} />
  );
}

export default GridCellView;

export type { CellProps };
