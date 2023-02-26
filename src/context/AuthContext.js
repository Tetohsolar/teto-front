import { useState, useContext, useEffect, createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import api from '../api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])


  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState()
  const [token, setToken] = useState()



  useEffect(() => {

    function loadStorage() {
      const storageUser = localStorage.getItem('cliente')

      if (storageUser) {// se tiver usuário no localstorage, ele será salvo no state user
        setToken(JSON.parse(storageUser))
        setLoading(false)
        setToken(storageUser)
      }
      setLoading(false)
    }

    loadStorage()

  }, [])



  const configToken = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const bodyParameters = {
    key: "value"
  };



  //add new User
  async function signIn(email, password) {
    await api.post('/user/login', {
      email: email,
      password: password
    }).then((response) => {

      let newUser = {
        id: response.data.userId,
        token: response.data.token,
        message: response.data.messagen
      }
      setStorageUserLocal(newUser)
      setMessage(newUser.message)
      setToken(newUser.token)
      console.log(newUser.token)
      toast.success(message)
      setLoading(false)

    }).catch((err) => {
      console.log(err)
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
      console.log(response)

    })




  }

  //Save user locally
  function setStorageUserLocal(data) {
    localStorage.setItem('cliente', JSON.stringify(data))
  }







  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        loadingAuth,
        setUser,
        users,
        ToastContainer,
        token
      }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider

