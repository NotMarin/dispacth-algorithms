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
    editingProcess || { id: "", arrivalTime: 0, burstTime: 0, ...(showPriority && { priority: 1 }) }
  );

  const isValidNumber = (value: string) => {
    return /^\d+$/.test(value);
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

    if (
      !isValidNumber(String(newProcess.arrivalTime)) ||
      !isValidNumber(String(newProcess.burstTime)) ||
      (showPriority && !isValidNumber(String(newProcess.priority!))) ||
      newProcess.burstTime <= 0 ||
      (showPriority && newProcess.priority! <= 0)
    ) {
      toast.error(
        "Todos los valores numéricos deben ser enteros positivos y mayores a 0, excepto el tiempo de llegada que puede ser 0.",
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

    setNewProcess({ id: "", arrivalTime: 0, burstTime: 1, ...(showPriority && { priority: 0 }) });
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
            disabled={!!editingProcess} // Evita modificar el ID en edición
            onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label>Llegada</label>
          <input
            type="number"
            min="1"
            defaultValue={newProcess.arrivalTime}
            onChange={(e) => {
              if (isValidNumber(e.target.value)) {
                setNewProcess({ ...newProcess, arrivalTime: Number(e.target.value) });
              }
            }}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label>Ejecución</label>
          <input
            type="number"
            min={0.01}
            defaultValue={newProcess.burstTime}
            onChange={(e) => {
              if (isValidNumber(e.target.value) && Number(e.target.value) > 0) {
                setNewProcess({ ...newProcess, burstTime: Number(e.target.value) });
              }
            }}
            className="w-full rounded border p-2"
          />
        </div>
        {showPriority && (
          <div>
            <label>Prioridad</label>
            <input
              type="number"
              min="0"
              defaultValue={newProcess.priority}
              onChange={(e) => {
                if (isValidNumber(e.target.value) && Number(e.target.value) > 0) {
                  setNewProcess({ ...newProcess, priority: Number(e.target.value) });
                }
              }}
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
