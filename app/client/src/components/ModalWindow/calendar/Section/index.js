import React from 'react';

import InfoPayment from "./Info";
import FormCalendarPayment from "./Form";
import SendMessageCustomer from "./Send";

const SectionWindowCalendar = ({
 stateWindow,
 setStateWindow,
 data,
 dataCustomer,
 setDataModal,
 deletePayment
}) => {
  switch (stateWindow) {
    case 'info':
      return <InfoPayment
        amount={data.amount}
        full_name={data.full_name}
        email={dataCustomer.email}
        phone={dataCustomer.phone}
        setStateWindow={setStateWindow}
        deletePayment={deletePayment}
        status={data.status}
      />
    case 'add':
    case 'edit':
      return <FormCalendarPayment
        type='edit'
        payment_id={data.id}
        amount={data.amount}
        date={data.date}
        status={data.status}
        setDataModal={setDataModal}
        previousData={{
          id: data.payment_id,
          date: data.date,
          status: data.status,
          amount: data.amount
        }}
      />
    case 'send':
      return <SendMessageCustomer
        setDataModal={setDataModal}
        dataEMAIL={{
          phone: data.phone,
          email: data.email,
          date: data.date,
          amount: data.amount,
          loan_id: data.loan_id,
          customer_id: data.customer_id
        }}
      />
    default:
      return null;
  }
};

export default SectionWindowCalendar;
