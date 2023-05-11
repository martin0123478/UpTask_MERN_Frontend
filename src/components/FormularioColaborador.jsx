import {useState} from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
const FormularioColaborador = () => {
  const [email,setEmail] = useState('')
  const {mostrarAlerta,alerta,submitColaborador} = useProyectos()

  const handleSubmit = e =>{
    e.preventDefault()
    if(email === ''){
      mostrarAlerta({
        msg:'El email es obligatorio',
        error:true
      })
      return
    }
    submitColaborador(email)
  }
  const {msg} = alerta
  return (
    <div>
      <form className='bg-white py-10 px-5 md:w-1-/2 rounded-lg shadow'
      onSubmit={handleSubmit}>
        {msg && <Alerta alerta={alerta}/>}
        <div className='mb-5'>
                 <label className='text-gray-700 uppercase font-bold text-sm'
                  htmlFor='email'>
                  Email Colaborador
                  </label>
                  <input type="mail" 
                  id='email'
                  placeholder='Email del usuario'
                   className='border w-full p-2 placeholder-gray-400
                  rounded-md'
                  value={email}
                  onChange={e =>setEmail(e.target.value)}/>
        </div>
        <input type="submit" className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white
          font-bold cursor-pointer transition-colors rounded' value='Buscar colaborador'/>

      </form>
    </div>
  )
}

export default FormularioColaborador
