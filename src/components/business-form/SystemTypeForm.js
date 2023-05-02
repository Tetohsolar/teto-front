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

export default function SystemTypeForm() {
  const [tipo, setTipo] = React.useState("");

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const personType = ["Física", "Jurídica"];

  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
          Rateios
        </Typography>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }}}>
          <Grid container spacing={3}>
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

            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Telefone"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
          <Grid container spacing={3}>
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

            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Telefone"
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
