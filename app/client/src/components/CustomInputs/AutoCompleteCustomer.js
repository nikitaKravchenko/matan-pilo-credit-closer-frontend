import React from 'react';
import Box from "@mui/material/Box";
import {AutocompleteInput, ReferenceInput} from "react-admin";

const AutoCompleteCustomer = ({setCustomerId, style = {}, m = {}}) => {
  return (
    <Box width={style} m={m}>
      <ReferenceInput
        label="Customer"
        source="customer_id"
        reference="customers"
        perPage={10}
        isRequired
      >
        <AutocompleteInput
          fullWidth
          isRequired
          onChange={(value) => setCustomerId(value)}
          optionText={ChoicesCustomer}
          inputText={ChoicesCustomerText}
          resource='customers'
          debounce={500}
        />
      </ReferenceInput>
    </Box>
  );
};

const ChoicesCustomer = (choice) => {
  return choice.first_name && (
    <Box display='flex' flexDirection='column' fontSize='12px'>
      <Box display='flex'>
        <span style={{marginRight: 4, fontWeight: 'bold'}}>
          {choice.first_name} {choice.last_name}
        </span>
      </Box>
      <Box display='flex' alignItems='center'>
        <span>{choice.email}</span>
      </Box>
      <Box display='flex' alignItems='center'>
        <span>{choice.phone}</span>
      </Box>
    </Box>
  );
}

const ChoicesCustomerText = (choice) => {
  return choice.email ? choice.email : ''
}

export default AutoCompleteCustomer;