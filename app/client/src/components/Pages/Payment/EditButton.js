import React from 'react';
import {Button, useRecordContext} from "react-admin";
import ContentCreate from '@mui/icons-material/Create';

const EditPaymentButton = ({setData, setOpen}) => {
  const record = useRecordContext();

  const onClick = () => {
    setData(record);
    setOpen(true)
  }

  return (
    <Button
      onClick={onClick}
      label='Edit'
      sx={{padding: 0}}
    >
      <ContentCreate/>
    </Button>
  );
};

export default EditPaymentButton;
