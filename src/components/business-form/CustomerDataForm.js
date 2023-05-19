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
import { Propane } from "@mui/icons-material";
export default function CustomerDataForm(prop) {
  
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
  const [longitute, setLogintude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [idAdd, setIdAdd] = useState('')
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('')
  const [lbDocument, setLbDocument] = useState('CPF')
  const [maskDOC, setMaskDOC] = useState('999.999.999-99')
  const { token, setSunIndex } = useContext(AuthContext)
  const [IdClient, setIdClient] = useState('')
  
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
    prop.dados.name = (event.target.value)
  };

  React.useEffect(() => {

    prop.dados.tipoPessoa = tipoPessoa

    if (prop.dados && prop.dados.name){
      setName(prop.dados.name)
      setTipoPessoa(prop.dados.tipoPessoa)
      setDoc(prop.dados.doc)
      setPhone(prop.dados.phone)
      setZap(prop.dados.zap)
      setEstado(prop.dados.estado)
      handleEstadoValue(prop.dados.estado)
      setCidade(prop.dados.city)
      setCepData(prop.dados.cep)
      setRua(prop.dados.street)
      setBairro(prop.dados.neighborhood)
      setNumero(prop.dados.number)
      setEmail(prop.dados.email)
      setInformacoesAdicionais(prop.dados.addInformation)
      setIdAdd(prop.dados.idAdd)
      setIdClient(prop.dados.IdClient)
    }

  }, [])


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
    prop.dados.tipoPessoa = e.target.value
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
    prop.dados.estado = e.target.value
  }
  
  const searchCep = async () => {
    try {

      await api.get('/sunindex/cep/' + cepData).then((response) => {
        handleEstadoValue(response.data.state).then( (e)=>{
          
          setCidade(response.data.city)
          prop.dados.city=response.data.city
          setRua(response.data.street)
          prop.dados.street = response.data.street
          setBairro(response.data.neighborhood)  
          prop.dados.neighborhood = response.data.neighborhood
        }
          
          )
          
      }).then(searchSunIndex());

    } catch (err) {
      console.log(err)

    }
  };

  const searchSunIndex = async () => {
    try {

      let long = 0
      let lat = 0
      await api.get('/sunindex/getbycep/' + cepData).then((response) => {
        long = response.lon
        lat = response.lat
      });

      const response = await  fetch('https://developer.nrel.gov/api/pvwatts/v8.json?api_key=gMkc2FocnfJ99EMRUZfgs52ZmG6ElrjFf7qs0FLb&lat=-3.6895&lon=-40.3485&azimuth=0&system_capacity=0.86&tilt=7&array_type=1&module_type=1&losses=0');
      const ret = await response.json();
      console.log("passou aqui"+ ret)
      setSunIndex(ret.outputs.ac_annual)
    
    } catch (err) {
      console.log(err)

    }
  };

  const searchSunIndexByCityState = async () => {
    try {
      

      let long = 0
      let lat = 0

      await api.post('/sunindex/get',
        { "city": "Fortaleza", "state":"CE" }, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        long = response.data.lon
        lat = response.data.lat
      
      }).catch(console.log("eror"))


      console.log("passou long e lat", long +"" + lat)
      const response = await  fetch('https://developer.nrel.gov/api/pvwatts/v8.json?api_key=gMkc2FocnfJ99EMRUZfgs52ZmG6ElrjFf7qs0FLb&lat=-3.6895&lon=-40.3485&azimuth=0&system_capacity=0.86&tilt=7&array_type=1&module_type=1&losses=0');
      const ret = await response.json();
      setSunIndex(ret.outputs.ac_annual)
    
    } catch (err) {
      console.log(err)

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
        
        setName(response.data.fantasy)
        prop.dados.name = response.data.fantasy
        setEmail(response.data.email)
        prop.dados.email = response.data.email;
        setPhone(response.data.phone)
        prop.dados.phone = response.data.phone
        setZap(response.data.zap)
        prop.dados.zap = response.data.zap
        
        setInformacoesAdicionais(response.data.addInformation)
        prop.dados.addInformation = response.data.addInformation
        
        setEstado(response.data.Addresses[0].state)
        prop.dados.state = response.data.Addresses[0].state
        
        setCidade(response.data.Addresses[0].city)
        prop.dados.city = response.data.Addresses[0].city
        console.log(response.data.Addresses[0].city)

        setCepData(response.data.Addresses[0].postcode)
        prop.dados.cep = response.data.Addresses[0].postcode
        setRua(response.data.Addresses[0].street)
        prop.dados.street = response.data.Addresses[0].street
        setBairro(response.data.Addresses[0].neighborhood)
        prop.dados.neighborhood = response.data.Addresses[0].neighborhood
        setNumero(response.data.Addresses[0].number)
        prop.dados.number = response.data.Addresses[0].number
        setIdClient(response.data.id)
        prop.dados.number = response.data.id
        setIdAdd(response.data.Addresses[0].id)
        prop.dados.idAdd = response.data.Addresses[0].id

        searchSunIndex()
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
      prop.dados.zap = phone
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
          <MaskedTextField label={lbDocument} mask={maskDOC} variant="outlined" value={doc} onChange={(e) => {setDoc(e.target.value); prop.dados.doc = e.target.value}} onBlur={ handleFindClient}  ></MaskedTextField>
          </Grid>

          <Grid item xs={12} sm={4}>
          <TextField id="lbNome*" maxLength={50} className="form-control" label={lbFantasia} 
              variant="outlined" value={name || ''} onChange={(e) => { setName(e.target.value); prop.dados.name = e.target.value}} />
          </Grid>
          

          <Grid item xs={12} sm={4}>
           <MaskedTextField label={"Telefone"}  mask={'(99)9 9999-9999'} variant="outlined" value={phone} onChange={(e) => {setPhone(e.target.value); prop.dados.phone = e.target.value }} onBlur = {confirmPhoneNumber}  ></MaskedTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
          <MaskedTextField label={"Whatsapp"}  mask={'(99)9 9999-9999'} variant="outlined" value={zap} onChange={(e) => {setZap(e.target.value); prop.dados.zap = e.target.value}}   ></MaskedTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
          <MaskedTextField label={"CEP"}  mask={'99999-999'} variant="outlined" value={cepData} onChange={(e) => {setCepData(e.target.value); prop.dados.cep = e.target.value}} onBlur={(e) => { searchCep() }}></MaskedTextField>
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
                onChange={(e) => {setCidade(e.target.value); prop.dados.city=e.target.value }}
                onBlur={(e)=>searchSunIndexByCityState()}
              >
                {cidades != null && cidades ? cidades.map((option) => (<MenuItem key={option.nome} value={option.nome} >{option.nome}</MenuItem>)) : ""}

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <TextField id="Rua" maxLength={50} className="form-control " label='Rua'  variant="outlined" value={rua || ''} onChange={(e) => setRua(e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={4}>
          <TextField id="Bairro" maxLength={50} className="form-control" label='Bairro'  variant="outlined" value={bairro|| ''} onChange={(e) => setBairro(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
             <TextField type="number" label={"Número"}  variant="outlined" value={num} onChange={(e) => setNumero(e.target.value)} ></TextField>
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
