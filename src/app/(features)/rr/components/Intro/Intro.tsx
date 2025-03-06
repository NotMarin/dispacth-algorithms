export default function Intro() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="flex max-w-4xl flex-col">
        <h1 className="text-5xl font-bold">Algoritmo Round Robin</h1>
        <p className="text-lg">
          Round Robin es un algoritmo de planificación de procesos basado en la asignación
          equitativa de tiempo de CPU. Cada proceso recibe un tiempo fijo de ejecución, llamado
          quantum, y si no termina en ese tiempo, se coloca al final de la cola de procesos.
        </p>
        <h2 className="text-2xl font-semibold">Conceptos clave</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Quantum de tiempo:</strong> Cada proceso recibe una porción de tiempo fija para
            ejecutarse.
          </li>
          <li>
            <strong>Enfoque cíclico:</strong> Los procesos se ejecutan en un orden circular hasta
            completarse.
          </li>
          <li>
            <strong>Equidad:</strong> Todos los procesos obtienen una oportunidad justa de
            ejecución, evitando la inanición.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">Ventajas y Desventajas</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Ventaja:</strong> Garantiza tiempos de respuesta predecibles y es ideal para
            sistemas multitarea.
          </li>
          <li>
            <strong>Desventaja:</strong> Un quantum mal ajustado puede afectar el rendimiento: si es
            demasiado corto, genera sobrecarga de cambio de contexto; si es demasiado largo, se
            asemeja a FIFO.
          </li>
        </ul>
      </div>
    </div>
  );
}
