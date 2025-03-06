"use client";

import { AppButton } from "@/components/atoms/AppButton/AppButton";
import { Process } from "@/types/process";
import { toast } from "nextjs-toast-notify";
import { useState } from "react";

interface AddProcessCardProps {
  onAdd: (process: Process) => void;
  onEdit?: (process: Process) => void;
  onCancel: () => void;
  showPriority?: boolean;
  editingProcess?: Process | null;
}

export default function AddProcessCard({
  onAdd,
  onEdit,
  onCancel,
  showPriority = false,
  editingProcess,
}: AddProcessCardProps) {
  const [newProcess, setNewProcess] = useState<Process>(
    editingProcess || { id: "", arrivalTime: 0, burstTime: 1, ...(showPriority && { priority: 0 }) }
  );

  const handleChange = (key: keyof Process, value: string) => {
    const parsedValue = parseInt(value, 10);
    setNewProcess((prev) => ({ ...prev, [key]: isNaN(parsedValue) ? 0 : parsedValue }));
  };

  const handleSubmit = () => {
    if (!newProcess.id.trim()) {
      toast.error("El ID del proceso no puede estar vacío.", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "fadeIn",
        sound: false,
      });
      return;
    }

    if (newProcess.arrivalTime < 0 || newProcess.burstTime <= 0) {
      toast.error(
        "Los valores numéricos deben ser enteros positivos y mayores a 0, excepto el tiempo de llegada.",
        {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          sound: false,
        }
      );
      return;
    }

    if (editingProcess) {
      onEdit?.(newProcess);
    } else {
      onAdd(newProcess);
    }

    setNewProcess({ id: "", arrivalTime: 0, burstTime: 1, ...(showPriority && { priority: 1 }) });
  };

  return (
    <div className="flex flex-col rounded-lg border p-4">
      <div className="flex gap-2">
        <div>
          <label>ID</label>
          <input
            type="text"
            placeholder="ID"
            defaultValue={newProcess.id}
            disabled={!!editingProcess}
            onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label>Llegada</label>
          <input
            type="number"
            min={0}
            step={1}
            onKeyDown={(e) => {
              if (
                e.key === "." ||
                e.key === "," ||
                e.key === "e" ||
                e.key === "E" ||
                e.key === "-"
              ) {
                e.preventDefault();
              }
            }}
            defaultValue={newProcess.arrivalTime}
            onChange={(e) => handleChange("arrivalTime", e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label>Ejecución</label>
          <input
            type="number"
            min={1}
            step={1}
            onKeyDown={(e) => {
              if (
                e.key === "." ||
                e.key === "," ||
                e.key === "e" ||
                e.key === "E" ||
                e.key === "-"
              ) {
                e.preventDefault();
              }
            }}
            defaultValue={newProcess.burstTime}
            onChange={(e) => handleChange("burstTime", e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        {showPriority && (
          <div>
            <label>Prioridad</label>
            <input
              type="number"
              min={0}
              step={1}
              onKeyDown={(e) => {
                if (
                  e.key === "." ||
                  e.key === "," ||
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "-"
                ) {
                  e.preventDefault();
                }
              }}
              defaultValue={newProcess.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
              className="w-full rounded border p-2"
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <AppButton onClick={onCancel}>Cancelar</AppButton>
        <AppButton onClick={handleSubmit}>{editingProcess ? "Guardar" : "Agregar"}</AppButton>
      </div>
    </div>
  );
}
