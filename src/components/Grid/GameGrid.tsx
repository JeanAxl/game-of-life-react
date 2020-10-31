import React, { useCallback, useMemo } from 'react';
import { GameOfLife } from '../../domain/GameOfLife';

type GridProps = {
  gol: GameOfLife;
  toggleCellLiveliness: (column: number, row: number) => void;
};

export const Grid: React.FC<GridProps> = ({ gol, toggleCellLiveliness }: GridProps) => {
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
  }, [gol.getDimensions()]);

  const handleCellClick = useCallback(
    (column: number, row: number) => {
      toggleCellLiveliness(column, row);
    },
    [toggleCellLiveliness],
  );

  const getCellStyle = useCallback(
    (c) => ({
      backgroundColor: c === 1 ? 'black' : 'white',
    }),
    [],
  );

  return (
    <div style={style}>
      {gol.grid.map((column, columnIndex) =>
        column.map((cell, rowIndex) => (
          <div
            onClick={() => handleCellClick(columnIndex, rowIndex)}
            style={getCellStyle(cell)}
            key={columnIndex + ':' + rowIndex}
          />
        )),
      )}
    </div>
  );
};
