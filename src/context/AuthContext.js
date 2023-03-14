import { useState, useEffect, createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import api from '../api'


export const AuthContext = createContext({})

function AuthProvider({ children }) {

  // const [users, setUsers] = useState([''])
  // const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')




  useEffect(() => {

    function loadStorage() {
      const storageUser = localStorage.getItem('cliente')

      if (storageUser) {// se tiver usuário no localstorage, ele será salvo no state user
        setToken(JSON.parse(storageUser))


      }
      setLoading(true)

    }

    loadStorage()

  }, [loading])


  //add new User
  async function signIn(email, password) {
    await api.post('/user/login', {
      email: email,
      password: password
    }).then((response) => {

      let newUser = {
        id: response.data.userId,
        token: response.data.token,
        message: response.data.message
      }

      setStorageUserLocal(newUser)
      setToken(newUser.token)
      toast.success(response.data.message)
      setLoading(false)

    }).catch((err) => {
      console.log(err)
      toast.error('Erro ao logar, verifique seu usuário e/ou senha!')
    })

  }

  //SignUp User
  async function signUp(name, phone, email, password, confirmpassword, tipo) {
    setLoading(true)
    await api.post('/user/create', {
      name: name,
      phone: phone,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      tipo: tipo
    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      toast.success(response.data.message)

    })
      .catch((err) => {
        toast.error(err)
      })

  }




  //id, name, phone, email, password, confirmPassword, tipo
  async function updateUser(id, name, phone, email, password) {

    setLoading(true)
    await api.patch(`/user/update/${id}`, {
      name: name,
      phone: phone,
      email: email,
      password: password,
      confirmpassword: password,
      tipoR: 'Admin'
    }, {
      headers: {
        'Authorization': `Basic ${token.token}`
      }

    }).then((response) => {
      toast.success(response.data.message)
      setLoading(false)

    })
      .catch((err) => {
        toast.error(err)
      })

  }

  async function deleteUser(id) {
    setLoading(true)
    await api.delete(`/user/delete/${id}`, {
      headers: {
        'Authorization': `Basic ${token.token}`
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




  //Save user locally
  function setStorageUserLocal(data) {
    // localStorage.setItem('cliente', JSON.stringify(data))
    localStorage.setItem('token', data.token)

  }

  function signOut() {
    // localStorage.removeItem("cliente")
    localStorage.removeItem("token")

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
        token
      }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider

