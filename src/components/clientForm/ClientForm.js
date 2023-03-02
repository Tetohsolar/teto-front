import { AuthContext } from '../../context/AuthContext';
import './clientform.scss';
import { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpfMask } from './cpfmask'
import { cnpjMask } from './cnpjmask'
import InputMask from 'react-input-mask';
import api from '../../api';

import cep from "cep-promise";

import SelectEstado from '../estadosbr';
function PhoneInput(props) {
  return (
    <InputMask 
      mask='(99) 99999-9999' 
      value={props.value} 
      onChange={props.onChange}
       className="form-control">
    </InputMask>
  );
}

function CepInput(props) {
  return (
    <InputMask 
      mask='99999-999' 
      value={props.value} 
      onChange={props.onChange}
       className="form-control" onKeyDown={props.onKeyDown} onBlur={props.onBlur}>
    </InputMask>
  );
}

function Cidades(props){
  return (
    <select className={props.className} onChange={props.onChange} value={props.value}>
      { Array.isArray(props.novos)?
        props.novos.map((cidade) => ( 
                <option key={cidade.nome} value={cidade.nome}>{cidade.nome}</option>
            )):[]
        
       }
    </select>
  );
}

const ClientForm = (props) => {

  const [name, setName] = useState('')
  const [lbFantasia, setLbFantasia] = useState('')
  const [lbDocument, setLbDocument] = useState('')
  const [exibeCorporateName, setExibeCorporateName] = useState('')
  const [tipoPessoa, setTipoPessoa] = useState('')
  const [corporateName, setCorporateName] = useState('')
  const [document, setDocument] = useState('')
 
  const [phone, setPhone] = useState('')
  const [cepData, setCepData] = useState('')
  const [zap, setZap] = useState('')
  const [estado, setEstado] = useState('')
  const [cidades, setCidades] = useState('')
  const [cidade, setCidade] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('')
  

  const { signUp, loadingAuth, token } = useContext(AuthContext)
  const handleInput = ({ target: { value } }) => setPhone(value);
  const handleInputZap = ({ target: { value } }) => setZap(value);
  const handleInputCep = ({ target: { value } }) => setCepData(value);

  
  

  function limpaCampos() {
    setName('')
    setCorporateName('')
    setPhone('')
    setTipoPessoa('F')
    setLbFantasia("Nome")
    setDocument('')
    setLbDocument("CPF")
    setZap('')
    setInformacoesAdicionais('')
  }


  function validaCampos(name, email, phone, password, confirmPassword, tipo) {
    if (name !== '' && email !== '' && phone !== '') {
      return true
    }
    if (password === confirmPassword && tipo !== '') {
      return true
    }
    else {
      return false
    }

  }


  function handleMask(e){
   // alert(tipoPessoa)
    if (tipoPessoa==="F"||tipoPessoa==="" ) {
       const formatado =  cpfMask(document);
       setDocument(formatado);
    }else{
      const formatado =  cnpjMask(document);
       setDocument(formatado);
    }
  
  }
  //chama para trocar assunto
  function handleTipoPessoa(e) {
    
    setTipoPessoa(e.target.value)  
    if (e.target.value==="F" || e.target.value==="" ){
      setLbFantasia("Nome");
      setExibeCorporateName("");   
      setLbDocument("CPF")
       
    } else{
      setLbFantasia("Fantasia");
      setExibeCorporateName("J")
      setLbDocument("CNPJ")
    }

  }

  async function handleEstadoValue(value){
 //e.preventDefault();
 const url ="https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+value+"/municipios";
    
 const requestInfo = {
   method: 'GET',
   headers: new Headers({
       'Content-Type': 'application/json',
   }),
 };

 fetch(url, requestInfo)
       .then(resposta => resposta.json())
       .then((json) => setCidades(json))
       .catch((error) => console.log(error));
 
  setEstado(value)
  }
  async function handleEstado(e){
   handleEstadoValue(e.target.value)
  }

  const searchCep = async () => {
    try {
      
      await api.get('/sunindex/cep/'+cepData ).then((response) => {
        handleEstadoValue(response.data.state)
        .then(setCidade(response.data.city))
        .then(setRua(response.data.street)).then(setBairro(response.data.neighborhood))
      });
      
    } catch (err) {
      
    }
  };


  async function handleSaveUser(e) {

    e.preventDefault();

    if (validaCampos) {
    //  signUp(name, phone, email, password, confirmPassword, tipo)
      // setUpdateUsers(true)
     // console.log(tipo)
      limpaCampos()

    }

  }

  
  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />
 
      <form className="row g-3" onSubmit={handleSaveUser}>
        <div className='col-md-3'>
        <label htmlFor="inputFirstName" className="form-label">
              Tipo
        </label>
        <select className='form-select' value={tipoPessoa} onChange={handleTipoPessoa}>
          <option value="F"> Física</option>
          <option value="J"> Jurídica</option>
        </select>

        </div>
        <div className="col-md-4">
          
          <label htmlFor="inputFirstName" className="form-label" id='lbNome'>
            {lbFantasia===""?"Nome":lbFantasia}
            
          </label>
          <input type="text" className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="col-md-4"  >
          <label htmlFor="inputDocumento" className="form-label ">
          {lbDocument===""?"CPF":lbDocument}
          </label>
         
          <input type="text" className="form-control" id="inputDocumento" value={document} onKeyUp={(e)=>{handleMask(e)}}  onChange={(e) => setDocument(e.target.value)} />
        </div>

        <div className="col-md-5" id={exibeCorporateName===""?"divRazaoEscondida":"divRazaoVisvel"} >
          <label htmlFor="inputCorporateName" className="form-label ">
            Razão Social
          </label>
          <input type="email" className="form-control" id="inputCorporateName" value={corporateName} onChange={(e) => setCorporateName(e.target.value)} />
        </div>
        
        
        <div className="col-md-3">
          <label htmlFor="inputPhoneNumber" className="form-label">
            Telefone
          </label>
          <PhoneInput  className="form-control" id="inputPhoneNumber"  value={phone}     onChange={handleInput}>  </PhoneInput>
        </div>

        
        <div className="col-md-3">
          <label htmlFor="inputPassword4" className="form-label">
          Whatsapp
          </label>
          <PhoneInput  className="form-control" id="inputPhoneNumber"  value={zap}     onChange={handleInputZap}>  </PhoneInput>
        </div>

            <div className='col-md-5'>
            <label htmlFor="CEP" className="form-label">
              CEP
            </label> 
            <CepInput  className="form-control" id="inputCep"  value={cepData} onChange={handleInputCep} name="cep" onBlur={searchCep} >   </CepInput>
            </div>

            <div className='col-md-3'>
            <label htmlFor="estado" className="form-label">
              Estado
            </label> 
            <SelectEstado  className="form-select" id="inputCep"  value={estado}  onChange={handleEstado}>  </SelectEstado>
            </div>

            <div className='col-md-3'>
            <label htmlFor="Cidade" className="form-label">
              Cidade
            </label> 
            <Cidades  className="form-select" id="inputCep"  novos={cidades} value={cidade} onChange={(e) => setCorporateName(e.target.value)}>  </Cidades>
            </div>

            <div className="col-md-5"  >
          <label htmlFor="inputLogradouro" className="form-label ">
            Logradouro
          </label>
          <input type="text" className="form-control" id="inputLogradouro" value={rua} onChange={(e) => setRua(e.target.value)} />
        </div>

        <div className="col-md-6"  >
          <label htmlFor="inputBairro" className="form-label ">
            Bairro
          </label>
          <input type="text" className="form-control" id="inputLogradouro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </div>

        <div className="col-md-5"  >
          <label htmlFor="informacoesAdicionais" className="form-label ">
            Informações Adicionais
          </label>
          <input type="text" className="form-control" id="informacoesAcionais" value={informacoesAdicionais} onChange={(e) => setInformacoesAdicionais(e.target.value)} />
        </div>
       
        
        <div className="d-grid gap-2 d-md-block col-12">
          <button className="btn btn-primary text-light" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;


