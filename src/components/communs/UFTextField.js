import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const UFTextField = (props) => {
    return (
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label="inputMarca"
          onChange={props.onChange}
          onClick={props.onClick}
          onBlur={props.onBlur}
        >

        <MenuItem value={'AC'}>Acre</MenuItem>
        <MenuItem value={'AL'}>Alagoas</MenuItem>
        <MenuItem value={'AP'}>Amapá</MenuItem>
        <MenuItem value={'AM'}>Amazonas</MenuItem>
        <MenuItem value={'BA'}>Bahia</MenuItem>
        <MenuItem value={'CE'}>Ceará</MenuItem>
        <MenuItem value={'DF'}>Distrito Federal</MenuItem>
        <MenuItem value={'ES'}>Espírito Santo</MenuItem>
        <MenuItem value={'GO'}>Goiás</MenuItem>
        <MenuItem value={'MA'}>Maranhão</MenuItem>
        <MenuItem value={'MT'}>Mato Grosso</MenuItem>
        <MenuItem value={'MS'}>Mato Grosso do Sul</MenuItem>
        <MenuItem value={'MG'}>Minas Gerais</MenuItem>
        <MenuItem value={'PA'}>Pará</MenuItem>
        <MenuItem value={'PB'}>Paraíba</MenuItem>
        <MenuItem value={'PR'}>Paraná</MenuItem>
        <MenuItem value={'PE'}>Pernambuco</MenuItem>
        <MenuItem value={'PI'}>Piauí</MenuItem>
        <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
        <MenuItem value={'RN'}>Rio Grande do Norte</MenuItem>
        <MenuItem value={'RS'}>Rio Grande do Sul</MenuItem>
        <MenuItem value={'RO'}>Rondônia</MenuItem>
        <MenuItem value={'RR'}>Roraima</MenuItem>
        <MenuItem value={'SC'}>Santa Catarina</MenuItem>
        <MenuItem value={'SP'}>São Paulo</MenuItem>
        <MenuItem value={'SE'}>Sergipe</MenuItem>
        <MenuItem value={'TO'}>Tocantins</MenuItem>

        </Select>
      </FormControl>

    
    )}; 
    
    
export default UFTextField;