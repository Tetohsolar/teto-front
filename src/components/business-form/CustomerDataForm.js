import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export default function CustomerDataForm() {
  const [tipo, setTipo] = React.useState("");

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const personType = ["Física", "Jurídica"];

  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
          Informações do cliente
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo</InputLabel>
              <Select
                id="demo-simple-select"
                value={tipo}
                label="Tipo"
                onChange={handleChange}
              >
                {personType.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Telefone"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="whatsapp"
              name="whatsapp"
              label="WhatsApp"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField id="cep" name="cep" label="CEP" fullWidth size="small" />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado</InputLabel>
              <Select
                id="demo-simple-select-type"
                value={tipo}
                label="Estado"
                onChange={handleChange}
              >
                {personType.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Cidade</InputLabel>
              <Select
                id="demo-simple-select-city"
                value={tipo}
                label="Cidade"
                onChange={handleChange}
              >
                {personType.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="street"
              name="street"
              label="Logradouro"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="neighborhood"
              name="neighborhood"
              label="Bairro"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              id="street"
              name="street"
              label="Número"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              type="text"
              id="additional-information"
              name="additional-information"
              label="Informações adicionais"
              fullWidth
              size="small"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </box>
    </React.Fragment>
  );
}
