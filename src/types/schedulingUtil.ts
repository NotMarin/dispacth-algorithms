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
  algorithm: SchedulingAlgorithm,
  quantum?: number
): SchedulingResult {
  switch (algorithm) {
    case "fifo":
      return calculateFIFO(processes);
    case "sjf":
      return calculateSJF(processes);
    case "priority":
      return calculatePriority(processes);
    case "srtf":
      return calculateSRTF(processes);
    case "rr":
      return calculateRoundRobin(processes, quantum || 2);
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
    const highestPriorityJob = availableProcesses.reduce((prev, curr) => {
      if (prev.priority !== undefined && curr.priority !== undefined) {
        if (prev.priority < curr.priority) return prev; // Menor número = mayor prioridad
        if (prev.priority > curr.priority) return curr;
      }
      return prev.arrivalTime <= curr.arrivalTime ? prev : curr; // Desempate FIFO
    });

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

function calculateSRTF(processes: Process[]): SchedulingResult {
  const timeline: TimelineItem[] = [];
  const pcb: PCBItem[] = [];
  const metrics: ProcessMetrics[] = [];

  let currentTime = 0;
  let lastProcessId: string | null = null;
  const remainingProcesses = [...processes].map((p) => ({
    ...p,
    remainingTime: p.burstTime,
  }));

  processes.forEach((process) => {
    pcb.push({
      processId: process.id,
      state: "WAITING",
      remainingTime: process.burstTime,
    });
  });

  while (remainingProcesses.some((p) => p.remainingTime > 0)) {
    // Obtener los procesos disponibles en el tiempo actual
    const availableProcesses = remainingProcesses.filter(
      (p) => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (availableProcesses.length === 0) {
      // Si no hay procesos disponibles, registrar tiempo inactivo
      if (lastProcessId !== null) {
        timeline[timeline.length - 1].endTime = currentTime;
        lastProcessId = null; // Indicar que estamos en tiempo inactivo
      }

      timeline.push({
        processId: "IDLE",
        startTime: currentTime,
        endTime: currentTime + 1, // Se actualizará en la siguiente iteración
      });

      currentTime++;
      continue;
    }

    // Elegimos el proceso con menor tiempo restante
    const shortestProcess = availableProcesses.reduce((prev, curr) =>
      prev.remainingTime < curr.remainingTime ||
      (prev.remainingTime === curr.remainingTime && prev.arrivalTime < curr.arrivalTime)
        ? prev
        : curr
    );

    // Si hay cambio de proceso, cerramos el segmento anterior
    if (lastProcessId !== shortestProcess.id) {
      if (lastProcessId !== null && timeline.length > 0) {
        timeline[timeline.length - 1].endTime = currentTime;
      }
      timeline.push({
        processId: shortestProcess.id,
        startTime: currentTime,
        endTime: currentTime + 1, // Se actualizará en la siguiente iteración
      });
    } else {
      // Si el proceso sigue siendo el mismo, extendemos su ejecución
      timeline[timeline.length - 1].endTime++;
    }

    // Reducimos el tiempo restante del proceso
    shortestProcess.remainingTime--;
    lastProcessId = shortestProcess.id;
    currentTime++;

    // Si el proceso ha terminado, calculamos sus métricas
    if (shortestProcess.remainingTime === 0) {
      const finishTime = currentTime;
      const turnaroundTime = finishTime - shortestProcess.arrivalTime;
      const waitingTime = turnaroundTime - shortestProcess.burstTime;

      metrics.push({ processId: shortestProcess.id, waitingTime, turnaroundTime });

      // Actualizar PCB
      const pcbIndex = pcb.findIndex((p) => p.processId === shortestProcess.id);
      if (pcbIndex !== -1) {
        pcb[pcbIndex].state = "COMPLETED";
        pcb[pcbIndex].remainingTime = 0;
      }
    }
  }

  // Asegurar que el último segmento tenga el endTime correcto
  if (timeline.length > 0) {
    timeline[timeline.length - 1].endTime = currentTime;
  }

  return { timeline, pcb, metrics };
}

function calculateRoundRobin(processes: Process[], quantum: number): SchedulingResult {
  const timeline: TimelineItem[] = [];
  const pcb: PCBItem[] = [];
  const metrics: ProcessMetrics[] = [];

  let currentTime = 0;
  const queue: Process[] = [];
  const remainingTimes = new Map(processes.map((p) => [p.id, p.burstTime]));
  const arrivalTimes = new Map(processes.map((p) => [p.id, p.arrivalTime]));

  // Ordenar procesos por tiempo de llegada y agregarlos progresivamente a la cola
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let processIndex = 0;

  while (queue.length > 0 || processIndex < sortedProcesses.length) {
    // Agregar procesos a la cola cuando llegan
    while (
      processIndex < sortedProcesses.length &&
      sortedProcesses[processIndex].arrivalTime <= currentTime
    ) {
      queue.push(sortedProcesses[processIndex]);
      processIndex++;
    }

    if (queue.length === 0) {
      // Si no hay procesos listos, avanzar el tiempo al siguiente proceso en la lista
      currentTime = sortedProcesses[processIndex].arrivalTime;
      continue;
    }

    const process = queue.shift();
    if (!process) continue;

    const remainingTime = remainingTimes.get(process.id) || 0;
    if (remainingTime <= 0) continue;

    const executionTime = Math.min(quantum, remainingTime);
    timeline.push({
      processId: process.id,
      startTime: currentTime,
      endTime: currentTime + executionTime,
    });

    currentTime += executionTime;
    remainingTimes.set(process.id, remainingTime - executionTime);

    // Agregar nuevos procesos que llegan en este intervalo de tiempo
    while (
      processIndex < sortedProcesses.length &&
      sortedProcesses[processIndex].arrivalTime <= currentTime
    ) {
      queue.push(sortedProcesses[processIndex]);
      processIndex++;
    }

    // Si el proceso aún tiene tiempo restante, se vuelve a agregar a la cola
    if (remainingTimes.get(process.id)! > 0) {
      queue.push(process);
    } else {
      // Calcular métricas cuando el proceso termina
      const waitingTime = currentTime - (arrivalTimes.get(process.id)! + process.burstTime);
      const turnaroundTime = waitingTime + process.burstTime;
      metrics.push({ processId: process.id, waitingTime, turnaroundTime });
    }
  }

  return { timeline, pcb, metrics };
}
