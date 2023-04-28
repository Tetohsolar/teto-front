import { AuthContext } from '../../context/AuthContext';
import './profileform.scss';
import { useState, useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';



const UpdatePasswordUser = (props) => {
  const { token, idLogged} = useContext(AuthContext)
  
  async function findUserById() {

    await api.get(`/user/get/${idLogged}`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => { 
        setEmail (response.data.email)
        
      })
  }
  useEffect(() => {
   findUserById ()

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
      <form  >
        <div className="row g-3">
          <div className="col-md-5">
            <label htmlFor="inputEmail" className="form-label">
              Email:
            </label>
            <input type="email" readOnly  className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="row-md-5">
          <div className="col-4">
            <label htmlFor="inputPhoneNumber" className="form-label">
              Nova Senha:
            </label>
            <input type="password" className="form-control" id="inputSenha" value={password} onChange={(e) => setPassword(e.target.value)} />

          </div>
        </div>
        <div className="row-md-5">
          <div className="col-4">
            <label htmlFor="inputPhoneNumber" className="form-label">
              Confirme a Senha:
            </label>
            <input type="password" className="form-control" id="inputSenha" value={password2} onChange={(e) => setPassword2(e.target.value)} />

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


