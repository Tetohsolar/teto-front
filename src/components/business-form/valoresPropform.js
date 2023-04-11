import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import InputMask from 'react-input-mask';



const ValoresProposta = (props) => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Informações do usuário";
  const { userId } = useParams();
  const { token, } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [tipo, setTipo] = useState('')
  const [id, setId] = useState('')
  const [reloadPage, setReloadPage] = useState(false)
  const [habilitar, setHabilitar] = useState('')
  const { signUp, profilelogged } = useContext(AuthContext)
  const { updateUser} = useContext(AuthContext)
  const [filiados, setFiliados] = useState([])
  const [idfiliado, setIdfiliado] = useState(null) 

  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <hr className="my-4" />
     <form className="row g-3">
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
        {
          profilelogged === 'Root' ?
        <div className="col-md-4">
          <label htmlFor="inputUserType" className="form-label">
            Filiado
          </label>
          <select name="pets" id="input-user-type" className="form-select" value={idfiliado} onChange={(e) => setIdfiliado(e.target.value)}>
            <option value="">Selecionar...</option>
            {filiados?filiados.map(objeto => (
            <option key={objeto.id} value={objeto.id}>
              {objeto.fantasy}
            </option>
          )):''}
            
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
        </div>
      </div>
    </div>
  );
};

export default ValoresProposta;
