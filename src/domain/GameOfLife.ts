import { Cell } from './Cell';
export type CellGrid = Cell[][];

class GameOfLife {
  public grid: CellGrid;
  public population: number;
  private height: number;
  private width: number;

  constructor({
    height = 0,
    width = 0,
    population = 0,
    grid = [[]],
  }: {
    height?: number;
    width?: number;
    population?: number;
    grid?: CellGrid;
  }) {
    this.height = height;
    this.width = width;
    this.grid = grid;
    this.population = population;
  }

  init(height: number, width: number, cellGeneration: () => Cell = () => Cell.DEAD) {
    this.height = height;
    this.width = width;
    let population = 0;
    const newGrid: CellGrid = [];
    for (let column = 0; column < width; column++) {
      newGrid[column] = [];
      for (let row = 0; row < height; row++) {
        const newCell = cellGeneration();
        if (newCell === Cell.ALIVE) {
          population++;
        }
        newGrid[column][row] = cellGeneration();
      }
    }

    this.population = population;
    this.grid = newGrid;
  }

  nextGeneration() {
    // Works 10 time faster when copying the grid
    const currentGrid = this.grid;

    const { width, height } = this.getDimensions();
    let aliveNeighbors: number;
    let column: number;
    let row: number;
    let currentCell: Cell;
    let population = 0;
    const newGrid: CellGrid = [];

    for (column = 0; column < this.width; column++) {
      newGrid[column] = [];
      for (row = 0; row < this.height; row++) {
        aliveNeighbors = this.getAliveNeighbors(column, row, currentGrid, width, height);
        currentCell = currentGrid[column][row];

        if (currentCell === Cell.DEAD) {
          if (aliveNeighbors === 3) {
            newGrid[column][row] = Cell.ALIVE;
            population++;
          } else {
            newGrid[column][row] = Cell.DEAD;
          }
        } else {
          if (aliveNeighbors === 2 || aliveNeighbors === 3) {
            newGrid[column][row] = Cell.ALIVE;
            population++;
          } else {
            newGrid[column][row] = Cell.DEAD;
          }
        }
      }
    }

    return new GameOfLife({ height: this.height, width: this.width, grid: newGrid, population });
  }

  getDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  getAliveNeighbors(column: number, row: number, currentGrid: CellGrid, width: number, height: number): number {
    let aliveNeighbors = 0;
    [
      { column: column - 1, row: row - 1 },
      { column: column, row: row - 1 },
      { column: column + 1, row: row - 1 },
      { column: column - 1, row: row },
      { column: column + 1, row: row },
      { column: column - 1, row: row + 1 },
      { column: column, row: row + 1 },
      { column: column + 1, row: row + 1 },
    ].forEach((neighbor) => {
      if (!(neighbor.column < 0 || neighbor.row < 0 || neighbor.column >= width || neighbor.row >= height)) {
        aliveNeighbors += currentGrid[neighbor.column][neighbor.row];
        if (aliveNeighbors > 3) {
          return aliveNeighbors;
        }
      }
    });

    return aliveNeighbors;
  }

  setCell(column: number, row: number, cell: Cell) {
    this.grid[column][row] = cell;
  }

  getCell(column: number, row: number): Cell {
    return this.grid[column][row];
  }

  getGrid(): CellGrid {
    return this.grid;
  }
}

export { GameOfLife };
