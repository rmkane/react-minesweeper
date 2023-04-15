import * as React from 'react';

import {
  Clickable,
  StatefulCell,
  StatefulMatrix,
  StatefulRow,
} from '../services/types';
import GridCellView from './GridCellView';

type GridViewProps = {
  data: StatefulMatrix;
} & Clickable;

function GridView(props: GridViewProps) {
  const { data, onClick, onContextMenu } = props;

  return (
    <div className="Board">
      {data.map((row: StatefulRow) => (
        <div className="Row" key={`row-${row[0].rowIndex}`}>
          {row.map((cell: StatefulCell) => (
            <GridCellView
              key={`cell-${cell.index}`}
              columnIndex={cell.columnIndex}
              index={cell.index}
              isEmpty={cell.isEmpty}
              isFlagged={cell.isFlagged}
              isMined={cell.isMined}
              isRevealed={cell.isRevealed}
              onClick={onClick}
              onContextMenu={onContextMenu}
              neighbors={cell.neighbors}
              rowIndex={cell.rowIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GridView;

export type { GridViewProps };
