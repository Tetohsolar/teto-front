import { AuthContext } from '../../context/AuthContext';
import './profileform.scss';
import { useState, useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


const UpdatePasswordUser = (props) => {
  const { token, idLogged } = useContext(AuthContext)

  async function findUserById() {

    await api.get(`/user/get/${idLogged}`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => {
        setEmail(response.data.email)

      })
  }
  useEffect(() => {
    findUserById()

    return () => { }
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const navigate = useNavigate();

  async function handleUpdatePassword(e) {
    e.preventDefault();

    if (password !== password2) {
      toast.error("As senhas informadas não conferem!!", {
        autoClose: 2000,
      })

    }
    else {

      const body = {
        email,
        password,
        token
      }

      await api.patch('/user/update-password/', body, {


        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then(response => {

        console.log(response.data)
        toast.success("Senha Atualizada com Sucesso!!", {
          autoClose: 2000,
        })
        navigate('/users')


      }).catch((err) => {
        toast.error("Erro, e-mail não encontrado!!", {
          autoClose: 2000,
        })
        console.log(err)
      })



    }




  }








  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <hr className="my-4" />
      <form >
        <div className="row mb-3">
          <div className="col-md-5">
            <FormControl fullWidth>

              <TextField id="inputFornecedor" maxLength={50} className="form-control"
                inputProps={{ readonly: true }}
                label="E-mail(somente leitura)"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </FormControl>


          </div>
        </div>

        <div className="row  mb-3">
          <div className="col-3">
            <FormControl fullWidth>
              <TextField id="inputPassword"
                maxLength={12}
                className="form-control"
                type='password'
                label="Senha"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </FormControl>


          </div>
        </div>

        <div className="row-md-5">
          <div className="col-3">
            <FormControl fullWidth>
              <TextField id="inputPassword2"
                maxLength={12}
                className="form-control"
                type='password'
                label="Confirme a Senha"
                variant="outlined"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)} />
            </FormControl>


          </div>
        </div>

        <br />
        <div className="row">
          <div className="col-9"></div>

          <div className="col-1">
            <button className="btn btn-primary text-light" type="submit" onClick={handleUpdatePassword} >
              Atualizar
            </button>
          </div>
        </div>




      </form>
    </div>
  );
};

export default UpdatePasswordUser;


