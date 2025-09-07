import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useGetOne, useUpdate} from "react-admin";
import {toast} from "../../../Toastify";

const Template = () => {
  const [update] = useUpdate();
  const [dataSetting, setDataSetting] = useState('');

  const {data: dataEMAIL = {}, isLoadingEMAIL} = useGetOne('settings', {id: 'EMAIL'});

  const onChange = ({target}) => {
    setDataSetting(target.value);
  }

  const saveSetting = () => {
    update('settings', {
      id: "EMAIL", data: {value: dataSetting, id: "EMAIL"}, previousData: dataEMAIL
    }, {
      onSuccess: () => {
        toast(`Updated Automatic`, 'success');
      },
      onError: (e) => {
        toast(e.response.data, 'error');
      },
    });
  }

  useEffect(() => {
    if (!isLoadingEMAIL) {
      setDataSetting(dataEMAIL.value);
    }
  }, [dataEMAIL, isLoadingEMAIL]);

  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={9}
        maxLength={300}
        name='template'
        label='Message'
        variant="outlined"
        onChange={onChange}
        value={dataSetting}
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

export default Template;