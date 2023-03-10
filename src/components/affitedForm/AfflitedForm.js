import { AuthContext } from '../../context/AuthContext';
import './afflitedform.scss';
import { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpfMask } from './cpfmask'
import { cnpjMask } from './cnpjmask'
import InputMask from 'react-input-mask';
import api from '../../api';

import { useParams, useNavigate } from "react-router-dom";
import SelectEstado from '../estadosbr';
import { json } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '/node_modules/react-tabs/style/react-tabs.scss';
import {NumericFormat} from 'react-number-format';


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

function Cidades(props) {
  return (
    <select className={props.className} onChange={props.onChange} value={props.value}>
      {Array.isArray(props.novos) ?
        props.novos.map((cidade) => (
          <option key={cidade.nome} value={cidade.nome}>{cidade.nome}</option>
        )) : []

      }
    </select>
  );
}

const AfflitedForm = (props) => {

  const [name, setName] = useState('')
  const [id, setId] = useState('')
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
  const [idAdd, setIdAdd] = useState('')
  
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('')

  const [ kitM, setKitmicro] = useState('')

  const [complementCostM, setcustoComplementarm] = useState('')
  
  const[projectCostM, setProjetom] = useState('')
  
  const[taxM, setTaxam] = useState('')
  
  const[assemblyCostM, setMontagemm] = useState('')
      
      

  const[kitI, setKitinv] = useState('')
  const[complementCostI, setcustoComplementari] = useState('')
  const[projectCostI, setProjetoinv] = useState('')
  const[taxI, setTaxainv] = useState('')
  const[assemblyCostI, setMontagemi] = useState('')
 
                                                                                                                                                





      
  const { signUp, loadingAuth, token } = useContext(AuthContext)
  const handleInput = ({ target: { value } }) => setPhone(value);
  const handleInputZap = ({ target: { value } }) => setZap(value);
  const handleInputCep = ({ target: { value } }) => setCepData(value);
  const { clientId } = useParams();

  useEffect(() => {


    const storageUser = localStorage.getItem('cliente')
    if (clientId){
    loadClienById(clientId)
    }

    return () => { }

  }, [])

  async function loadClienById(id) {

    try {
      const storageUser = localStorage.getItem('token')
      //console.log(storageUser)

      await api.get('/afflited/get/' + id, {
        headers: {
          'Authorization': `Basic ${storageUser}`
        }

      }).then((response) => {
        setName(response.data.fantasy)
        setDoc(response.data.document)
        setCorporateName(response.data.corporatename)
        
        response.data.tipo === "Fisico" ? setTipoPessoa("F") : setTipoPessoa("J")
        let olha = response.data.tipo ==="Fisico"?"F":"J"
        handleTipoPessoaValue(olha)
        
        setPhone(response.data.phone)
        setZap(response.data.zap)
        setCepData(response.data.Addresses[0].postcode)
        setEstado(response.data.Addresses[0].state)
        handleEstadoValue(response.data.Addresses[0].state)
        setCidade(response.data.Addresses[0].city)
        setRua(response.data.Addresses[0].street)
        setBairro(response.data.Addresses[0].neighborhood)
        setIdAdd(response.data.Addresses[0].id)
        setInformacoesAdicionais(response.data.addInformation)
        setId(response.data.id)
        setEmail(response.data.email)
        setKitinv(response.data.kitI)
        setcustoComplementari(response.data.complementCostI)
        setProjetoinv(response.data.projectCostI)
        setTaxainv(response.data.taxI)
        setMontagemi(response.data.assemblyCostI)
        setKitmicro(response.data.kitM)
        setcustoComplementarm(response.data.complementCostM)
        setProjetom(response.data.projectCostM)
        setTaxam(response.data.taxM)
        setMontagemm(response.data.assemblyCostM)





      }).catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (err) {

    }


  }
 

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

    if (name === "") {
      toast.error("Nome ?? obrigat??rio", {
        autoClose: 1000,
      })
      return false;
    }
    if (phone === "") {
      toast.error("Telefone ?? obrigat??rio", {
        autoClose: 1000,
      })
      return false;
    }

    return true;
  }

  function handleMask(e) {
    // alert(tipoPessoa)
    if (tipoPessoa === "F" || tipoPessoa === "") {
      const formatado = cpfMask(doc);
      setDoc(formatado);
    } else {
      const formatado = cnpjMask(doc);
      setDoc(formatado);
    }

  }
  //chama para trocar assunto
  function handleTipoPessoa(e) {

    //setTipoPessoa(e.target.value)
    handleTipoPessoaValue(e.target.value)

  }
  function handleTipoPessoaValue(e) {

    
    if (e === "F" || e === "") {
      setLbFantasia("Nome");
      setExibeCorporateName("");
      setLbDocument("CPF")
      setTipoPessoa("F")

    } else {
      setLbFantasia("Fantasia");
      setExibeCorporateName("J")
      setLbDocument("CNPJ")
      setTipoPessoa("J")

    }

  }

  async function handleEstadoValue(value) {
    //e.preventDefault();
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + value + "/municipios";

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

  async function handleEstado(e) {
    handleEstadoValue(e.target.value)
  }

  const searchCep = async () => {
    try {

      await api.get('/sunindex/cep/' + cepData).then((response) => {
        handleEstadoValue(response.data.state)
          .then(setCidade(response.data.city))
          .then(setRua(response.data.street)).then(setBairro(response.data.neighborhood))
      });

    } catch (err) {

    }
  };

  const navigate = useNavigate();
  
  
  async function save(tipoPesoa, name, corpName, documento, phone, zap,
     cep, estado, cidade, logradouro, bairro, 
     inform, email,id,idAdd,kitM,
     complementCostM,
     projectCostM,
     taxM,
     assemblyCostM, kitI,
     complementCostI,
     projectCostI,
     taxI,
     assemblyCostI,) {

    const json = {
      fantasy: name,
      corporatename: corpName,
      phone: phone,
      document: documento,
      email: email,
      tipo: tipoPesoa,
      zap: zap,
      addInformation: inform,
      kitM:parseFloat((''+kitM).replace(',','.')),
      complementCostM:parseFloat(String(complementCostM).replace(',','.')),
      projectCostM:parseFloat(String(projectCostM).replace(',','.')),
      taxM:parseFloat(String(taxM).replace(',','.')),
      assemblyCostM:parseFloat(String(assemblyCostM).replace(',','.')),
      
      kitI:parseFloat(String(kitI).replace(',','.')),
      complementCostI:parseFloat(String(complementCostI).replace(',','.')),
      projectCostI:parseFloat(String(projectCostI).replace(',','.')),
      taxI:parseFloat(String(taxI).replace(',','.')),
      assemblyCostI:parseFloat(''+String(assemblyCostI).replace(',','.')),
      
      Addresses: [
        {
          id:idAdd?idAdd:undefined,
          street: logradouro,
          postcode: cep,
          city: cidade,
          state: estado,
          neighborhood: bairro
        }
      ]
      
      
      


    }
    const t = JSON.stringify(json);
    const saida = JSON.parse(t);
    //console.log(saida);
    
    if (id) {
      await api.patch('/afflited/update/'+id, saida
      , {
        headers: {
          'Authorization': `Basic ${token.token}`
        }
                            
      }).then((response) => {
       // console.log(response.data.message)
       //toast.success(response.data.message).then(limpaCampos())
      }).catch( 
        (response) => { 
          toast.error(response.response.data.message) 
          throw new Error()                                

        }
      );
      

    } else {
      await api.post('/afflited/create', saida
      , {
        headers: {
          'Authorization': `Basic ${token.token}`
        }

      }).then((response) => {
        //console.log(response.data.message)
        //toast.success(response.data.message).then(limpaCampos())
      }).catch(
        (response) => {
          toast.error(response.response.data.message)
          throw new Error() 
        }
      )
    }
    

  }

  async function handleSaveUser(e) {

    e.preventDefault();

    if (validaCampos(name, phone, doc)) {
      try {
         await save(tipoPessoa,name,corporateName,doc,phone,zap,cepData,
          estado,cidade, rua,bairro,informacoesAdicionais,
          email,id,idAdd, kitM,
          complementCostM,
          projectCostM,
          taxM,
          assemblyCostM, kitI,
          complementCostI,
          projectCostI,
          taxI,
          assemblyCostI, )
         navigate("/affliteds");
         toast.success("Opera????o realizada com sucesso!",{
          autoClose: 1000,
        })
      
        }catch(error){
         console.log(error);
      }
      
    }

  }








  return (

    
    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />

      <form className="row g-3" onSubmit={handleSaveUser}>
        
        <Tabs>
    <TabList>
      <Tab>Informa????es B??sicas</Tab>
      <Tab> Custo Inversor</Tab>
      <Tab> Custo Micro Inversor</Tab>
    </TabList>

    <TabPanel>
      <div className='divInfo p-3 mb-3 bg-white border rounded-3'>
      <div className='col-md-3'>
          <label htmlFor="inputFirstName" className="form-label">
            Tipo
          </label>
          <select className='form-select' value={tipoPessoa} onChange={handleTipoPessoa}>
            <option value="F">F??sica</option>
            <option value="J">Jur??dica</option>
          </select>

        </div>



        <div className="col-md-3">

          <label htmlFor="inputFirstName" className="form-label" id='lbNome'>
            {lbFantasia === "" ? "Nome" : lbFantasia}

          </label>
          <input type="text" maxLength={50} className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="col-md-3"  >
          <label htmlFor="inputDocumento" className="form-label ">
            {lbDocument === "" ? "CPF" : lbDocument}
          </label>

          <input type="text" className="form-control" id="inputDocumento" value={doc} onKeyUp={(e) => { handleMask(e) }} onChange={(e) => setDoc(e.target.value)} />
        </div>

        <div className="col-md-3" id={exibeCorporateName === "" ? "divRazaoEscondida" : "divRazaoVisvel"} >
          <label htmlFor="inputCorporateName" className="form-label ">
            Raz??o Social
          </label>
          <input type="text" maxLength={100} className="form-control" id="inputCorporateName" value={corporateName} onChange={(e) => setCorporateName(e.target.value)} />
        </div>


        <div className="col-md-3">
          <label htmlFor="inputPhoneNumber" className="form-label">
            Telefone
          </label>
          <PhoneInput className="form-control" id="inputPhoneNumber" value={phone} onChange={handleInput}> </PhoneInput>
        </div>


        <div className="col-md-3">
          <label htmlFor="inputPassword4" className="form-label">
            Whatsapp
          </label>
          <PhoneInput className="form-control" id="inputPhoneNumber" value={zap} onChange={handleInputZap}>  </PhoneInput>
        </div>

        <div className='col-md-3'>
          <label htmlFor="CEP" className="form-label">
            CEP
          </label>
          <CepInput className="form-control" id="inputCep" value={cepData} onChange={handleInputCep} name="cep" onBlur={searchCep} >   </CepInput>
        </div>

        <div className='col-md-3'>
          <label htmlFor="estado" className="form-label combomob">
            Estado
          </label>
          <SelectEstado className="form-select" id="inputCep" value={estado} onChange={handleEstado}>  </SelectEstado>
        </div>

       
        
        <div className='col-md-3'>
          <label htmlFor="Cidade" className="form-label combomob">
            Cidade 
          </label>
          <Cidades className="form-select" id="inputcidade" novos={cidades} value={cidade} onChange={(e) => setCorporateName(e.target.value)}>  </Cidades>
        </div>

        <div className="col-md-3"  >
          <label htmlFor="inputLogradouro" className="form-label ">
            Logradouro
          </label>
          <input type="text" maxLength={100} className="form-control"  id="inputLogradouro" value={rua} onChange={(e) => setRua(e.target.value)} />
        </div>
  
        <div className="col-md-3"  >
          <label htmlFor="inputBairro" className="form-label ">
            Bairro
          </label>
          <input type="text" maxLength={100} className="form-control" id="inputLogradouro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </div>

        <div className="col-md-3"  >
          <label htmlFor="informacoesAdicionais" className="form-label ">
            Informa????es Adicionais
          </label>
          <input type="text" maxLength={200} className="form-control" id="informacoesAcionais" value={informacoesAdicionais} onChange={(e) => setInformacoesAdicionais(e.target.value)} />
        </div>

        <div className="col-md-3"  >
          <label htmlFor="email" className="form-label ">
            Email
          </label>
          <input type="text" maxLength={100} className="form-control" id="idEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        </div>


       
    </TabPanel>
    <TabPanel>
    <div className='divInfo p-3 mb-3 bg-white border rounded-3'>
    <div className="col-md-3"  >
          <label htmlFor="kitI" className="form-label ">
          Kit
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
 className="form-control number" value={kitI||''} onChange={(e) => setKitinv(e.target.value)}/>
        </div>

        <div className="col-md-3"  >
          <label htmlFor="complementCostI" className="form-label ">
         Complementar
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator=","
 className="form-control number" value={complementCostI||''} onChange={(e) => setcustoComplementari(e.target.value)}/>
        </div>

        <div className="col-md-3"  >
          <label htmlFor="projectCostI" className="form-label ">
         Projeto
          </label>
          <NumericFormat decimalScale={2} decimalSeparator=","  placeholder="" className="form-control number" value={projectCostI|| ''} onChange={(e) => setProjetoinv(e.target.value)}/>
        </div>

        <div className="col-md-3"  >
          <label htmlFor="assemblyCostI" className="form-label ">
        Montagem do Kit
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={assemblyCostI||''} onChange={(e) => setMontagemi(e.target.value)}/>
        </div>

        <div className="col-md-3"  >
          <label htmlFor="taxI" className="form-label ">
          Taxa Adicional
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={taxI||''} onChange={(e) => setTaxainv(e.target.value)}/>
        </div>
        </div>
    </TabPanel>
    <TabPanel>
    <div className='divInfo p-3 mb-3 bg-white border rounded-3'>


    <div className="col-md-3"  >
          <label htmlFor="kitM" className="form-label ">
         Kit
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={kitM||''} onChange={(e) => setKitmicro(e.target.value)}/>
        </div>


        <div className="col-md-3"  >
          <label htmlFor="complementCostM" className="form-label ">
         Complementar 
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={complementCostM||''} onChange={(e) => setcustoComplementarm(e.target.value)}/>
        </div>

        <div className="col-md-3"  >
          <label htmlFor="projectCostM" className="form-label ">
         Projeto
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={projectCostM||''} onChange={(e) => setProjetom(e.target.value)}/>
        </div>

        <div className="col-md-3"  >
          <label htmlFor="assemblyCostM" className="form-label ">
        Montagem do Kit
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={assemblyCostM||''} onChange={(e) => setMontagemm(e.target.value)}/>
        </div>
        <div className="col-md-3"  >
          <label htmlFor="taxM" className="form-label ">
        Taxa Adicional
          </label>
          <NumericFormat decimalScale={2} placeholder="" decimalSeparator="," className="form-control number" value={taxM||''} onChange={(e) => setTaxam(e.target.value)}/>
        </div>
      </div>
    </TabPanel>
  </Tabs>


        <div className="d-grid gap-2 d-md-block col-12">
          <button className="btn btn-primary text-light" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
    




    
  );
};

export default AfflitedForm;


