import {Link} from 'react-router-dom'

const Registrar = () => {
  return (
    <>
   <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus
  {''}   <span className="text-slate-700">proyectos</span>
    </h1>

    <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
       <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
            >Nombre</label>
            <input type="text" 
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
            >Email</label>
            <input type="email" 
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

         <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >Password</label>
            <input type="password" 
            id="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
            >Repetir Password</label>
            <input type="password" 
            id="password2"
            placeholder="Repetir tu password"
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
