import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
const ProyectoContext = createContext()


const ProyectoProvider = ({children}) =>{
    const [proyectos,setProyectos] = useState([])
    const [alerta,setAlerta] = useState({})

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
            console.log(data)
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
            obtenerProyecto
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