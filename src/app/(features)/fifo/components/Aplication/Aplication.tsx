"use client";

import { useState } from "react";
import GanttChart from "@/components/organisms/GanttChart/GanttChart";
import { calculateScheduling } from "@/types/schedulingUtil";

export default function Aplication() {
  const [processes, setProcesses] = useState([
    { id: "P1", arrivalTime: 0, burstTime: 6, priority: 3, color: "bg-blue-500" },
    { id: "P2", arrivalTime: 1, burstTime: 4, priority: 1, color: "bg-green-500" },
  ]);

  const [newProcess, setNewProcess] = useState({
    id: "",
    arrivalTime: 0,
    burstTime: 1,
    priority: 1,
    color: "bg-red-500",
  });

  const addProcess = () => {
    if (newProcess.id.trim() === "") return;

    setProcesses((prev) => [...prev, newProcess]);
    setNewProcess({ id: "", arrivalTime: 0, burstTime: 1, priority: 1, color: "bg-red-500" });
  };

  const result = calculateScheduling(processes, "fifo");

  return (
    <div className="p-12">
      {/* Formulario para agregar procesos */}
      <div className="rounded-lg border p-4 shadow-md">
        <h3 className="mb-4 text-lg font-semibold">Agregar Proceso</h3>
        <div className="grid grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="ID"
            value={newProcess.id}
            onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
            className="rounded border p-2"
          />
          <input
            type="number"
            placeholder="Llegada"
            value={newProcess.arrivalTime}
            onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: Number(e.target.value) })}
            className="rounded border p-2"
          />
          <input
            type="number"
            placeholder="Ejecución"
            value={newProcess.burstTime}
            onChange={(e) => setNewProcess({ ...newProcess, burstTime: Number(e.target.value) })}
            className="rounded border p-2"
          />
          <input
            type="number"
            placeholder="Prioridad"
            value={newProcess.priority}
            onChange={(e) => setNewProcess({ ...newProcess, priority: Number(e.target.value) })}
            className="rounded border p-2"
          />
          <button onClick={addProcess} className="rounded bg-blue-500 px-4 py-2 text-white">
            Agregar
          </button>
        </div>
      </div>

      <GanttChart result={result} processes={processes} />
    </div>
  );
}
