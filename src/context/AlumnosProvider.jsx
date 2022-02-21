import {createContext, useState, useEffect} from 'react'
import clienteAxios from '../config/axios'

const AlumnosContext = createContext()

export const AlumnosProvider = ({children}) => {

    const [alumnos, setAlumnos] = useState([])
    const [alumno, setAlumno] = useState({})

    useEffect(() => {
        const obtenerAlumnos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/alumnos', config)
                setAlumnos(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerAlumnos()
    }, [])

    const guardarAlumno = async (alumno) => {

        const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

        if(alumno.id){
            try {
                const { data } = await clienteAxios.put(`/alumnos/${alumno.id}`, alumno, config)

                const alumnosActualizado = alumnos.map( alumnoState => alumnoState._id === data._id ? data : alumnoState )

                setAlumnos(alumnosActualizado)

            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                
                const { data } = await clienteAxios.post('/alumnos', alumno, config)
    
                const { createdAt, updatedAt, __v, ...alumnoAlmacenado  } = data
                setAlumnos([alumnoAlmacenado, ...alumnos])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
    }

    const setEdicion = (alumno) => {
        setAlumno(alumno)
    }

    const eliminarAlumno = async id => {
        const confirmar = confirm('Confirmas que deseas elimnar?')

        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/alumnos/${id}`, config)
                
                const alumnosActualizado = alumnos.filter( alumnosState => alumnosState._id !== id )

                setAlumnos(alumnosActualizado)
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <AlumnosContext.Provider
            value={{
                alumnos,
                guardarAlumno,
                setEdicion,
                alumno,
                eliminarAlumno
            }}
        >
            {children}
        </AlumnosContext.Provider>
    )

}




export default AlumnosContext;