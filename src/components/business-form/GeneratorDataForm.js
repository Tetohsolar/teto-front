import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TabelaRateioBusiness from "../rateio-table";
import { AuthContext } from "../../context/AuthContext";



export default function GeneratorDataForm() {
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
              <TextField
                id="customer"
                name="customer"
                label="Cliente"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="user"
                name="user"
                label="Usuário"
                fullWidth
                disabled

              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="sun-factor"
                name="sun-factor"
                label="Fator solar"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="considered-power"
                name="considered-power"
                label="Potência considerada"
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth >
                <InputLabel>Tipo de ligação</InputLabel>
                <Select
                  id="simple-select-connection-type"
                  value={item}
                  label="Tipo de ligação"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth >
                <InputLabel>Tipo de telhado</InputLabel>
                <Select
                  id="simple-select-roof-type"
                  value={item}
                  label="Tipo de telhado"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth >
                <InputLabel>Tipo de sistema</InputLabel>
                <Select
                  id="simple-select-system-type"
                  value={item}
                  label="Tipo de sistema"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="panel-power"
                name="panel-power"
                label="Potência do painel"
                fullWidth
                disabled
              />
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth >
                <InputLabel>Grupo</InputLabel>
                <Select
                  id="simple-select-group"
                  value={item}
                  label="Grupo"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth >
                <InputLabel>Sub-grupo</InputLabel>
                <Select
                  id="simple-select-subgroup"
                  value={item}
                  label="Sub-grupo"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth >
                <InputLabel>Modalidade</InputLabel>
                <Select
                  id="simple-select-mode"
                  value={item}
                  label="Modalidade"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                id="average-usage"
                name="average-usage"
                label="Consumo Médio (KWh)"
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="suggested-generation"
                name="suggested-generation"
                label="Geração Sugerida (KWh)"
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="cip"
                name="cip"
                label="CIP (R$)"
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="flag"
                name="flag"
                label="Bandeira (R$)"
                fullWidth

              />
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
            <TextField
              id="g-suggested-kwh"
              name="g-suggested-kwh"
              label="Ger. Sugerida (KWh)"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="target-generation-kwh"
              name="target-generation-kwh"
              label="Ger. Desejada (KWh)"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="number-of-plates"
              name="number-of-plates"
              label="Número de placas"
              fullWidth
              
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="system-power-kwh"
              name="system-power-kwh"
              label="Pot. do Sistema (KWh)"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="cip-brl"
              name="cip-brl"
              label="CIP (R$)"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="flag-brl"
              name="flag-brl"
              label="Bandeira (R$)"
              fullWidth
              
            />
          </Grid>
        </Grid>
      </div>
      </box>
    </React.Fragment>
  );
}
