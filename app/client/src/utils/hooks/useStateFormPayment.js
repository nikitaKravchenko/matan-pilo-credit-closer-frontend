import {useState} from 'react';
import {useRefresh, useUpdate, useCreate} from "react-admin";

import {toast} from "../../components/Toastify";

export const useStateFormPayment = ({type, payment_id, date, amount, setOpen, loan_id, previousData, status}) => {
  const refresh = useRefresh();
  const [create] = useCreate();
  const [update] = useUpdate();

  const [formState, setForm] = useState({
    amount,
    status,
    date: type === 'create' ? date :
      String(date).slice(0, 16)
  });

  const onSubmit = () => {
    const option = {
      onSuccess: () => {
        toast(type === 'create' ? 'Created payment' : 'Updated payment', 'success');
        refresh();
        setOpen();
      },
      onError: (e) => {
        toast(e.response.data, 'error');
        setOpen();
      },
    }

    if (type === 'create') {
      create('payments', {
        data: {
          loan_id,
          amount: String(formState.amount),
          date: formState.date,
          status: formState.status
        }
      }, {...option})
    } else {
      update('payments', {
        id: payment_id,
        data: {
          id: payment_id,
          amount: String(formState.amount),
          date: formState.date,
          status: formState.status
        },
        previousData
      }, {...option});
    }
  }

  return [formState, setForm, onSubmit];
};
