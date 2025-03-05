"use client";

export default function Intro() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="flex max-w-4xl flex-col">
        <h1 className="mb-4 text-5xl font-bold">Algoritmo FIFO (First In, First Out)</h1>
        <p className="mb-4 text-lg">
          FIFO es un algoritmo de planificación de procesos donde el primer proceso en llegar es el
          primero en ejecutarse. No hay interrupciones, y los procesos se ejecutan en orden de
          llegada.
        </p>
        <h2 className="mb-2 text-2xl font-semibold">Conceptos clave</h2>
        <ul className="mb-4 list-inside list-disc text-lg">
          <li>
            <strong>Cola de procesos:</strong> Los procesos se almacenan en una cola en el orden en
            que llegan.
          </li>
          <li>
            <strong>Sin desalojo:</strong> Un proceso se ejecuta hasta completarse sin ser
            interrumpido.
          </li>
          <li>
            <strong>Equidad temporal:</strong> Todos los procesos reciben atención en el orden en
            que llegaron.
          </li>
        </ul>
        <h2 className="mb-2 text-2xl font-semibold">Ventajas y Desventajas</h2>
        <ul className="mb-4 list-inside list-disc text-lg">
          <li>
            <strong>Ventaja:</strong> Fácil de implementar y comprender.
          </li>
          <li>
            <strong>Desventaja:</strong> Puede generar tiempos de espera elevados si un proceso
            largo llega primero (efecto convoy).
          </li>
        </ul>
      </div>
    </div>
  );
}
