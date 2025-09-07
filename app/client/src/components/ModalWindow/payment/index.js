import React from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {stylePayment} from "./styles";
import FormInputPayment from "./FormInput";

const PaymentModalWindow = ({setOpen, setForm, formState, onSubmit, title}) => {
  const setFormState = ({target}) => {
    setForm(e => ({...e, [target.name]: target.value}))
  }

  const handleClose = () => setOpen(false);

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={stylePayment}>
        <FormInputPayment
          title={title}
          onSubmit={onSubmit}
          setFormState={setFormState}
          formState={formState}
        />
      </Box>
    </Modal>
  );
};

export default PaymentModalWindow;
