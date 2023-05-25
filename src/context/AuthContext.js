import { useState,  createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import api from '../api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [profilelogged, setProfileLogged] = useState('')
  const [idLogged, setIdLogged] = useState('')
  const [userName, setUserName] = useState('')
  const [afflitedId, setafflitedId] = useState('')
  const [afflited, setAfflited] = useState(null)
  const [sunIndex, setSunIndex] = useState(0)

  //add new User
  async function signIn(email, password) {
    await api.post('/user/login', {
      email: email,
      password: password
    }).then((response) => {

      setUserName(response.data.userName)
      setToken(response.data.token)
      setIdLogged(response.data.userId)
      setProfileLogged(response.data.profile)
      setAfflited(response.data.afflited)
      setafflitedId(response.data.afflitedId)
      toast.success(response.data.message)
      setLoading(false)
     

    }).catch((err) => {
      console.log(err)
      toast.error('Erro ao logar, verifique seu usuário e/ou senha!')
    })

  }

  //SignUp User
  async function signUp(name, phone, email, password, confirmpassword, tipo, habilitar, idfiliado) {

    if (!idfiliado){
      idfiliado = afflitedId
    
    }
    setLoading(true)
    await api.post('/user/create', {
      name: name,
      phone: phone,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      tipo: tipo,
      enabled: habilitar,
      AffiliatedId: idfiliado

    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {

      toast.success(response.data.message)

    })
      .catch((err) => {

        toast.error(err.response.data.message)
        throw new Error();
      })

  }

  //id, name, phone, email, password, confirmPassword, tipo
  async function updateUser(id, name, phone, email, tipo, habilitar, idfiliado) {

    setLoading(true)

    await api.patch(`/user/update/${id}`, {
      name: name,
      phone: phone,
      email: email,
      tipoR: tipo,
      enabled: habilitar,
      AffiliatedId: idfiliado

    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      toast.success(response.data.message)
      setLoading(false)

    })
      .catch((err) => {

        toast.error(err.response.data.message)
        throw new Error()
      })

  }

  async function deleteUser(id) {
    setLoading(true)

    await api.delete(`/user/delete/${id}`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {

        toast.success(response.data.message)

      })
      .catch((err) => {
        toast.error(err)
      })
    setLoading(false)

  }

  function signOut() {
    setToken(null)
    setIdLogged(null)


  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        updateUser,
        deleteUser,
        ToastContainer,
        token,
        idLogged,
        profilelogged,
        userName,
        afflitedId,
        afflited,
        setSunIndex,
        sunIndex,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider

