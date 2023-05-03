import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react"


const Proyecto = () => {
    const {obtenerProyecto} = useProyectos()
    const params = useParams()

    useEffect(()=>{
        obtenerProyecto(params.id)
    },[])
    
  return (
    <div>
      proyecto
    </div>
  )
}

export default Proyecto
