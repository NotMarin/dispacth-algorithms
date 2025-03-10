"use client";
import { motion } from "framer-motion";
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
      {/* Gantt Chart */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium">Diagrama de Gantt</h3>
        <div className="border-primary-600 overflow-x-auto rounded-md border p-4 dark:border-white">
          {processes.length === 0 ? (
            <p className="text-center">No hay procesos para mostrar.</p>
          ) : (
            <div className="relative min-w-max">
              <div className="flex">
                <div className="absolute -right-0.5 text-[11px]">{totalTime}</div>
                <div className="w-24 flex-shrink-0" />
                <div className="flex flex-grow">
                  {Array.from({ length: totalTime }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="-ml-1 h-4 w-full text-left text-[11px]"
                    >
                      {i}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Process Rows */}
              {processes.map((process) => {
                const processTimeline = result.timeline.filter(
                  (t: { processId: string }) => t.processId === process.id
                );

                return (
                  <motion.div
                    key={process.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-1 flex h-10 items-center"
                  >
                    <div className="border-primary-600 flex h-8 w-24 flex-shrink-0 items-center justify-center border-r pr-2 text-sm font-medium dark:border-white">
                      {process.id}
                    </div>
                    <div className="relative h-8 flex-grow">
                      {/* Timeline grid */}
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: totalTime }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            className="border-primary-600 h-full flex-grow border-r dark:border-white"
                          />
                        ))}
                      </div>

                      {/* Process execution blocks */}
                      {processTimeline.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((item.endTime - item.startTime) / totalTime) * 100}%`,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="bg-primary-600 dark:text-primary-950 absolute flex h-8 items-center justify-center text-sm text-white dark:bg-white"
                          style={{ left: `${(item.startTime / totalTime) * 100}%` }}
                        >
                          {item.endTime - item.startTime > 0 && (
                            <div className="text-sm">
                              {item.processId !== "IDLE" ? process.id : ""}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
