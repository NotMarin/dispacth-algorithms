"use client";
import { useRouter } from "next/navigation";
import GanttDiagram from "../../../../public/GanttDiagram";
import { AppButton } from "@/components/atoms/AppButton/AppButton";

export default function DashboardTemplate() {
  const router = useRouter();
  return (
    <div className="flex h-full">
      <div className="flex w-full items-center justify-center">
        <div className="flex max-w-md flex-col gap-10 2xl:max-w-2xl">
          <h1 className="text-5xl font-bold 2xl:text-7xl">Simulador de Algoritmos de Despacho</h1>
          <p className="2xl:text-lg">
            Explora cómo funcionan FIFO, SJF y PCB en la planificación de procesos. Visualiza
            tiempos de espera, tiempos de sistema y más.
          </p>
          <AppButton className="h-12 2xl:h-16 2xl:text-lg" onClick={() => router.push("/fifo")}>
            Comienza
          </AppButton>
        </div>
      </div>
      <div className="flex w-3xl items-center 2xl:w-full">
        <GanttDiagram className="h-[450px] 2xl:h-full" />
      </div>
    </div>
  );
}
