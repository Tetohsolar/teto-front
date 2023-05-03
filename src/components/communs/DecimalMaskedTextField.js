import { FormControl, TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, value, label,decimal, ...other } = props;

  return (
    <FormControl fullWidth>
                  <NumericFormat customInput={TextField}
                    value={value}
                    variant="outlined"
                    label={label}
                    decimalSeparator={","}
                    thousandSeparator={"."}
                    isNumericString
                    onChange={onChange}
                    decimalScale={decimal}
                    autoComplete="off" />
                </FormControl>
  );
}

export default NumberFormatCustom;
