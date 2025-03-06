import { Process } from "@/types/process";

export default function TableProcess({ processes }: { processes: Process[] }) {
  return (
    <div className="mb-6">
      <div className="border-primary-600 overflow-hidden rounded-md border dark:border-white">
        <table className="divide-primary-600 min-w-full divide-y dark:divide-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider uppercase">
                Llegada
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider uppercase">
                Ejecución
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider uppercase">
                Prioridad
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider uppercase">
                Color
              </th>
            </tr>
          </thead>
          <tbody className="divide-primary-600 divide-y dark:divide-white">
            {processes.map((process) => (
              <tr key={process.id}>
                <td className="px-6 py-4 whitespace-nowrap">{process.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{process.arrivalTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{process.burstTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{process.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
