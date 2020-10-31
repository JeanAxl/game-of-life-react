import { ChartData, ChartPoint } from 'chart.js';

const initialDatasets = {
  labels: [],
  datasets: [
    {
      label: 'Population',
      data: [],
    },
  ],
};

const addPopulationValueToDataset = (population: number, dataSets: ChartData, gen: number): ChartData => {
  let data: any[] = [];
  if (dataSets?.datasets && dataSets?.datasets[0]?.data) {
    data = dataSets.datasets[0].data;
  }

  return {
    labels: [...(dataSets?.labels || []), gen],
    datasets: [
      {
        label: 'Population',
        data: [...data, population as ChartPoint],
      },
    ],
  };
};

export { initialDatasets, addPopulationValueToDataset };
