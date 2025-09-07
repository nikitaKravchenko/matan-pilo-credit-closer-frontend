import React from "react";
import {Datagrid, DateField, EditButton, TextField, useListContext, BulkExportButton} from "react-admin";

import RestoreButton from "../../Section/Buttons/RestoreButton";
import ConfirmDeleteButton from "../../../ModalWindow/ConfirmButton";

const SxCustomer = {
  '& .column-address': {
    display: {sm: 'none', md: 'table-cell'},
  },
  '& .column-phone': {
    display: {sm: 'none', md: 'table-cell'},
  }
}

const CustomerDesktopList = () => {
  const {filterValues: {paranoid = true}, data} = useListContext();

  if(!data?.length) {
    return null;
  }

  return paranoid ? (
    <Datagrid
      optimized
      sx={SxCustomer}
      bulkActionButtons={<BulkExportButton/>}
    >
      <TextField source='id'/>
      <TextField source='first_name'/>
      <TextField source='last_name'/>
      <TextField source='address'/>
      <TextField source='email'/>
      <TextField source='phone'/>
      <EditButton basepath='/customers'/>
    </Datagrid>
  ) : (
    <Datagrid
      optimized
      sx={SxCustomer}
      bulkActionButtons={false}
    >
      <TextField source='id'/>
      <TextField source='first_name'/>
      <TextField source='last_name'/>
      <TextField source='email'/>
      <TextField source='phone'/>
      <DateField source='created_at'/>
      <DateField source='deleted_at'/>
      <RestoreButton resource='customers'/>
      <ConfirmDeleteButton
        resource='customers/destroy'
        confirmContent='Are you sure you want to delete? Data cannot be recovered'
      />
    </Datagrid>
  );
};

export default CustomerDesktopList