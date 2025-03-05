import type {
  Process,
  SchedulingAlgorithm,
  SchedulingResult,
  TimelineItem,
  PCBItem,
  ProcessMetrics,
} from "./process";

// Función principal para calcular la planificación según el algoritmo seleccionado
export function calculateScheduling(
  processes: Process[],
  algorithm: SchedulingAlgorithm
): SchedulingResult {
  switch (algorithm) {
    case "fifo":
      return calculateFIFO(processes);
    case "sjf":
      return calculateSJF(processes);
    case "priority":
      return calculatePriority(processes);
    default:
      return calculateFIFO(processes);
  }
}

// FIFO (First In First Out)
function calculateFIFO(processes: Process[]): SchedulingResult {
  // Ordenar procesos por tiempo de llegada
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  const timeline: TimelineItem[] = [];
  const pcb: PCBItem[] = [];
  const metrics: ProcessMetrics[] = [];

  let currentTime = 0;

  // Inicializar PCB
  sortedProcesses.forEach((process) => {
    pcb.push({
      processId: process.id,
      state: "WAITING",
      remainingTime: process.burstTime,
    });
  });

  // Calcular timeline
  for (const process of sortedProcesses) {
    // Actualizar el tiempo actual si el proceso aún no ha llegado
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    // Actualizar estado a RUNNING
    const pcbIndex = pcb.findIndex((p) => p.processId === process.id);
    if (pcbIndex !== -1) {
      pcb[pcbIndex].state = "RUNNING";
    }

    // Añadir a la línea de tiempo
    timeline.push({
      processId: process.id,
      startTime: currentTime,
      endTime: currentTime + process.burstTime,
    });

    // Calcular métricas
    const waitingTime = currentTime - process.arrivalTime;
    const turnaroundTime = waitingTime + process.burstTime;

    metrics.push({
      processId: process.id,
      waitingTime,
      turnaroundTime,
    });

    // Actualizar tiempo actual
    currentTime += process.burstTime;

    // Actualizar PCB a COMPLETED
    if (pcbIndex !== -1) {
      pcb[pcbIndex].state = "COMPLETED";
      pcb[pcbIndex].remainingTime = 0;
    }
  }

  return { timeline, pcb, metrics };
}

// SJF (Shortest Job First)
function calculateSJF(processes: Process[]): SchedulingResult {
  const timeline: TimelineItem[] = [];
  const pcb: PCBItem[] = [];
  const metrics: ProcessMetrics[] = [];

  // Copia de procesos para no modificar el original
  const remainingProcesses = [...processes].map((p) => ({
    ...p,
    remainingTime: p.burstTime,
  }));

  // Inicializar PCB
  processes.forEach((process) => {
    pcb.push({
      processId: process.id,
      state: "WAITING",
      remainingTime: process.burstTime,
    });
  });

  let currentTime = 0;
  const completedProcesses: string[] = [];

  while (remainingProcesses.length > 0) {
    // Filtrar procesos que ya han llegado
    const availableProcesses = remainingProcesses.filter(
      (p) => p.arrivalTime <= currentTime && !completedProcesses.includes(p.id)
    );

    if (availableProcesses.length === 0) {
      // No hay procesos disponibles, avanzar el tiempo
      const nextArrival = Math.min(
        ...remainingProcesses
          .filter((p) => !completedProcesses.includes(p.id))
          .map((p) => p.arrivalTime)
      );
      currentTime = nextArrival;
      continue;
    }

    // Seleccionar el proceso con menor tiempo de ejecución
    const shortestJob = availableProcesses.reduce((prev, curr) =>
      prev.burstTime < curr.burstTime ? prev : curr
    );

    // Actualizar estado a RUNNING
    const pcbIndex = pcb.findIndex((p) => p.processId === shortestJob.id);
    if (pcbIndex !== -1) {
      pcb[pcbIndex].state = "RUNNING";
    }

    // Añadir a la línea de tiempo
    timeline.push({
      processId: shortestJob.id,
      startTime: currentTime,
      endTime: currentTime + shortestJob.burstTime,
    });

    // Calcular métricas
    const waitingTime = currentTime - shortestJob.arrivalTime;
    const turnaroundTime = waitingTime + shortestJob.burstTime;

    metrics.push({
      processId: shortestJob.id,
      waitingTime,
      turnaroundTime,
    });

    // Actualizar tiempo actual
    currentTime += shortestJob.burstTime;

    // Marcar como completado
    completedProcesses.push(shortestJob.id);

    // Actualizar PCB a COMPLETED
    if (pcbIndex !== -1) {
      pcb[pcbIndex].state = "COMPLETED";
      pcb[pcbIndex].remainingTime = 0;
    }

    // Eliminar el proceso de la lista de pendientes
    const index = remainingProcesses.findIndex((p) => p.id === shortestJob.id);
    if (index !== -1) {
      remainingProcesses.splice(index, 1);
    }
  }

  return { timeline, pcb, metrics };
}

// Priority Scheduling
function calculatePriority(processes: Process[]): SchedulingResult {
  const timeline: TimelineItem[] = [];
  const pcb: PCBItem[] = [];
  const metrics: ProcessMetrics[] = [];

  // Copia de procesos para no modificar el original
  const remainingProcesses = [...processes];

  // Inicializar PCB
  processes.forEach((process) => {
    pcb.push({
      processId: process.id,
      state: "WAITING",
      remainingTime: process.burstTime,
    });
  });

  let currentTime = 0;
  const completedProcesses: string[] = [];

  while (remainingProcesses.length > completedProcesses.length) {
    // Filtrar procesos que ya han llegado
    const availableProcesses = remainingProcesses.filter(
      (p) => p.arrivalTime <= currentTime && !completedProcesses.includes(p.id)
    );

    if (availableProcesses.length === 0) {
      // No hay procesos disponibles, avanzar el tiempo
      const nextArrival = Math.min(
        ...remainingProcesses
          .filter((p) => !completedProcesses.includes(p.id))
          .map((p) => p.arrivalTime)
      );
      currentTime = nextArrival;
      continue;
    }

    // Seleccionar el proceso con mayor prioridad (menor número = mayor prioridad)
    const highestPriorityJob = availableProcesses.reduce((prev, curr) =>
      prev.priority && curr.priority && prev.priority < curr.priority ? prev : curr
    );

    // Actualizar estado a RUNNING
    const pcbIndex = pcb.findIndex((p) => p.processId === highestPriorityJob.id);
    if (pcbIndex !== -1) {
      pcb[pcbIndex].state = "RUNNING";
    }

    // Añadir a la línea de tiempo
    timeline.push({
      processId: highestPriorityJob.id,
      startTime: currentTime,
      endTime: currentTime + highestPriorityJob.burstTime,
    });

    // Calcular métricas
    const waitingTime = currentTime - highestPriorityJob.arrivalTime;
    const turnaroundTime = waitingTime + highestPriorityJob.burstTime;

    metrics.push({
      processId: highestPriorityJob.id,
      waitingTime,
      turnaroundTime,
    });

    // Actualizar tiempo actual
    currentTime += highestPriorityJob.burstTime;

    // Marcar como completado
    completedProcesses.push(highestPriorityJob.id);

    // Actualizar PCB a COMPLETED
    if (pcbIndex !== -1) {
      pcb[pcbIndex].state = "COMPLETED";
      pcb[pcbIndex].remainingTime = 0;
    }
  }

  return { timeline, pcb, metrics };
}
