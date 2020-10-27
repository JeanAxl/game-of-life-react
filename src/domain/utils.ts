import { CellGrid } from './GameOfLife';
import { Cell } from './Cell';

const copyGrid = (grid: CellGrid, width: number) => {
  const newGrid = [];
  for (let column = 0; column < width; column++) {
    newGrid[column] = [...grid[column]];
  }
  return newGrid;
};
const randomGenerator = (n: number): (() => Cell) => () =>
  Math.round(Math.random() * (n - 1) + 1) === 1 ? Cell.ALIVE : Cell.DEAD;

export { copyGrid, randomGenerator };
