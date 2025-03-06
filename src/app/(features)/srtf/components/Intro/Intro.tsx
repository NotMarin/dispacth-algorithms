export default function Intro() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="flex max-w-4xl flex-col">
        <h1 className="text-5xl font-bold">
          Algoritmo SRTF <br /> (Shortest Remaining Time First)
        </h1>
        <p className="text-lg">
          SRTF es una variante del algoritmo SJF donde el proceso con el menor tiempo de ráfaga
          restante es el que se ejecuta primero. Es un algoritmo apropiativo, lo que significa que
          un proceso en ejecución puede ser interrumpido si llega otro con un tiempo de ráfaga
          menor.
        </p>
        <h2 className="text-2xl font-semibold">Conceptos clave</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Priorización dinámica:</strong> La planificación se actualiza continuamente a
            medida que llegan nuevos procesos.
          </li>
          <li>
            <strong>Interrupciones:</strong> Si un proceso con menor ráfaga restante llega, el
            proceso actual se interrumpe.
          </li>
          <li>
            <strong>Optimización del tiempo de espera:</strong> Reduce significativamente el tiempo
            promedio de espera en comparación con otros algoritmos.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">Ventajas y Desventajas</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Ventaja:</strong> Minimiza el tiempo promedio de espera y mejora la eficiencia
            del sistema.
          </li>
          <li>
            <strong>Desventaja:</strong> Puede provocar inanición de procesos largos si
            constantemente llegan procesos cortos.
          </li>
        </ul>
      </div>
    </div>
  );
}
