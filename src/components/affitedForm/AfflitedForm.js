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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '/node_modules/react-tabs/style/react-tabs.scss';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import TabelaComposePrice from '../comoseprices-table';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MaskedTextField from '../communs/MaskedTextField';
import UFTextField from '../communs/UFTextField';
import NumberFormatCustom from '../communs/DecimalMaskedTextField';
import { NumberFormatBase, NumericFormat } from 'react-number-format';

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
  const [num, setNumero] = useState('')
  const [id, setId] = useState('')
  const [lbFantasia, setLbFantasia] = useState('Nome')
  const [lbDocument, setLbDocument] = useState('CPF')
  const [exibeCorporateName, setExibeCorporateName] = useState('')
  const [tipoPessoa, setTipoPessoa] = useState('F')
  const [corporateName, setCorporateName] = useState('')
  const [doc, setDoc] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cepData, setCepData] = useState('')
  const [zap, setZap] = useState('')
  const [tempzap, setTempzap] = useState('')
  const [estado, setEstado] = useState('')
  const [cidades, setCidades] = useState([])
  const [cidade, setCidade] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [idAdd, setIdAdd] = useState('')
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('')
  const [maskDOC, setMaskDOC] = useState('999.999.999-99')
  const [idRateio, setIdRateio] = useState(1)
  const [idSelected, setIdSelected] = useState()
  const [perca, setPerca] = useState('')
  const [profit, setLucro] = useState('')
  const [commission, setComissao] = useState('')
  const { token } = useContext(AuthContext)
  const handleInput = ({ target: { value } }) => setPhone(value);
  const handleInputZap = ({ target: { value } }) => setZap(value);
  const handleInputCep = ({ target: { value } }) => setCepData(value);
  const [values, setValues] = useState({
    numberformat: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const [dados, setDados] = useState([
    {
      idInt: 1, name: "", value: '0', type: 'P'
    }

  ]);

  const { clientId } = useParams();
  useEffect(() => {
    handleEstadoValue("AC")
    if (clientId) {
      loadClienById(clientId)
    }
    return () => { }

  }, [])

  const handleEdit = (id, campo, valor) => {
    setDados(prevDados => {
      const novoDados = [...prevDados];
      const index = novoDados.findIndex(item => item.idInt === id);
      novoDados[index][campo] = valor;
      return novoDados;
    });
  };

  const handleAdd = () => {
    let idN = idRateio + 1

    let novoItem =
    {
      idInt: idN, name: "", value: '0', type: 'P'
    }
    setIdRateio(idN)
    setDados(prevDados => [...prevDados, novoItem]);
  };

  const handleAfterDel = () => {

    const quantidadeItens = dados.length;
    if (quantidadeItens > 1) {
      setDados(prevDados => prevDados.filter(item => item.idInt !== idSelected));
    }

  }

  async function loadClienById(id) {

    try {
      await api.get('/afflited/get/' + id, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        setId(response.data.id)
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
        handleEstadoValue(response.data.Addresses[0].state, response.data.Addresses[0].city)
        if (cidades){
          setCidade(response.data.Addresses[0].city)
        }
        
        setRua(response.data.Addresses[0].street)
        setBairro(response.data.Addresses[0].neighborhood)
        setIdAdd(response.data.Addresses[0].id)
        setInformacoesAdicionais(response.data.addInformation)
        setEmail(response.data.email)
        setNumero(response.data.Addresses[0].number)
        setLucro(response.data.profit)
        setPerca(response.data.lost)
        setComissao(response.data.commission)
        if (response.data.Prices.length > 0) {
          setDados(response.data.Prices)
        }

      }).catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      });

    } catch (err) {
      console.log(err)
    }
  }

  function validaCampos(name, phone, documento, cep, zap) {

    if (name === "") {
      toast.error("Nome é obrigatório", {
        autoClose: 1000,
      })
      return false;
    }

    if (phone === "" || phone === undefined || phone === null) {
      toast.error("Telefone é obrigatório", {
        autoClose: 1000,
      })
      return false;
    }
    console.log(phone)

    let phonenomask = phone.replace('_', "");

    if (phonenomask.length < 15) {
      toast.error("Telefone é inválido", {
        autoClose: 1000,
      })
      return false;
    }

    if (zap !== "" && zap !== undefined && zap != null) {
      let zapnomask = zap.replace('_', "");
      if (zapnomask.length < 15) {
        toast.error("WhatsApp é inválido", {
          autoClose: 1000,
        })
        return false;
      }
    }

    if (cep !== "" && cep !== undefined) {
      let cepnomask = cep.replace('_', "");
      if (cepnomask.length < 8) {
        toast.error("CEP é inválido", {
          autoClose: 1000,
        })
        return false;
      }
    }

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
      setLbFantasia("Nome*");
      setExibeCorporateName("");
      setLbDocument("CPF")
      setTipoPessoa("F")
      setMaskDOC("999.999.999-99")

    } else {
      setLbFantasia("Fantasia*");
      setExibeCorporateName("J")
      setLbDocument("CNPJ")
      setTipoPessoa("J")
      setMaskDOC("99.999.999/9999-99")

    }

  }

  async function handleEstadoValue(value, cidade) {

    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + value + "/municipios";

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    await fetch(url, requestInfo)
      .then(resposta => resposta.json())
      .then((json) => setCidades(json))
      .catch((error) => console.log(error));

    setEstado(value)
    if(cidade && cidades){
    setCidade(cidade)
    }
  }

  async function handleEstado(e) {
    handleEstadoValue(e.target.value)
  }

  const searchCep = async () => {
    try {

      await api.get('/sunindex/cep/' + cepData).then((response) => {
        handleEstadoValue(response.data.state, response.data.city)
          .then(setRua(response.data.street)).then(setBairro(response.data.neighborhood))
      });

    } catch (err) {

    }
  };

  const navigate = useNavigate();

  async function save(tipoPesoa, name, corpName, documento, phone, zap,
    cep, estado, cidade, logradouro, bairro,
    inform, email, id, idAdd, num, profit, lost, commission, dados) {

    const json = {
      fantasy: name,
      num: num,
      corporatename: corpName,
      phone: phone,
      document: documento,
      email: email,
      tipo: tipoPesoa,
      zap: zap,
      addInformation: inform,
      profit: parseFloat(String(profit).replace(',', '.')),
      lost: parseFloat(String(lost).replace(',', '.')),
      commission: parseFloat(String(commission).replace(',', '.')),
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
      ],
      Prices: dados
    }
    
    if (id) {
      await api.patch('/afflited/update/' + id, json
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
      await api.post('/afflited/create', json
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

  async function handleSaveUser(e) {

    e.preventDefault();

    const valida = validaCampos(name, phone, doc, cepData, zap);
    console.log("aqui" + id)
    if (valida) {

      try {
        await save(tipoPessoa, name, corporateName, doc, phone, zap, cepData,
          estado, cidade, rua, bairro, informacoesAdicionais,
          email, id, idAdd, num, profit, perca, commission,dados)

        navigate(-1);
        toast.success("Operação realizada com sucesso!", {
          autoClose: 1000,
        })

      } catch (error) {
        console.log(error);
      }
    }
  }
  const confirmPhoneNumber = () => {
    const confirmed = window.confirm('O número de WhatsApp pode ser o mesmo do número de telefone?')
    if (confirmed) {
      setZap(phone)
    }
  }
  return (

    <div className="p-3 mb-3 bg-white border rounded-3">
      <ToastContainer />

      <form className="row g-3" onSubmit={handleSaveUser}>

        <Tabs>
          <TabList>
            <Tab>Informações Básicas</Tab>
            <Tab> Camposição do Preço </Tab>
            <Tab> Configurações Adicionais</Tab>
          </TabList>
          <TabPanel>
            <div className='divInfo p-3 mb-3 bg-white border rounded-3'>
              <div className='col-md-2 tipopessoa'>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo Pessoa</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tipoPessoa}
                    label="Categoria"
                    onChange={(e) => { handleTipoPessoa(e) }}

                  >
                    <MenuItem value={'F'}>Física</MenuItem>
                    <MenuItem value={'J'}>Jurídica</MenuItem>

                  </Select>
                </FormControl>
              </div>
              
              <div className="col-md-2 doc"  >

                <MaskedTextField label={lbDocument} mask={maskDOC} variant="outlined" value={doc} onChange={(e) => setDoc(e.target.value)}  ></MaskedTextField>
              </div>
              <div className={tipoPessoa==="F"?"nome":"nomej"}>
                <TextField id="lbNome*" maxLength={50} className="form-control" label={lbFantasia}
                  variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col-md-4 razaoSocial" id={exibeCorporateName === "" ? "divRazaoEscondida" : "divRazaoVisvel"} >
                <TextField id="corporateName" maxLength={50} className="form-control" label='Razão Social' variant="outlined" value={corporateName || ''} onChange={(e) => setCorporateName(e.target.value)} />
              </div>
              <div className="col-md-2 fone">
                <MaskedTextField label={"Telefone"} mask={'(99)9 9999-9999'} variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)}  ></MaskedTextField>
              </div>
              <div className="col-md-2 zap">
                <MaskedTextField label={"Whatsapp"} mask={'(99)9 9999-9999'} variant="outlined" value={zap} onChange={(e) => setZap(e.target.value)} onBlur={confirmPhoneNumber}  ></MaskedTextField>
              </div>
              <div className={tipoPessoa==="J"?"cepj":"cep"}>
                <MaskedTextField label={"CEP"} mask={'99999-999'} variant="outlined" value={cepData} onChange={(e) => setCepData(e.target.value)} onBlur={(e) => { searchCep() }}></MaskedTextField>
              </div>
              <div className='col-md-2 estado'>
                <UFTextField variant="outlined" value={estado} onChange={handleEstado} ></UFTextField>
              </div>
              <div className='col-md-2 estado'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cidade}
                    label="inputMarca"
                    onChange={(e) => setCidade(e.target.value)}
                  >
                    {cidades != null && cidades ? cidades.map((option) => (<MenuItem key={option.nome} value={option.nome} >{option.nome}</MenuItem>)) : ""}

                  </Select>
                </FormControl>
              </div>
              <div className={tipoPessoa==="F"?"rua":"ruaj"}  >
                <TextField id="Rua" maxLength={50} className="form-control" label='Rua' variant="outlined" value={rua || ''} onChange={(e) => setRua(e.target.value)} />
              </div>
              <div className="col-md-4 bairro"  >
                <TextField id="Bairro" maxLength={50} className="form-control" label='Bairro' variant="outlined" value={bairro || ''} onChange={(e) => setBairro(e.target.value)} />
              </div>
              <div className="col-md-2 estado">
                <TextField type="number" label={"Número"} type='number' variant="outlined" value={num} onChange={(e) => setNumero(e.target.value)} ></TextField>
              </div>
              <div className={tipoPessoa==="J"?"emailj":"email"}  >
                <TextField id="email" maxLength={50} className="form-control" label='E-mail' variant="outlined" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="col-md-4 adicionais"  >

                <TextField id="informacoesAdicionais" maxLength={50} className="form-control" label='Informações Adicionais' variant="outlined" value={informacoesAdicionais || ''} onChange={(e) => setInformacoesAdicionais(e.target.value)} />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='divInfo p-3 mb-3 bg-white border rounded-3'>

              <div className="table-responsive">
                <TabelaComposePrice dados={dados} handleEdit={handleEdit}
                  handleAdd={handleAdd} setIdSelected={setIdSelected}
                  handleAfterDel={handleAfterDel}
                />

              </div>

            </div>
          </TabPanel>
          <TabPanel>
            <div className='divInfo p-3 mb-3 bg-white border rounded-3'>
              <div className="col-md-2"  >
                <NumberFormatCustom label={"Perca(%)"}  decimal={2} value={perca} onChange={(e) => setPerca(e.target.value)} ></NumberFormatCustom>
              </div>
              <div className="col-md-2"  >
                <NumberFormatCustom label={"Lucro (%)"}  variant="outlined" decimal={2} value={profit} onChange={(e) => setLucro(e.target.value)} ></NumberFormatCustom>
              </div>
              <div className="col-md-3"  >
                <NumberFormatCustom label={"Comissão padrão (%)"}  variant="outlined" decimal={2} value={commission} onChange={(e) => setComissao(e.target.value)} ></NumberFormatCustom>
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

export default AfflitedForm;


