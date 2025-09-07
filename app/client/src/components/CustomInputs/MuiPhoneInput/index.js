import React, {forwardRef} from "react";
import {useController} from 'react-hook-form';
import PhoneInput from "react-phone-number-input";
import TextField from '@mui/material/TextField';

import './styles.css';

export const MuiPhoneInput = ({name}) => {
  const {field} = useController({name});

  return (
    <div>
      <PhoneInput
        {...field}
        defaultCountry='US'
        inputComponent={TextFieldRef}
      />
    </div>
  );
}

const FieldRef = (props, ref) => {
  return (
    <TextField
      {...props}
      inputRef={ref}
      label='Phone Number'
      fullWidth
      required
    />
  )
}

const TextFieldRef = forwardRef(FieldRef);

export default MuiPhoneInput;