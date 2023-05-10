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



export default function GeneratorDataForm() {
  const [type, setType] = React.useState("");
  const { token, userName, afflitedId, idLogged, afflited } = React.useContext(AuthContext)
  const [potenciaSistema, setPotenciaSistema] = React.useState(0)
  const [potenciaModulo, setPotenciaModulo] = React.useState('465')
  const [nPlacas, setNplacas] = React.useState(0)
  const [potenciaConsiderada, setPotenciaConsiderada] = React.useState('')
  const [geracaoDesejada, setGeracaoDesejada] = React.useState('')
  const [geracaoSugerida, setGeracaoSugerida] = React.useState('')
  const [geracaoTotal, setGeracaoTotal] = React.useState(0.0)
  const [geracaoSugeridaParcial, setGeracaoSugeridaParcial] = React.useState('')
  const [idRateio, setIdRateio] = React.useState(1)
  const [lbFantasia, setLbFantasia] = useState('Nome')
  const [exibeCorporateName, setExibeCorporateName] = useState('')
  const [lbDocument, setLbDocument] = useState('CPF')
  const [tipoPessoa, setTipoPessoa] = useState('F')
  const [maskDOC, setMaskDOC] = useState('999.999.999-99')
  const [name, setName] = useState('')
  const [usuario, setUsuario] = useState('')
  const [fatorSolar, setFatorSolar] = useState('')
  const [perdas, serPerdas] = useState(afflited.lost / 100)
  const [modalidade, setModalidade] = useState('Convencional')
  const [consumoMedio, setConsumoMedio] = useState('')
  const [subgrupo, setSubgrupo] = useState('B1')
  const [demandaFP, setDemandaFP] = useState(0)
  const [energia_FP, setEnergia_FP] = useState(0)
  const [demPonta, setDem_ponta] = useState(0)
  const [energiaPonta, setEnergia_ponta] = useState(0)
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState(0)
  const [tipoL, setTipoL] = useState('')
  const [telhado, setTelhado] = useState(0)
  const [telhados, setTelhados] = useState([])
  const [tipoSistema, setTipoSistema] = useState('')
  const [tipoSistemas, setTipoSistemas] = useState([])
  const [subGrupo, setSubGrupo] = useState('')
  const [grupo, setGrupo] = useState('')
  const [geracaoSu, setGeracaoSu] = useState('')
  const [cip, setCip] = useState('')
  const [bandeira, setBandeira] = useState('')
  const [potenciaS, setPotenciaS] = React.useState('')






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

    buscaTelhados()
    buscaSistema()


  }, [])


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

  function calculaPotenciaConsidedara() {

    let f = parseFloat(fatorSolar) * (1 - perdas)
    if (isNaN(f)) {
      setPotenciaConsiderada(0)
    } else {
      setPotenciaConsiderada(Math.ceil(f))
    }
    let potSistema = 0;

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
              <NumberFormatCustom label={"Fator solar"} variant="outlined" decimal={2} value={fatorSolar} onChange={(e) => setFatorSolar(e.target.value)} onBlur={() => { calculaPotenciaConsidedara(); calculaDemana() }} onKeyUp={calculaPotenciaConsidedara} />

            </Grid>
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Perca"} variant="outlined" decimal={2} value={fatorSolar} onChange={(e) => setFatorSolar(e.target.value)} onBlur={() => { calculaPotenciaConsidedara(); calculaDemana() }} onKeyUp={calculaPotenciaConsidedara} />

            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Potência considerada"} variant="outlined" decimal={2} value={potenciaConsiderada} onChange={(e) => setPotenciaConsiderada(e.target.value)} />

            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="tipoLigacao">Tipo de Ligação</InputLabel>
                <Select
                  labelId="tipoLigacao"
                  id="tipoLigacao"
                  value={tipoL}
                  label="Telhado"
                  onChange={(e) => setTipoL(e.target.value)}

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
                  onChange={(e) => setTelhado(e.target.value)}

                >
                  <MenuItem key={-1} value={''}></MenuItem>
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
                  onChange={(e) => setTipoSistema(e.target.value)}

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
              <NumberFormatCustom label={"CIP"} variant="outlined" decimal={2} value={cip} onChange={(e) => setCip(e.target.value)} ></NumberFormatCustom>

            </Grid>
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Bandeira"} variant="outlined" decimal={5} value={bandeira} onChange={(e) => setBandeira(e.target.value)} ></NumberFormatCustom>

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
                  value={subgrupo}
                  label="inputSubgrupo"
                  onChange={(e) => setSubGrupo(e.target.value)}
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
                  onChange={(e) => setGrupo(e.target.value)}
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
                  onChange={(e) => { setModalidade(e.target.value); }}

                >
                  <MenuItem value={'Convencional'}>Convencional</MenuItem>
                  <MenuItem value={'Rural'}>Rural</MenuItem>
                  <MenuItem value={'outros'}>Outros</MenuItem>
                  <MenuItem value={'HA'}>Horos. Azul</MenuItem>
                  <MenuItem value={'HV'}>Horos.Verde</MenuItem>

                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom type="number" label={"Consumo Médio"} type='number' variant="outlined" value={consumoMedio} onChange={(e) => setConsumoMedio(e.target.value)} ></NumberFormatCustom>
            </Grid>
            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Geração sugerida (KWh)"} variant="outlined" decimal={2} value={geracaoSu} onChange={(e) => setGeracaoSu(e.target.value)} ></NumberFormatCustom>
            </Grid>
            
          </Grid>
        </div>
      </box>


      <box>
        <br></br>
        <div class="card w-100">
          <div class="card-header">
            Rateios
          </div>
          <Typography variant="h6" gutterBottom>

          </Typography>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>

            <div className="row">
              <div className="mb-3 mb-sm-0">
                <div className="card border-light-subtle">
                  <div className="card-body">
                    <TabelaRateioBusiness token={token} dados={dados} handleEdit={handleEdit}
                      handleAdd={handleAdd} setIdSelected={setIdSelected}
                      handleAfterDel={handleAfterDel} calculaGeracaoTotal={calculaGeracaoTotal}
                    />
                  </div>
                </div>
              </div>

            </div>


          </Paper>

        </div>
      </box>

      <box>
        <br></br>
        <div class="card w-100">
          <div class="card-header">
            Informações complementares
          </div>
          <Typography variant="h6" gutterBottom>

          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <NumberFormatCustom label={"Geração sugerida (KWh)"} variant="outlined" decimal={2} value={geracaoSu} onChange={(e) => setGeracaoSu(e.target.value)} ></NumberFormatCustom>
            </Grid>
            <Grid item xs={12} sm={4}>
              <NumberFormatCustom label={"Geração desejada (KWh)"} variant="outlined" decimal={2} value={geracaoDesejada} onChange={(e) => setGeracaoDesejada(e.target.value)} ></NumberFormatCustom>

            </Grid>
           
            <Grid item xs={12} sm={4}>
              <NumberFormatCustom label={"Potência do sistema"} variant="outlined" decimal={2} value={potenciaS} onChange={(e) => setPotenciaS(e.target.value)} ></NumberFormatCustom>
            </Grid>
            
          </Grid>
        </div>
      </box>
    </React.Fragment>
  );
}
