import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import MaskedTextField from '../communs/MaskedTextField';
import UFTextField from '../communs/UFTextField';
import api from '../../api';
import { cpfMask } from './cpfmask'
import { cnpjMask } from './cnpjmask'
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export default function CustomerDataForm() {
  const [type, setType] = React.useState("");
  const [item, setItem] = React.useState("");
  const [name, setName] = useState('')
  const [lbFantasia, setLbFantasia] = useState('Nome')
  const [num, setNumero] = useState('')
  const [id, setId] = useState('')
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
  const [lbDocument, setLbDocument] = useState('CPF')
  const [maskDOC, setMaskDOC] = useState('999.999.999-99')
  const { token, userName, afflitedId, idLogged, afflited } = useContext(AuthContext)
  const [IdClient, setIdClient] = useState('')
  
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const personType = ["Física", "Jurídica"];

  const handleChangeItem = (event) => {
    setItem(event.target.value);
  };

  const list = ["Item 1", "Item 2"];

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
  async function handleFindClient(e) {
    e.preventDefault();

    console.log("passou no cpf")
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
  const confirmPhoneNumber = () => {
    const confirmed = window.confirm('O número de WhatsApp pode ser o mesmo do número de telefone?')
    if (confirmed) {
      setZap(phone)
    }
  }

  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
          Informações do cliente
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth >
              <InputLabel>Tipo</InputLabel>
              <Select
                id="demo-simple-select"
                value={tipoPessoa}
                label="Tipo"
                onChange={(e) => { handleTipoPessoa(e) }
                }
                onBlur={handleFindClient}
              >
                 <MenuItem value={'F'}>Física</MenuItem>
                <MenuItem value={'J'}>Jurídica</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
          <MaskedTextField label={lbDocument} mask={maskDOC} variant="outlined" value={doc} onChange={(e) => setDoc(e.target.value)} onBlur={ handleFindClient}  ></MaskedTextField>
          </Grid>

          <Grid item xs={12} sm={4}>
          <TextField id="lbNome*" maxLength={50} className="form-control" label={lbFantasia} 
              variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} />
          </Grid>
          

          <Grid item xs={12} sm={4}>
           <MaskedTextField label={"Telefone"}  mask={'(99)9 9999-9999'} variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)}  ></MaskedTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
          <MaskedTextField label={"Whatsapp"}  mask={'(99)9 9999-9999'} variant="outlined" value={zap} onChange={(e) => setZap(e.target.value)} onBlur = {confirmPhoneNumber}  ></MaskedTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
          <MaskedTextField label={"CEP"}  mask={'99999-999'} variant="outlined" value={cepData} onChange={(e) => setCepData(e.target.value)} onBlur={(e) => { searchCep() }}></MaskedTextField>
          </Grid>

          <Grid item xs={12} sm={4}>
          <UFTextField variant="outlined"  value={estado} onChange={handleEstado} ></UFTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
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
          </Grid>
          <Grid item xs={12} sm={4}>
          <TextField id="Rua" maxLength={50} className="form-control " label='Rua'  variant="outlined" value={rua || ''} onChange={(e) => setRua(e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={4}>
          <TextField id="Bairro" maxLength={50} className="form-control" label='Bairro'  variant="outlined" value={bairro || ''} onChange={(e) => setBairro(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
             <MaskedTextField type="number" label={"Número"}   type='number' variant="outlined" value={num} onChange={(e) => setNumero(e.target.value)} ></MaskedTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
          <TextField id="email" maxLength={50} className="form-control" label='E-mail' variant="outlined" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={12}>
          <TextField id="informacoesAdicionais" maxLength={50} className="form-control" label='Informações Adicionais' variant="outlined" value={informacoesAdicionais || ''} onChange={(e) => setInformacoesAdicionais(e.target.value)} />
          </Grid>
        </Grid>
      </box>
    </React.Fragment>
  );
}
