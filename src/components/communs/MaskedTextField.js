import React from "react";
import { FormControl, TextField } from "@mui/material";
import InputMask from "react-input-mask";

function MaskedTextField(props) {
  const { mask, value, onChange, onBlur,  ...other } = props;
  return (
    <FormControl fullWidth>
    <InputMask mask={mask} value={value} onChange={onChange} onBlur={onBlur}>
      {() => <TextField {...other} />}
    </InputMask>
    </FormControl>
  );
}

export default MaskedTextField;
