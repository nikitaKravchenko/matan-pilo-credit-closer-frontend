import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import {
  NumberInput,
  SelectInput,
  TextInput,
  DateInput,
  regex,
  maxLength,
} from "react-admin";

import AutoCompleteCustomer from "../../../CustomInputs/AutoCompleteCustomer";
import ListNewPayment from "./ListNewPayment";

const LoanForm = ({edit, setCustomerId, setListPayments}) => {
  const [period, setPeriod] = useState('');
  const [amountPayment, setAmount] = useState('');
  const [numberPayments, setNumberPayments] = useState(0);

  const loanAmountValidate = [
    regex(/^[0-9]*[.]?[0-9]+$/i, 'Only positive numbers are allowed'),
    maxLength(60),
  ];

  return (
    <Box width={{xs: '100%', xl: 500}} spacing={2}>
      {edit && (<TextInput disabled source="id"/>)}
      <Grid item xs={9} md={8}>
        <Typography variant="h6" gutterBottom></Typography>
        <Box display={{xs: 'block', sm: 'flex'}}>
          <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
            <TextInput
              label='Loan amount'
              source="loan_amount"
              fullWidth
              maxLength={60}
              required
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              validate={loanAmountValidate}
            />
          </Box>
          <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
            <TextInput
              label='Payment amount'
              source="payment_amount"
              onChange={(e) => setAmount(e.target.value)}
              maxLength={60}
              required
              fullWidth
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
              validate={loanAmountValidate}
            />
          </Box>
        </Box>
        <AutoCompleteCustomer
          setCustomerId={setCustomerId}
        />
        <SelectInput
          required
          fullWidth
          label='Status'
          source="status"
          choices={[{id: 'Active', name: 'Active'}, {id: 'Closed', name: 'Closed'}]}
        />
        <Box display={{xs: 'block', sm: 'flex'}}>
          <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
            <NumberInput
              required
              fullWidth
              type='number'
              label='Number of payments'
              source="number_payments"
              onChange={(e) => setNumberPayments(e.target.value)}
            />
          </Box>
          <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
            <SelectInput
              required
              fullWidth
              label='Payment period'
              source="payment_period"
              onChange={(e) => setPeriod(e.target.value)}
              choices={[
                {id: 'M2', name: '2 Month'},
                {id: 'M1', name: '1 Month'},
                {id: 'W2', name: '2 Week'},
                {id: 'W1', name: '1 Week'},
                {id: 'D', name: 'Every Day'}
              ]}
            />
          </Box>
        </Box>
        <ListNewPayment
          edit={edit}
          period={period}
          amountPayment={amountPayment}
          numberPayments={numberPayments}
          setListPayments={setListPayments}
        />
      </Grid>
    </Box>
  )
}

export default LoanForm;