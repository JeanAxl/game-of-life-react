import React, { useCallback, useMemo } from 'react';
import { GameOfLife } from '../../domain/GameOfLife';

type GridProps = {
  gol: GameOfLife;
};

export const Grid: React.FC<GridProps> = ({ gol }: GridProps) => {
  const style = useMemo(() => {
    const { height, width } = gol.getDimensions();
    return {
      height: '100vmin',
      width: '100vmin',
      display: 'grid',
      gridGap: '1px',
      gridTemplateColumns: `repeat(${width}, 1fr)`,
      gridTemplateRows: `repeat(${height}, 1fr)`,
    };
  }, [gol]);

  const getCellStyle = useCallback(
    (c) => ({
      backgroundColor: c === 1 ? 'black' : 'white',
    }),
    [],
  );

  return (
    <div style={style}>
      {gol.grid.map((column, columnIndex) =>
        column.map((cell, rowIndex) => <div style={getCellStyle(cell)} key={columnIndex + ':' + rowIndex} />),
      )}
    </div>
  );
};
