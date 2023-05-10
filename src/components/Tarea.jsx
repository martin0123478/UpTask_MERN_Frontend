import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({tarea}) => {
    const {descripcion,nombre,prioridad,fechaEntrega,estado,_id} = tarea
    const {handleModalEditarTarea,handleModalEliminar} = useProyectos()

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-xl text-gray-500 uppercase">{descripcion}</p>
        <p className="text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
        onClick={()=>handleModalEditarTarea(tarea)}
        >Editar</button>
        {
            estado ? (
 <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold rounded-lg">Completa</button>
            ) :(
        <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold rounded-lg">Incompleta</button>

            )
        }
       
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
        onClick={()=>handleModalEliminar(tarea)}>Eliminar</button>
      </div>
    </div>
  )
}

export default Tarea
