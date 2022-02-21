import { useContext } from 'react'
import AlumnosContext from '../context/AlumnosProvider'

const useAlumnos = () => {
    return useContext(AlumnosContext)
}

export default useAlumnos