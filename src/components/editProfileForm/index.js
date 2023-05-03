import { AuthContext } from '../../context/AuthContext';
import './profileform.scss';
import { useState, useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import InputMask from 'react-input-mask';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MaskedTextField from '../communs/MaskedTextField';

const EditProfileForm = (props) => {
  const { token, } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [tipo, setTipo] = useState('')
  const [id, setId] = useState('')
  const [reloadPage, setReloadPage] = useState(false)
  const [habilitar, setHabilitar] = useState('')
  const { profilelogged } = useContext(AuthContext)
  const { updateUser } = useContext(AuthContext)
  const [filiados, setFiliados] = useState([])
  const [idfiliado, setIdfiliado] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {

    findUserById()
  }, [reloadPage])

  async function findUserById() {

    await loadfiliados();

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
        console.log(response.data)
        setIdfiliado(response.data.AffiliatedId
        )
      })
  }

  async function loadfiliados() {

    await api.get('/afflited/all', {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then(response => {
      //console.log(response.data.affiliated)
      setFiliados(response.data.affiliated)


    }).catch(error => {
      console.log("Erro ao carregar dados!")
    })
  }

  async function handleUpdateUser(e) {
    setReloadPage(true)
    e.preventDefault()
    console.log(idfiliado)
    try {

      await updateUser(id, name, phone, email, tipo, habilitar, idfiliado)
      setReloadPage(false)
      toast.success("Usuário Atualizado com Sucesso!", {
        autoClose: 1000,
      })
      navigate("/users/") 
    }
    catch (error) {
      toast.error("Erro ao Atualizar Dados!", {
        autoClose: 1000,
      })
      console.log(error)
    }
  }
  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <hr className="my-4" />
      <form className="row g-3" onSubmit={handleUpdateUser}>
        <div className="col-md-7">
          <TextField id="inputFirstName" maxLength={50} className="form-control" label="Nome" variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="col-md-4">
          
          <TextField id="inputEmail" maxLength={50} className="form-control" label="Email*" variant="outlined" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="col-2">
        <MaskedTextField label={"Telefone"}  mask={'(99)9 9999-9999'} variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)}  ></MaskedTextField>
        </div>
        <div className="col-md-2">
        <FormControl fullWidth>
                <InputLabel id="inputUserType">tipo de usuário*</InputLabel>
                <Select
                  labelId="input-user-type"
                  id="input-user-type"
                  value={tipo}
                  label="Tipo de usuário"
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                  <MenuItem value={'User'}>User</MenuItem>
                  {
                  profilelogged === 'Root' ? <MenuItem value={'Root'}>Root</MenuItem> : ''
                  }


                </Select>
              </FormControl>
        </div>
        <div className="col-md-2">
        <FormControl fullWidth>
                <InputLabel id="input-user-type">Situação do usuário</InputLabel>
                <Select
                  labelId="input-user-type"
                  id="input-user-type"
                  value={habilitar}
                  label="Situação do usuário"
                  onChange={(e) => setHabilitar(e.target.value)}
                >
                  <MenuItem value={'S'}>Habilitado</MenuItem>
                  <MenuItem value={'N'}>Desabilitado</MenuItem>
                </Select>
              </FormControl>
        </div>
        {
          profilelogged === 'Root' ?
            <div className="col-md-3">
              <label htmlFor="inputUserType" className="form-label">
                Filiado
              </label>
              <select name="pets" id="input-user-type" className="form-select" value={idfiliado} onChange={(e) => setIdfiliado(e.target.value)}>
                <option value="">Selecionar...</option>
                {filiados ? filiados.map(objeto => (
                  <option key={objeto.id} value={objeto.id}>
                    {objeto.fantasy}
                  </option>
                )) : ''}

              </select>
            </div>
            : ""}
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


