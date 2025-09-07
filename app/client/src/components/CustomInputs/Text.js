import React from "react";
import {useField} from "formik";

import TextField from "@mui/material/TextField";

const err = {
  position: 'absolute',
  color: 'red',
  fontSize: '11px',
  fontWeight: '600',
  bottom: '2px',
  right: '7px'
}

const InputText = ({name, label, type, required}) => {
  const [field, meta] = useField(name);

  return (
    <div style={{position: 'relative', width: '100%', padding: '20px 0'}}>
      <TextField
        type={type}
        label={label}
        required={required}
        variant="outlined"
        fullWidth
        size='medium'
        error={!!(meta.touched && meta.error)}
        {...field}
      />

      {meta.touched && meta.error ? (
        <div style={err}>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default InputText;