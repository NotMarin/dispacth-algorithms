"use client";

import { Process } from "@/types/process";
import { Edit2, Trash } from "react-feather";

interface ProcessCardProps {
  process: Process;
  onEdit: () => void;
  onDelete: () => void;
}
export default function ProcessCard({ process, onDelete, onEdit }: ProcessCardProps) {
  return (
    <div className="flex w-full gap-2">
      <div className="h-full w-full overflow-hidden rounded-md border">
        <table className="w-full border-none text-sm">
          <thead>
            <tr>
              <th className="border-r border-b px-2 py-1 last:border-r-0">ID</th>
              <th className="border-r border-b px-2 py-1 last:border-r-0">Llegada</th>
              <th className="border-r border-b px-2 py-1 last:border-r-0">Ejecución</th>
              {process.priority !== undefined && <th className="border-b px-2 py-1">Prioridad</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
                {process.id}
              </td>
              <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
                {process.arrivalTime}
              </td>
              <td className="border-t border-r px-2 py-1 text-center last:border-r-0">
                {process.burstTime}
              </td>
              {process.priority !== undefined && (
                <td className="border-t px-2 py-1 text-center">{process.priority}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-between">
        <button className="cursor-pointer" onClick={onEdit}>
          <Edit2 size={18} />
        </button>
        <button className="cursor-pointer" onClick={onDelete}>
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
