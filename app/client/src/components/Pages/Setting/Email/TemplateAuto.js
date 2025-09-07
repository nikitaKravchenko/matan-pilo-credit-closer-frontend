import React, {useEffect, useState} from 'react';
import {useGetOne, useUpdate} from "react-admin";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {toast} from "../../../Toastify";

const TemplateAuto = () => {
  const [update] = useUpdate();
  const [dataSetting, setDataSetting] = useState({templateAuto: '', notify: ''});

  const {data: dataAUTO = {}, isLoading: isLoadingAUTO} = useGetOne('settings', {id: 'AUTO'});
  const {data: dataNOTIFY = {}, isLoading: isLoadingNOTIFY} = useGetOne('settings', {id: 'TO_NOTIFY'});

  const onChange = ({target}) => {
    setDataSetting(e => ({...e, [target.name]: target.value}));
  }

  const saveSetting = () => {
    update('settings', {
      previousData: dataAUTO,
      id: 'AUTO', data: {
        value: dataSetting.templateAuto,
        id: "AUTO",
        notify: {value: dataSetting.notify, id: "TO_NOTIFY"}
      }
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
    if (!isLoadingAUTO && !isLoadingNOTIFY) {
      setDataSetting({
        templateAuto: dataAUTO.value,
        notify: dataNOTIFY.value,
      })
    }
  }, [isLoadingAUTO, isLoadingNOTIFY, dataAUTO, dataNOTIFY])

  return (
    <>
      <TextField
        fullWidth
        name='notify'
        type='number'
        label="Set a day of reminder before the payments date"
        variant="outlined"
        onChange={onChange}
        value={dataSetting.notify}
        sx={{margin: '0 0 10px 0'}}
      />
      <TextField
        fullWidth
        multiline
        rows={9}
        maxLength={300}
        label='Message'
        variant="outlined"
        onChange={onChange}
        value={dataSetting.templateAuto}
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

export default TemplateAuto;