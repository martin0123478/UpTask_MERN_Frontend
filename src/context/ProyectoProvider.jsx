import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/clienteAxios'

const ProyectoContext = createContext()

const ProyectoProvider = ({children}) =>{
    const [proyectos,setProyectos] = useState([])
    const [alerta,setAlerta] = useState({})

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto =>{
        console.log(proyecto)
    }
    return(
        <ProyectoContext.Provider
        value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto
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