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

export default function GeneratorDataForm() {
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const list = ["Item 1", "Item 2"];

  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
          Informações principais
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              id="customer"
              name="customer"
              label="Cliente"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="user"
              name="user"
              label="Usuário"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="sun-factor"
              name="sun-factor"
              label="Fator solar"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="considered-power"
              name="considered-power"
              label="Potência considerada"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
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
            <FormControl fullWidth size="small">
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
            <FormControl fullWidth size="small">
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
              size="small"
            />
          </Grid>
        </Grid>
      </box>

      <box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Informações da geradora
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
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
            <FormControl fullWidth size="small">
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
            <FormControl fullWidth size="small">
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
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="suggested-generation"
              name="suggested-generation"
              label="Geração Sugerida (KWh)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="cip"
              name="cip"
              label="CIP (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="flag"
              name="flag"
              label="Bandeira (R$)"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </box>

      <box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Rateios
        </Typography>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Modalidade</InputLabel>
                <Select
                  id="simple-select-modality"
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Grupo</InputLabel>
                <Select
                  id="simple-select-rateio-group"
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
              <FormControl fullWidth size="small">
                <InputLabel>Sub-grupo</InputLabel>
                <Select
                  id="simple-select-rateio-subgrupo"
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
              <TextField
                type="number"
                id="consumption"
                name="consumption"
                label="Consumo"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                id="dem-fp"
                name="dem-fp"
                label="Dem. FP."
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                id="ener-fp"
                name="ener-fp"
                label="Ener. F. P."
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                id="dem-p"
                name="dem-p"
                label="Dem. P"
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                id="ener-p"
                name="ener-p"
                label="Ener. P"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                id="g-suggested"
                name="g-suggested"
                label="G. Sugerida"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                type="number"
                id="cip"
                name="cip"
                label="CIP"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            size="small"
            sx={{ mt: 2 }}
          >
            Excluir
          </Button>
        </Paper>
        <Button variant="outlined" size="small" sx={{ mt: 2 }}>
          Novo rateio
        </Button>
      </box>

      <box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Informações complementares
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="g-suggested-kwh"
              name="g-suggested-kwh"
              label="Ger. Sugerida (KWh)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="target-generation-kwh"
              name="target-generation-kwh"
              label="Ger. Desejada (KWh)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="number-of-plates"
              name="number-of-plates"
              label="Número de placas"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="system-power-kwh"
              name="system-power-kwh"
              label="Pot. do Sistema (KWh)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="cip-brl"
              name="cip-brl"
              label="CIP (R$)"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="flag-brl"
              name="flag-brl"
              label="Bandeira (R$)"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </box>
    </React.Fragment>
  );
}
