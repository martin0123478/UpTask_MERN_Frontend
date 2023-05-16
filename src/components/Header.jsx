
import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
import Busqueda from "./Busqueda"
const Header = () => {
    const {buscador,handleBuscador,cerarSesiónProyectos} = useProyectos()
    const {cerrarSesionAuth} = useAuth()

    const handleCerrarSesion = () =>{
        cerarSesiónProyectos()
        cerrarSesionAuth()
        localStorage.removeItem('token')
    }
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between ">
            <h2 className="text-4xl text-sky-600 font-black text-center 
            mb-5 md:mb-0">
                UpTask
            </h2>

            

            <div className="flex flex-col md:flex-row items-center gap-4">
                <button type="button" onClick={handleBuscador} className="font-bold uppercase">
                    Buscar Proyecto
                </button>
                <Link to="/proyectos"
                className="font-bold uppercase"
                >
                Proyectos
                </Link>

            <button type="button"
            onClick={handleCerrarSesion}
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
                Cerrar sesión
            </button>
            <Busqueda/>
            </div>
        </div>

    </header>
  )
}

export default Header
