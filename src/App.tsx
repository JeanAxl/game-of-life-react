import React, { useCallback, useRef, useState } from 'react';
import { ConfigurationPanel } from './components/ConfigurationPanel/ConfigurationPanel';
import { Controls } from './components/Controls/Controls';
import { Grid } from './components/Grid/GameGrid';
import { GameOfLife } from './domain/GameOfLife';
import { randomGenerator } from './domain/utils';
import { Population } from './components/Population/Population';

const INITIAL_HEIGHT = 100;
const INITIAL_WIDTH = 100;

const initGol = (height: number, width: number): GameOfLife => {
  const gol = new GameOfLife({});
  gol.init(height, width, randomGenerator(2));
  return gol;
};

function App() {
  const [gol, setGol] = useState<GameOfLife>(() => initGol(INITIAL_HEIGHT, INITIAL_WIDTH));
  const [isRunning, setIsRunning] = useState(false);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [width, setWidth] = useState(INITIAL_WIDTH);

  const style = {
    height: '100vh',
    width: '100vw',
    display: 'grid',
    gridTemplateColumns: `100vmin auto`,
  };

  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const golRef = useRef(gol);
  golRef.current = gol;

  const applyConfiguration = () => {
    setIsRunning(false);
    const newGol = initGol(height, width);
    setGol(newGol);
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);

      //race condition
      runningRef.current = true;
      process();
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const next = () => {
    setGol(gol.nextGeneration());
  };

  const process = useCallback(() => {
    if (runningRef.current) {
      setTimeout(() => {
        process();
      }, 100);
      setGol(golRef.current.nextGeneration());
    }
  }, []);

  return (
    <div style={style}>
      <Grid gol={gol} />
      <div>
        <ConfigurationPanel height={height} setHeight={setHeight} width={width} setWidth={setWidth} />
        <Controls start={start} pause={pause} next={next} apply={applyConfiguration} />
        <Population gol={gol} />
      </div>
    </div>
  );
}

export default App;
