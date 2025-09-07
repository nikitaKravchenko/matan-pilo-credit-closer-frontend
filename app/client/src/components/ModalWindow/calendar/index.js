import React, {useState} from 'react';
import {useGetOne, useDelete, useRefresh} from "react-admin";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import {HeaderEdit, HeaderPayment} from "./Section/Header";
import SectionWindowCalendar from "./Section";

import {toast} from "../../Toastify";
import {createCard, viewPaymentWrapper} from "./styles";
import {getStatus} from "../../Pages/Calendar/RenderEventContent";

const ViewModalWindow = ({dataModal, setDataModal}) => {
  const [stateWindow, setStateWindow] = useState('info');
  const {status, date} = dataModal.data;

  const statusEvent = getStatus(status, date);

  const color = statusEvent === 'Paid' ? '#4caf50' :
    statusEvent === 'Waiting for payment' ? 'rgb(0 148 239)' : '#f44336';

  return (
    <Card sx={createCard}>
      <HeaderEdit setDataModal={setDataModal}/>
      <ViewPayment
        color={color}
        status={statusEvent}
        data={dataModal.data}
        setDataModal={setDataModal}
        stateWindow={stateWindow}
        setStateWindow={setStateWindow}
      />
    </Card>
  );
};

const ViewPayment = ({data, color, status, stateWindow, setStateWindow, setDataModal}) => {
  const refresh = useRefresh();
  const {data: dataCustomer, isLoading: loadingCustomer} = useGetOne('customers', {id: data.customer_id});

  const [deleteOne] = useDelete()

  const deletePayment = () => {
    deleteOne('payments', {
      id: data.id
    }, {
      onSuccess: () => {
        toast('Deleted payment', 'success');
        refresh();
        setDataModal(e => ({...e, open: false}));
      },
      onError: (e) => {
        toast(e.response.data, 'error');
        setDataModal(e => ({...e, open: false}));
      },
    })
  }

  if (loadingCustomer) {
    return 'Loading...';
  }

  return (
    <Box sx={viewPaymentWrapper}>
      <HeaderPayment
        customer_id={data.customer_id}
        loan_id={data.loan_id}
        status={status}
        start={data.date}
        color={color}
      />
      <SectionWindowCalendar
        data={data}
        dataCustomer={dataCustomer}
        stateWindow={stateWindow}
        setStateWindow={setStateWindow}
        setDataModal={setDataModal}
        deletePayment={deletePayment}
      />
    </Box>
  );
}

export default ViewModalWindow;
