import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import NumberFormatCustom from "../communs/DecimalMaskedTextField";

export default function FinancialSummaryForm() {

  const [potenciaS,setPotenciaS]=React.useState('')
  const [precoKit, setPrecoKit] = React.useState('')
  



    
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
          <NumberFormatCustom label={"Potência do sistema"}  variant="outlined" decimal={2} value={potenciaS} onChange={(e) => setPotenciaS(e.target.value)} ></NumberFormatCustom>
          </Grid>

          <Grid item xs={12} sm={3}>
          <NumberFormatCustom label={"Preço do kit(R$)"}  variant="outlined" decimal={2} value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} ></NumberFormatCustom>
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
            <TextField
              id="total-cost"
              name="total-cost"
              label="Custo Total (R$)"
              fullWidth
              
            />
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
            <TextField
              id="project-value-brl"
              name="project-value-brl"
              label="Valor do Projeto (R$)"
              fullWidth
             
            />
          </Grid>
         
        </Grid>
        </div>
      </box>

      

     
    </React.Fragment>
  );
}
