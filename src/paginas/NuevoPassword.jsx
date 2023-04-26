
const NuevoPassword = () => {
  return (
   <>
   <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu passwor y no pierdas acceso a tus
  {''}   <span className="text-slate-700">proyectos</span>
    </h1>

    <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
       

         <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >Nuevo Password</label>
            <input type="password" 
            id="password"
            placeholder="Escribe tu nuevo Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

        
        <input type="submit" value="Guardar nuevo password" 
        className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded mb-5
        hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
    </form>
   </>
  )
}

export default NuevoPassword
