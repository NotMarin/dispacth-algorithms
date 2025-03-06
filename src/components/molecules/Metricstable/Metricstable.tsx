import { ProcessMetrics } from "@/types/process";

interface MetricsTableProps {
  metrics: ProcessMetrics[];
}
export default function Metricstable({ metrics }: MetricsTableProps) {
  const totalWaitingTime = metrics.reduce((sum, m) => sum + m.waitingTime, 0);
  const totalTurnaroundTime = metrics.reduce((sum, m) => sum + m.turnaroundTime, 0);
  const averageWaitingTime = (totalWaitingTime / metrics.length).toFixed(2);
  const averageTurnaroundTime = (totalTurnaroundTime / metrics.length).toFixed(2);
  return (
    <div className="h-full w-full overflow-hidden rounded-md border">
      <table className="w-full border-none text-sm">
        <thead>
          <tr>
            <th className="border-r border-b px-2 py-1 last:border-r-0">Proceso</th>
            <th className="border-r border-b px-2 py-1 last:border-r-0">Tiempo de Espera (TE)</th>
            <th className="border-r border-b px-2 py-1 last:border-r-0">Tiempo de Sistema (TS)</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.processId}>
              <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
                {metric.processId}
              </td>
              <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
                {metric.waitingTime}
              </td>
              <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
                {metric.turnaroundTime}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border-t border-r px-2 py-1 text-center last:border-r-0">Promedio</td>
            <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
              {isNaN(Number(averageWaitingTime)) ? "Aún no hay datos" : averageWaitingTime}
            </td>
            <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
              {isNaN(Number(averageTurnaroundTime)) ? "Aún no hay datos" : averageTurnaroundTime}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
