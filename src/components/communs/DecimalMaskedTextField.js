import React from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

function DecimalMaskedTextField(props) {
  const { value, onChange, ...other } = props;

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Regular expression to allow only decimal numbers with up to 2 decimal places
    const regex = /^(\d+(\.\d{0,2})?)?$/;

    if (regex.test(inputValue)) {
      onChange(event);
    }
  };

  return (
    <InputMask mask="" value={value} onChange={handleChange}>
      {() => <TextField {...other} />}
    </InputMask>
  );
}

export default DecimalMaskedTextField;
