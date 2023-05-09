import { FormControl, TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, value, label,decimal, readOnly, ...other } = props;

  return (
    <div className="number">
    <FormControl fullWidth >
                  <NumericFormat customInput={TextField} 
                    value={value}
                    variant="outlined"
                    label={label}
                    decimalSeparator={","}
                    thousandSeparator={"."}
                    isNumericString
                    onChange={onChange}
                    decimalScale={decimal}
                    autoComplete="off"
                    disabled={readOnly}
                    />

                </FormControl>
                </div>);
}

export default NumberFormatCustom;
