import {useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
const Registrar = () => {
  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repetiPassword,setRepetirPassword] = useState('')
  const [alerta,setAlerta] = useState({})

const handleSubmit  = async e =>{
  e.preventDefault()
  if([nombre,email,password,repetiPassword].includes('')){
    setAlerta({
      msg:'todos los campos son obligatorios',
      error:true
    })
    return
  }
  if(password != repetiPassword){
      setAlerta({
      msg:'Los passwords no son iguales',
      error:true
    })
    return
  }

  if(password.length < 6){
      setAlerta({
      msg:'El password es muy corto, el minimo es de 6 caracteres',
      error:true
    })
    return
  }
  setAlerta({})

  //Crear el usuario en la API
  try {
    const {data} =await clienteAxios.post(`/usuarios`,{nombre,password,email})
    setAlerta({
      msg:data.msg,
      error:false
    })
    setNombre('')
    setEmail('')
    setPassword('')
    setRepetirPassword('')
  } catch (error) {
    setAlerta({
      msg:error.response.data.msg,
      error:true
    })
    
    
  }
}

const {msg} = alerta

  return (
    <>
   <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus
  {''}   <span className="text-slate-700">proyectos</span>
    </h1>
    {msg && <Alerta alerta={alerta}/>}
    <form className="my-10 bg-white shadow rounded-lg px-10 py-5" onSubmit={handleSubmit}>
       <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
            >Nombre</label>
            <input type="text" 
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}/>
        </div>
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
            >Email</label>
            <input type="email" 
            id="email"
            placeholder="Email de registro"
             value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

         <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >Password</label>
            <input type="password" 
            id="password"
            placeholder="Password de registro"
             value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
            >Repetir Password</label>
            <input type="password" 
            id="password2"
            placeholder="Repetir tu password"
             value={repetiPassword}
            onChange={e => setRepetirPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>
        <input type="submit" value="Crear cuenta" 
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
        to="olvide-password"
        >Olvide mi Password
        </Link>

    </nav>
   </>
  )
}

export default Registrar
