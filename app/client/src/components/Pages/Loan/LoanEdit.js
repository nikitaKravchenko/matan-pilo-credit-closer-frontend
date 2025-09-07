import React, {useState} from 'react';
import {
  Edit,
  SaveButton,
  SimpleForm,
  TopToolbar,
  Toolbar as ToolbarLoan,
  useRefresh,
  useUpdate,
  useRecordContext
} from "react-admin";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

import LoanForm from "./LoanForm";
import PaymentList from "../Payment/PaymentList";
import ConfirmDeleteButton from "../../ModalWindow/ConfirmButton";
import {LoanAsideEdit} from "./Aside";
import {toast} from "../../Toastify";

const Action = ({setOpen}) => {
  return (
    <TopToolbar>
      <Button color="primary" onClick={() => setOpen(true)}>
        Add Payment
      </Button>
    </TopToolbar>
  )
}

const Toolbar = () => {
  return (
    <ToolbarLoan sx={{justifyContent: 'space-between'}}>
      <SaveButton/>
      <ConfirmDeleteButton
        resource='loans'
        confirmTitle='Send to trash'
        confirmContent='Do you want to send a loans to the trash?'
        redirect='/loans'
      />
    </ToolbarLoan>
  )
}


const SimpleFormLoans = ({setCustomerId}) => {
  const refresh = useRefresh();
  const [update] = useUpdate();
  const record = useRecordContext();

  const onSubmit = (data) => {
    update('loans', {data, previousData: record}, {
      onSuccess: () => {
        toast('Updated loans', 'success');
        refresh();
      },
      onError: (e) => {
        toast(e.response.data, 'error');
      },
    });
  }

  return (
    <SimpleForm onSubmit={onSubmit} toolbar={<Toolbar/>}>
      <Box sx={{display: 'flex', width: '100%'}}>
        <LoanForm
          edit={true}
          setCustomerId={setCustomerId}
        />
      </Box>
    </SimpleForm>
  );
}

const LoanEdit = (props) => {
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState('');

  const isMdmall = useMediaQuery(theme =>
    theme.breakpoints.down('md')
  );

  return (
    <Edit
      {...props}
      aside={!isMdmall ? <LoanAsideEdit customerId={customerId} edit={true}/> : <></>}
      actions={<Action setOpen={setOpen}/>}
      redirect={false}
    >
      <Box>
        <SimpleFormLoans
          setCustomerId={setCustomerId}
        />
        <PaymentList
          open={open}
          setOpen={setOpen}
        />
      </Box>
    </Edit>
  );
};

export default LoanEdit;
