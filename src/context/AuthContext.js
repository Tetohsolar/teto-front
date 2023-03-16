import { useState, useEffect, createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import api from '../api'
import objectHash from 'object-hash';


export const AuthContext = createContext({})

function AuthProvider({ children }) {

  // const [users, setUsers] = useState([''])
  // const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')




  //add new User
  async function signIn(email, password) {
    await api.post('/user/login', {
      email: email,
      password: password
    }).then((response) => {

      setToken(response.data.token)
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

        toast.error(err.response.data.message)
        throw new Error();
      })

  }




  //id, name, phone, email, password, confirmPassword, tipo
  async function updateUser(id, name, phone, email, tipo) {

    setLoading(true)

    await api.patch(`/user/update/${id}`, {
      name: name,
      phone: phone,
      email: email,
      tipoR: tipo
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

