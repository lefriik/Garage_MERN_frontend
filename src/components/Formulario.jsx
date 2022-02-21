import { useState, useEffect } from "react"
import Alerta from '../components/Alerta'
import useAlumnos from '../hooks/useAlumnos'


const Formulario = () => {

  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ inscripcion, setInscripcion ] = useState('')
  const [ detalles, setDetalles ] = useState('')
  const [ id, setId ] = useState(null)

  const [alerta, setAlerta] = useState({})

  const { guardarAlumno, alumno } = useAlumnos()

  useEffect(() => {
    if(alumno?.nombre){
      setNombre(alumno.nombre)
      setEmail(alumno.email)
      setInscripcion(alumno.inscripcion)
      setDetalles(alumno.detalles)
      setId(alumno._id)
      
    }

  }, [alumno])
  

  const handleSubmit = e => {
    e.preventDefault()

    //validar el formulario
    if([nombre, email, inscripcion, detalles].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    
    guardarAlumno({nombre, email, inscripcion, detalles, id})
    setAlerta({
      msg: 'Guardado Correctamente'
    })

    setNombre('')
    setEmail('')
    setInscripcion('')
    setDetalles('')
    setId('')

  }

  const { msg } = alerta


  return (
    <> 

      <h2 className="font-black text-3xl text-center">Administrador de Alumnos</h2>
      <p className="text-xl mt-5 mb-10 text-center">Añade tus Alumnos y {''} 
              <span>Administralos.</span>
      </p>

      {msg && <Alerta alerta={alerta} />}

      <form 
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="alumno" className="text-gray-700 uppercase font-bold">
            Nombre Alumno
          </label>
          <input 
            id="alumno"
            type="text"
            placeholder="Nombre Alumno"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ e => setNombre(e.target.value) }
          />

        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email Alumno
          </label>
          <input 
            id="email"
            type="email"
            placeholder="Email Alumno"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />

        </div>
        <div className="mb-5">
          <label htmlFor="inscripcion" className="text-gray-700 uppercase font-bold">
            Fecha Inscripcion
          </label>
          <input 
            id="inscripcion"
            type="date"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={inscripcion}
            onChange={ e => setInscripcion(e.target.value) }
          />

        </div>
        <div className="mb-5">
          <label htmlFor="detalles" className="text-gray-700 uppercase font-bold">
            Detalles
          </label>
          <textarea 
            id="detalles"
            placeholder="Detalles"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={detalles}
            onChange={ e => setDetalles(e.target.value) }
          />

        </div>
        <input 
          type="submit"
          className="bg-yellow-400 w-full p-3 uppercase font-bold rounded hover:bg-yellow-500 cursor-pointer transition-colors"
          value={ id ? 'Guardar Cambios' : 'Agregar Alumno'}
        />

      </form>
      


    </>
  )
}

export default Formulario