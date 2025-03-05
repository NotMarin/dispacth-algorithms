"use client";
import type { Process, SchedulingResult } from "@/types/process";

export default function GanttChart({
  result,
  processes,
}: {
  result: SchedulingResult;
  processes: Process[];
}) {
  const totalTime =
    result.timeline.length > 0 ? result.timeline[result.timeline.length - 1].endTime : 0;

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <div className="border-primary-600 overflow-hidden rounded-md border dark:border-white">
          <table className="divide-primary-600 min-w-full divide-y dark:divide-white">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Llegada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Ejecución
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`h-4 w-8 rounded ${process.color}`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium">Diagrama de Gantt</h3>
        <div className="border-primary-600 overflow-x-auto rounded-md border p-4 dark:border-white">
          <div className="relative min-w-max">
            <div className="mb-2 flex">
              <div className="absolute -right-1 text-xs">{totalTime}</div>
              <div className="w-24 flex-shrink-0" />
              <div className="flex flex-grow">
                {Array.from({ length: totalTime }).map((_, i) => (
                  <div key={i} className="h-8 flex-grow text-left text-xs">
                    {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Process Rows */}
            {processes.map((process) => {
              const processTimeline = result.timeline.filter(
                (t: { processId: string }) => t.processId === process.id
              );

              return (
                <div key={process.id} className="mb-1 flex h-10 items-center">
                  <div className="border-primary-600 flex h-8 w-24 flex-shrink-0 items-center justify-center border-r pr-2 text-sm font-medium dark:border-white">
                    {process.id}
                  </div>
                  <div className="relative h-8 flex-grow">
                    {/* Timeline grid */}
                    <div className="absolute inset-0 flex">
                      {Array.from({ length: totalTime }).map((_, i) => (
                        <div
                          key={i}
                          className="border-primary-600 h-full flex-grow border-r dark:border-white"
                        />
                      ))}
                    </div>

                    {/* Process execution blocks */}
                    {processTimeline.map(
                      (
                        item: { processId: string; startTime: number; endTime: number },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className={`absolute h-8 ${process.color} flex items-center justify-center rounded-sm text-xs text-white`}
                          style={{
                            left: `${(item.startTime / totalTime) * 100}%`,
                            width: `${((item.endTime - item.startTime) / totalTime) * 100}%`,
                          }}
                        >
                          {item.endTime - item.startTime > 1 ? process.id : ""}
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
