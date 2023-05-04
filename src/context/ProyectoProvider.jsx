import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
const ProyectoContext = createContext()


const ProyectoProvider = ({children}) =>{
    const [proyectos,setProyectos] = useState([])
    const [alerta,setAlerta] = useState({})
    const [proyecto,setProyecto] = useState({})
    const [cargando,setCargando] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        const obtenerProyectos = async () =>{
            try {
                 const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await clienteAxios('/proyectos',config)
            setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    },[])

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto =>{
        if(proyecto.id){
           await editarProyecto(proyecto)
        }else{
           await nuevoProyecto(proyecto)
        }
        
        
    }

    const editarProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }  
            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)
            
            const proyectoActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectoActualizados)
            
            setAlerta({
                msg:'Proyecto editado correctamente',
                error:false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2000);
            //redireccionar
         }catch (error) {
            console.log(error)
        }
        
    }


     const nuevoProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/proyectos',proyecto,config)
            setProyectos([...proyectos,data])
            setAlerta({
                msg:'Proyecto creado correctamente',
                error:false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id =>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await clienteAxios(`/proyectos/${id}`,config)
            setProyecto(data)
        } catch (error) {
            console.log(error)
        }finally{
            setCargando(false)
        }
    }

    const eliminarProyecto = async id =>{
       try {
         const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }  
            const {data} = await clienteAxios.delete(`/proyectos/${id}`,config)
            const proyectosActualizados = proyectos.filter(proyectoState =>proyectoState._id != id)
            setProyectos(proyectosActualizados)
            setAlerta({
                msg:data.msg,
                error:false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2000);
       } catch (error) {
        console.log(error)
       }
    }

    return(
        <ProyectoContext.Provider
        value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto
        }}
        >
            {children}
        </ProyectoContext.Provider>
    )
}


export{
    ProyectoProvider
}

export default ProyectoContext