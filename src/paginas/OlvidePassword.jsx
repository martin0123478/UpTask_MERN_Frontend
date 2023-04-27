import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
const OlvidePassword = () => {
  const [email,setEmail] = useState('')
  const [alerta,setAlerta] = useState({})

  const handleSubmit = async e =>{
  e.preventDefault()
  if(email === ''){
    setAlerta({
      msg:'El email es obligatorio',
      error:true
    })
    return
  }
  }

  const {msg} = alerta
  return (
    <>
   <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu acceso  no pierdas tus
  {''}   <span className="text-slate-700">proyectos</span>
    </h1>
    {msg && <Alerta alerta={alerta}/>}

    <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
    onSubmit={handleSubmit}>
      
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
            >Email</label>
            <input type="email" 
            id="email"
            placeholder="Email de registro"
            value={email}
            onChange={e => e.target.value}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

       

        
        <input type="submit" value="Enviar Instrucciones" 
        className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mb-5
        hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
    </form>
    <nav className="lg:flex lg:justify-between">
        <Link
        className='block
        text-center my-5 text-slate-500 upercase text-sm'
        to="/"
        >¿Ya tienes una cuenta una cuenta? Inicia Sesión
        </Link>

          <Link
        className='block
        text-center my-5 text-slate-500 upercase text-sm'
        to="/registrar"
        >¿No tienes una cuenta? Registrate
        </Link>

    </nav>
   </>

  )
}

export default OlvidePassword
