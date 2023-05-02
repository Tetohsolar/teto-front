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

export default function FinancialSummaryForm() {
  const [tipo, setTipo] = React.useState("");

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const personType = ["Física", "Jurídica"];

  return (
    <React.Fragment>
      <box>
        <Typography variant="h6" gutterBottom>
          Informações principais
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="name"
              name="name"
              label="Nome"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="name"
              name="name"
              label="Nome"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="name"
              name="name"
              label="Nome"
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
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
        </Grid>
      </box>

      <box>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Informações principais
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
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
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
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
        </Grid>
      </box>

      <box>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Informações principais
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
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
              id="personId"
              name="CPF"
              label="CPF"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
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
        </Grid>
      </box>
    </React.Fragment>
  );
}
