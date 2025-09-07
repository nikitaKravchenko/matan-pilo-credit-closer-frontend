import React, {useEffect, useState} from 'react';
import {useGetOne} from "react-admin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {toast} from "../../../Toastify";
import {selectDataInRow} from "../../../../utils/functions/workingString";
import {sendMessage} from "../../../../utils/api/custom-request";

const SendMessageCustomer = ({dataEMAIL, setDataModal}) => {
  const {data: dataMessage, isLoading: isLoadingMessage} = useGetOne('settings', {id: 'EMAIL'});

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const SendMessage = () => {
    sendMessage('message', {
      message,
      email,
      customer_id: dataEMAIL.customer_id
    }).then(() => {
      toast(`You have sent an EMAIL to: ${dataEMAIL.email}`, 'success');
    }).catch((e) => {
      toast(e.response.data, 'error');
    });

    setDataModal(e => ({...e, open: false}));
  }

  useEffect(() => {
    if (dataMessage && !isLoadingMessage) {
      setMessage(selectDataInRow(dataMessage.value, dataEMAIL));
      setEmail(dataEMAIL.email)
    }
  }, [setMessage, setEmail, dataMessage, isLoadingMessage, dataEMAIL]);

  if (isLoadingMessage) {
    return 'Loading...';
  }

  return (
    <div>
      <TextField
        fullWidth
        maxLength={300}
        label="Email"
        variant="outlined"
        sx={{marginBottom: '20px'}}
        onChange={({target}) => setEmail(target.value)}
        value={email}
      />
      <TextField
        fullWidth
        multiline
        rows={6}
        maxLength={300}
        label="Message"
        variant="outlined"
        sx={{marginBottom: '20px'}}
        onChange={({target}) => setMessage(target.value)}
        value={message}
      />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={SendMessage}
      >
        SEND
      </Button>
    </div>
  );
};

export default SendMessageCustomer;
