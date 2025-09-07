import React from 'react';
import {maxLength, TextInput, minLength} from "react-admin";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import MuiPhoneInput from "../../CustomInputs/MuiPhoneInput";

const CustomerForm = ({edit}) => {
  const nameValidate = [
    minLength(3),
    maxLength(60)
  ];

  return (
    <Box width={{xs: '100%', xl: 600}} spacing={2}>
      {edit && (<TextInput disabled source="id"/>)}
      <Grid item xs={9} md={8}>
        <Typography variant="h6" gutterBottom>
          Identity
        </Typography>
        <Box display={{xs: 'block', sm: 'flex'}}>
          <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
            <TextInput
              source="first_name"
              fullWidth
              required
              validate={nameValidate}
            />
          </Box>
          <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
            <TextInput
              source="last_name"
              fullWidth
              required
              validate={nameValidate}
            />
          </Box>
        </Box>
        <TextInput
          type="email"
          source="email"
          validate={maxLength(42)}
          required
          fullWidth
        />
        <Box display={{xs: 'block', sm: 'flex'}}>
          <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
            <Typography variant="h6" gutterBottom>
              Mobile number
            </Typography>
            <MuiPhoneInput name='phone' label='Phone'/>
          </Box>
          <Box flex={1} ml={{xs: 0, sm: '0.5em'}}/>
        </Box>
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        <TextInput
          required
          validate={maxLength(400)}
          source="address"
          multiline
          fullWidth
          helperText
        />
      </Grid>
    </Box>
  );
};

export default CustomerForm;
