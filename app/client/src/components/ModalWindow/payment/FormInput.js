import React from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import {DateTimeInput, maxLength, regex, SelectInput, SimpleForm, TextInput} from "react-admin";

const FormInputPayment = ({onSubmit, title, formState, setFormState, paddingZero}) => {
  const loanAmountValidate = [
    regex(/^[0-9]*[.]?[0-9]+$/i, 'Only positive numbers are allowed'),
    maxLength(60),
  ];

  return (
    <SimpleForm onSubmit={onSubmit} toolbar={false} sx={paddingZero ? {padding: '0px !important'} : {}}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <TextInput
        name='amount'
        source='amount'
        label='Amount'
        type='text'
        validate={loanAmountValidate}
        fullWidth
        defaultValue={formState.amount}
        onChange={setFormState}
        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
      />
      <DateTimeInput
        fullWidth
        name='date'
        source='date'
        label="Date"
        InputProps={{value: formState.date}}
        onChange={setFormState}
        InputLabelProps={{shrink: true}}
      />
      <SelectInput
        required
        fullWidth
        name='status'
        label='Status'
        source="status"
        value={"Waiting for payment"}
        SelectProps={{value: formState.status}}
        onChange={setFormState}
        choices={[
          {id: 'Waiting for payment', name: 'Waiting for payment'},
          {id: 'Paid', name: 'Paid'}
        ]}
      />
      <Button
        fullWidth
        type='submit'
        variant='contained'
      >
        Save Payment
      </Button>
    </SimpleForm>
  );
};

export default FormInputPayment;