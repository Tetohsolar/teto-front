import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import NumberFormatCustom from "../communs/DecimalMaskedTextField";
import { useState } from "react";
import { useEffect } from "react";

export default function FinancialSummaryForm(props) {

  const [potenciaS, setPotenciaS] = React.useState('')
  const [precoKit, setPrecoKit] = React.useState('')
  const [custo_total, setCustoTotal] = useState(0)
  const [valorTotalProjeto, setValorTotalProjeto] = useState(0)

  React.useEffect(() => {
    console.log(props.dados)
  
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
          <Grid container spacing={3}>
            

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Preço do kit(R$)"} variant="outlined" decimal={2} value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} ></NumberFormatCustom>
            </Grid>


            <Grid item xs={12} sm={3}>
              <TextField
                id="commission"
                name="commission"
                label="Comissão (%)"
                fullWidth

              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <NumberFormatCustom label={"Custo total (R$)"} variant="outlined" decimal={2} value={custo_total} onChange={(e) => setCustoTotal(e.target.value)} ></NumberFormatCustom>

            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                id="commission-brl"
                name="commission-brl"
                label="Comissão (R$)"
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
