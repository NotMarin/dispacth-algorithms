export default function Intro() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="flex max-w-4xl flex-col">
        <h1 className="text-5xl font-bold">
          Algoritmo PCB
          <br />
          (Process Control Block)
        </h1>
        <p className="text-lg">
          El PCB es una estructura de datos utilizada por el sistema operativo para almacenar
          información sobre un proceso en ejecución. Contiene detalles esenciales como el estado del
          proceso, registros de CPU, información de memoria y más.
        </p>
        <h2 className="text-2xl font-semibold">Conceptos clave</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Estado del proceso:</strong> Indica si el proceso está en ejecución, listo o en
            espera.
          </li>
          <li>
            <strong>Registros de CPU:</strong> Guarda el estado actual de los registros cuando un
            proceso es interrumpido.
          </li>
          <li>
            <strong>Información de memoria:</strong> Contiene detalles sobre la asignación de
            memoria del proceso.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">Ventajas y Desventajas</h2>
        <ul className="list-inside list-disc text-lg">
          <li>
            <strong>Ventaja:</strong> Permite al sistema operativo gestionar y controlar múltiples
            procesos de manera eficiente.
          </li>
          <li>
            <strong>Desventaja:</strong> Un mal manejo del PCB puede generar problemas de
            rendimiento y corrupción de datos.
          </li>
        </ul>
      </div>
    </div>
  );
}
