import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/clienteAxios'

const ProyectoContext = createContext()

const ProyectoProvider = ({children}) =>{
    const [proyectos,setProyectos] = useState([])
    return(
        <ProyectoContext.Provider
        value={{
            proyectos
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