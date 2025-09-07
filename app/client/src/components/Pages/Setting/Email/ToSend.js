import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useGetOne, useUpdate} from "react-admin";
import {toast} from "../../../Toastify";

const ToSend = () => {
  const [update] = useUpdate();
  const [dataSetting, setDataSetting] = useState({fromName: '', fromEmail: '', replyTo: ''});

  const {data: dataFromNAME = {}, isLoading: isLoadingFromNAME} = useGetOne('settings', {id: 'FROM_NAME'});
  const {data: dataFromEMAIL = {}, isLoading: isLoadingFromEMAIL} = useGetOne('settings', {id: 'FROM_EMAIL'});
  const {data: dataREPLY = {}, isLoading: isLoadingREPLY} = useGetOne('settings', {id: 'REPLY_TO_EMAIL'});

  const onChange = ({target}) => {
    setDataSetting(e => ({...e, [target.name]: target.value}));
  }

  const saveSetting = () => {
    const option = {
      onSuccess: () => {
        toast(`Updated Settings`, 'success');
      },
      onError: (e) => {
        toast(e.response.data, 'error');
      },
    }

    update('settings', {
      id: "FROM_NAME", data: {value: dataSetting.fromName, id: "FROM_NAME"}, previousData: dataFromNAME
    }, option);
    update('settings', {
      id: "FROM_EMAIL", data: {value: dataSetting.fromEmail, id: "FROM_EMAIL"}, previousData: dataFromEMAIL
    }, option);
    update('settings', {
      id: "REPLY_TO_EMAIL", data: {value: dataSetting.replyTo, id: "REPLY_TO_EMAIL"}, previousData: dataREPLY
    }, option);
  }

  useEffect(() => {
    if (!isLoadingFromNAME && !isLoadingFromEMAIL && !isLoadingREPLY) {
      setDataSetting({
        fromEmail: dataFromEMAIL.value,
        fromName: dataFromNAME.value,
        replyTo: dataREPLY.value
      })
    }
  }, [isLoadingFromNAME, isLoadingFromEMAIL, isLoadingREPLY, dataFromNAME, dataFromEMAIL, dataREPLY])

  return (
    <>
      <TextField
        fullWidth
        name='fromName'
        type='text'
        label="From name"
        variant="outlined"
        onChange={onChange}
        value={dataSetting.fromName}
        sx={{margin: '0 0 15px 0'}}
      />
      <TextField
        fullWidth
        name='fromEmail'
        type='email'
        label="From email"
        variant="outlined"
        onChange={onChange}
        value={dataSetting.fromEmail}
        sx={{margin: '0 0 15px 0'}}
      />
      <TextField
        fullWidth
        name='replyTo'
        type='email'
        label="Reply to"
        variant="outlined"
        onChange={onChange}
        value={dataSetting.replyTo}
        sx={{margin: '0 0 15px 0'}}
      />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        sx={{marginTop: '10px'}}
        onClick={saveSetting}
      >
        Save
      </Button>
    </>
  );
};

export default ToSend;