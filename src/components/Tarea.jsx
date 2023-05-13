import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({tarea}) => {
    const {descripcion,nombre,prioridad,fechaEntrega,estado,_id} = tarea
    const {handleModalEditarTarea,handleModalEliminar,completarTarea} = useProyectos()
  const admin = useAdmin()
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-xl text-gray-500 uppercase">{descripcion}</p>
        <p className="text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
        {estado && <p className="text-xs bg-green-600 uppercase p-1
        rounded-lg text-white ">Completado por: {tarea.completado.nombre}</p>}
      </div>
    
      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (

        
        <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
        onClick={()=>handleModalEditarTarea(tarea)}
        >Editar</button>
        )}
       
        
            <button onClick={()=>completarTarea(_id)} 
            className={`${ estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold rounded-lg`}>
              {estado ? 'Completa':'Incompleta'}</button>  

          
        
       {admin && (

       
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg"
        onClick={()=>handleModalEliminar(tarea)}>Eliminar</button>
        )}
      </div>
    </div>
  )
}

export default Tarea
