import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import NumberFormatCustom from "../communs/DecimalMaskedTextField";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function FinancialSummaryForm(props) {
  const { token, afflitedId, idLogged, afflited } = useContext(AuthContext)
  const [precoKit, setPrecoKit] = React.useState('')
  const [custo_total, setCustoTotal] = useState(0)
  const [custo_totalV, setCustoTotalV] = useState(0)
  const [valorTotalProjeto, setValorTotalProjeto] = useState(0)
  const [comicao, setComissao] = React.useState(afflited.commission)
  const [comicaoValue, setComissaoValue] = React.useState('')
  const [systempower, setSystemPower] = React.useState('')
  const [hasEdit, setHasEdit] = React.useState(false)
  const [syncIndex, setSyncIndex] = useState(0)
  
  function handleKit(e){
    let custo = 0
    let aux = String(precoKit).replace(".","");
    aux = aux.replace(",",".")
    
    let somaResultados = parseFloat(aux)
    let Nplaca = props.dados.numberborder
    

    for (let i = 0; i < afflited.Prices.length; i++) {

      if (afflited.Prices[i].type === "P"){
        custo = custo + aux * (afflited.Prices[i].value/100) 
      }
  
      if (afflited.Prices[i].type === "F"){
        custo = custo + (afflited.Prices[i].value) 
      }
  
      if (afflited.Prices[i].type === "M"){
        custo = custo + ( Nplaca * afflited.Prices[i].value ) 
      }
    }
    
    
    let custoParcial = (somaResultados + custo)
    
    let margem = aux * (afflited.profit/100) 
   
  
    let valorTotalProjeto = 100 * parseInt((custoParcial+margem)/100)
    
    let comicaoEmReal =  valorTotalProjeto* (props.dados.sellercomission/100);
     
    setCustoTotal(somaResultados + custo )
    
    props.dados.precoCusto = somaResultados + custo
    props.dados.valuesellercomission = comicaoEmReal
    props.dados.numberborder = Nplaca
  
    setComissaoValue(comicaoEmReal)
    let valorTotal = somaResultados + custo  + comicaoEmReal
    //alert(valorTotal)
    props.dados.amount = valorTotalProjeto
    setValorTotalProjeto(valorTotalProjeto)
    let custoV = props.dados.amount - props.dados.valuesellercomission
    setCustoTotalV(custoV)

    
  }

  React.useEffect(() => {
    
    if (!hasEdit){ 
    let arrayJson = props.dados.produtos;
    props.dados.sellercomission = comicao

    arrayJson.forEach(json => {
      json.resultado = json.price * json.qtd;
    });

    let somaResultados = 0;

    arrayJson.forEach(json => {
    somaResultados += json.resultado;
  });

  setPrecoKit(somaResultados)
  props.dados.kitprice = somaResultados;
   

  let custo = 0
  let Nplaca = 0
  let power = 0
  
  for (let j = 0; j < arrayJson.length; j++) {
    if ( arrayJson[j].type === '3'){
      Nplaca = Nplaca+arrayJson[j].qtd
      power = arrayJson[j].power 
    }
  }

  props.dados.systempower = (Nplaca * power) /1000
  setSystemPower(props.dados.systempower)
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
  
  let custoParcial = (somaResultados + custo)
  let margem = precoKit * (afflited.profit/100) 

  let valorTotalProjeto = 100 * parseInt((custoParcial+margem)/100)
  let comicaoEmReal =  valorTotalProjeto* (props.dados.sellercomission/100);
  
  setCustoTotal(somaResultados + custo )
  
  props.dados.precoCusto = somaResultados + custo
  props.dados.valuesellercomission = comicaoEmReal
  props.dados.numberborder = Nplaca

  setComissaoValue(comicaoEmReal)
  let valorTotal = somaResultados + custo  + comicaoEmReal
  props.dados.amount = valorTotalProjeto
  setValorTotalProjeto(valorTotalProjeto)
  let custoV = props.dados.amount - props.dados.valuesellercomission
  setCustoTotalV(custoV)
  setHasEdit(true)
  }else{
    handleKit()
  }
  

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
              <NumberFormatCustom  readOnly label={"Potência do Sistema"} variant="outlined" decimal={2} value={systempower} onChange={(e) => setSystemPower(e.target.value)} ></NumberFormatCustom>
            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Preço do kit(R$)"} variant="outlined" decimal={2} value={precoKit} onChange= { (e)=>{ setPrecoKit(e.target.value); props.dados.kitprice = e.target.value} } onBlur={handleKit}  ></NumberFormatCustom>
            </Grid>


            <Grid item xs={12} sm={3}>
              <NumberFormatCustom
                id="commission"
                name="commission"
                label="Comissão (%)"
                value={comicao} onChange={ (e)=>{setComissao(e.target.value); props.dados.sellercomission= e.target.value;  handleKit() }}
                fullWidth
                             />
            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom readOnly label={"Custo total (R$)"} variant="outlined" decimal={2} value={custo_totalV} onChange={(e) => setCustoTotalV(e.target.value)} ></NumberFormatCustom>
            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom
                id="commission-brl"
                name="commission-brl"
                label="Comissão (R$)"
                value={comicaoValue}
                variant="outlined" decimal={2}
                readOnly
                fullWidth

              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom readOnly label={"Valor total do projeto (R$)"} variant="outlined" decimal={2} value={valorTotalProjeto} onChange={(e) => setValorTotalProjeto(e.target.value)} ></NumberFormatCustom>

            </Grid>

          </Grid>
        </div>
      </box>




    </React.Fragment>
  );
}
