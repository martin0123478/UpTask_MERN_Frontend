import { useContext } from "react";
import  ProyectoContext  from "../context/ProyectoProvider";

const useProyectos= () =>{
    return useContext(ProyectoContext)
}

export default useProyectos
