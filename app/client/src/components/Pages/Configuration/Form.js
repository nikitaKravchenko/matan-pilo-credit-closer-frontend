import React from 'react';
import {TextInput, minLength, maxLength} from "react-admin";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const UserForm = () => {
  return (
    <Box width={{xs: '100%', xl: 600}} spacing={2}>
      <Grid item xs={9} md={8}>
        <Typography variant="h6" gutterBottom>
          Identity
        </Typography>
        <Box display={{xs: 'block', sm: 'flex'}}>
          <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
            <TextInput
              source="first_name"
              required
              fullWidth
            />
          </Box>
          <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
            <TextInput
              source="last_name"
              required
              fullWidth
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
        <TextInput
          type="password"
          source="password"
          validate={[minLength(4), maxLength(255)]}
          fullWidth
        />
      </Grid>
    </Box>
  );
};

export default UserForm;