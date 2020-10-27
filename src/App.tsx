import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import { ConfigurationPanel } from './components/ConfigurationPanel/ConfigurationPanel';
import { Controls } from './components/Controls/Controls';
import { Grid } from './components/Grid/GameGrid';
import { CellGrid, GameOfLife } from './domain/GameOfLife';
import { randomGenerator } from './domain/utils';

const initState = (): GameOfLife => {
  const gol = new GameOfLife();
  gol.init(100, 100, randomGenerator(2));
  return gol;
};

const initGrid = () => {
  const gol = new GameOfLife();
  gol.init(100, 100, randomGenerator(2));
  return gol.grid;
};

export default App;

function App() {
  const [gol, setGol] = useState<GameOfLife>(initState);
  const [grid, setGrid] = useState<CellGrid>(initGrid);
  const [isRunning, setIsRunning] = useState(false);

  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const gridRef = useRef(grid);
  gridRef.current = grid;

  const start = () => {
    setIsRunning(true);
    runningRef.current = true;
    process();
  };

  const pause = () => {
    setIsRunning(false);
  };

  const next = () => {
    setGrid(gol.nextGeneration(gridRef.current));
  };

  const process = useCallback(() => {
    if (runningRef.current) {
      const ng = gol.nextGeneration(gridRef.current);

      setTimeout(() => {
        process();
      }, 100);
      setGrid(ng);
    }
  }, []);

  return (
    <div className="App">
      <ConfigurationPanel />
      <Controls start={start} pause={pause} next={next} />
      <Grid grid={grid} />
    </div>
  );
}
