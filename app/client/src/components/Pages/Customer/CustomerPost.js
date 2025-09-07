import React from 'react';
import {Create, SaveButton, SimpleForm, Toolbar, useCreate, useRedirect} from 'react-admin';

import CustomerForm from "./CustomerForm";
import {toast} from "../../Toastify";

export const CustomerToolbar = () => {
  return (
    <Toolbar>
      <SaveButton/>
    </Toolbar>
  )
};

const CustomerPost = () => {
  const redirect = useRedirect();
  const [create] = useCreate();

  const onSubmit = (data) => {
    create('customers', {data}, {
      onSuccess: (data) => {
        toast('Created customer', 'success');
        redirect(`/customers/${data.id}`);
      },
      onError: (e) => {
        toast(e.response.data, 'error');
      },
    });
  }

  return (
    <Create title='Create a Customer'>
      <SimpleForm onSubmit={onSubmit} toolbar={<CustomerToolbar/>}>
        <CustomerForm/>
      </SimpleForm>
    </Create>
  );
};

export default CustomerPost;
