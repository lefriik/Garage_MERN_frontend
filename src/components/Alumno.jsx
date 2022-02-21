import useAlumnos from '../hooks/useAlumnos'


const Alumno = ({alumno}) => {

    const { setEdicion, eliminarAlumno } = useAlumnos()

    const { email, inscripcion, nombre, detalles, _id  } = alumno

    console.log(inscripcion)

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
    }

    


  return (
      <div className="mx-5 my-10 bg-yellow-400 shadow-md px-5 py-10 rounded-xl">
          <p className="font-bold uppercase text-black my-2">Nombre:
            <span className="font-normal normal-case text-black"> {nombre}</span>
          </p>
          <p className="font-bold uppercase text-black my-2">Email:
            <span className="font-normal normal-case text-black"> {email}</span>
          </p>
          <p className="font-bold uppercase text-black my-2">Inscripcion:
            <span className="font-normal normal-case text-black"> {formatearFecha(inscripcion)}</span>
          </p>
          <p className="font-bold uppercase text-black my-2">Detalles:
            <span className="font-normal normal-case text-black"> {detalles}</span>
          </p>
          <div className="flex justify-between my-5">
              <button type="button" className="py-2 px-10 text-white bg-black hover:bg-gray-700 uppercase font-bold rounded-lg" onClick={ () => setEdicion(alumno)}>
                  Editar
              </button>
              <button type="button" className="py-2 px-10 text-white bg-red-700 hover:bg-red-600  uppercase font-bold rounded-lg" onClick={() => eliminarAlumno(_id)} >
                  Eliminar
              </button>
          </div>
      
      </div>
    
  )
}

export default Alumno