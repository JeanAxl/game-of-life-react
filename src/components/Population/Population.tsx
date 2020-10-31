import React, { useEffect, useRef, useState } from 'react';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { addPopulationValueToDataset, initialDatasets } from './utils';

type Props = {
  population: number;
};

const Population = ({ population }: Props) => {
  const [dataSets, setDataSets] = useState<ChartData>(initialDatasets);

  const currentGenRef = useRef(0);

  useEffect(() => {
    const newData = addPopulationValueToDataset(population, dataSets, currentGenRef.current);
    currentGenRef.current++;
    setDataSets(newData);
  }, [population]);

  return (
    <div>
      Population: <Line data={dataSets} />
    </div>
  );
};

export { Population };
