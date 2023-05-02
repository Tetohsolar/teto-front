import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export default function CustomerDataForm() {
  const [type, setType] = React.useState("");
  const [item, setItem] = React.useState("");


  const handleChange = (event) => {
    setType(event.target.value);
  };

  const personType = ["Física", "Jurídica"];

  const handleChangeItem = (event) => {
    setItem(event.target.value);
  };

  const list = ["Item 1", "Item 2"];

  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
          Informações do cliente
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                id="demo-simple-select"
                value={type}
                label="Type"
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
                id="demo-simple-select-item"
                value={item}
                label="Estado"
                onChange={handleChangeItem}
              >
                {list.map((item) => (
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
                value={item}
                label="Cidade"
                onChange={handleChangeItem}
              >
                {list.map((item) => (
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
