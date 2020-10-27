import React from 'react';
import { CellGrid } from '../../domain/GameOfLife';

type GridProps = {
  grid: CellGrid;
};

export const Grid: React.FC<GridProps> = ({ grid }: GridProps) => {
  const style = {
    display: 'grid',
    gridGap: '1px',
    gridTemplateColumns: `repeat(${100}, ${10}px)`,
  };
  return (
    <div style={style}>
      {grid.map((column, columnIndex) =>
        column.map((cell, rowIndex) => (
          <div
            style={{
              backgroundColor: cell === 1 ? 'black' : 'white',
              width: '10px',
              height: '10px',
            }}
            key={columnIndex + ':' + rowIndex}
          />
        )),
      )}
    </div>
  );
};
