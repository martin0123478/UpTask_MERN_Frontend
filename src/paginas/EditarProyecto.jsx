import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import FormularioProyecto from "../components/FormularioProyecto"
const EditarProyecto = () => {
     const {obtenerProyecto,proyecto,cargando} = useProyectos()
    const params = useParams()

    useEffect(()=>{
        obtenerProyecto(params.id)
    },[])
    const {nombre} = proyecto
    if(cargando) return 'Cargando...'
  return (
    <>
    <h1 className="font-black text-4xl">Editar Proyecto: {nombre}</h1>
    <div className="mt-10 flex justify-center">
    <FormularioProyecto/>
      
    </div>
    </>
      
   
  )
}

export default EditarProyecto
