import { GameOfLife } from './GameOfLife';
import { Cell } from './Cell';

describe('Array implementation', () => {
  it('inits grid in constructor', () => {
    const gol = new GameOfLife();
    const result = gol.getGrid();
    expect(result).toEqual([]);
  });

  it('has an init function with only dead cells', () => {
    const gol = new GameOfLife();
    gol.init(4, 4);
    const result = gol.getGrid();
    expect(result[3][3]).toBe(Cell.DEAD);
    expect(result[0][0]).toBe(Cell.DEAD);
    expect(result[3][4]).toBeUndefined();
  });

  it('can set cell', () => {
    const gol = new GameOfLife();
    gol.init(4, 4);
    gol.setCell(3, 3, Cell.ALIVE);
    const grid = gol.getGrid();
    expect(grid[3][3]).toBe(Cell.ALIVE);
  });

  it('Array : Dead cell gets Alive if it has 3 neighbors', () => {
    const firstCase = () => {
      const gameOfLife = new GameOfLife();

      gameOfLife.init(4, 3);
      gameOfLife.setCell(0, 1, Cell.ALIVE);
      gameOfLife.setCell(1, 1, Cell.ALIVE);
      gameOfLife.setCell(1, 0, Cell.ALIVE);

      gameOfLife.nextGeneration();

      const result = gameOfLife.getCell(0, 0);

      expect(result).toEqual(Cell.ALIVE);
    };
    const secondCase = () => {
      const gameOfLife = new GameOfLife();

      gameOfLife.init(4, 3);
      gameOfLife.setCell(2, 1, Cell.ALIVE);
      gameOfLife.setCell(1, 1, Cell.ALIVE);
      gameOfLife.setCell(1, 0, Cell.ALIVE);

      gameOfLife.nextGeneration();

      const result = gameOfLife.getCell(2, 0);

      expect(result).toEqual(Cell.ALIVE);
    };
    secondCase();
    firstCase();
  });

  it('Dies from solitude :(', () => {
    const firstCase = () => {
      const gameOfLife = new GameOfLife();

      gameOfLife.init(4, 3);
      gameOfLife.setCell(0, 1, Cell.ALIVE);
      gameOfLife.setCell(1, 0, Cell.ALIVE);

      gameOfLife.nextGeneration();

      const result1 = gameOfLife.getCell(0, 1);
      const result2 = gameOfLife.getCell(1, 0);

      expect(result1).toEqual(Cell.DEAD);
      expect(result2).toEqual(Cell.DEAD);
    };
    firstCase();
  });

  it('Dies from overpopulation :(', () => {
    const firstCase = () => {
      const gameOfLife = new GameOfLife();

      gameOfLife.init(4, 3);

      gameOfLife.setCell(0, 1, Cell.ALIVE);
      gameOfLife.setCell(1, 1, Cell.ALIVE);
      gameOfLife.setCell(2, 1, Cell.ALIVE);
      gameOfLife.setCell(2, 0, Cell.ALIVE);
      gameOfLife.setCell(1, 0, Cell.ALIVE);

      gameOfLife.nextGeneration();

      const result1 = gameOfLife.getCell(1, 0);

      expect(result1).toEqual(Cell.DEAD);
    };
    firstCase();
  });
});
