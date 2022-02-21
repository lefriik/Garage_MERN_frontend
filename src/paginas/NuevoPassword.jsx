import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()

  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/instructores/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo password'
        })
        setTokenValido(true)
        
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }

    }
    comprobarToken()

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url = `/instructores/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, { password })

      setAlerta({
        msg: data.msg
      })
      setPasswordModificado(true)
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }



  const { msg } = alerta

  return (
    <>
      <div>
          <h1 className="font-black text-6xl ">Reestablece tu Password y Administra tus {""}
          <span className="text-yellow-400 ">Alumnos</span>
          </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        
        { msg && <Alerta 
              alerta={alerta}
        /> }

        { tokenValido && (
          <> 
            <form onSubmit={handleSubmit}>
            
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Nuevo Password
              </label>
              <input 
                type="password"
                placeholder="Tu Nuevo password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />     
            </div>
            <input type="submit" value="Guardar Nuevo Password" className="bg-yellow-500 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-yellow-600 md:w-auto"/>
            </form>

           
          </>

        )}

        {passwordModificado && 
           <Link className='block text-center my-5 text-gray-500' to="/"> Iniciar Sesion </Link>
        }
      
        
      </div>
    
    </>
  )
}

export default NuevoPassword