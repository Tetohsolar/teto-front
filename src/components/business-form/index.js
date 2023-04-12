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
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import MyModal from '../communs/ModalDelete';
import { AiFillPlusSquare, AiOutlinePlus } from 'react-icons/ai';
import TabelaProdutoEditavel from '../prods';

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

  async function findProducts(brand, category) {

    const filtro = {
      brand: brand,
      category: category,
      "page": 0,
      "pageSize": 100
    }

    console.log(filtro)
    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {
      setModeloInversor(response.data.tutorials)
    })


  };

  const [potenciaModulo, setPotenciaModulo] = useState('465')

  const [dados, setDados] = useState([
    {
      id: 1, modality: "Convencional", group: 'B', subgroup: 'B1', demandaFP: 0, energiaFP: 0,
      demandaP: 0, energiaP: 0, avgconsumption: 0, suggestedGeneration: 0, CIP: 0
    }

  ]);

  
  const [name, setName] = useState('')
  const [num, setNumero] = useState('')
  const [id, setId] = useState('')
  const [idNegocio, setIdNegocio] = useState('')
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
  const { token, userName, afflitedId, idLogged, afflited } = useContext(AuthContext)
  const handleInput = ({ target: { value } }) => setPhone(value);
  const handleInputZap = ({ target: { value } }) => setZap(value);
  const handleInputCep = ({ target: { value } }) => setCepData(value);
  const handleInputnum = ({ target: { value } }) => setNumero(value);
  const [idSelected, setIdSelected] = useState('')
  const [idSelectedProd, setIdSelectedProd] = useState('')
  const [fatorSolar, setFatorSolar] = useState('')
  const [tipoTelhado, setTipoTelhado] = useState('Cerâmico')
  const [tipoLigacao, setTipoLigacao] = useState('Monofásico')
  const [modalidade, setModalidade] = useState('Convencional')
  const [grupo, setGrupo] = useState('B')
  const [subgrupo, setSubgrupo] = useState('B1')
  const [demandaFP, setDemandaFP] = useState(0)
  const [energia_FP, setEnergia_FP] = useState(0)
  const [demPonta, setDem_ponta] = useState(0)
  const [energiaPonta, setEnergia_ponta] = useState(0)
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState(0)
  const [consumoMedio, setConsumoMedio] = useState('')
  const [geracaoSugerida, setGeracaoSugerida] = useState('')
  const [geracaoSugeridaParcial, setGeracaoSugeridaParcial] = useState('')
  const [geracaoDesejada, setGeracaoDesejada] = useState('')
  const [tipoSistema, setTipoSistema] = useState('Invesor')

  const [perdas, serPerdas] = useState('')
  const [potenciaConsiderada, setPotenciaConsiderada] = useState('')
  const [qtdeModulos, setQtdeModulos] = useState('')
  const [potenciaSistema, setPotenciaSistema] = useState(0)
  const [mediaMensal, setMediaMensal] = useState('')
  const [cip, setCip] = useState(afflited.cip.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  const [bandeira, setbandeira] = useState(afflited.flag.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  const [fatorSimult, setFatorSimult] = useState(0)
  const [precoKit, setPrecoKit] = useState('')
  const [precoKitFornecedor, setPrecoKitForncedor] = useState(0)
  const [precoKitCalculado, setPrecoKitCalculado] = useState(0)
  const [complemento, setComplemento] = useState(afflited.complementCostI)
  const [projeto, setprojeto] = useState(afflited.projectCostI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  const [imposto, setImposto] = useState(afflited.taxI)
  const [montagem, seMontagem] = useState(afflited.assemblyCostI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  const [comissao, setComissao] = useState(afflited.profitCost)
  const [margem, setMargem] = useState(0)
  const [custo_total, setCustoTotal] = useState(0)
  const [margemCalculada, setMargemCalculada] = useState(0)
  const [valorTotalProjeto, setValorTotalProjeto] = useState(0)
  const [valorComissao, setValorComissao] = useState(0)
  const [lucroProjeto, setLucroProjeto] = useState(0)
  const [lucroReal, setLucroReal] = useState(0)
  const [projetoDesconto2, setprojetoDesconto2] = useState('')
  const [projetoDesconto4, setprojetoDesconto4] = useState('')
  const [marcaModulo, setMarcaModulo] = useState('')
  const [modeloPlaca, setModeloPlaca] = useState([])
  const [modeloInversor, setModeloInversor] = useState([])
  const [modeloMicroInversor, setModeloMicroInversor] = useState([])
  const [selectedInversor, setSelectecInversor] = useState('')
  const [selectedModeloPainel, setSelectedModeloPainel] = useState('')
  const [selectedMicroinversor, setSelectecMicroinversor] = useState('')
  const [taxa, setTaxa] = useState('')
  const [nome, setNome] = useState('')
  const [usuario, setUsuario] = useState('')
  const [marca, setMarca] = useState()
  const [marcas, setMarcas] = useState([])
  const [IdClient, setIdClient] = useState('')
  const [demandasVisible, setDemandasVisible] = useState('')
  const [nPlacas, setNplacas] = useState(0)
  const [idRateio, setIdRateio] = useState(1)
  const [idProd, setIdProd] = useState(1)
  const [geracaoTotal, setGeracaoTotal] = useState(0.0)
  const [comissao2, setComissao2] = useState(0.0)
  const [margem2, setMargem2] = useState(0.0)
  const [margem2p, setMargem2p] = useState(0.0)
  const [lucro2, setLucro2] = useState(0.0)
  const [lucroR2, setLucroR2] = useState(0.0)

  const [comissao4, setComissao4] = useState(0.0)
  const [margem4, setMargem4] = useState(0.0)
  const [lucro4, setLucro4] = useState(0.0)
  const [lucroR4, setLucroR4] = useState(0.0)
  const [margem4p, setMargem4p] = useState(0.0)
  const navigate = useNavigate();

  //busca por tipo de produto
  async function loadBrandByProduct(type) {
    try {
      const filtro = {
        "type": type
      }


      await api.post('/brands/all', filtro, {
        headers: {
          'Authorization': `Basic ${token}`

        }
      }).then((response) => {
        setMarcas(response.data.brand)
      }).catch((error) => {
        //toast.error(error.response.data.message)
      });


    } catch (err) {
      console.log(err)

    }
  }


  const [dadosProdutos, setDadosProdutos] = useState([
    {
      id: 1, type: "", brand: marcas, model: "", power: potenciaModulo, qtd: 1, brands:[], products:[]
    }
  ]);


  const handleEdit = (id, campo, valor) => {
    setDados(prevDados => {
      const novoDados = [...prevDados];
      const index = novoDados.findIndex(item => item.id === id);
      if (campo !== "CIP" || campo !== "avgconsumption" || campo !== "suggestedGeneration") {
        calculaDemandaRateios(novoDados[index], valor)
      }
      novoDados[index][campo] = valor;
      return novoDados;
    });
  };

   const handleEditProds = async(id, campo, valor) => {
    setDadosProdutos(prevDados => {
      const novoDados = [...prevDados];
      const index = novoDados.findIndex(item => item.id === id);
      novoDados[index][campo] = valor;
      return novoDados;
    });
  };

  async function onBlurProdutoMarca(item){

    let category = "Nenhum"
    if (item.type==="P"){
      category ="Placa"
    }
    else if (item.type === "I"){
      category="Inversor"
    }else if (item.type==="M"){
      category ="Microinversor"
    }

    const filtro = {
      brand: item.brand,
      category: category,
      "page": 0,
      "pageSize": 100
    }

    console.log(filtro)
    await api.post('/products/byparam', filtro, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).then((response) => {

      setDadosProdutos(prevDados => {
        const novoDados = [...prevDados];
        const index = novoDados.findIndex(it => it.id === item.id);
        novoDados[index]["products"] = response.data.tutorials;
        return novoDados;
      });
    })
    
  }


  async function onBlurMarca(item){

    if (item.type!==""){
     let type = "M"
     if (item.type==="P"){
        type="P";
     } 
    const filtro = {
      "type": type
    }

    console.log(filtro)
    await api.post('/brands/all', filtro, {
      headers: {
        'Authorization': `Basic ${token}`

      }
    }).then((response) => {
      setDadosProdutos(prevDados => {
        const novoDados = [...prevDados];
        const index = novoDados.findIndex(it => it.id === item.id);
        novoDados[index]["brands"] = response.data.brand;
        return novoDados;
      });
    }).catch((error) => {
    });

    }
    else{
      item["brands"] = []
    }
  }


  const [novoItem, setNovoItem] = useState({
    id: idRateio, modality: "Convencional", group: 'B', subgroup: 'B1', demandaFP: 0, energiaFP: 0,
    demandaP: 0, energiaP: 0, avgconsumption: 0, suggestedGeneration: 0, CIP: 0
  });

  const handleAfterDel = () => {

    const quantidadeItens = dados.length;
    if (quantidadeItens > 1) {
      setDados(prevDados => prevDados.filter(item => item.id !== idSelected));
    }

  }
  const handleAdd = () => {
    let idN = idRateio + 1

    let novoItem =
    {
      id: idN, modality: "Convencional", group: 'B', subgroup: 'B1', demandaFP: 0, energiaFP: 0,
      demandaP: 0, energiaP: 0, avgconsumption: 0, suggestedGeneration: 0, CIP: 0
    }
    setIdRateio(idN)
    setDados(prevDados => [...prevDados, novoItem]);
  };

  const handleAddProd = () => {
    let idN = idProd + 1

    let novoItem =
    {
      id: idN, type: "Placa", brand: '', model: '', power: potenciaModulo, qtd: 1
    }
    setIdProd(idN)
    setDadosProdutos(prevDados => [...prevDados, novoItem]);
  };

  const handleAfterDelProd = () => {

    const quantidadeItens = dadosProdutos.length;
    if (quantidadeItens > 1) {
      setDadosProdutos(prevDados => prevDados.filter(item => item.id !== idSelectedProd));
    }

  }

  const { BId } = useParams();

  useEffect(() => {

    if (BId) {
      loadClienById(BId)
      loadBrandByProduct("P")
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

    let phonenomask = phone.replace('_', "");

    if (phonenomask.length < 15) {
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
      if (!doc) {
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

  async function buscaGeracaoSugeridaRateio(subgroup, modal, ep, state) {
    let dados = 0;
    await api.post('/taxkhw/byparam', {
      "subgroup": subgroup,
      "modal": modal,
      "ep": ep,
      "state": state

    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }
    ).then((response) => {
      dados = response.data.Taxkwh;
      console.log(dados)

    })
    return dados
  }

  function calculaDemana() {
    handleGrupoAConsMedio()
    calculaGeracaoTotal()

  }
  function handleGrupoAConsMedio(e) {
    buscaGeracaoSugerida()
    if (modalidade === "Convencional" || modalidade === "Rural" || modalidade === "Outros") {
      setGeracaoSugerida(consumoMedio)
      setGeracaoSugeridaParcial(consumoMedio)
      return
    }

    if (modalidade === "HA" && subgrupo === "A3" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(energiaPonta)
      //setGeracaoDesejada(energiaPonta)
      const result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result)
    }

    else if (modalidade === "HV" && subgrupo === "A4" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)
      //setGeracaoDesejada(valor)
      let result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))

      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result)
    }

    else if (modalidade === "HA" && subgrupo === "A4" && demandaFP !== null && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(demandaFP) + parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)

      //GeracaoSugerida
      let result = parseFloat(demandaFP) + parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result)


    }
    else {
      setConsumoMedio('')
      setGeracaoSugerida('')
    }

  }

  async function saveBusiness(sunIndex, number, roof, typeConnection, modality, group, subgroup,
    demadaFp, energiaFp, demandaP, energiaP, avgconsumption, suggestedGeneration, suggestedDesired, situation, cip,
    flag, syncindex, lost, consideredpower, numberborder, systempower, consumption,
    panelpower, avgmonth, kitprice, complement, project, tax, assembled,
    sellercomission, margin, amountcost, marginCalculate, amount, valuesellercomission, profit,
    realProfit, numberInverMicro, validate, AffiliatedId, ClientId, placaId, InversorId, type, UserId) {

    const data = {
      sunIndex: sunIndex, number: number, roof: roof, typeConnection: typeConnection,
      modality: modality, group: group, subgroup: subgroup, demadaFp: demadaFp,
      energiaFp: energiaFp, demandaP: demandaP, energiaP: energiaP,
      avgconsumption: avgconsumption, suggestedGeneration: suggestedGeneration,
      suggestedDesired: suggestedDesired, situation: situation,
      cip: cip, flag: flag, syncindex: syncindex, lost: lost,
      consideredpower: consideredpower, numberborder: numberborder,
      systempower: systempower, consumption: consumption,
      panelpower: panelpower, avgmonth: avgmonth,
      kitprice: kitprice, complement: complement,
      project: project, tax: tax, assembled: assembled,
      sellercomission: sellercomission, margin: margin,
      amountcost: amountcost, marginCalculate: marginCalculate,
      amount: amount, valuesellercomission: valuesellercomission,
      profit: profit, realProfit: realProfit, numberInverMicro: numberInverMicro,
      validate: validate, AffiliatedId: AffiliatedId, ClientId: ClientId,
      placaId: placaId, InversorId: InversorId, type: type, UserId: UserId, shares: dados

    };

    await api.post('/business/create', data
      , {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {

        setIdNegocio(response.data.business.id)
        navigate("/business/view/" + response.data.business.id)
      }).catch(
        (response) => {
          toast.error(response.response.data.message)
          throw new Error()
        }
      )

  }

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
    console.log(saida)

    if (await validaCampos(name, phone, documento)) {

      console.log("valor do id " + id)
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
            setIdClient(response.data.client.id)
            setIdAdd(response.data.client.Addresses[0].id)
          }).catch(
            (response) => {


              toast.error(response.response.data.message)
              throw new Error()
            }
          )
      }
    }
  }

  async function handleChangePage(event) {
    event.preventDefault();

    await saveClient(tipoPessoa, name, corporateName, doc, phone, zap,
      cepData, estado, cidade, rua, bairro, informacoesAdicionais, email, IdClient, idAdd, num).then(
        () => {
          //setPotenciaSistema(4.8)
          setNome(name)
          setUsuario(userName)
          const today = new Date();
          const validade = new Date(today.setDate(today.getDate() + 90));


          const placaId = 2;
          const inversorId = 1
          let demandaFP = 0
          let energiaPonta = 0
          let demPonta = 0
          let energia_FP = 0

          let perdas = 0
          const precoK = parseFloat(precoKit.replace(/\./g, '').replace(',', '.'));
          const comp = parseFloat(complemento.replace(/\./g, '').replace(',', '.'));
          const proje = parseFloat(projeto.replace(/\./g, '').replace(',', '.'));
          const imp = parseFloat(imposto.replace(/\./g, '').replace(',', '.'));
          const monta = parseFloat(montagem.replace(/\./g, '').replace(',', '.'));
          const ct = parseFloat(custo_total.replace(/\./g, '').replace(',', '.'));
          const mg = parseFloat(margemCalculada.replace(/\./g, '').replace(',', '.'));
          const vt = parseFloat(valorTotalProjeto.replace(/\./g, '').replace(',', '.'));
          const vc = parseFloat(valorComissao.replace(/\./g, '').replace(',', '.'));
          const lp = parseFloat(lucroProjeto.replace(/\./g, '').replace(',', '.'));
          const lr = parseFloat(lucroReal.replace(/\./g, '').replace(',', '.'));
          const cip1 = parseFloat(cip.replace(/\./g, '').replace(',', '.'));

          const flag = parseFloat(bandeira.replace(/\./g, '').replace(',', '.'));


          saveBusiness(fatorSolar, num, tipoTelhado, tipoLigacao, modalidade, grupo, subgrupo, demandaFP,
            energiaPonta, demPonta, energia_FP, consumoMedio, geracaoSugerida, geracaoDesejada, "Aberta",
            cip1, flag, fatorSimult, perdas, potenciaConsiderada, nPlacas, geracaoSugerida, potenciaModulo,
            potenciaModulo, geracaoSugerida, precoK, comp, proje, imp, monta, comissao, margem,
            ct, mg, vt, vc, lp, lr, 1,
            validade, afflitedId, IdClient, placaId, inversorId, tipoSistema, idLogged).then(
              () => {
                toast.success("Operação realizada com sucesso!", {
                  autoClose: 1000,
                })


              }

            ).catch((error) => {
              toast.error(error, {
                autoClose: 1000,
              })

            })
        }


      ).catch(
        (error) => {
          toast.error(error, {
            autoClose: 1000,
          })

        }
      )

  }
  function setMod(e) {
    console.log(e !== "HA" || e !== "HV")
    if (e === "HA" || e === "HV") {
      setDemandasVisible('N')

    } else {
      setDemandasVisible('')
      setDemandaFP('')
      setEnergia_FP('')
      setEnergia_ponta('')
      setDem_ponta('')
    }

    calculaDemana()
  }

  function calculaPotenciaConsidedara() {

    let f = parseFloat(fatorSolar) * (1 - 0.07)
    if (isNaN(f)) {
      setPotenciaConsiderada(0)
    } else {
      setPotenciaConsiderada(Math.ceil(f))
    }
    let potSistema = 0;

  }

  function calculaCustos(e) {
    let precoK = parseFloat(precoKitFornecedor) * 1.15
    var numeroArredondado = precoK.toFixed(2)
    let fator = afflited.complementCostI
    let tax = afflited.taxI
    if (tipoSistema === "MicroInversor") {
      fator = afflited.complementCostM
      tax = afflited.taxM
    }

    var complement = precoK * (fator / 100)
    var imp = precoK * (tax / 100)
    const numeroFormatado = precoK.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setPrecoKit(numeroFormatado)
    setComplemento(complement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setImposto(imp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    const projet = parseFloat(projeto.replace(/\./g, '').replace(',', '.'));
    const mont = parseFloat(montagem.replace(/\./g, '').replace(',', '.'));
    var total = precoK + complement + imp + projet + mont
    setCustoTotal(total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    const mgsV = parseFloat(String(margem).replace(/\./g, '').replace(',', '.'));
    const comsV = parseFloat(String(comissao).replace(/\./g, '').replace(',', '.'));
    const comsV4 = parseFloat(String(comissao).replace(/\./g, '').replace(',', '.') - 1);

    var mar = (mgsV / 100) * precoK;
    var totalProjeto = 100 * (parseInt((total + mar) / 100))
    var totalProjetoS = parseFloat(total + mar)
    var com = (comsV / 100) * totalProjeto
    var lucro = mar - com
    var lucroR = (lucro / parseFloat(totalProjeto)) * 100


    setMargemCalculada(mar.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setValorComissao(com.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setValorTotalProjeto(totalProjeto.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setLucroProjeto(lucro.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    setLucroReal(lucroR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))

    var projet2 = (0.98 * totalProjetoS)
    setprojetoDesconto2((projet2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var marg2 = mar - (totalProjeto - projet2)
    setMargem2((marg2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var com2 = (comsV / 100) * projet2
    setComissao2((com2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var l2 = marg2 - com2
    setLucro2((l2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var l2r = (l2 / projet2) * 100
    setLucroR2((l2r.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var ma2p = (marg2 / projet2) * 100
    setMargem2p((ma2p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))

    /* 4 %*/
    var projet4 = (0.96 * totalProjetoS)
    setprojetoDesconto4((projet4.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var marg4 = mar - (totalProjeto - projet4)
    setMargem4((marg4.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var com4 = (comsV4 / 100) * projet4
    setComissao4((com4.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var l4 = marg4 - com4
    setLucro4((l4.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var l4r = (l4 / projet4) * 100
    setLucroR4((l4r.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))
    var ma4p = (marg4 / projet4) * 100
    setMargem4p((ma4p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))


  }

  async function calculaDemandaRateios(item) {
    if (item.modality === "Convencional" || item.modalidade === "Rural" || item.modalidade === "Outros") {
      item.suggestedGeneration = item.avgconsumption;
      item.energiaFP = 0;
      item.energiaP = 0;
      item.demandaFP = 0;
      item.demandaP = 0;
    } else {
      const enpt = 0.620784 //await buscaGeracaoSugeridaRateio(item.subgroup,item.modality,item.energiaPonta,"CE")
      console.log(enpt)
      const valor = parseFloat(item.energiaFP) + parseFloat(item.energiaP);
      const result = parseFloat(item.energiaFP) + Math.round(parseFloat(item.energiaP) / parseFloat(enpt))
      item.suggestedGeneration = result;
      item.avgconsumption = valor;
    }
  }

  function calculaGeracaoTotal() {
    const campoParaSomar = 'suggestedGeneration'; // Campo do JSON que será somado
    const soma = dados.reduce((acumulador, item) => acumulador + parseFloat(item[campoParaSomar]), 0);
    let sugg = parseFloat(geracaoSugeridaParcial) + parseFloat(soma);
    setGeracaoTotal(sugg)
    setGeracaoSugerida(sugg)
    setGeracaoDesejada(sugg)
    let placas = Math.floor((sugg * 12000) / (potenciaConsiderada * potenciaModulo))

    setNplacas(placas)
    let potSistema = (placas * potenciaModulo) / 1000;
    var numeroArredondado = Math.round(potSistema * 100) / 100;
    setPotenciaSistema(numeroArredondado)

  }

  return (



    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />

      <form className="row g-3" onSubmit={handleChangePage}>

        <Tabs >
          <TabList>
            <Tab>Dados do Cliente</Tab>
            <Tab  > Dados da Geradora</Tab>
            <Tab> Tipo de Sistema</Tab>
            <Tab> Resumo Financeiro</Tab>
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
                <input type="number" className="form-control" id="inputNumero" value={num} onChange={(e) => setNumero(e.target.value)} />
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
                  <input type="text" className="form-control" readOnly id="inputCodigo" value={name} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCodigo" className="form-label">
                    Usuário:
                  </label>
                  <input type="text" className="form-control" id="inputCodigo" readOnly value={userName} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputCodigo" className="form-label">
                    Fator Solar:
                  </label>
                  <input type="number" className="form-control alinhaDireita" id="inputCodigo" value={fatorSolar} onChange={(e) => setFatorSolar(e.target.value)} onBlur={() => { calculaPotenciaConsidedara(); calculaDemana() }} onKeyUp={calculaPotenciaConsidedara} />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputCodigo" className="form-label">
                    Potência Considerada:
                  </label>
                  <input type="text" className="form-control alinhaDireita" id="inputCodigo" readOnly value={potenciaConsiderada} onChange={(e) => setPotenciaConsiderada(e.target.value)} />
                </div>
                <div className="col-md-2 ">
                  <label htmlFor="tipoLigacao" className="form-label">
                    Tipo de Ligação:
                  </label>
                  <select name="tipoLigacao" className="form-select" id="tipoLigacao" value={tipoLigacao} onChange={(e) => setTipoLigacao(e.target.value)}>
                    <option value="Trifásico">Trifásico</option>
                    <option value="Monofásico">Monofásico</option>

                  </select>
                </div>
                <div className="col-md-2 ">
                  <label htmlFor="tipoTelhado" className="form-label">
                    Tipo de Telhado:
                  </label>

                  <select name="tipoLigacao" className="form-select" id="tipoTelhado" value={tipoTelhado} onChange={(e) => setTipoTelhado(e.target.value)}>
                    <option value="Cerâmico">Cerâmico</option>
                    <option value="Metálico">Metálico</option>
                    <option value="Em Solo">Solo</option>
                    <option value="Fibrocimento">Fibrocimento</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label htmlFor="inputTipoSistema" className="form-label">
                    Tipo de Sistema:
                  </label>
                  {/* <input type="text" className="form-control" id="inputTipoSistema" value={tipoSistema} onChange={(e) => setTipoSistema(e.target.value)} /> */}
                  <select className="form-select" id="inputTipoSistema" value={tipoSistema} onChange={(e) => findAllProductsByBrand(e.target.value)} >
                    <option value="Invesor">Inversor</option>
                    <option value="MicroInversor">Microinversor</option>
                  </select>

                </div>

                <div className="col-md-2">
                  <label htmlFor="inputTipoSistema" className="form-label">
                    Potência do Painel:
                  </label>
                  {/*  */}

                  <input type="text" className="form-control alinhaDireita" id="inputTipoSistema" value={potenciaModulo} onChange={(e) => { setPotenciaModulo(e.target.value); calculaDemana() }} />

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
                      <select className="form-select" id="modalidade" value={modalidade} onChange={(e) => { setModalidade(e.target.value); setMod(e.target.value); calculaDemana() }}>
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


                      <select className="form-select" id="inputGrupo" value={grupo} onChange={(e) => { setGrupo(e.target.value); calculaDemana(); }} >
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

                    <div className="col-md-3  w-100 " id={demandasVisible === "" ? "divDemandaEscondida" : "divDemandaVisvel"}>
                      <label htmlFor="inputDemandaFP" className="form-label">
                        Demanda FP(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputDemandaFP" value={demandaFP} onChange={(e) => setDemandaFP(e.target.value)} onBlur={calculaDemana} />

                    </div>
                    <div className="col-md-3 w-100 " id={demandasVisible === "" ? "divDemandaEscondida" : "divDemandaVisvel"}>
                      <label htmlFor="inputEnergiaFP" className="form-label">
                        Energia FP(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputEnergiaFP" value={energia_FP} onChange={(e) => setEnergia_FP(e.target.value)} onBlur={calculaDemana} />

                    </div>
                    <div className="col-md-3   w-100" id={demandasVisible === "" ? "divDemandaEscondida" : "divDemandaVisvel"}>
                      <label htmlFor="inputEnergiaPonta" className="form-label">
                        Energia Ponta(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputEnergiaPonta" value={energiaPonta} onChange={(e) => setEnergia_ponta(e.target.value)} onBlur={calculaDemana} />
                    </div>

                  </div>

                  <div className="row p-2  d-flex flex-column" >
                    <div className="col-md-3  w-100" id={demandasVisible === "" ? "divDemandaEscondida" : "divDemandaVisvel"}>
                      <label htmlFor="inputDemandaPonta" className="form-label">
                        Demanda Ponta(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputDemandaPonta" value={demPonta} onChange={(e) => setDem_ponta(e.target.value)} onBlur={calculaDemana} />
                    </div>

                    <div className="col-md-3  w-100 " id={demandasVisible === "N" ? "divDemandaEscondida" : "divDemandaVisvel"}>
                      <label htmlFor="inputConsMedio" className="form-label font-weight-bold">
                        Consumo Médio(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputConsMedio" value={consumoMedio || ''} onChange={(e) => setConsumoMedio(e.target.value)}
                        onBlur={() => {
                          calculaDemana();
                          calculaGeracaoTotal();
                        }} onKeyUp={() => { calculaDemana(); }} />

                    </div>


                    <div className="col-md-3 w-100">
                      <label htmlFor="inputGeracaoSugerida" className="form-label">
                        Geração Sugerida(KWh):
                      </label>
                      <input type="text" readOnly className="form-control alinhaDireita" id="inputGeracaoSugerida" value={geracaoSugeridaParcial || ''} onChange={(e) => setGeracaoSugeridaParcial(e.target.value)} />
                    </div>



                  </div>

                </div>
              </div>
              <br />

              <div className='card'>
                <div className='card-header'>
                  Rateios
                </div>

                <div className="row">
                  <div className="mb-3 mb-sm-0">
                    <div className="card border-light-subtle">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table caption-top table-sm">
                            <thead>
                              <tr>
                                <th scope="col" className='tamanhoM'>Modalidade</th>
                                <th scope="col">Grupo</th>
                                <th scope="col">SubGrupo</th>
                                <th scope="col" className='alinhaCenter' >Consumo</th>
                                <th scope="col" className='alinhaCenter'>Dem. FP.</th>
                                <th scope="col" className='alinhaCenter'>Ener. F. P. </th>
                                <th scope="col" className='alinhaCenter'>Dem. P</th>
                                <th scope="col" className='alinhaCenter'>Eng. P</th>
                                <th scope="col" className='alinhaCenter'>G.Sugerida</th>
                                <th scope="col" className='alinhaCenter'>C.I.P</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>

                            <tbody>
                              {dados.map((item) => {
                                return (
                                  <tr key={item.id}>
                                    <td>
                                      <select className='form-select tamanhoModalidade' value={item.modality} onChange={e => { handleEdit(item.id, 'modality', e.target.value); }}>
                                        <option value="Convencional">Convencional</option>
                                        <option value="HA">Horos. Azul</option>
                                        <option value="HV">Horos. Verde</option>
                                        <option value="Rural">Rural</option>
                                      </select>
                                    </td>
                                    <td>
                                      <select className="form-select tamanhoTabela" id="inputGrupo" value={item.group} onChange={(e) => { handleEdit(item.id, 'group', e.target.value) }} >
                                        <option value="A">A </option>
                                        <option value="B">B </option>
                                      </select>
                                    </td>
                                    <td>
                                      <select className="form-select" id="inputGrupo" value={item.subgroup} onChange={(e) => { handleEdit(item.id, 'subgroup', e.target.value) }} >
                                        <option value="">Selecione</option>
                                        <option value="A3">A3</option>
                                        <option value="A4">A4</option>
                                        <option value="B1">B1</option>
                                        <option value="B2">B2</option>
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.avgconsumption}
                                        onChange={e => handleEdit(item.id, 'avgconsumption', e.target.value)}
                                        onBlur={() => {
                                          calculaGeracaoTotal()
                                        }}

                                      />
                                    </td>
                                    <td>

                                      <input
                                        type="number" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.demandaFP}
                                        onChange={e => handleEdit(item.id, 'demandaFP', e.target.value)}
                                        onBlur={() => {
                                          calculaGeracaoTotal()
                                        }}

                                      />

                                    </td>
                                    <td className='alinhaDireita'>
                                      <input
                                        type="text" pattern="[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.energiaFP}
                                        onChange={e => handleEdit(item.id, 'energiaFP', e.target.value)}
                                        onBlur={() => {
                                          calculaGeracaoTotal()
                                        }}

                                      />
                                    </td>
                                    <td className='alinhaDireita'>
                                      <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.demandaP}
                                        onChange={e => handleEdit(item.id, 'demandaP', e.target.value)}
                                        onBlur={() => {
                                          calculaGeracaoTotal()
                                        }}

                                      />
                                    </td>
                                    <td className='alinhaDireita'>

                                      <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.energiaP}
                                        onChange={e => handleEdit(item.id, 'energiaP', e.target.value)}
                                        onBlur={() => {
                                          calculaGeracaoTotal()
                                        }}

                                      />
                                    </td>
                                    <td className='alinhaDireita'>
                                      <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita ' readOnly
                                        value={item.suggestedGeneration}
                                        onChange={e => handleEdit(item.id, 'suggestedGeneration', e.target.value)}

                                      />
                                    </td>
                                    <td className='alinhaDireita'>
                                      <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.CIP}
                                        onChange={e => handleEdit(item.id, 'CIP', e.target.value)}
                                      />
                                    </td>
                                    <td>

                                      <div className="d-flex gap-2 justify-content-end">
                                        <button
                                          type="button"
                                          className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={handleAdd}
                                        >
                                          <AiOutlinePlus />
                                        </button>


                                        <button
                                          type="button"
                                          className="btn btn-light btn-sm text-danger d-flex align-items-center"
                                          data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                            setIdSelected(item.id)
                                          }}
                                        >
                                          <BsFillTrash3Fill />
                                          <MyModal userId={item.id} uc=" o rateio" onClick={handleAfterDel} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <br></br>


              <div class="card">
                <div class="card-header">
                  Informações Complementares
                </div>
                <div class="card-body">
                  <div className="row d-flex justify-content-start">

                    <div className="col-md-2">
                      <label htmlFor="inputGeracaoSugerida" className="form-label">
                        Ger. Sugerida(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita" readOnly id="inputGeracaoSugerida" value={geracaoTotal || ''} onChange={(e) => setGeracaoTotal(e.target.value)}
                      />
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="inputGeracaoSugerida" className="form-label">
                        Ger. Desejada(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita"  id="inputGeracaoSugerida" value={geracaoDesejada || ''} onChange={(e) => setGeracaoDesejada(e.target.value)}
                      />
                    </div>

                    <div className="col-md-1">
                      <label htmlFor="inputGeracaoSugerida" className="form-label">
                        N. Placas:
                      </label>
                      <input type="text" className="form-control alinhaDireita" readOnly id="inputGeracaoSugerida" value={nPlacas || ''} onChange={(e) => setNplacas(e.target.value)}
                      />
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="inputGeracaoSugerida" className="form-label">
                        Pot. do Sistema(KWh):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputGeracaoSugerida" value={potenciaSistema || ''} readOnly onChange={(e) => setPotenciaSistema(e.target.value)} />
                    </div>


                    <div className="col-md-2">
                      <label htmlFor="inputCIP" className="form-label">
                        CIP(R$):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputCIP" value={cip} onChange={(e) => setCip(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputbandeira" className="form-label">
                        Bandeira(R$):
                      </label>
                      <input type="text" className="form-control alinhaDireita" id="inputbandeira" value={bandeira} onChange={(e) => setbandeira(e.target.value)} />
                    </div>

                  </div>

                </div>
              </div>



            </div>
          </TabPanel>

          <TabPanel>
            <div className="container-fluid">
              <div className="row ">

              </div>
              <hr />
              <br />
              <div class="card">
                <div class="card-header">
                  Produtos que compõe o kit  
                </div>

                <div class="card-body">
                  <div className="row d-flex justify-content-start">
                  <div className="table-responsive">
                          
                  <TabelaProdutoEditavel token={token} dados={dadosProdutos} handleEdit={handleEditProds} 
                   handleAdd={handleAddProd} setIdSelected={setIdSelectedProd}
                   handleAfterDel={handleAfterDelProd} marcas={marcas} produtos={modeloInversor} onBlurType={onBlurMarca}
                   onBlurBrand={onBlurProdutoMarca}
                   />
                  </div>
                  </div>
                </div>
              </div>
              <br />



            </div>


          </TabPanel>

          <TabPanel>

            <br></br>
            <div className="card">
              <div class="card-header">
                Custos
              </div>



              <div class="card-body">
                <div className="row d-flex justify-content-start">

                  <div className="col-md-2">
                    <label htmlFor="inputGeracaoSugerida" className="form-label">
                      Pot. do Sistema(KWh):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputGeracaoSugerida" value={potenciaSistema || ''} readOnly onChange={(e) => setPotenciaSistema(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Preço do Kit Forn(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" onBlur={calculaCustos} value={precoKitFornecedor || ''} onChange={(e) => setPrecoKitForncedor(e.target.value)} />
                  </div>


                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Preço do Kit (R$)
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Margem (%)
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" value={margem} onChange={(e) => setMargem(e.target.value)} onKeyUp={calculaCustos} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Comissão  (%)
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" value={comissao} onChange={(e) => setComissao(e.target.value)} onKeyUp={calculaCustos} />
                  </div>


                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Complemento:
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputCIP" className="form-label">
                      Projeto(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCIP" value={projeto} onChange={(e) => setprojeto(e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputbandeira" className="form-label">
                      Imposto(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputbandeira" value={imposto} onChange={(e) => setImposto(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Montagem(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" value={montagem} onChange={(e) => setMontagemm(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Custo Total(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" value={custo_total} onChange={(e) => setCustoTotal(e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Margem (R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" value={margemCalculada} onChange={(e) => setMargemCalculada(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Comissão(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" value={valorComissao} onChange={(e) => setValorComissao(e.target.value)} />
                  </div>


                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Valor do Projeto(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" value={valorTotalProjeto} onChange={(e) => setValorTotalProjeto(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Lucro do Projeto(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" value={lucroProjeto} onChange={(e) => setLucroProjeto(e.target.value)} readOnly />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputPreco" className="form-label">
                      Lucro do Real(%):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputCodigo" value={lucroReal} onChange={(e) => setLucroReal(e.target.value)} readOnly />
                  </div>
                </div>

              </div>
            </div>
            <br></br>
            <div className='card'>
              <div class="card-header">
                Valores com  2% de Descontos
              </div>
              <div class="card-body">
                <div className="row d-flex justify-content-start">

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Projeto(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" value={projetoDesconto2} readOnly onChange={(e) => setprojetoDesconto2(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Margem(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={margem2} onChange={(e) => setMargem2(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Margem(%):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={margem2p} onChange={(e) => setMargem2(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Comissão(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={comissao2} onChange={(e) => setComissao2(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Lucro em R$:
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={lucro2} onChange={(e) => setLucro2(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Lucro em %:
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={lucroR2} onChange={(e) => setLucroR2(e.target.value)} />
                  </div>

                </div>



              </div>
            </div>

            <br></br>
            <div className='card'>
              <div class="card-header">
                Valores com  4% de Descontos
              </div>
              <div class="card-body">
                <div className="row d-flex justify-content-start">

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Projeto(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" value={projetoDesconto4} readOnly onChange={(e) => setprojetoDesconto4(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Margem(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={margem4} onChange={(e) => setMargem4(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Margem(%):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={margem4p} onChange={(e) => setMargem4p(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Comissão(R$):
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={comissao4} onChange={(e) => setComissao4(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Lucro em R$:
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={lucro4} onChange={(e) => setLucro4(e.target.value)} />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputFatorSimult" className="form-label" >
                      Lucro em %:
                    </label>
                    <input type="text" className="form-control alinhaDireita" id="inputFatorSimult" readOnly value={lucroR4} onChange={(e) => setLucroR4(e.target.value)} />
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


