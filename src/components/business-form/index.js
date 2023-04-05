import { AuthContext } from '../../context/AuthContext';
import './businessform.scss';
import { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpfMask } from './cpfmask'
import { cnpjMask } from './cnpjmask'
import InputMask from 'react-input-mask';
import api from '../../api';
import { useParams, useNavigate } from "react-router-dom";
import SelectEstado from '../estadosbr';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '/node_modules/react-tabs/style/react-tabs.scss';
import { NumericFormat } from 'react-number-format';
import { cpf, cnpj } from 'cpf-cnpj-validator';

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

const BusinessForm = (props) => {

  const [name, setName] = useState('')
  const [num, setNumero] = useState('')
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
  const [kitM, setKitmicro] = useState('')
  const [complementCostM, setcustoComplementarm] = useState('')
  const [projectCostM, setProjetom] = useState('')
  const [taxM, setTaxam] = useState('')
  const [assemblyCostM, setMontagemm] = useState('')
  const [kitI, setKitinv] = useState('')
  const [complementCostI, setcustoComplementari] = useState('')
  const [projectCostI, setProjetoinv] = useState('')
  const [taxI, setTaxainv] = useState('')
  const [assemblyCostI, setMontagemi] = useState('')
  const { token } = useContext(AuthContext)
  const handleInput = ({ target: { value } }) => setPhone(value);
  const handleInputZap = ({ target: { value } }) => setZap(value);
  const handleInputCep = ({ target: { value } }) => setCepData(value);
  const handleInputnum = ({ target: { value } }) => setNumero(value);


  const [fatorSolar, setFatorSolar] = useState('')
  const [tipoTelhado, setTipoTelhado] = useState('')
  const [tipoLigacao, setTipoLigacao] = useState('')
  const [modalidade, setModalidade] = useState('')
  const [grupo, setGrupo] = useState('')
  const [subgrupo, setSubgrupo] = useState('')
  const [demandaFP, setDemandaFP] = useState('')
  const [energia_FP, setEnergia_FP] = useState('')
  const [demPonta, setDem_ponta] = useState('')
  const [energiaPonta, setEnergia_ponta] = useState('')
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState('')
  const [consumoMedio, setConsumoMedio] = useState('')
  const [geracaoSugerida, setGeracaoSugerida] = useState('')
  const [geracaoDesejada, setGeracaoDesejada] = useState('')
  const [tipoSistema, setTipoSistema] = useState('')
  const [potenciaModulo, setPotenciaModulo] = useState('')
  const [perdas, serPerdas] = useState('')
  const [potenciaConsiderada, setPotenciaConsiderada] = useState('')
  const [qtdeModulos, setQtdeModulos] = useState('')
  const [potenciaSistema, setPotenciaSistema] = useState('')
  const [mediaMensal, setMediaMensal] = useState('')
  const [cip, setCip] = useState('')
  const [bandeira, setbandeira] = useState('')
  const [fatorSimult, setFatorSimult] = useState('')
  const [precoKit, setPrecoKit] = useState('')
  const [complemento, setComplemento] = useState('')
  const [projeto, setprojeto] = useState('')
  const [imposto, setImposto] = useState('')
  const [montagem, seMontagem] = useState('')
  const [comissao, setComissao] = useState('')
  const [margem, setMargem] = useState('')
  const [custo_total, setCustoTotal] = useState('')
  const [margemCalculada, setMargemCalculada] = useState('')
  const [valorTotalProjeto, setValorTotalProjeto] = useState('')
  const [valorComissao, setValorComissao] = useState('')
  const [lucroProjeto, setLucroProjeto] = useState('')
  const [lucroReal, setLucroReal] = useState('')
  const [projetoDesconto2, setprojetoDesconto2] = useState('')
  const [projetoDesconto4, setprojetoDesconto4] = useState('')
  const [marcaModulo, setMarcaModulo] = useState('')
  const [modeloPlaca, setModeloPlaca] = useState([])
  const [modeloInversor, setModeloInversor] = useState([])
  const [modeloMicroInversor, setModeloMicroInversor] = useState([])
  const [selectedInversor, setSelectecInversor] = useState('')
  const [selectedModeloPainel, setSelectedModeloPainel] = useState('')
  const [selectedMicroinversor, setSelectecMicroinversor] = useState('')
  const [marcaInversor, setMarcaInversor] = useState('')
  const [marcaMicroInversor, setMarcaMicroInversor] = useState('')
  const [garantia_inv_micro, setGarantia_inv_micro] = useState('')
  const [qtde_inv_micro, setQtde_inv_micro] = useState('')
  const [taxa, setTaxa] = useState('')
  const [nome, setNome] = useState('')
  const [usuario, setUsuario] = useState('')
  const [marca, setMarca] = useState()
  const [marcas, setMarcas] = useState([])
  const [IdClient, setIdClient] = useState([])
 

  const { BId } = useParams();

  useEffect(() => {

    if (BId) {
      loadClienById(BId)
    }
    return () => { }

  }, [])


  async function findInversores() {

    const filtro = {
      brand: "%",
      category: "Inversor",
      "page": 0,
      "pageSize": 100
    }


    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setModeloInversor(response.data.tutorials)
      console.log(response.data.tutorials)

    })


  };



  async function findMicroInversor() {
    const filtro = {
      brand: "%",
      category: "Microinversor",
      "page": 0,
      "pageSize": 100
    }


    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setModeloMicroInversor(response.data.tutorials)
      console.log(response.data.tutorials)

    })


  };


  async function findAllPainel() {
    console.log('chamou painel')
    const filtro = {
      brand: "%",
      category: "Placa",
      "page": 0,
      "pageSize": 100
    }


    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setModeloPlaca(response.data.tutorials)
      console.log(modeloPlaca)

    })


  };


  function findAllProductsByBrand(e) {
    console.log(e)
    setTipoSistema(e)

    if (e === "Inversor") {
      console.log('chamou inversor')
      findInversores()

    }
    else if (e === "Microinversor") {
      console.log('chamou microinversor')
      findMicroInversor()

    }

    findAllPainel()
  }
  async function loadClienById(id) {

    try {
      await api.get('/afflited/get/' + id, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        setName(response.data.fantasy)
        setDoc(response.data.document)
        setCorporateName(response.data.corporatename)

        response.data.tipo === "Fisico" ? setTipoPessoa("F") : setTipoPessoa("J")
        let olha = response.data.tipo === "Fisico" ? "F" : "J"
        handleTipoPessoaValue(olha)

        setPhone(response.data.phone)
        setNumero(response.data.num)
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
        setNumero(response.data.Addresses[0].number)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (err) {
      console.log(err)
    }
  }

  function limpaCampos() {
    setName('')
    setNumero('')
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

  function validaCampos(name, phone, documento, cep, zap) {

    if (name === "") {
      toast.error("Nome É obrigatório", {
        autoClose: 1000,
      })
      return false;
    }
    
    
    if (phone === "" || phone === undefined) {
      toast.error("Telefone É obrigatório", {
        autoClose: 1000,
      })
      return false;
    }
   
    let phonenomask = phone.replace('_',"");

    if (phonenomask.length < 15 ) {
      toast.error("Telefone é inválido", {
        autoClose: 1000,
      })
      return false;
    }
  
    console.log("entrou valor " + documento)
    if (documento !== '') {

      if (documento.length <= 14 && !cpf.isValid(documento)) {
        toast.error("CPF inválido", {
          autoClose: 1000,
        }
        ); throw new Error;

      } else if (documento.length > 14 && !cnpj.isValid(documento)) {
        toast.error("CNPJ inválido", {
          autoClose: 1000,
        });
        throw new Error;


      }

    }




    return true;
  }

  function handleMask(e) {
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


  async function handleFindClient(e) {
    e.preventDefault();

    try {
      if (!doc){
        return
      }

      await api.post('/client/getbydocument',
        { "document": `${doc}` }, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        handleEstadoValue(response.data.Addresses[0].state)
        console.log(response)
        setName(response.data.fantasy)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setZap(response.data.zap)
        setInformacoesAdicionais(response.data.addInformation)
        setEstado(response.data.Addresses[0].state)
        setCidade(response.data.Addresses[0].city)
        setCepData(response.data.Addresses[0].postcode)
        setRua(response.data.Addresses[0].street)
        setBairro(response.data.Addresses[0].neighborhood)
        setNumero(response.data.Addresses[0].number)
        setIdClient(response.data.id)
        setIdAdd(response.data.Addresses[0].id)
     
      }).catch((error) => {
        setIdClient(null)
        toast.error(error.response.data.message)
      });

    } catch (err) {
      console.log(err)

    }
  }
  async function buscaGeracaoSugerida() {
    setEnergiaPontaTratada(0)
    await api.post('/taxkhw/byparam', {
      "subgroup": "A3",
      "modal": "HA",
      "ep": energiaPonta,
      "state": "CE"

    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }
    ).then((response) => {
      setEnergiaPontaTratada(response.data.Taxkwh.toFixed(6))


    })



  }
  function handleGrupoAConsMedio(e) {
    buscaGeracaoSugerida()

    if (modalidade === "HA" && subgrupo === "A3" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)
      //Geração sugerida

      // console.log(`EFP: ${energia_FP},EP ${energiaPonta}, ${energiaPontaTratada}`)
      const result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
    }

    else if (modalidade === "HV" && subgrupo === "A4" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)
      //GeracaoSugerida
      let result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))

      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
    }

    else if (modalidade === "HA" && subgrupo === "A4" && demandaFP !== null && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(demandaFP) + parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)

      //GeracaoSugerida
      let result = parseFloat(demandaFP) + parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }


    }
    else {
      setConsumoMedio('')
      setGeracaoSugerida('')
    }

  }


  const navigate = useNavigate();

  

  async function saveClient(tipoPesoa, name, corpName, documento, phone, zap, cep, estado, cidade, logradouro, bairro, inform, email, id, idAdd, num) {

    
    const json = {
      fantasy: name,
      corporatename: corpName,
      phone: phone,
      document: documento,
      email: email,
      tipo: tipoPesoa,
      zap: zap,
      addInformation: inform,
      Addresses: [
        {
          id: idAdd ? idAdd : undefined,
          street: logradouro,
          postcode: cep,
          city: cidade,
          state: estado,
          neighborhood: bairro,
          number: num
        }
      ]
    }
    const t = JSON.stringify(json);
    const saida = JSON.parse(t);
    console.log(json)
    
    if (await validaCampos(name, phone, documento)) {

      if (id) {
        await api.patch('/client/update/' + id, saida
          , {
            headers: {
              'Authorization': `Basic ${token}`
            }

          }).then((response) => {
          }).catch(
            (response) => {
              toast.error(response.response.data.message)
              throw new Error()
            }
          );

      } else {
        await api.post('/client/create', saida
          , {
            headers: {
              'Authorization': `Basic ${token}`
            }

          }).then((response) => {
          }).catch(
            (response) => {
              toast.error(response.response.data.message)
              throw new Error()
            }
          )
      }
    }
  }
  function handleChangePage(index, lastIndex, event){

   saveClient(tipoPessoa, name, corporateName,doc,phone,zap,
    cepData,estado,cidade,rua,bairro,informacoesAdicionais,email,IdClient,idAdd,num).catch(
      ()=>{
        event.cancel()
      }
    )
    
    

  }

  return (

    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />

      <form className="row g-3" >

        <Tabs onSelect={handleChangePage}>
          <TabList>
            <Tab>Dados do Cliente</Tab>
            <Tab  > Dados da Geradora</Tab>
            <Tab> Tipo de Sistema</Tab>
          </TabList>
          <TabPanel>
            <div className='divInfo p-3 mb-3 bg-white border rounded-3'>
              <div className='col-md-3'>
                <label htmlFor="inputFirstName" className="form-label">
                  Tipo
                </label>
                <select className='form-select' value={tipoPessoa} onChange={handleTipoPessoa}>
                  <option value="F">Física</option>
                  <option value="J">Jurídica</option>
                </select>
              </div>
              
              <div className="col-md-3"  >
                <label htmlFor="inputDocumento" className="form-label ">
                  {lbDocument === "" ? "CPF" : lbDocument}
                </label>
                <input type="text" className="form-control" id="inputDocumento" value={doc} onKeyUp={(e) => { handleMask(e) }} onChange={(e) => setDoc(e.target.value)} onBlur={handleFindClient} />
              </div>

              <div className="col-md-3">
                <label htmlFor="inputFirstName" className="form-label" id='lbNome'>
                  {lbFantasia === "" ? "Nome" : lbFantasia}
                </label>
                <input type="text" maxLength={50} className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            
             
              <div className="col-md-3" id={exibeCorporateName === "" ? "divRazaoEscondida" : "divRazaoVisvel"} >
                <label htmlFor="inputCorporateName" className="form-label ">
                  Razão Social
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
                <Cidades className="form-select" id="inputcidade" novos={cidades} value={cidade} onChange={(e) => setCidade(e.target.value)}>  </Cidades>
              </div>
              <div className="col-md-3"  >
                <label htmlFor="inputLogradouro" className="form-label ">
                  Logradouro
                </label>
                <input type="text" maxLength={100} className="form-control" id="inputLogradouro" value={rua} onChange={(e) => setRua(e.target.value)} />
              </div>
              <div className="col-md-3"  >
                <label htmlFor="inputBairro" className="form-label ">
                  Bairro
                </label>
                <input type="text" maxLength={100} className="form-control" id="inputLogradouro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputNumero" className="form-label" id='lbNumero'>
                Número
                </label>
                <input type="number"  className="form-control" id="inputNumero" value={num} onChange={(e) => setNumero(e.target.value)} />
              </div>
            
              <div className="col-md-3"  >
                <label htmlFor="email" className="form-label ">
                  Email
                </label>
                <input type="email" maxLength={100} className="form-control" id="idEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="col-md-7"  >
                <label htmlFor="informacoesAdicionais" className="form-label ">
                  Informações Adicionais
                </label>
                <input type="text" maxLength={200} className="form-control" id="informacoesAcionais" value={informacoesAdicionais} onChange={(e) => setInformacoesAdicionais(e.target.value)} />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
          <div className="container">
                  <div className="row">
                    <div className="col-md-5">
                      <label htmlFor="inputCodigo" className="form-label">
                        Cliente:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputCodigo" className="form-label">
                        Usuário:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputCodigo" className="form-label">
                        Fator Solar:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={fatorSolar} onChange={(e) => setFatorSolar(e.target.value)} />
                    </div>
                    <div className="col-md-3 ">
                      <label htmlFor="tipoLigacao" className="form-label">
                        Tipo de Ligação:
                      </label>
                      <select name="tipoLigacao" className="form-select" id="tipoLigacao" value={tipoLigacao} onChange={(e) => setTipoLigacao(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="tri">Trifásico</option>
                        <option value="mono">Monofásico</option>

                      </select>
                    </div>
                    <div className="col-md-4 ">
                      <label htmlFor="tipoTelhado" className="form-label">
                        Tipo de Telhado:
                      </label>

                      <select name="tipoLigacao" className="form-select" id="tipoTelhado" value={tipoTelhado} onChange={(e) => setTipoTelhado(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="ceramico">Cerâmico</option>
                        <option value="metalico">Metálico</option>
                        <option value="solo">Solo</option>
                        <option value="fibrocimento">Fibrocimento</option>
                        <option value="laje">Laje</option>

                      </select>
                    </div>

                  </div>

                  <br />
                  <div class="card w-100">
                    <div class="card-header">
                      Informações Complementares
                    </div>
                    <div class="card-body d-flex flex-row ">

                      <div className="row p-2 d-flex flex-column">


                        <div className="col-md-3 w-100">
                          <label htmlFor="modalidade" className="form-label">
                            Modalidade:
                          </label>
                          {/* <input type="text" className="form-control" id="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)} /> */}
                          <select className="form-select" id="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Convencional">Convencional</option>
                            <option value="HA">Horos. Azul</option>
                            <option value="HV">Horos. Verde</option>
                            <option value="Rural">Rural</option>

                          </select>
                        </div>
                        <div className="col-md-2 w-100">
                          <label htmlFor="inputGrupo" className="form-label">
                            Grupo:
                          </label>


                          <select className="form-select" id="inputGrupo" value={grupo} onChange={(e) => setGrupo(e.target.value)} >
                            <option value="">Selecione</option>
                            <option value="A">Grupo A</option>
                            <option value="B">Grupo B</option>
                          </select>
                        </div>
                        <div className="col-md-3   w-100">
                          <label htmlFor="inputSubgrupo" className="form-label">
                            Sub-Grupo:
                          </label>
                          <select className="form-select" id="inputSubgrupo" value={subgrupo} onChange={(e) => setSubgrupo(e.target.value)} >
                            <option value="">Selecione</option>
                            {grupo === "A" ? <>
                              <option value="A3">A3</option>
                              <option value="A4">A4</option>

                            </>
                              :
                              <>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="B3">B3</option>
                              </>}
                          </select>
                        </div>



                      </div>
                      <div className="row p-2  d-flex flex-column">

                        <div className="col-md-3  w-100 ">
                          <label htmlFor="inputDemandaFP" className="form-label">
                            Demanda FP:
                          </label>
                          <input type="text" className="form-control" id="inputDemandaFP" value={demandaFP} onChange={(e) => setDemandaFP(e.target.value)} onKeyUp={handleGrupoAConsMedio} />

                        </div>
                        <div className="col-md-3 w-100">
                          <label htmlFor="inputEnergiaFP" className="form-label">
                            Energia FP:
                          </label>
                          <input type="text" className="form-control" id="inputEnergiaFP" value={energia_FP} onChange={(e) => setEnergia_FP(e.target.value)} onKeyUp={handleGrupoAConsMedio} />

                        </div>
                        <div className="col-md-3   w-100">
                          <label htmlFor="inputEnergiaPonta" className="form-label">
                            Energia Ponta:
                          </label>
                          <input type="text" className="form-control" id="inputEnergiaPonta" value={energiaPonta} onChange={(e) => setEnergia_ponta(e.target.value)} onKeyUp={handleGrupoAConsMedio} />
                        </div>


                      </div>
                      <div className="row p-2  d-flex flex-column">
                        <div className="col-md-3  w-100">
                          <label htmlFor="inputDemandaPonta" className="form-label">
                            Demanda Ponta:
                          </label>
                          <input type="text" className="form-control" id="inputDemandaPonta" value={demPonta} onChange={(e) => setDem_ponta(e.target.value)} onKeyUp={handleGrupoAConsMedio} />
                        </div>
                        <div className="col-md-3  w-100 ">
                          <label htmlFor="inputConsMedio" className="form-label font-weight-bold">
                            Consumo Médio(KWh):
                          </label>
                          <input type="text" className="form-control" id="inputConsMedio" value={consumoMedio || ''} onChange={(e) => setConsumoMedio(e.target.value)} />

                        </div>


                        <div className="col-md-3 w-100">
                          <label htmlFor="inputGeracaoSugerida" className="form-label">
                            Geração Sugerida:
                          </label>
                          <input type="text" className="form-control" id="inputGeracaoSugerida" value={geracaoSugerida || ''} onChange={(e) => setGeracaoSugerida(e.target.value)} />
                        </div>
                      </div>

                    </div>
                  </div>
                  <br />
                  <div class="card">
                    <div class="card-header">
                      Informações Complementares
                    </div>
                    <div class="card-body">
                      <div className="row d-flex justify-content-start">

                        <div className="col-md-3">
                          <label htmlFor="inputFatorSimult" className="form-label" >
                            Fator de Simult:
                          </label>
                          <input type="text" className="form-control" id="inputFatorSimult" value={fatorSimult} onChange={(e) => setFatorSimult(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="inputCIP" className="form-label">
                            CIP:
                          </label>
                          <input type="text" className="form-control" id="inputCIP" value={cip} onChange={(e) => setCip(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="inputbandeira" className="form-label">
                            Bandeira:
                          </label>
                          <input type="text" className="form-control" id="inputbandeira" value={bandeira} onChange={(e) => setbandeira(e.target.value)} />
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="inputPreco" className="form-label">
                            Preço do Kit:
                          </label>
                          <input type="text" className="form-control" id="inputCodigo" value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} />
                        </div>
                      </div>



                    </div>
                  </div>



                </div>
          </TabPanel>
          <TabPanel>
          <div className="container-fluid">
                  <div className="row ">
                    <div className="col-md-3">
                      <label htmlFor="inputTipoSistema" className="form-label">
                        Tipo de Sistema:
                      </label>
                      {/* <input type="text" className="form-control" id="inputTipoSistema" value={tipoSistema} onChange={(e) => setTipoSistema(e.target.value)} /> */}
                      <select className="form-select" id="inputTipoSistema" value={tipoSistema} onChange={(e) => findAllProductsByBrand(e.target.value)} >
                        <option value="">Selecione</option>
                        <option value="Inversor">Inversor</option>
                        <option value="Microinversor">Microinversor</option>

                      </select>

                    </div>

                  </div>
                  <hr />
                  <br />
                  <div class="card">
                    <div class="card-header">
                      Tipo de Sistema: <strong>{tipoSistema}</strong>
                    </div>
                    <div class="card-body">
                      <div className="row d-flex justify-content-start">
                        {tipoSistema === 'Inversor' ? <>

                          <div className="col-md-3">
                            <label htmlFor="inputFatorSimult" className="form-label" >
                              Marca:
                            </label>

                            <select className="form-select" aria-label="Selecionar" onChange={(e) => setMarca(e.target.value)} value={marca} >
                              <option value="">Selecionar </option>
                              {modeloInversor ? modeloInversor.map((option) =>
                              (<option key={option.id}
                                value={option.brand} >
                                {option.brand}</option>)) : ""}
                            </select>

                          </div>

                          <div className="col-md-4">
                            <label htmlFor="inputFatorSimult" className="form-label" >
                              Modelo
                            </label>

                            <select className="form-select" id="inputModeloInversor" value={selectedInversor} onChange={(e) => setSelectecInversor(e.target.value)}  >
                              <option value="">Selecione</option>
                              {modeloInversor && modeloInversor.map((produto) => (
                                <option key={produto.id} value={produto.description}>{produto.description}</option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-3">
                            <label htmlFor="inputPotModulos" className="form-label">
                              Potência:
                            </label>
                            <input type="text" className="form-control" id="inputPotModulos" value={potenciaModulo} onChange={(e) => setPotenciaModulo(e.target.value)} />
                          </div>



                          <div className="col-md-1">
                            <label htmlFor="inputFatorSimult" className="form-label" >
                              Qtde:
                            </label>
                            <input type="text" className="form-control" id="inputFatorSimult" value={fatorSimult} onChange={(e) => setFatorSimult(e.target.value)} />
                          </div>

                        </>
                          :
                          <>

                            <div className="col-md-3">
                              <label htmlFor="inputPotModulos" className="form-label">
                                Marca:
                              </label>

                              <select className="form-select" aria-label="Selecionar" onChange={(e) => setMarca(e.target.value)} value={marca}>
                                <option value="">Selecionar </option>
                                {modeloMicroInversor ? modeloMicroInversor.map((option) => (<option key={option.id} value={option.brand} >{option.brand}</option>)) : ""}
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="inputModeloMicro" className="form-label" >
                                Modelo
                              </label>

                              <select className="form-select" id="inputModeloMicro" value={selectedMicroinversor} onChange={(e) => setSelectecMicroinversor(e.target.value)}  >
                                <option value="">Selecione</option>
                                {modeloMicroInversor && modeloMicroInversor.map((produto) => (
                                  <option key={produto.id} value={produto.description}>{produto.description}</option>
                                ))}

                              </select>

                            </div>
                            <div className="col-md-3">
                              <label htmlFor="inputPotModulos" className="form-label">
                                Potência:
                              </label>
                              <input type="text" className="form-control" id="inputPotModulos" value={potenciaModulo} onChange={(e) => setPotenciaModulo(e.target.value)} />
                            </div>



                            <div className="col-md-1">
                              <label htmlFor="inputFatorSimult" className="form-label" >
                                Qtde:
                              </label>
                              <input type="text" className="form-control" id="inputFatorSimult" value={fatorSimult} onChange={(e) => setFatorSimult(e.target.value)} />
                            </div>


                          </>}






                      </div>

                    </div>
                  </div>
                  <br />




                  <div class="card">
                    <div class="card-header">
                      Painéis
                    </div>
                    <div class="card-body">
                      <div className="row d-flex justify-content-start">
                        <div className="col-md-4">
                          <label htmlFor="inputFatorSimult" className="form-label" >
                            Marca
                          </label>
                          <select className="form-select" id="inputTipoSistema" value={marcaModulo} onChange={(e) => setMarcaModulo(e.target.value)}  >
                            <option value="">Selecione</option>
                            {modeloPlaca && modeloPlaca.map((produto) => (
                              <option key={produto.id} value={produto.brand}>{produto.brand}</option>
                            ))}


                          </select>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="inputComplem" className="form-label">
                            Modelo do Painel
                          </label>
                          <select className="form-select" id="inputTipoSistema" value={selectedModeloPainel} onChange={(e) => setSelectedModeloPainel(e.target.value)}  >
                            <option value="">Selecione</option>
                            {modeloPlaca && modeloPlaca.map((produto) => (
                              <option key={produto.id} value={produto.description}>{produto.description}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label htmlFor="inputPotModulos" className="form-label">
                            Potência:
                          </label>
                          <input type="text" className="form-control" id="inputPotModulos" value={potenciaModulo} onChange={(e) => setPotenciaModulo(e.target.value)} />
                        </div>


                        <div className="col-md-1">
                          <label htmlFor="inputPotModulos" className="form-label">
                            Qtde:
                          </label>
                          <input type="text" className="form-control" id="inputQtdeModulos" value={qtdeModulos} onChange={(e) => setQtdeModulos(e.target.value)} />
                        </div>
                      </div>

                    </div>
                  </div>
                  <br />
                  <div class="card">
                    <div class="card-header">
                      Dados do Cliente
                    </div>
                    <div class="card-body">
                      <div className="row d-flex justify-content-start">
                        <div className="col-md-3">
                          <label htmlFor="inputConsumo" className="form-label">
                            Consumo(Kwh):
                          </label>
                          <input type="text" className="form-control" id="inputConsumo" value={consumoMedio} onChange={(e) => setConsumoMedio(e.target.value)} />
                        </div>

                        <div className="col-md-3">
                          <label htmlFor="inputPerda" className="form-label">
                            Perda:
                          </label>
                          <input type="text" className="form-control" id="inputPerda" value={perdas} onChange={(e) => serPerdas(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="inputmediaMensal" className="form-label">
                            Média Mensal(Kwh):
                          </label>
                          <input type="text" className="form-control" id="inputCodigo" value={mediaMensal} onChange={(e) => setMediaMensal(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

            
          </TabPanel>
        </Tabs>
        <div className='afflitedsalvar'>
          <button className="btn btn-primary text-light" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;


