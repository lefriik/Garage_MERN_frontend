import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

  const { cerrarSesion } = useAuth()
  return (
    <header className="py-10 bg-black">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-white text-center">
          Administrador de Alumnos de {''} <span className="text-yellow-400"> Garage Session</span>
        </h1>

        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
          <Link to='/admin' className='text-white text- text sm uppercase font-bold'>Alumnos</Link>
          <Link to='/admin/perfil' className='text-white text- text sm uppercase font-bold'>Perfil</Link>

          <button type="button" className='text-white text- text sm uppercase font-bold' onClick={cerrarSesion} >Cerrar Sesion</button>
        </nav>
      </div>

    </header>
  )
}

export default Header