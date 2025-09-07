import React from 'react';
import {
  TextField,
  EditButton,
  RecordContextProvider,
  useListContext,
} from "react-admin";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import RestoreButton from "../../Section/Buttons/RestoreButton";
import ColoredNumberField from "../../../CustomInputs/ColoredNumberField";
import ConfirmDeleteButton from "../../../ModalWindow/ConfirmButton";
import {loanListStylesMobile} from "./styles";

const styleTitle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '17px'
}

const TitleMobileCard = () => {
  return (
    <Box>
      <Typography variant="body2" sx={styleTitle}>
        <span>Loan amount: </span>
        <ColoredNumberField
          source="loan_amount"
          styles={{fontSize: '20px'}}
        />
      </Typography>
      <Typography variant="body2" sx={styleTitle}>
        <span>Payment amount: </span>
        <ColoredNumberField
          styles={{fontSize: '20px'}}
          source="payment_amount"
        />
      </Typography>
    </Box>
  )
}

const LoanListMobile = () => {
  const {data, isLoading, filterValues: {paranoid = true}} = useListContext();

  if (isLoading || !data?.length) {
    return null;
  }

  return (
    <Box margin="0.5em">
      <Card sx={{padding: 1}}>
        {data.map(record => (
          <RecordContextProvider key={record.id} value={record}>
            <Card sx={{margin: '0.5rem 0', ...loanListStylesMobile(!paranoid)(record)}}>
              <CardHeader
                title={<TitleMobileCard {...record}/>}
                action={paranoid ? (
                  <EditButton/>
                ) : (
                  <Box display='flex' flexDirection='column'>
                    <RestoreButton resource='loans'/>
                    <ConfirmDeleteButton
                      resource='loans/destroy'
                      confirmContent='Are you sure you want to delete? Data cannot be recovered'
                    />
                  </Box>
                )}
              />
              <CardContent sx={{pt: 0}}>
                <Typography variant="body2" fontSize='12px'>
                  <span style={{fontWeight: 'bold'}}>Profit: </span>
                  <ColoredNumberField source='profit'/>
                </Typography>
                <Typography variant="body2" fontSize='12px'>
                  <span style={{fontWeight: 'bold'}}>Return total: </span>
                  <ColoredNumberField source='return_total'/>
                </Typography>
                <Typography variant="body2" fontSize='12px'>
                  <span style={{fontWeight: 'bold'}}>Status: </span>
                  <TextField source="status"/>
                </Typography>
              </CardContent>
            </Card>
          </RecordContextProvider>
        ))}
      </Card>
    </Box>
  );
};

export default LoanListMobile;
