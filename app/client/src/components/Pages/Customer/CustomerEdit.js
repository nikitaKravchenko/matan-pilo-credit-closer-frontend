import React from 'react';
import {
  Edit,
  SaveButton,
  SimpleForm,
  Toolbar,
  useUpdate,
  useRefresh,
  useRecordContext,
} from "react-admin";

import CustomerForm from "./CustomerForm";
import {toast} from "../../Toastify";
import ConfirmDeleteButton from "../../ModalWindow/ConfirmButton";

const CustomerToolbar = () => {
  return (
    <Toolbar sx={{justifyContent: 'space-between'}}>
      <SaveButton/>
      <ConfirmDeleteButton
        resource='customers'
        confirmTitle='Send to trash'
        confirmContent='Do you want to send a customer to the trash?'
        redirect='/customers'
      />
    </Toolbar>
  )
}

const SimpleFormCustomers = () => {
  const refresh = useRefresh();
  const [update] = useUpdate();
  const record = useRecordContext();

  const onSubmit = (data) => {
    update('customers', {data, previousData: record}, {
      onSuccess: () => {
        toast('Updated customer', 'success');
        refresh();
      },
      onError: (e) => {
        toast(e.response.data, 'error');
      },
    });
  }

  return (
    <SimpleForm onSubmit={onSubmit} toolbar={<CustomerToolbar/>}>
      <CustomerForm edit={true}/>
    </SimpleForm>
  )
}

const CustomerEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleFormCustomers/>
    </Edit>
  );
};


export default CustomerEdit;
