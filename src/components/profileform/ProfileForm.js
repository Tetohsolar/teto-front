import { AuthContext } from '../../context/AuthContext';
import './profileform.scss';
import { useState, useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material';
import MaskedTextField from '../communs/MaskedTextField';


const ProfileForm = (props) => {
  const { token, } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [tipo, setTipo] = useState('')
  const [habilitar, setHabilitar] = useState('')
  const { signUp, profilelogged } = useContext(AuthContext)
  const navigate = useNavigate()
  const [filiados, setFiliados] = useState([])
  const [idfiliado, setIdfiliado] = useState(null)

  const [selectvisbile, setSelectVisible] = useState(false)

  useEffect(() => {

    loadfiliados();
    return () => { }

  }, [])

  async function loadfiliados() {

    await api.get('/afflited/all', {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then(response => {
      //console.log(response.data.affiliated)
      setFiliados(response.data.affiliated)


    }).catch(error => {
      console.log(" d eu errado")
    })
  }



  function limpaCampos() {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setTipo('')
    setPhone('')
    setHabilitar('')
  }

  function validaCampos(name, email, phone, password, confirmPassword, tipo, habilitar) {
    if (phone) {


      let phonenomask = phone.replace('_', '');
      console.log(phonenomask.length)

      if (phonenomask.length < 14) {
        toast.error("Telefone é invalido", {
          autoClose: 1000,
        })
        return false;
      }
    }

    return true;

  }



  async function handleSaveUser(e) {

    e.preventDefault();
    if (await validaCampos(name, email, phone, password, confirmPassword, tipo, habilitar)) {

      try {

        await signUp(name, phone, email, password, confirmPassword, tipo, habilitar, idfiliado);
        limpaCampos()
        navigate("/users")

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <p>Crie novos usuários para acessar sua conta.</p>
      <hr className="my-4" />

      <form className="row g-3" onSubmit={handleSaveUser}>
        <div className="col-md-6">
        <TextField id="inputFirstName" maxLength={50} className="form-control" label="Nome" variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="col-md-5">
          <TextField id="inputEmail" maxLength={50} className="form-control" label="Email*" variant="outlined" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
         
        </div>
        <div className="col-md-6">
          
          <TextField type='password' id="inputPassword1" maxLength={50} className="form-control" label="Senha*" variant="outlined" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
      
        </div>
        <div className="col-md-5">
           
          <TextField type='password' id="inputPassword2" maxLength={50} className="form-control" label="Confirmação de senha*" variant="outlined" value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="col-2">
       
          <MaskedTextField label={"Telefone"}  mask={'(99)9 9999-9999'} variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)}  ></MaskedTextField>
        </div>

        <div className="col-md-3">

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
        <div className="col-md-3">
         
          <FormControl fullWidth>
                <InputLabel id="input-user-type">Situação</InputLabel>
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
            <div className="col-md-3">
              <FormControl fullWidth>
                <InputLabel id="input-user-type">Situação</InputLabel>
                <Select
                  labelId="input-user-type"
                  id="input-user-type"
                  value={idfiliado}
                  label="Filiado"
                  onChange={(e) => setIdfiliado(e.target.value)}
                >
                {filiados ? filiados.map(objeto => (
                  <MenuItem key={objeto.id} value={objeto.id}>
                    {objeto.fantasy}
                  </MenuItem>
                )) : ''}

                </Select>
              </FormControl>

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

export default ProfileForm;
