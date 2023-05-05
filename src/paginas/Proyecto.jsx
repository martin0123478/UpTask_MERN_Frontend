import { useParams,Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import { useEffect, useState } from "react"
import ModalFormularioTareas from "../components/ModalFormularioTareas"
const Proyecto = () => {
    const {obtenerProyecto,proyecto,cargando} = useProyectos()
    const params = useParams()
    const [modal,setModal] = useState(false)

    useEffect(()=>{
        obtenerProyecto(params.id)
    },[])
    const {nombre} = proyecto
if(cargando) return(
        <button type="button" className="bg-indigo-500 ..." disabled>
  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    
  </svg>
  Processing...
</button>
)
  return (
    <> 
  <div className="flex justify-between">
      <h1 className="font-black text-4xl">{nombre}</h1>
      <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <Link to={`/proyectos/editar/${params.id}`}  className="uppercase font-bold">Editar</Link>
     </div>
     </div>

      <button
      onClick={() => setModal(true)}
       type="button" className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400
      text-white text-center mt-5 flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        
        
        Nueva Tarea</button>

        <ModalFormularioTareas
         modal={modal}
         setModal={setModal}
        />
   
    
    
   </>
  )
}

export default Proyecto
