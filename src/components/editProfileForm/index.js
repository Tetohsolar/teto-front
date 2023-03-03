import { AuthContext } from '../../context/AuthContext';
import './profileform.scss';
import { useState, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const EditProfileForm = (props) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [tipo, setTipo] = useState('')
  const [id, setId] = useState('')
  const [reloadPage, setReloadPage] = useState(false)



  const { updateUser, token } = useContext(AuthContext)
  const navigate = useNavigate();


  useEffect(() => {
    findUserById()
  }, [reloadPage])


  async function findUserById() {
    await api.get(`/user/get/${props.userId}`, {
      headers: {
        'Authorization': `Basic ${token.token}`
      }
    })
      .then((response) => {
        setId(props.userId)
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setTipo(response.data.tipo)

      })
    console.log(id)
  }




  async function handleUpdateUser(e) {
    setReloadPage(true)
    e.preventDefault()
    updateUser(id, name, phone, email, password, confirmPassword, tipo)
    setReloadPage(false)
    navigate("/users/")


  }




  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>

      <hr className="my-4" />
      <div className="d-flex gap-3">
        <div>
          <img className="input-avatar" src={'https://api.dicebear.com/5.x/thumbs/svg?seed=Lucy'} alt="Avatar" />
        </div>
        <div>
          <label htmlFor="formFile" className="form-label">
            Imagem de perfil
          </label>
          <input className="form-control" type="file" id="formFile" />
        </div>
      </div>
      <hr className="my-4" />
      <form className="row g-3" onSubmit={handleUpdateUser}>
        <div className="col-md-7">
          <label htmlFor="inputFirstName" className="form-label">
            Nome
          </label>
          <input type="text" className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>


        <div className="col-md-5">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="col-md-4">
          <label htmlFor="inputUserType" className="form-label">
            Tipo de usuário
          </label>
          <select name="pets" id="input-user-type" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecionar...</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>

          </select>
        </div>


        <div className="col-4">
          <label htmlFor="inputPhoneNumber" className="form-label">
            Telefone
          </label>
          <input type="text" className="form-control" id="inputPhoneNumber" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="d-grid gap-2 d-md-block col-12">
          <button className="btn btn-primary text-light" type="submit" >
            Atualizar
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;


