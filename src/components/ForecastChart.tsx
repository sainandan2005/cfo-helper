'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ForecastResults } from '@/types';
import { formatCurrency } from '@/utils/calculations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastChartProps {
  forecast: ForecastResults;
}

export function ForecastChart({ forecast }: ForecastChartProps) {
  const months = Array.from({ length: 37 }, (_, i) => `Month ${i}`);
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Cash Balance',
        data: forecast.projection,
        borderColor: forecast.isProfitable ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: forecast.isProfitable ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#D1D5DB',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#D1D5DB',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `Cash Balance: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value: any) {
            return formatCurrency(value);
          },
        },
        title: {
          display: true,
          text: 'Cash Balance (₹)',
          color: '#D1D5DB',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: '#9CA3AF',
          maxTicksLimit: 8,
        },
        title: {
          display: true,
          text: 'Timeline',
          color: '#D1D5DB',
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 8,
        borderWidth: 2,
      },
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={data} options={options} />
    </div>
  );
}