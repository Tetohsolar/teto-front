import { AuthContext } from '../../context/AuthContext';
import './clientform.scss';
import { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpfMask } from './cpfmask'
import { cnpjMask } from './cnpjmask'
import InputMask from 'react-input-mask';
import api from '../../api';
import { useParams, useNavigate } from "react-router-dom";
import SelectEstado from '../estadosbr';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MaskedTextField from '../communs/MaskedTextField';
import UFTextField from '../communs/UFTextField';

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

const ClientForm = (props) => {

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
  const [estado, setEstado] = useState('')
  const [cidades, setCidades] = useState([])
  const [cidade, setCidade] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [idAdd, setIdAdd] = useState('')
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('')
  const { token, afflitedId } = useContext(AuthContext)
  const handleInput = ({ target: { value } }) => setPhone(value);
  const handleInputZap = ({ target: { value } }) => setZap(value);
  const handleInputCep = ({ target: { value } }) => setCepData(value);
  const { clientId } = useParams();
  const [maskDOC, setMaskDOC] = useState('999.999.999-99')

  useEffect(() => {

    handleEstadoValue('AC')

    if (clientId) {
      loadClienById(clientId)
    }

    return () => { }

  }, [])

  async function loadClienById(id) {
     let cidadeAux=""
    try {

      await api.get('/client/get/' + id, {
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
        setZap(response.data.zap)
        setCepData(response.data.Addresses[0].postcode)
        setEstado(response.data.Addresses[0].state)
        handleEstadoValue(response.data.Addresses[0].state)
        if (cidades){
        setCidade(response.data.Addresses[0].city)
      }
        setRua(response.data.Addresses[0].street)
        setBairro(response.data.Addresses[0].neighborhood)
        setIdAdd(response.data.Addresses[0].id)
        setInformacoesAdicionais(response.data.addInformation)
        setId(response.data.id)
        setEmail(response.data.email)
        setNumero(response.data.Addresses[0].number)

      }).then( ()=>{
        
      } ).catch((error) => {
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
    setLbFantasia("Nome*")
    setDoc('')
    setLbDocument("CPF*")
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
      toast.error("Nome é obrigatório", {
        autoClose: 1000,
      })
      return false;
    }
    if (phone === "") {
      toast.error("Telefone é obrigatório", {
        autoClose: 1000,
      })
      return false;
    }

    let phonenomask = phone.replace('_', '');


    if (phonenomask.length < 14) {
      toast.error("Telefone é invalido", {
        autoClose: 1000,
      })
      return false;
    }

    if (zap) {

      let zapnomask = zap.replace('_', '');

      if (zapnomask.length < 14) {
        toast.error("WhatsApp é invalido", {
          autoClose: 1000,
        })
        return false;
      }
    }
    console.log(cep)

    if (cep) {
      let cepnomask = cep.replace('_', '');

      if (cepnomask.length < 9) {
        toast.error("Cep é invalido", {
          autoClose: 1000,
        })
        return false;
      }
    }

    if (documento !== '') {
      if (documento.length <= 14 && !cpf.isValid(documento)) {
        toast.error(lbDocument + " inválido", {
          autoClose: 1000,
        }
        ); throw new Error;

      } else if (documento.length > 14 && !cnpj.isValid(documento)) {
        toast.error(lbDocument + " inválido", {
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
      setLbDocument("CPF*")
      setTipoPessoa("F")
      setMaskDOC("999.999.999-99")

    } else {
      setLbFantasia("Fantasia*");
      setExibeCorporateName("J")
      setLbDocument("CNPJ*")
      setTipoPessoa("J")
      setMaskDOC("99.999.999/9999-99")

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

    await fetch(url, requestInfo)
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
        handleEstadoValue(response.data.state).then(setCidade(response.data.city))
          .then(setRua(response.data.street)).then(setBairro(response.data.neighborhood))
      });

    } catch (err) {
      console.log(err)

    }
  };

  const navigate = useNavigate();

  async function save(tipoPesoa, name, corpName, documento, phone, zap, cep, estado, cidade, logradouro, bairro, inform, email, id, idAdd, num) {

    const json = {
      fantasy: name,
      corporatename: corpName,
      phone: phone,
      document: documento,
      email: email,
      tipo: tipoPesoa,
      zap: zap,
      addInformation: inform,
      AffiliatedId: afflitedId,
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

  async function handleSaveUser(e) {

    e.preventDefault();

    if (validaCampos(name, phone, doc, cepData, zap)) {
      try {
        await save(tipoPessoa, name, corporateName, doc, phone, zap, cepData, estado, cidade, rua, bairro, informacoesAdicionais, email, id, idAdd, num)
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

    <div className="p-3 mb-3 bg-white border rounded-3 divClientData">
      <ToastContainer />
      <form className="row g-3" onSubmit={handleSaveUser}>

        <div className='divInfo p-3 mb-3 bg-white border rounded-3'>
          <div className='col-md-3 tipopessoac'>

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
          <div className="col-md-2 docc"  >

            <MaskedTextField label={lbDocument} mask={maskDOC} variant="outlined" value={doc} onChange={(e) => setDoc(e.target.value)}  ></MaskedTextField>
          </div>
          <div className={tipoPessoa === "F" ? "nomec" : "nomejc"}>
            <TextField id="lbNome*" maxLength={50} className="form-control" label={lbFantasia}
              variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-md-4 razaoSocialc" id={exibeCorporateName === "" ? "divRazaoEscondida" : "divRazaoVisvel"} >
            <TextField id="corporateName" maxLength={50} className="form-control" label='Razão Social' variant="outlined" value={corporateName || ''} onChange={(e) => setCorporateName(e.target.value)} />
          </div>
          <div className="col-md-2 fonec">
            <MaskedTextField label={"Telefone"} mask={'(99)9 9999-9999'} variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur = {confirmPhoneNumber}  ></MaskedTextField>
          </div>
          <div className="col-md-2 zapc">
            <MaskedTextField label={"Whatsapp"} mask={'(99)9 9999-9999'} variant="outlined" value={zap} onChange={(e) => setZap(e.target.value)}   ></MaskedTextField>
          </div>
          <div className={tipoPessoa === "J" ? "cepjc" : "cepc"}>
            <MaskedTextField label={"CEP"} mask={'99999-999'} variant="outlined" value={cepData} onChange={(e) => setCepData(e.target.value)} onBlur={(e) => { searchCep() }}></MaskedTextField>
          </div>
          <div className='col-md-2 estadoc'>
            <UFTextField variant="outlined" value={estado} onChange={handleEstado} ></UFTextField>
          </div>
          <div className='col-md-2 estadoc'>
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
          <div className={tipoPessoa === "F" ? "ruac" : "ruajc"}  >
            <TextField id="Rua" maxLength={50} className="form-control " label='Rua' variant="outlined" value={rua || ''} onChange={(e) => setRua(e.target.value)} />
          </div>
          <div className="col-md-5 bairroc"  >
            <TextField id="Bairro" maxLength={50} className="form-control" label='Bairro' variant="outlined" value={bairro || ''} onChange={(e) => setBairro(e.target.value)} />
          </div>
          <div className="col-md-2 numeroc">
            <MaskedTextField type="number" label={"Número"} type='number' variant="outlined" value={num} onChange={(e) => setNumero(e.target.value)} ></MaskedTextField>
          </div>
          <div className={tipoPessoa === "J" ? "emailjc" : "emailc"}  >
            <TextField id="email" maxLength={50} className="emailc" label='E-mail' variant="outlined" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="col-md-4 adicionaisc"  >

            <TextField id="informacoesAdicionais" maxLength={50} className="form-control" label='Informações Adicionais' variant="outlined" value={informacoesAdicionais || ''} onChange={(e) => setInformacoesAdicionais(e.target.value)} />
          </div>
        </div>
        <div className="customerCliente">
          <button className="btn btn-primary text-light" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>

  );
};

export default ClientForm;


