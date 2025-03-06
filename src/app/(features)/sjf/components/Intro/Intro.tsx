export default function Intro() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="flex max-w-4xl flex-col">
        <h1 className="mb-4 text-5xl font-bold">Algoritmo SJF (Shortest Job First)</h1>
        <p className="text-lg">
          SJF es un algoritmo de planificación de procesos donde el proceso con la ráfaga de CPU más
          corta es el que se ejecuta primero. Puede ser no apropiativo o apropiativo, dependiendo de
          si permite interrupciones.
        </p>
        <h2 className="text-2xl font-semibold">Conceptos clave</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Prioridad por duración:</strong> Los procesos con ráfagas más cortas tienen
            mayor prioridad.
          </li>
          <li>
            <strong>Puede ser apropiativo o no:</strong> En su versión apropiativa (SRTF), un nuevo
            proceso con menor ráfaga puede interrumpir al que está en ejecución.
          </li>
          <li>
            <strong>Optimización del tiempo de espera:</strong> Minimiza el tiempo promedio de
            espera en comparación con FIFO.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">Ventajas y Desventajas</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Ventaja:</strong> Reduce el tiempo promedio de espera en comparación con FIFO.
          </li>
          <li>
            <strong>Desventaja:</strong> Puede causar inanición de procesos largos si hay muchos
            procesos cortos (starvation).
          </li>
        </ul>
      </div>
    </div>
  );
}
