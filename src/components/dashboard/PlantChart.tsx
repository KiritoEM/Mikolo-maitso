import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Info } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

interface PlantChartProps {
  title: string;
  data: number[];
  labels: string[];
  color: string;
  description?: string;
}

const PlantChart: React.FC<PlantChartProps> = ({
  title,
  data,
  labels,
  color,
  description,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        data,
        borderColor: color,
        backgroundColor: `${color}20`,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: color,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{description}</p>
      )}
    </div>
  );
};

export default PlantChart;