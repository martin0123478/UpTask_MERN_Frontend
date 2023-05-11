import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
const ProyectoContext = createContext()


const ProyectoProvider = ({children}) =>{
    const [proyectos,setProyectos] = useState([])
    const [alerta,setAlerta] = useState({})
    const [proyecto,setProyecto] = useState({})
    const [cargando,setCargando] = useState(false)
    const [modalFormularioTareas,setModalFormularioTareas] = useState(false)
    const [tarea,setTarea] = useState({})
    const [modalEliminarTarea,setModalEliminarTarea] = useState(false)
    const [colaborador,setColaborador] = useState({})
    const [modalEliminarColaborador,setModalEiminarColaborador] = useState(false)
  

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

    const handleModalTarea = () =>{
        setModalFormularioTareas(!modalFormularioTareas)
        setTarea({})
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

    const submitTarea = async tarea =>{
        if(tarea?.id){
           await editarTarea(tarea)
        }else{
           await crearTarea(tarea)
        }
        
    }

    const crearTarea = async tarea =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }  
            const {data} = await clienteAxios.post('/tareas',tarea,config)
            
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = [...proyecto.tareas,data]
            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormularioTareas(false)
        } catch (error) {
            console.log(error)
        }
    }

    const editarTarea = async tarea =>{
         try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }  
            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config)
            setAlerta({})
            setModalFormularioTareas(false)
           const proyectoActualizado = {...proyecto}
           proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id===data._id ? data :tareaState)
           setProyecto(proyectoActualizado)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = tarea =>{
        setTarea(tarea)
        setModalFormularioTareas(true)
    }
    const handleModalEliminar = tarea =>{
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    const eliminarTarea = async () =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }  
            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`,config)
            setAlerta({
                msg:data.msg,
                error:false
            })
            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            setModalEliminarTarea(false)
            
           const proyectoActualizado = {...proyecto}
           proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id!= tarea._id)
           setProyecto(proyectoActualizado)
           
        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email =>{
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
        const {data} = await clienteAxios.post('/proyectos/colaboradores',{email},config)
        setColaborador(data)
        setAlerta({})
       } catch (error) {
        setAlerta({
            msg:error.response.data.msg,
            error:true
        })
       }finally{
        setCargando(false)
       }
    }

    const agregarColaborador =async email =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            } 
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,email,config)
            setAlerta({
                msg:data.msg,
                error:false
            })
            setColaborador({})
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }
    }

    const handleModalEliminarColaborador = (colaborador) =>{
        setModalEiminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }
    const eliminarColaborador = async() =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            } 
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`,{id:colaborador._id},config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id )
            setAlerta({
                msg:data.msg,
                error:false
            })
            setColaborador({})
            setModalEiminarColaborador(false)
        } catch (error) {
            console.log(error.response)
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
            eliminarProyecto,
            modalFormularioTareas,
            handleModalTarea,
            submitTarea,
            handleModalEditarTarea,
            tarea,
            modalEliminarTarea,
            handleModalEliminar,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            handleModalEliminarColaborador,
            modalEliminarColaborador,
            eliminarColaborador
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