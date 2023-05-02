import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function FinancialSummaryForm() {
  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
          Custos{" "}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              id="pot-system-kwh"
              name="pot-system-kwh"
              label="Pot. do Sistema (KWh)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="kit-price-vendor"
              name="kit-price-vendor"
              label="Preço do Kit Forn (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="kit-price-brl"
              name="kit-price-brl"
              label="Preço do Kit* (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="margin-percent"
              name="margin-percent"
              label="Margem (%)"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              id="commission"
              name="commission"
              label="Comissão (%)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="complement"
              name="complement"
              label="Complemento"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="project"
              name="project"
              label="Projeto (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="tax"
              name="tax"
              label="Imposto (R$)"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              id="mount"
              name="mount"
              label="Montagem (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="total-cost"
              name="total-cost"
              label="Custo Total (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="margin-brl"
              name="margin-brl"
              label="Margem (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="commission-brl"
              name="commission-brl"
              label="Comissão (R$)"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="project-value-brl"
              name="project-value-brl"
              label="Valor do Projeto (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="project-profit"
              name="project-profit"
              label="Lucro do Projeto (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="real-profit"
              name="real-profit"
              label="Lucro do Real (%)"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </box>

      <box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Valores com 2% de desconto
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="project-2percent"
              name="project-2percent"
              label="Projeto (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="margin-brl-2percent"
              name="margin-brl-2percent"
              label="Margem (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="margin-percent-2percent"
              name="margin-percent-2percent"
              label="Margem (%)"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="Commission-brl-2percent"
              name="Commission-brl-2percent"
              label="Comissão (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="profit-brl-2percent"
              name="profit-brl-2percent"
              label="Lucro em R$"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="profit-percent-2percent"
              name="profit-percent-2percent"
              label="Lucro em %"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </box>

      <box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Valores com 4% de desconto
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="project-2percent"
              name="project-2percent"
              label="Projeto (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="margin-brl-2percent"
              name="margin-brl-2percent"
              label="Margem (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="margin-percent-2percent"
              name="margin-percent-2percent"
              label="Margem (%)"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="Commission-brl-2percent"
              name="Commission-brl-2percent"
              label="Comissão (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="profit-brl-2percent"
              name="profit-brl-2percent"
              label="Lucro em R$"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="profit-percent-2percent"
              name="profit-percent-2percent"
              label="Lucro em %"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </box>
    </React.Fragment>
  );
}
