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

export default function SystemTypeform() {
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const list = ["Item 1", "Item 2"];

  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
        Itens do Kit
        </Typography>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo</InputLabel>
                <Select
                  id="demo-simple-select-type"
                  value={item}
                  label="Tipo"
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
                <InputLabel>Marca</InputLabel>
                <Select
                  id="demo-simple-select-brand"
                  value={item}
                  label="Marca"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Modelo</InputLabel>
                <Select
                  id="demo-simple-select-model"
                  value={item}
                  label="Modelo"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                id="power"
                name="power"
                label="Potência"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                id="amount"
                name="amount"
                label="Quantidade"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo</InputLabel>
                <Select
                  id="demo-simple-select-type"
                  value={item}
                  label="Tipo"
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
                <InputLabel>Marca</InputLabel>
                <Select
                  id="demo-simple-select-brand"
                  value={item}
                  label="Marca"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Modelo</InputLabel>
                <Select
                  id="demo-simple-select-model"
                  value={item}
                  label="Modelo"
                  onChange={handleChange}
                >
                  {list.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                id="power"
                name="power"
                label="Potência"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                id="amount"
                name="amount"
                label="Quantidade"
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
    </React.Fragment>
  );
}
