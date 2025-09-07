import React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import {useNewPayments} from "../../../../utils/hooks/useNewPayments";

const PostNewPayments = ({period, amountPayment, numberPayments, setListPayments}) => {
  const [payments, onChange] = useNewPayments(
    period,
    amountPayment,
    numberPayments,
    setListPayments
  );

  return payments.map(({amount, date}, i) => (
    <Box display={{sm: 'flex', xs: 'block'}} width={{xs: '70%', md: '90%'}} key={i + '_PostNewPayments'}>
      <TextField
        name={`${i}_amount`}
        label={`#${i} Amount`}
        type='text'
        onChange={onChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          value: amount
        }}
        sx={{marginRight: '8px'}}
      />
      <TextField
        name={`${i}_date`}
        label={`#${i} Date`}
        type="datetime-local"
        onChange={onChange}
        InputLabelProps={{shrink: true}}
        InputProps={{value: date}}
      />
    </Box>
  ))
}

const ListNewPayment = ({edit, period, amountPayment, numberPayments, setListPayments}) => {
  return !edit && (
    <Card sx={{padding: '8px 6px'}}>
      <PostNewPayments
        period={period}
        amountPayment={amountPayment}
        numberPayments={numberPayments}
        setListPayments={setListPayments}
      />
    </Card>
  );
};

export default ListNewPayment;