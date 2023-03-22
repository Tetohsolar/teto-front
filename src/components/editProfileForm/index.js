import { AuthContext } from '../../context/AuthContext';
import './profileform.scss';
import { useState, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import InputMask from 'react-input-mask';

const EditProfileForm = (props) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [tipo, setTipo] = useState('')
  const [id, setId] = useState('')
  const [reloadPage, setReloadPage] = useState(false)
  const [habilitar, setHabilitar] = useState('')
  const { signUp, profilelogged } = useContext(AuthContext)
  const { updateUser, token } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    findUserById()
  }, [reloadPage])

  async function findUserById() {

    await api.get(`/user/get/${props.userId}`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setId(props.userId)
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setTipo(response.data.tipo)
        setHabilitar(response.data.enabled)
      })
  }
  async function handleUpdateUser(e) {
    setReloadPage(true)
    e.preventDefault()
    try {

      await updateUser(id, name, phone, email, tipo, habilitar)
      setReloadPage(false)
      navigate("/users/")
    }
    catch (error) {
      console.log(error)
    }
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
        <div className="col-4">
          <label htmlFor="inputPhoneNumber" className="form-label">
            Telefone
          </label>
          <InputMask
            className="form-control" id="inputPhoneNumber"
            onChange={(e) => setPhone(e.target.value)}
            mask='(99)9999-99999'
            value={phone || ''}>
          </InputMask>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputUserType" className="form-label">
            Tipo de usuário
          </label>
          <select name="pets" id="input-user-type" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecionar...</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            {
              profilelogged === 'Root' ? <option value="Root">Root</option> : ''
            }
            <option value="Root">Root</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputUserType" className="form-label">
            Situação
          </label>
          <select name="pets" id="input-user-type" className="form-select" value={habilitar} onChange={(e) => setHabilitar(e.target.value)}>
            <option value="">Selecionar...</option>
            <option value="S">Habilitado</option>
            <option value="N">Desabilitado</option>
          </select>
        </div>
        <div className="customerCliente">
          <button className="btn btn-primary text-light" type="submit" >
           Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;


