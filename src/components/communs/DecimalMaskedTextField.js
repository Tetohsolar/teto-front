import React from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

function DecimalMaskedTextField(props) {
  const { value, onChange, ...other } = props;

  

  return (
    <TextField mask="" value={value} onChange={onChange} {...other}>
      {() => <TextField {...other} />}
    </TextField>
  );
}

export default DecimalMaskedTextField;
