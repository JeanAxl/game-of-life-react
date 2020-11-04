import React, { useCallback, useRef, useState } from 'react';
import { ConfigurationPanel } from './components/ConfigurationPanel/ConfigurationPanel';
import { Controls } from './components/Controls/Controls';
import { Grid } from './components/Grid/GameGrid';
import { GameOfLife } from './domain/GameOfLife';
import { randomGenerator } from './domain/utils';
import { Population } from './components/Population/Population';
import { CanvasGrid } from './components/Grid/CanvasGrid';

const INITIAL_HEIGHT = 100;
const INITIAL_WIDTH = 100;

const initGol = (height: number, width: number, randomize = true): GameOfLife => {
  const gol = new GameOfLife({});
  if (randomize) {
    gol.init(height, width, randomGenerator(2));
  } else {
    gol.init(height, width);
  }
  return gol;
};

function App() {
  const [gol, setGol] = useState<GameOfLife>(() => initGol(INITIAL_HEIGHT, INITIAL_WIDTH, true));
  const [isRunning, setIsRunning] = useState(false);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const [randomize, setRandomize] = useState(true);

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
    setGol(initGol(height, width, randomize));
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);

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

  const toggleCellLiveliness = (column: number, row: number) => {
    if (!runningRef.current) {
      setGol(gol.toggleLiveliness(column, row));
    }
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
      <CanvasGrid gol={gol} />
      <div>
        <ConfigurationPanel
          height={height}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          randomize={randomize}
          setRandomize={setRandomize}
        />
        <Controls start={start} pause={pause} next={next} apply={applyConfiguration} />
        {/*        <Population population={gol.population} />*/}
      </div>
    </div>
  );
}

export default App;
