import useAlumnos from "../hooks/useAlumnos"
import Alumno from "./Alumno"

const ListadoAlumnos = () => {

  const { alumnos } = useAlumnos()

  return (
    <>
    
      { alumnos.length ? 
      
      (
        <>

          <h2 className="font-black text-3xl text-center">Listado de Alumnos</h2>

          <p className="text-xl mt-5 mb-10 text-center">Administra tus {''} 
              <span>Alumnos.</span>
          </p>

          { alumnos.map( alumno => (
            <Alumno
                key={alumno._id}
                alumno={alumno} 
            
            />
          ))}


        </>
      ) : (

        <>
          <h2 className="font-black text-3xl text-center">No hay Alumnos</h2>

          <p className="text-xl mt-5 mb-10 text-center">Comienza agregando alumnos {''} 
              <span>y apareceran en este lugar.</span>
          </p>

        </>
      )}
    </>
  )
}

export default ListadoAlumnos