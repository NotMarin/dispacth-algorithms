// Tipos para los procesos y algoritmos de planificación

export type Process = {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
};

export type SchedulingAlgorithm = "fifo" | "sjf" | "priority" | "srtf" | "rr";

export type TimelineItem = {
  processId: string;
  startTime: number;
  endTime: number;
};

export type PCBState = "READY" | "RUNNING" | "COMPLETED" | "WAITING";

export type PCBItem = {
  processId: string;
  state: PCBState;
  remainingTime: number;
};

export type ProcessMetrics = {
  processId: string;
  waitingTime: number;
  turnaroundTime: number;
};

export type SchedulingResult = {
  timeline: TimelineItem[];
  pcb: PCBItem[];
  metrics: ProcessMetrics[];
};
