import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  options?: ChartOptions<'pie'>;
  showLegend?: boolean;
  height?: number;
}

export function PieChart({ data, options, showLegend = true, height = 300 }: PieChartProps) {
  const defaultOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: { label: string; parsed: number; dataset: { data: number[] } }) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    ...options,
  };

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <Pie data={data} options={defaultOptions} />
    </div>
  );
}
