import React from 'react';

import PaymentModalWindow from "../../ModalWindow/payment";
import {useStateFormPayment} from "../../../utils/hooks/useStateFormPayment";

const PaymentEdit = ({setOpen, data}) => {
  const [formState, setForm, onSubmit] = useStateFormPayment({
    payment_id: data.id,
    amount: data.amount,
    date: data.date,
    previousData: data,
    status: data.status,
    setOpen: () => setOpen(false)
  });

  return (
    <PaymentModalWindow
      setForm={setForm}
      setOpen={setOpen}
      formState={formState}
      onSubmit={onSubmit}
      title='Edit Payment'
    />
  )
}

export default PaymentEdit;
