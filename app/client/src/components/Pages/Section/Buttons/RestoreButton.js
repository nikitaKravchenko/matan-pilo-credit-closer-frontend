import React from 'react';
import {useRecordContext, useCreate, useRedirect, Button} from 'react-admin';
import ContentCreate from '@mui/icons-material/Create';

import {toast} from "../../../Toastify";

const RestoreButton = ({resource}) => {
  const redirect = useRedirect();

  const [create] = useCreate();
  const record = useRecordContext()

  const handleSubmit = () => {
    create(`${resource}/restore`, {data: {id: record.id}}, {
      onSuccess: (data) => {
        toast('success reestablish loan', 'success')
        redirect('edit', `/${resource}`, data.id);
      },
      onError: (e) => {
        toast(e.response.data, 'error');
      }
    })
  }

  return (
    <Button
      onClick={handleSubmit}
      label='Restore'
    >
      <ContentCreate/>
    </Button>
  );
};

export default RestoreButton;
