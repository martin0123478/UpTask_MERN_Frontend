import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
const NuevoColaborador = () => {
    const params = useParams()
    const {obtenerProyecto,proyecto} = useProyectos()
    useEffect(()=>{
        obtenerProyecto(params.id)
    },[])
  return (
    <>
    <h1 className='text-4xl font-black'>
    Añadir colaborador(a) al proyecto: {proyecto.nombre}
    </h1>

    <div className='mt-10 flex justify-center'>
        <FormularioColaborador/>
    </div>
    </>
  )
}

export default NuevoColaborador
