import {useState,useEffect} from 'react'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import Alerta from './Alerta'
const FormularioProyecto = () => {
    const [id,setId] = useState(null)
    const [nombre,setNombre] = useState('')
    const [description,setDesacripcion] = useState('')
    const [fechaEntrega,setFechaEntrega] = useState('')
    const [cliente,setCliente] = useState('')

    const {mostrarAlerta,alerta,submitProyecto,proyecto} = useProyectos()
    const params = useParams()
   
    useEffect(()=>{
        if(params.id && proyecto.nombre){
            setId(proyecto._id)
             setNombre(proyecto.nombre)
             setDesacripcion(proyecto.description)
             setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
             setCliente(proyecto.cliente)
        }else{
            console.log('Nuevo proyecto')
        }
    },[params])


    const handleSubmit =async e =>{
        e.preventDefault()
        if([nombre,description,fechaEntrega,cliente].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
        }

        //PASAR PROYECTOS A PROVIDER
       await submitProyecto({id,nombre,description,fechaEntrega,cliente})
       setId(null)
       setNombre('')
       setDesacripcion('')
       setFechaEntrega('')
       setCliente('')

    }

    const {msg} = alerta
  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
    onSubmit={handleSubmit}>

        {msg && <Alerta alerta={alerta}/>}

        <div className='mb-5'>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='nombre'>Nombre Proyecto </label>
            <input
            id='nombre'
            type="text"
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Nombre del Proyecto'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            />
        </div>

         <div className='mb-5'>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='descripcion'>Descripción </label>
            <textarea
            id='descripcion'
            
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Descripción del Proyecto'
            value={description}
            onChange={e => setDesacripcion(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='fecha-entrega'>Fecha Entrega </label>
            <input
            id='fecha-entrega'
            type="date"
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fechaEntrega}
            onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='cliente'>Nombre Cliente </label>
            <input
            id='cliente'
            type="text"
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Nombre del Cliente'
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            />
        </div>

        <input type="submit"
        value={id ? 'Actualizar Proyecto': 'Crear Proyecto'}
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer
        hover:bg-sky-700 transition-colors' />
    </form>
  )
}

export default FormularioProyecto
