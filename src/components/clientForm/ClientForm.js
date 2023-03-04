import { AuthContext } from '../../context/AuthContext';
import './clientform.scss';
import { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpfMask } from './cpfmask'
import { cnpjMask } from './cnpjmask'
import InputMask from 'react-input-mask';
import api from '../../api';

import SelectEstado from '../estadosbr';
import { json } from 'react-router-dom';
function PhoneInput(props) {
  return (
    <InputMask 
      mask='(99) 99999-9999' 
      value={props.value} 
      onChange={props.onChange}
       className="form-control" required={props.required} placeholder={props.placeholder}
       type={props.type} name={props.name} id={props.id} >
    </InputMask>
  );
}

function CepInput(props) {
  return (
    <InputMask 
      mask='99999-999' 
      value={props.value} 
      onChange={props.onChange}
       className="form-control" onKeyDown={props.onKeyDown} onBlur={props.onBlur} placeholder={props.placeholder}
       type={props.type} name={props.name}>
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
  const [doc, setDoc] = useState('')
  const [email, setEmail] = useState('')
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
    setDoc('')
    setLbDocument("CPF")
    setZap('')
    setInformacoesAdicionais('')
    setCepData("")
    setEstado("AC")
    setCidade("") 
    setRua("")
    setBairro("")
    setCidades("")
    handleEstadoValue("")
  }


  function validaCampos(name, phone, doc) {
    
    if (name===""){
      toast.error( "Nome É obrigatório",{
        autoClose: 1000,
      })
      return false;
    }
    if (phone===""){
        toast.error( "Telefone É obrigatório",{
        autoClose: 1000,
      })
      return false;
    }
    
    return true;
  }

  function handleMask(e){
   // alert(tipoPessoa)
    if (tipoPessoa==="F"||tipoPessoa==="" ) {
       const formatado =  cpfMask(doc);
       setDoc(formatado);
    }else{
      const formatado =  cnpjMask(doc);
       setDoc(formatado);
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


    async function create(tipoPesoa, name, corpName, documento, phone, zap, cep,estado,cidade,logradouro, bairro, inform, email ) {

      const json = {fantasy: name,
        corporatename: corpName,
        phone: phone,
        document: documento,
        email: email,
        tipo: tipoPesoa,
        zap:zap,
        addInformation:inform,
        Addresses:[
          {
            street:logradouro,
            postcode:cep,
            city:cidade,
            state:estado,
            neighborhood:bairro
          }
        ]
      }
      const t = JSON.stringify(json);
      const saida = JSON.parse(t);
      
    await api.post('/client/create', saida
      , {
      headers: {
        'Authorization': `Basic ${token.token}`
      }

    }).then((response) => {
      console.log(response.data.message)
      toast.success(response.data.message).then(limpaCampos())
    }).catch(
      (response) => {
        toast.error(response.response.data.message)
  
      }
    )
    
  }

  async function handleSaveUser(e) {

    e.preventDefault();

    if (validaCampos(name,phone,doc)) {
      create(tipoPessoa,name,corporateName,doc,phone,zap,cepData, estado,cidade,bairro,informacoesAdicionais,email)
      
    //  signUp(name, phone, email, password, confirmPassword, tipo)
      // setUpdateUsers(true)
     // console.log(tipo)
     // 

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
          <input type="text"  className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="col-md-4"  >
          <label htmlFor="inputDocumento" className="form-label ">
          {lbDocument===""?"CPF":lbDocument}
          </label>
         
          <input type="text" className="form-control" id="inputDocumento" value={doc} onKeyUp={(e)=>{handleMask(e)}}  onChange={(e) => setDoc(e.target.value)} />
        </div>

        <div className="col-md-5" id={exibeCorporateName===""?"divRazaoEscondida":"divRazaoVisvel"} >
          <label htmlFor="inputCorporateName" className="form-label ">
            Razão Social
          </label>
          <input type="text" className="form-control" id="inputCorporateName" value={corporateName} onChange={(e) => setCorporateName(e.target.value)} />
        </div>
        
        
        <div className="col-md-3">
          <label htmlFor="inputPhoneNumber" className="form-label">
            Telefone
          </label>
          <PhoneInput  className="form-control" id="inputPhoneNumber"  value={phone}    onChange={handleInput}> </PhoneInput>
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


