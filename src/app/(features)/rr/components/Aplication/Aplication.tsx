"use client";

import { useState } from "react";
import GanttChart from "@/components/organisms/GanttChart/GanttChart";
import { calculateScheduling } from "@/types/schedulingUtil";
import { Process } from "@/types/process";
import AddProcessCard from "@/components/molecules/AddProcessCard/AddProcessCard";
import ProcessCard from "@/components/molecules/ProcessCard/ProcessCard";
import { Plus } from "react-feather";
import { AppButton } from "@/components/atoms/AppButton/AppButton";
import { toast } from "nextjs-toast-notify";
import Metricstable from "@/components/molecules/Metricstable/Metricstable";

export default function Aplication() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [showAddProcess, setShowAddProcess] = useState(false);
  const [editingProcess, setEditingProcess] = useState<Process | null>(null);

  const handleEditProcess = (updatedProcess: Process) => {
    setProcesses((prev) => prev.map((p) => (p.id === updatedProcess.id ? updatedProcess : p)));
    setEditingProcess(null);
    setShowAddProcess(false);
  };

  const handleDeleteProcess = (id: string) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProcess = (process: Process) => {
    if (processes.some((p) => p.id === process.id)) {
      toast.error("Ya existe un proceso con ese ID. Elige otro nombre.", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "fadeIn",
        sound: false,
      });
      return;
    }

    setProcesses((prev) => [...prev, process]);
    setShowAddProcess(false);
  };

  const result = calculateScheduling(processes, "rr", 2);

  return (
    <div className="p-12">
      <h2 className="text-2xl font-semibold">Simulador Round Robin</h2>
      <div className="flex h-full gap-4">
        <div className="w-2/5 space-y-2">
          <h3 className="text-lg font-medium">Procesos</h3>
          {processes.map((process) => (
            <ProcessCard
              key={process.id}
              process={process}
              onEdit={() => {
                setEditingProcess(process);
                setShowAddProcess(true);
              }}
              onDelete={() => handleDeleteProcess(process.id)}
            />
          ))}

          {showAddProcess ? (
            <AddProcessCard
              editingProcess={editingProcess}
              onEdit={handleEditProcess}
              onAdd={handleAddProcess}
              onCancel={() => setShowAddProcess(false)}
              showPriority
            />
          ) : (
            <AppButton className="w-full p-4" onClick={() => setShowAddProcess(true)}>
              <Plus size={18} />
              <span className="ml-2">Agregar Proceso</span>
            </AppButton>
          )}
        </div>
        <div className="w-full gap-4">
          <GanttChart result={result} processes={processes} />
          <div className="mt-4">
            <Metricstable metrics={result.metrics} />
          </div>
        </div>
      </div>
    </div>
  );
}
