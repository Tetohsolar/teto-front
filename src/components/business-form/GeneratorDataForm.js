import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import TabelaRateioBusiness from "../rateio-table";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import api from '../../api';
import NumberFormatCustom from "../communs/DecimalMaskedTextField";



export default function GeneratorDataForm(props) {

  const { token, sunIndex, afflitedId, idLogged, afflited } = React.useContext(AuthContext)
  const [potenciaSistema, setPotenciaSistema] = React.useState(0)
  const [potenciaModulo, setPotenciaModulo] = React.useState('465')
  const [nPlacas, setNplacas] = React.useState(0)
  const [potenciaConsiderada, setPotenciaConsiderada] = React.useState('')
  const [geracaoDesejada, setGeracaoDesejada] = React.useState('')
  const [geracaoSugerida, setGeracaoSugerida] = React.useState('')
  const [geracaoTotal, setGeracaoTotal] = React.useState(0.0)
  const [geracaoSugeridaParcial, setGeracaoSugeridaParcial] = React.useState('')
  const [idRateio, setIdRateio] = React.useState(1)
  
  const [fatorSolar, setFatorSolar] = useState('')
  const [perdas, setPerdas] = useState(afflited.lost)
  const [modalidade, setModalidade] = useState('')
  const [consumoMedio, setConsumoMedio] = useState('')
  const [demandaFP, setDemandaFP] = useState('')
  const [energia_FP, setEnergia_FP] = useState('')
  const [demPonta, setDem_ponta] = useState('')
  const [energiaPonta, setEnergia_ponta] = useState('')
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState('')
  const [tipoL, setTipoL] = useState('')
  const [telhado, setTelhado] = useState('')
  const [telhados, setTelhados] = useState([])
  const [tipoSistema, setTipoSistema] = useState('')
  const [tipoSistemas, setTipoSistemas] = useState([])
  const [subGrupo, setSubGrupo] = useState('')
  const [grupo, setGrupo] = useState('')
  const [geracaoSu, setGeracaoSu] = useState('')
  const [cip, setCip] = useState('')
  const [bandeira, setBandeira] = useState('')
  const [potenciaS, setPotenciaS] = React.useState('')
  const [modalidades, setModalidades] = useState([""])

  const [idSelected, setIdSelected] = React.useState('')

  const [dados, setDados] = React.useState([
    {
      id: 1, modality: "Convencional", group: 'B', subgroup: 'B1', demandaFP: 0, energiaFP: 0,
      demandaP: 0, energiaP: 0, avgconsumption: 0, suggestedGeneration: 0, CIP: 0
    }

  ]);

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

  React.useEffect(() => {
    console.log(props.dados.sunIndex)

    buscaTelhados()
    buscaSistema()
    if (!props.dados.lost){
    let potConsiderada = sunIndex * (1-(perdas/100))
    props.dados.sunIndex = sunIndex
    props.dados.consideredpower = potConsiderada
    props.dados.lost = perdas
    setFatorSolar(sunIndex)
    setPotenciaConsiderada(potConsiderada)
    
    }else{

      setPerdas(props.dados.lost)
      setTipoL(props.dados.typeConnection)
      setTelhado(props.dados.roof)
      setTipoSistema(props.dados.type)
      setCip(props.dados.cip)
      setBandeira(props.dados.flag)
      setSubGrupo(props.dados.subgroup)
      handleSubGrup(props.dados.subgroup)
      setGrupo(props.dados.group)
      setModalidade(props.dados.modality)
      setConsumoMedio(props.dados.avgconsumption)
      setGeracaoSugerida(props.dados.suggestedGeneration)
      setGeracaoDesejada(props.dados.suggestedDesired)
      setDemandaFP(props.dados.demadaFp)
      setDem_ponta(props.dados.demandaP)
      setEnergia_FP(props.dados.energiaFP)
      setEnergia_ponta(props.dados.energiaP)
      let potConsiderada = sunIndex * (1-(perdas/100))
      props.dados.sunIndex = sunIndex
      props.dados.consideredpower = potConsiderada
      props.dados.lost = perdas
      setFatorSolar(sunIndex)
      setPotenciaConsiderada(potConsiderada)

    }
    console.log(props.dados)
  }, [])



  function calculaPotenciaConsidedara() {

    let remofot = String(fatorSolar).replace(".", "");

    let f = parseFloat(remofot) * (1 - (perdas / 100))
    if (isNaN(f)) {
      setPotenciaConsiderada(0)
    } else {
      setPotenciaConsiderada(Math.ceil(f))
    }
    let potSistema = 0;

  }
  function calculaDemana() {
    handleGrupoAConsMedio()
    /*calculaGeracaoTotal()*/
    

  }
  function handleGrupoAConsMedio(e) {
    buscaGeracaoSugerida()
    
    if (modalidade === "Convencional" || modalidade === "Rural" || modalidade === "Outros") {
      setGeracaoSugerida(consumoMedio)
      props.dados.avgconsumption = consumoMedio;
      setGeracaoSugeridaParcial(consumoMedio)
      props.dados.suggestedGeneration = consumoMedio;
      setGeracaoDesejada(consumoMedio)
      props.dados.suggestedDesired = consumoMedio;
      return
    }

    
    if (modalidade === "Horos. Azul" && subGrupo === "A3" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      props.dados.avgconsumption = valor;
      setConsumoMedio(energiaPonta)
      //setGeracaoDesejada(energiaPonta)
      const result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result)
      setGeracaoDesejada(result)
      props.dados.suggestedGeneration = result;
      props.dados.suggestedDesired = result;
    }

    else if (modalidade === "Horos. Verde" && subGrupo === "A4" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      
      setConsumoMedio(valor)
      props.dados.avgconsumption = valor;
      //setGeracaoDesejada(valor)
      let result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))

      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result)
      setGeracaoDesejada(result)
      props.dados.suggestedGeneration = result;
      props.dados.suggestedDesired = result;
    }

    else if (modalidade === "Horos. Azul" && subGrupo === "A4" && demandaFP !== null && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(demandaFP) + parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)
      props.dados.avgconsumption = valor;
      //GeracaoSugerida
      let result = parseFloat(demandaFP) + parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result)
      setGeracaoDesejada(result)
      props.dados.suggestedGeneration = result;
      props.dados.suggestedDesired = result;

    }
    else {
      setConsumoMedio('')
      setGeracaoSugerida('')
      setGeracaoSugerida("")
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

  function limparDemandas() {
      props.dados.avgconsumption = "";
      props.dados.demadaFp="";
      props.dados.demandaP="";
      props.dados.energiaFP="";
      props.dados.suggestedDesired="";
      props.dados.suggestedGeneration="";
      
      setConsumoMedio("")
      setEnergia_FP("")
      setEnergia_ponta("")
      setDem_ponta("")
      setDemandaFP("")
      setGeracaoDesejada("")
      setGeracaoSugeridaParcial("")
      setGeracaoSugerida("")
     
  }

  function handleSubGrup(value) {
    if (value === "B1") {
      setGrupo("B")
      setModalidades(['Convencional'])
      setModalidade("Convencional")
      props.dados.modality = "Convencional"
      props.dados.group = "B"
    }

    if (value === "B2") {
      setGrupo("B")
      setModalidades(['Rural'])
      setModalidade("Rural")
      props.dados.modality = "Rural"
      props.dados.group = "B"
    }
    if (value === "B3") {
      setModalidades(['Outros'])
      setGrupo("B")
      setModalidade("Outros")
      props.dados.modality = "Outros"
      props.dados.group = "B"
      
    }

    if (value === "A3" ) {
      setGrupo("A")
      setModalidades(['Horos. Azul'])
      setModalidade("Horos. Azul")
      props.dados.modality = "Horos. Azul"
      props.dados.group = "A"
    }

    if (value === "A4" ) {
      setGrupo("A")
      setModalidades(['Horos. Azul', 'Horos. Verde'])
      props.dados.group = "A"
    }

  }

  function calculaGeracaoTotal() {
    
   /* const campoParaSomar = 'suggestedGeneration'; // Campo do JSON que será somado
    const soma = dados.reduce((acumulador, item) => acumulador + parseFloat(item[campoParaSomar]), 0);
    let sugg = parseFloat(geracaoDesejada) + parseFloat(soma);
    setGeracaoTotal(sugg)
    setGeracaoSugerida(sugg)
    setGeracaoDesejada(sugg)
    console.log(sugg)
    //let placas = Math.floor((sugg * 12000) / (potenciaConsiderada * potenciaModulo))

    //setNplacas(placas)
    //let potSistema = (placas * potenciaModulo) / 1000;
    //var numeroArredondado = Math.round(potSistema * 100) / 100;
    //setPotenciaSistema(numeroArredondado)
  */  }
  async function buscaTelhados() {


    await api.get('/roofs/all',

      {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }
    ).then((response) => {
      setTelhados(response.data.roofs)
    })

  }
  async function buscaSistema() {


    await api.get('/typesystem/all',

      {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }
    ).then((response) => {
      setTipoSistemas(response.data.types)
    })

  }


  const [item, setItem] = React.useState("");

  const handleChange = (event) => {

    setItem(event.target.value);
  };

  const list = ["Item 1", "Item 2"];

  return (
    <React.Fragment>
      <box>
        <div class="card w-100">
          <div class="card-header">
            Informações principais
          </div>
          <Typography variant="h6" gutterBottom>

          </Typography>
          <Grid container spacing={3}>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Perdas"} variant="outlined" decimal={2} value={perdas} onChange={(e) =>{ setPerdas(e.target.value); props.dados.lost = e.target.value}} onBlur={() => { calculaPotenciaConsidedara(); }} onKeyUp={calculaPotenciaConsidedara} />

            </Grid>


            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="tipoLigacao">Tipo de Ligação</InputLabel>
                <Select
                  labelId="tipoLigacao"
                  id="tipoLigacao"
                  value={tipoL}
                  label="Telhado"
                  onChange={(e) => {setTipoL(e.target.value); props.dados.typeConnection = e.target.value}}

                >
                  <MenuItem value={'Monofásico'}>Monofásico</MenuItem>
                  <MenuItem value={'Bifásico'}>Bifásico</MenuItem>
                  <MenuItem value={'Trifásico'}>Trifásico</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="tipoTelhado">Tipo de Telhado</InputLabel>
                <Select
                  labelId="tipoTelhado"
                  id="tipoTelhado"
                  value={telhado}
                  label="Categoria"
                  onChange={(e) => {setTelhado(e.target.value); props.dados.roof = e.target.value}}

                >
                  {
                    telhados.length > 0 &&
                    telhados.map((option, i) => {
                      return (<MenuItem key={i} value={option.id}>{option.name}</MenuItem>)
                    })
                  }

                </Select>
              </FormControl>

            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="tipoSistema">Tipo de sistema</InputLabel>
                <Select
                  labelId="tipoSistema"
                  id="tipoSistema"
                  value={tipoSistema}
                  label="Sistema"
                  onChange={(e) => {setTipoSistema(e.target.value); props.dados.type = e.target.value}}

                >
                  <MenuItem key={-1} value={''}></MenuItem>
                  {
                    tipoSistemas.length > 0 &&
                    tipoSistemas.map((option, i) => {
                      return (<MenuItem key={i} value={option.id}>{option.name}</MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"CIP"} variant="outlined" decimal={2} value={cip} onChange={(e) => {setCip(e.target.value); props.dados.cip = e.target.value}} ></NumberFormatCustom>

            </Grid>
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Bandeira"} variant="outlined" decimal={5} value={bandeira} onChange={(e) => {setBandeira(e.target.value); props.dados.flag = e.target.value}} ></NumberFormatCustom>

            </Grid>

          </Grid>
        </div>
      </box>
      <br></br>
      <box>
        <div class="card w-100">
          <div class="card-header">
            Informações da geradora
          </div>
          <Typography variant="h6" gutterBottom>

          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={14} sm={2}>
              <FormControl fullWidth>
                <InputLabel id="inputSubgrupo"> Subgrupo</InputLabel>
                <Select
                  labelId="inputSubgrupo"
                  id="inputSubgrupo"
                  value={subGrupo}
                  label="inputSubgrupo"
                  onChange={(e) => { setSubGrupo(e.target.value); handleSubGrup(e.target.value) ; props.dados.subgroup = e.target.value; limparDemandas(); }}
                >
                  <MenuItem value={'B1'}>B1</MenuItem>
                  <MenuItem value={'B2'}>B2</MenuItem>
                  <MenuItem value={'B3'}>B3</MenuItem>
                  <MenuItem value={'A3'}>A3</MenuItem>
                  <MenuItem value={'A4'}>A4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel id="inputGrupo">Grupo</InputLabel>
                <Select
                  labelId="tipoLigacao"
                  id="inputGrupo"
                  value={grupo}
                  label="inputGrupo"
                  onChange={(e) => setGrupo(e.target.value)
                  }
                  disabled
                >

                  <MenuItem value={'A'}>Grupo A</MenuItem>
                  <MenuItem value={'B'}>Grupo B</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>

                <InputLabel id="tipoLigacao">Modalidade</InputLabel>
                <Select
                  labelId="tipoLigacao"
                  id="modalidade"
                  value={modalidade}
                  label="modalidade"
                  onChange={(e) => { setModalidade(e.target.value);   props.dados.modality = e.target.value }}

                >

                  {
                    modalidades.length > 0 &&
                    modalidades.map((option, i) => {
                      return (<MenuItem key={i} value={option}>{option}</MenuItem>)
                    })
                  }

                </Select>
              </FormControl>

            </Grid>

           { grupo==="A" && modalidade ==="Horos. Azul"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom  label={"Demanda FP(Kwh)"}  variant="outlined" value={demandaFP} onChange={(e) => {setDemandaFP(e.target.value) ; props.dados.demadaFp = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>:""
           }

          { grupo==="A"&& modalidade ==="Horos. Azul"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom type="number" label={"Demanda Ponta"}  variant="outlined" value={demPonta} onChange={(e) => {setDem_ponta(e.target.value); ; props.dados.demandaP = e.target.value } } onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>
            :""}

           { grupo==="A"&& modalidade ==="Horos. Verde"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom type="number" label={"Demanda"}  variant="outlined" value={demPonta} onChange={(e) => {setDem_ponta(e.target.value); ; props.dados.demandaP = e.target.value } } onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>
            :""}

          { grupo==="A"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom type="number" label={"Energia FP(Kwh)"}  variant="outlined" value={energia_FP} onChange={(e) => {setEnergia_FP(e.target.value);  props.dados.energiaFP = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>:""}

            { grupo==="A"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom type="number" label={"Energia Ponta(Kwh)"}  variant="outlined" value={energiaPonta} onChange={(e) => {setEnergia_ponta(e.target.value) ; props.dados.energiaP = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>:""}


            { grupo==="B"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom type="number" label={"Consumo Médio"}  variant="outlined" value={consumoMedio} onChange={(e) =>{ setConsumoMedio(e.target.value) ; props.dados.avgconsumption = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>
            :""}

          
           <Grid item xs={12} sm={3}>
              <NumberFormatCustom  readOnly label={"Geração sugerida (KWh)"} variant="outlined"   decimal={2} value={geracaoSugerida} onChange={(e) => setGeracaoSugerida(e.target.value)} ></NumberFormatCustom>
            </Grid>
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Geração desejada (KWh)"} variant="outlined" decimal={2} value={geracaoDesejada} onChange={(e) => {setGeracaoDesejada(e.target.value); props.dados.suggestedDesired= e.target.value} } onBlur={calculaGeracaoTotal} ></NumberFormatCustom>

            </Grid>


          

          </Grid>
        </div>
      </box>
                  

     

    </React.Fragment>
  );
}
