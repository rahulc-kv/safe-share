import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

interface DonutChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  options?: ChartOptions<'doughnut'>;
  centerText?: string | number;
  centerSubtext?: string;
}

export function DonutChart({ data, options, centerText, centerSubtext }: DonutChartProps) {
  const defaultOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
    cutout: '60%',
    ...options,
  };

  return (
    <div className="relative h-40 w-40">
      <Doughnut data={data} options={defaultOptions} />
      {(centerText !== undefined || centerSubtext) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerText !== undefined && (
            <div className="text-2xl font-bold text-foreground">
              {centerText}
            </div>
          )}
          {centerSubtext && (
            <div className="text-xs text-muted-foreground">
              {centerSubtext}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
