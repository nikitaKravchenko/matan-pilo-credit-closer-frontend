import React from 'react';
import {useEditController} from "react-admin";
import format from "date-fns/format";

import PaymentModalWindow from "../../ModalWindow/payment";

import {useStateFormPayment} from "../../../utils/hooks/useStateFormPayment";

const PaymentPost = ({setOpen}) => {
  const {record} = useEditController();

  const [formState, setForm, onSubmit] = useStateFormPayment({
    type: 'create',
    loan_id: record.id,
    amount: record.payment_amount,
    setOpen: () => setOpen(false),
    date: format(new Date(), 'yyyy-MM-dd HH:mm'),
    status: 'Waiting for payment'
  });

  return (
    <PaymentModalWindow
      setForm={setForm}
      setOpen={setOpen}
      formState={formState}
      onSubmit={onSubmit}
      title='Add Payment'
    />
  )
};

export default PaymentPost;
