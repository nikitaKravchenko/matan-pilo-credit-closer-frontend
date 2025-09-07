import React from "react";
import {
  DateField,
  RecordContextProvider,
  useListContext,
  EditButton,
  TextField
} from "react-admin";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import RestoreButton from "../../Section/Buttons/RestoreButton";
import ConfirmDeleteButton from "../../../ModalWindow/ConfirmButton";

const CustomerMobileList = () => {
  const {data, isLoading, filterValues: {paranoid = true}} = useListContext();

  if (isLoading || !data?.length) {
    return null;
  }

  return (
    <Box margin="0.5em">
      <Card sx={{padding: 1}}>
        {data.map(record => (
          <RecordContextProvider key={record.id} value={record}>
            <Card sx={{margin: '0.5rem 0'}}>
              <CardHeader
                title={`${record.first_name} ${record.last_name}`}
                action={paranoid ? (
                  <EditButton/>
                ) : (
                  <Box display='flex' flexDirection='column'>
                    <RestoreButton resource='customers'/>
                    <ConfirmDeleteButton
                      resource='customers/destroy'
                      confirmContent='Are you sure you want to delete? Data cannot be recovered'
                    />
                  </Box>
                )}
              />
              <CardContent sx={{pt: 0}}>
                <Typography variant="body2" fontSize='12px'>
                  <span style={{fontWeight: 'bold'}}>Email: </span>
                  <TextField source='email'/>
                </Typography>
                <Typography variant="body2" fontSize='12px'>
                  <span style={{fontWeight: 'bold'}}>Phone: </span>
                  <TextField source='phone'/>
                </Typography>
                {paranoid ? (
                  <Typography variant="body2" fontSize='12px'>
                    <span style={{fontWeight: 'bold'}}>Created: </span>
                    <DateField source="created_at"/>
                  </Typography>
                ) : (
                  <Typography variant="body2" fontSize='12px'>
                    <span style={{fontWeight: 'bold'}}>Deleted: </span>
                    <DateField source="deleted_at"/>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </RecordContextProvider>
        ))}
      </Card>
    </Box>
  );
};

export default CustomerMobileList