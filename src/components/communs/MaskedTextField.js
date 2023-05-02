import React from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

function MaskedTextField(props) {
  const { mask, value, onChange,  ...other } = props;
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {() => <TextField {...other} />}
    </InputMask>
  );
}

export default MaskedTextField;
