import React, {useState} from 'react';
import {useGetList} from "react-admin";

import PaymentEdit from "./PaymentEdit";
import PaymentPost from "./PaymentPost";
import EditPaymentButton from "./EditButton";
import PaymentListSection from "./PaymentListSection";

import {listPaymentData} from "../../../utils/schema/initialValues/payment";
import ConfirmDeleteButton from "../../ModalWindow/ConfirmButton";

const PaymentList = ({open, setOpen}) => {
  const [paymentData, setData] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [filter, setFilter] = useState(1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const sort = {field: 'id', order: 'ASC'};
  const {data, total, isLoading} = useGetList('payments', {
    filter: {loan_id: window.location.pathname.split('/')[2]},
    pagination: {page, perPage},
    sort,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filterValues = {id: filter};
  const setFilters = filters => setFilter(filters.id);

  return (
    <>
      {open && (
        <PaymentPost setOpen={setOpen}/>
      )}
      <PaymentListSection
        data={listPaymentData}
        filters={[]}
        value={{data, total, page, perPage, setPerPage, setPage, filterValues, setFilters, sort}}
        ModalWindow={paymentOpen && (
          <PaymentEdit
            setOpen={setPaymentOpen}
            data={paymentData}
          />
        )}
      >
        <EditPaymentButton
          setOpen={setPaymentOpen}
          setData={setData}
        />
        <ConfirmDeleteButton
          resource='payments'
          confirmContent='Do you want to remove payment?'
          styleTrashButton={{minWidth: 'fit-content'}}
        />
      </PaymentListSection>
    </>
  );
};

export default PaymentList;
