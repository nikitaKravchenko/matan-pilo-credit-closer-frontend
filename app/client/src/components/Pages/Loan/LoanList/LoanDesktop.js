import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  ReferenceField,
  TextField,
  useListContext,
  useRecordContext,
  BulkExportButton
} from "react-admin";

import MergeColumnMoneyField from "../../../CustomInputs/CustomField/MergeColumnMoneyField";
import ColoredNumberField from "../../../CustomInputs/ColoredNumberField";
import RestoreButton from "../../Section/Buttons/RestoreButton";
import ConfirmDeleteButton from "../../../ModalWindow/ConfirmButton";
import {loanListStylesMobile} from "./styles";

const SxLoanList = {
  '& .column-status': {
    display: {sm: 'none', md: 'table-cell'},
  },
  '& .column-return_total': {
    display: {sm: 'none', md: 'table-cell'},
  },
  '& .column-next_payment_date': {
    display: {sm: 'none', md: 'table-cell'},
  }
}

const SxLoanTrash = {
  '& .column-return_total': {
    display: {sm: 'none', md: 'table-cell'},
  },
  '& .column-status': {
    display: {sm: 'none', md: 'table-cell'},
  },
}

export const CustomerFiled = ({name}) => {
  const record = useRecordContext();

  return record ? <span>{record[name]}</span> : null;
};

const LoanListDesktop = () => {
  const {filterValues: {paranoid = true}, data} = useListContext();

  if (!data?.length) {
    return null;
  }

  return !paranoid ? (
    <Datagrid
      sx={SxLoanTrash}
      bulkActionButtons={false}
      rowStyle={loanListStylesMobile(true)}
    >
      <TextField source='id'/>

      <ColoredNumberField source="loan_amount"/>
      <MergeColumnMoneyField
        label='Return total | Profit'
        source='return_total'
        one='return_total'
        two='profit'
      />

      <TextField source='status'/>
      <DateField source='created_at'/>
      <DateField source='deleted_at'/>

      <RestoreButton resource='loans'/>
      <ConfirmDeleteButton
        resource='loans/destroy'
        confirmContent='Are you sure you want to delete? Data cannot be recovered'
      />
    </Datagrid>
  ) : (
    <Datagrid
      sx={SxLoanList}
      rowStyle={loanListStylesMobile(false)}
      bulkActionButtons={<BulkExportButton/>}
    >
      <TextField source='id'/>
      <ReferenceField source="customer_id" reference="customers">
        <CustomerFiled name='email'/>
      </ReferenceField>

      <ColoredNumberField source="loan_amount"/>
      <ColoredNumberField source="payment_amount"/>

      <MergeColumnMoneyField
        label='Return total | Profit'
        source='return_total'
        one='return_total'
        two='profit'
      />

      <TextField source='status'/>

      <EditButton basepath='/loans'/>
    </Datagrid>
  );
};

export default LoanListDesktop;
