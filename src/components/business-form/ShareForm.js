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



export default function ShareForm(props) {

  const { token, sunIndex, afflitedId, idLogged, afflited } = React.useContext(AuthContext)
  const [potenciaConsiderada, setPotenciaConsiderada] = React.useState('')
  const [geracaoDesejada, setGeracaoDesejada] = React.useState('')
  const [geracaoSugerida, setGeracaoSugerida] = React.useState('')
  const [geracaoTotal, setGeracaoTotal] = React.useState(0.0)
  const [geracaoSugeridaParcial, setGeracaoSugeridaParcial] = React.useState('')
  const [idRateio, setIdRateio] = React.useState(1)
  
  const [modalidade, setModalidade] = useState('')
  const [rat, setRat] = useState('S')
  const [consumoMedio, setConsumoMedio] = useState('')
  const [demandaFP, setDemandaFP] = useState('')
  const [energia_FP, setEnergia_FP] = useState('')
  const [demPonta, setDem_ponta] = useState('')
  const [energiaPonta, setEnergia_ponta] = useState('')
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState('')
  
  const [subGrupo, setSubGrupo] = useState('')
  const [grupo, setGrupo] = useState('')
  const [geracaoSu, setGeracaoSu] = useState('')
  const [cip, setCip] = useState('')
  const [bandeira, setBandeira] = useState('')
  const [potenciaS, setPotenciaS] = React.useState('')
  const [modalidades, setModalidades] = useState([""])
  const [readData, setReadData] = useState(true)

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

    console.log(props.dados)
    if (props.dados.possuirateio!==undefined &&props.dados.possuirateio==="S" ){
      setRat("S")
      setCip(props.dados.rcip)
      setBandeira(props.dados.rflag)
      setSubGrupo(props.dados.subgroupr)
      handleSubGrup(props.dados.subgroupr)
      setGrupo(props.dados.rgroup)
      setModalidade(props.dados.rmodality)
      setConsumoMedio(props.dados.ravgconsumption)
      setGeracaoSugerida(parseFloat(props.dados.rsuggestedGeneration)+parseFloat(props.dados.suggestedDesired))
      setGeracaoDesejada(parseFloat(props.dados.rsuggestedGeneration)+parseFloat(props.dados.suggestedDesired))
      setDemandaFP(props.dados.rdemadaFp)
      setDem_ponta(props.dados.rdemandaP)
      setEnergia_FP(props.dados.renergiaFP)
      setEnergia_ponta(props.dados.renergiaP)
      setReadData(false)
      hanleLeftHasShare('S')

    }else{
      hanleLeftHasShare('N')
      setRat("N")
      setReadData(true)
    }

  }, [])

  function hanleLeftHasShare(ratv){

      console.log(ratv)
      if (ratv==="N") {
      props.dados.rcip = 0
      props.dados.rflag = 0
      props.dados.subgroupr= 0
      props.dados.subgroupr = 0
      props.dados.rgroup = 0
      props.dados.rmodality = 0
      props.dados.ravgconsumption = 0
      //setGeracaoSugerida(parseFloat(props.dados.rsuggestedGeneration)+parseFloat(props.dados.suggestedDesired))
      //setGeracaoDesejada(parseFloat(props.dados.rsuggestedGeneration)+parseFloat(props.dados.suggestedDesired))
      props.dados.rdemadaFp=0
      props.dados.rdemandaP=0
      props.dados.renergiaFP=0
      props.dados.renergiaP=0

      limparDemandas()
      setBandeira("")
      setCip("")
      setReadData(true)


    } else{
      
      setReadData(false)
      console.log(readData)
    } 
  }
 
  function calculaDemana() {
    handleGrupoAConsMedio()
  }


  function handleGrupoAConsMedio(e) {
    buscaGeracaoSugerida()
    
    if (modalidade === "Convencional" || modalidade === "Rural" || modalidade === "Outros") {
      
      setGeracaoSugerida(parseFloat(consumoMedio) +parseFloat(props.dados.suggestedDesired) )
      setGeracaoSugeridaParcial(parseFloat(consumoMedio)+parseFloat(props.dados.suggestedDesired))
      props.dados.rsuggestedDesired = consumoMedio
      props.dados.rsuggestedGeneration = consumoMedio
      setGeracaoDesejada(parseFloat(consumoMedio)+parseFloat(props.dados.suggestedDesired))

      return
    }

    
    if (modalidade === "Horos. Azul" && subGrupo === "A3" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(energiaPonta)
      //setGeracaoDesejada(energiaPonta)
      const result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result+parseFloat(props.dados.suggestedDesired))
      setGeracaoSugerida(result+parseFloat(props.dados.suggestedDesired))
      setGeracaoDesejada(result+parseFloat(props.dados.suggestedDesired))
      props.dados.rsuggestedDesired = result
      props.dados.rsuggestedGeneration = result
      
    }

    else if (modalidade === "Horos. Verde" && subGrupo === "A4" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)
      //setGeracaoDesejada(valor)
      let result = parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))

      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result+parseFloat(props.dados.suggestedDesired))
      setGeracaoDesejada(result+props.parseFloat(dados.suggestedDesired))
      props.dados.rsuggestedDesired = result
      props.dados.rsuggestedGeneration = result
    }

    else if (modalidade === "Horos. Azul" && subGrupo === "A4" && demandaFP !== null && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(demandaFP) + parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)
      setGeracaoDesejada(valor+parseFloat(props.dados.suggestedDesired))

      //GeracaoSugerida
      let result = parseFloat(demandaFP) + parseFloat(energia_FP) + Math.round(parseFloat(energiaPonta) / parseFloat(energiaPontaTratada))
      { result > 0 ? setGeracaoSugerida(result) : setGeracaoSugerida('') }
      setGeracaoSugeridaParcial(result+parseFloat(props.dados.suggestedDesired))
      setGeracaoDesejada(result+parseFloat(props.dados.suggestedDesired))

      props.dados.rsuggestedDesired = result
      props.dados.rsuggestedGeneration = result
      

    }
    else {
      setConsumoMedio('')
      setGeracaoSugerida('')
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
    props.dados.ravgconsumption = "";
    props.dados.rdemadaFp="";
    props.dados.rdemandaP="";
    props.dados.renergiaFP="";
    props.dados.rsuggestedDesired="";
    props.dados.rsuggestedGeneration="";
    
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
    props.dados.rmodality = "Convencional"
    props.dados.rgroup = "B"
  }

  if (value === "B2") {
    setGrupo("B")
    setModalidades(['Rural'])
    setModalidade("Rural")
    props.dados.rmodality = "Rural"
    props.dados.rgroup = "B"
  }
  if (value === "B3") {
    setModalidades(['Outros'])
    setGrupo("B")
    setModalidade("Outros")
    props.dados.rmodality = "Outros"
    props.dados.rgroup = "B"
    
  }

  if (value === "A3" ) {
    setGrupo("A")
    setModalidades(['Horos. Azul'])
    setModalidade("Horos. Azul")
    props.dados.rmodality = "Horos. Azul"
    props.dados.rgroup = "A"
  }

  if (value === "A4" ) {
    setGrupo("A")
    setModalidades(['Horos. Azul', 'Horos. Verde'])
    props.dados.rgroup = "A"
  }

}

  function calculaGeracaoTotal() {
    
    const campoParaSomar = 'suggestedGeneration'; // Campo do JSON que será somado
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

  }
 


  const [item, setItem] = React.useState("");

  const handleChange = (event) => {

    setItem(event.target.value);
  };

  const list = ["Item 1", "Item 2"];

  return (
    <React.Fragment>
 
      <br></br>
      <box>
        <div class="card w-100">
          <div class="card-header">
            Informações do Rateio
          </div>
          
          <Grid container spacing={3}>

         

          <Grid item xs={12} sm={3}>

          <Typography variant="h6" gutterBottom>

          </Typography>

          <FormControl fullWidth>
                <InputLabel id="inputSubgrupo"> Tem Rateio?</InputLabel>
                <Select
                  labelId="inputSubgrupo"
                  id="inputSubgrupo"
                  value={rat}
                  label="inputSubgrupo"
                  onChange={(e) => { setRat(e.target.value); props.dados.possuirateio = e.target.value; hanleLeftHasShare(e.target.value)} }
                  
                >
                  <MenuItem value={'N'}>Não</MenuItem>
                  <MenuItem value={'S'}>Sim</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          
          
          <Grid item xs={12} sm={3}>
        
          <Typography variant="h6" gutterBottom>

</Typography>
              <NumberFormatCustom  readOnly={readData} label={"CIP"} variant="outlined" decimal={2} value={cip} onChange={(e) => {setCip(e.target.value); props.dados.rcip = e.target.value}} ></NumberFormatCustom>

            </Grid>
            <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>

          </Typography>
              <NumberFormatCustom readOnly={readData} label={"Bandeira"} variant="outlined" decimal={5} value={bandeira} onChange={(e) => {setBandeira(e.target.value); props.dados.rflag = e.target.value}} ></NumberFormatCustom>

            </Grid>

            <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>

          </Typography>
              <FormControl fullWidth>
                <InputLabel id="inputSubgrupo"> Subgrupo</InputLabel>
                <Select
                  readOnly={readData}
                  labelId="inputSubgrupo"
                  id="inputSubgrupo"
                  value={subGrupo}
                  label="inputSubgrupo"
                  onChange={(e) => { setSubGrupo(e.target.value); handleSubGrup(e.target.value) ; props.dados.subgroupr = e.target.value; limparDemandas(); }}
                >
                  <MenuItem value={'B1'}>B1</MenuItem>
                  <MenuItem value={'B2'}>B2</MenuItem>
                  <MenuItem value={'B3'}>B3</MenuItem>
                  <MenuItem value={'A3'}>A3</MenuItem>
                  <MenuItem value={'A4'}>A4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>

                <InputLabel id="tipoLigacao">Modalidade</InputLabel>
                <Select
                  labelId="tipoLigacao"
                  readOnly={readData}
                  id="modalidade"
                  value={modalidade}
                  label="modalidade"
                  onChange={(e) => { setModalidade(e.target.value);   props.dados.rmodality = e.target.value }}

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
              <NumberFormatCustom readOnly={readData} label={"Demanda FP(Kwh)"}  variant="outlined" value={demandaFP} onChange={(e) => {setDemandaFP(e.target.value) ; props.dados.rdemadaFp = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>:""
           }

          { grupo==="A"&& modalidade ==="Horos. Azul"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom  readOnly={readData} type="number" label={"Demanda Ponta"}  variant="outlined" value={demPonta} onChange={(e) => {setDem_ponta(e.target.value); ; props.dados.rdemandaP = e.target.value } } onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>
            :""}

           { grupo==="A"&& modalidade ==="Horos. Verde"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom readOnly={readData} type="number" label={"Demanda"}  variant="outlined" value={demPonta} onChange={(e) => {setDem_ponta(e.target.value); ; props.dados.rdemandaP = e.target.value } } onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>
            :""}

          { grupo==="A"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom readOnly={readData} type="number" label={"Energia FP(Kwh)"}  variant="outlined" value={energia_FP} onChange={(e) => {setEnergia_FP(e.target.value);  props.dados.renergiaFP = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>:""}

            { grupo==="A"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom readOnly={readData} type="number" label={"Energia Ponta(Kwh)"}  variant="outlined" value={energiaPonta} onChange={(e) => {setEnergia_ponta(e.target.value) ; props.dados.renergiaP = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>:""}


            { grupo==="B"?
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom readOnly={readData} type="number" label={"Consumo Médio"}  variant="outlined" value={consumoMedio} onChange={(e) =>{ setConsumoMedio(e.target.value) ; props.dados.ravgconsumption = e.target.value }} onBlur={(e)=>{calculaDemana()}} ></NumberFormatCustom>
            </Grid>
            :""}

          
           <Grid item xs={12} sm={3}>
              <NumberFormatCustom  readOnly label={"Geração sugerida (KWh)"} variant="outlined"   decimal={2} value={geracaoSugerida} onChange={(e) => setGeracaoSugerida(e.target.value)} ></NumberFormatCustom>
            </Grid>
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom readOnly={readData} label={"Geração desejada (KWh)"} variant="outlined" decimal={2} value={geracaoDesejada} onChange={(e) => {setGeracaoDesejada(e.target.value); props.dados.rsuggestedDesired= e.target.value}} ></NumberFormatCustom>

            </Grid>


          

          </Grid>
        </div>
      </box>
                  

      
    </React.Fragment>
  );
}
