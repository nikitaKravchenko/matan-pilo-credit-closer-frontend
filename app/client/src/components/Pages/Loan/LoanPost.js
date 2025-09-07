import React, {useState} from 'react';
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Create, SimpleForm, useCreate, useRedirect} from 'react-admin';

import LoanForm from "./LoanForm";
import {LoanAsideEdit} from "./Aside";
import {toast} from "../../Toastify";
import {initialDataLoanPost} from "../../../utils/schema/initialValues/loan";

const LoanPost = () => {
  const redirect = useRedirect();
  const [create] = useCreate();
  const [customerId, setCustomerId] = useState('');
  const [listPayments, setListPayments] = useState([]);

  const isMdmall = useMediaQuery(theme =>
    theme.breakpoints.down('md')
  );

  const onSubmit = (data) => {
    create('loans', {data: {...data, payments: listPayments}}, {
      onSuccess: (data) => {
        toast('Created loan', 'success');
        redirect(`/loans/${data.id}`);
      },
      onError: (e) => {
        toast(e.response.data, 'error');
      },
    });
  }

  return (
    <Create sx={{padding: '16px 16px 165px 16px'}} aside={!isMdmall ? <LoanAsideEdit customerId={customerId}/> : <></>}>
      <SimpleForm onSubmit={onSubmit} defaultValues={initialDataLoanPost}>
        <Box sx={{display: 'flex', width: '100%'}}>
          <LoanForm
            setCustomerId={setCustomerId}
            setListPayments={setListPayments}
          />
        </Box>
      </SimpleForm>
    </Create>
  );
};

export default LoanPost;
