import React, { useEffect, useState } from 'react';
import { GameOfLife } from '../../domain/GameOfLife';
import { ChartPoint, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
type Props = {
  gol: GameOfLife;
};

let i = 0;
const Population = ({ gol }: Props) => {
  const [dataSets, setDataSets] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Population',
        data: [],
      },
    ],
  });
  useEffect(() => {
    let data: any[] = [];
    if (dataSets?.datasets && dataSets?.datasets[0]?.data && dataSets?.datasets[0].data) {
      data = dataSets.datasets[0].data;
    }
    const newData = {
      labels: [...(dataSets?.labels || []), i++],
      datasets: [
        {
          label: 'Population',
          data: [...data, gol.population as ChartPoint],
        },
      ],
    };
    setDataSets(newData);
  }, [gol]);

  return (
    <div>
      Population: <Line data={dataSets} />
    </div>
  );
};

export { Population };
