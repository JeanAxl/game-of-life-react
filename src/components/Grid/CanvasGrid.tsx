import React, { useEffect } from 'react';
import { GameOfLife } from '../../domain/GameOfLife';
import { Cell } from '../../domain/Cell';

type Props = {
  gol: GameOfLife;
};

export const CanvasGrid: React.FC<Props> = ({ gol }: Props) => {
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log(e);
  };
  useEffect(() => {
    //get a reference to the canvas
    let canvas = document.getElementById('grid') as HTMLCanvasElement;
    //get a reference to the drawing context
    if (canvas) {
      let c = canvas.getContext('2d');
      if (c) {
        c.clearRect(0, 0, 3000, 3000);
        const grid = gol.getGrid();
        const { height, width } = gol.getDimensions();
        let cell;
        c.fillStyle = 'white';
        c.fillRect(4 * 10, 4 * 10, 10, 10);
        c.fillRect(10 * 10, 10 * 10, 10, 10);

        for (let column = 0; column < width; column++) {
          for (let row = 0; row < height; row++) {
            cell = grid[column][row];
            if (cell === Cell.ALIVE) c.fillRect(row * 3, column * 3, 3, 3);
          }
        }
      }
    }
  }, [gol]);
  return <canvas width={3000} height={3000} id={'grid'} onClick={handleCanvasClick} />;
};
