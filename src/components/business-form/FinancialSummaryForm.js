import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import NumberFormatCustom from "../communs/DecimalMaskedTextField";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function FinancialSummaryForm(props) {
  const { token, afflitedId, idLogged, afflited } = useContext(AuthContext)

  const [potenciaS, setPotenciaS] = React.useState('')
  const [precoKit, setPrecoKit] = React.useState('')
  const [custo_total, setCustoTotal] = useState(0)
  const [valorTotalProjeto, setValorTotalProjeto] = useState(0)
  const [comicao, setComissao] = React.useState(afflited.commission)
  const [comicaoValue, setComissaoValue] = React.useState('')
  

  React.useEffect(() => {
    //console.log(props.dados)

    let arrayJson = props.dados.produtos;
    props.dados.commission = comicao

    arrayJson.forEach(json => {
      json.resultado = json.price * json.qtd;
    });

    let somaResultados = 0;

    arrayJson.forEach(json => {
    somaResultados += json.resultado;
  });

  setPrecoKit(somaResultados)
  props.dados.precoKit = somaResultados;
  //console.log(afflited)

  let custo = 0
  let Nplaca = 0
  
  for (let j = 0; j < arrayJson.length; j++) {
    if ( arrayJson[j].type === '3'){
      Nplaca = Nplaca+arrayJson[j].qtd
    }
  }
  props.dados.Nplaca = Nplaca
  
  for (let i = 0; i < afflited.Prices.length; i++) {

    if (afflited.Prices[i].type === "P"){
      custo = custo + precoKit * (afflited.Prices[i].value/100) 
    }

    if (afflited.Prices[i].type === "F"){
      custo = custo + (afflited.Prices[i].value) 
    }

    if (afflited.Prices[i].type === "M"){
      custo = custo + ( Nplaca * afflited.Prices[i].value ) 
    }
  }
  
  let comicaoEmReal = (somaResultados + custo) * (props.dados.commission/100);
  setCustoTotal(somaResultados + custo )

  props.dados.precoCusto = somaResultados + custo
  props.dados.comissionValue = comicaoEmReal

  setComissaoValue(comicaoEmReal)
  let valorTotal = somaResultados + custo  + comicaoEmReal
  setValorTotalProjeto(valorTotal)
  
  });
  
  return (
    <React.Fragment>
      <box>
        <div class="card w-100">
          <div class="card-header">
            Custos{" "}
          </div>
          <Typography variant="h6" gutterBottom>

          </Typography>
          <Typography variant="h6" gutterBottom>

          </Typography>

          <Grid container spacing={3}>
            

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Preço do kit(R$)"} variant="outlined" decimal={2} value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} ></NumberFormatCustom>
            </Grid>


            <Grid item xs={12} sm={3}>
              <TextField
                id="commission"
                name="commission"
                label="Comissão (%)"
                value={comicao}
                fullWidth

              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Custo total (R$)"} variant="outlined" decimal={2} value={custo_total} onChange={(e) => setCustoTotal(e.target.value)} ></NumberFormatCustom>

            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom
                id="commission-brl"
                name="commission-brl"
                label="Comissão (R$)"
                value={comicaoValue}
                variant="outlined" decimal={2}
                fullWidth

              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Valor total do projeto (R$)"} variant="outlined" decimal={2} value={valorTotalProjeto} onChange={(e) => setValorTotalProjeto(e.target.value)} ></NumberFormatCustom>

            </Grid>

          </Grid>
        </div>
      </box>




    </React.Fragment>
  );
}
