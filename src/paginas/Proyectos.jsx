import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"
import io from 'socket.io-client'
let socket
const Proyectos = () => {
  const {proyectos,alerta} = useProyectos()
  const {msg} = alerta
  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
  },[])
  return (
    <>
    <h1 className="text-4xl font-black ">Proyectos</h1>
    {msg && <Alerta alerta={alerta}/>}
    <div className="bg-white shadow mt-10 rounded-lg ">
      {proyectos.length ? 
      
        proyectos.map(proyecto =>(
          <PreviewProyecto key={proyecto._id} proyecto={proyecto}/>
        ))
      
      : <p className=" p-5 mt-5 text-center text-gray-600 uppercase">No hay proyectos aun</p>}
    </div>
    </>
  )
}

export default Proyectos
