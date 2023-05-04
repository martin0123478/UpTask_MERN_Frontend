import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react"


const Proyecto = () => {
    const {obtenerProyecto,proyecto,cargando} = useProyectos()
    const params = useParams()

    useEffect(()=>{
        obtenerProyecto(params.id)
    },[])
    const {nombre} = proyecto
  return (

    cargando ? (
        <button type="button" className="bg-indigo-500 ..." disabled>
  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    
  </svg>
  Processing...
</button>
    ):(
<div>
      <h1 className="font-black text-4xl">{nombre}</h1>
    </div>
    )
    
  )
}

export default Proyecto
