import React from 'react';
import format from "date-fns/format";

import FormInputPayment from "../../payment/FormInput";
import {useStateFormPayment} from "../../../../utils/hooks/useStateFormPayment";

const FormCalendarPayment = ({
 amount,
 date,
 payment_id,
 status,
 loan_id,
 setDataModal,
 type,
 previousData = {},
 period
}) => {

  const [formState, setForm, onSubmit] = useStateFormPayment({
    type,
    period,
    payment_id,
    loan_id,
    amount,
    status,
    previousData,
    date: format(new Date(date), 'yyyy-MM-dd HH:mm'),
    setOpen: () => setDataModal(e => ({...e, open: false}))
  });

  const setFormState = ({target}) => {
    setForm(e => ({...e, [target.name]: target.value}))
  }

  return (
    <FormInputPayment
      paddingZero={true}
      onSubmit={onSubmit}
      setFormState={setFormState}
      formState={formState}
    />
  );
};

export default FormCalendarPayment;
