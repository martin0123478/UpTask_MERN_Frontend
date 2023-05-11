import FormularioColaborador from "../components/FormularioColaborador"

const NuevoColaborador = () => {
  return (
    <>
    <h1 className='text-4xl font-black'>
    Añadir colaborador(a)
    </h1>

    <div className='mt-10 flex justify-center'>
        <FormularioColaborador/>
    </div>
    </>
  )
}

export default NuevoColaborador
