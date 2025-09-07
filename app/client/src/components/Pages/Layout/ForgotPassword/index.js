import React from 'react';

import FormikWindow from "../Formik";
import InputText from "../../../CustomInputs/Text";

import {forgotAPI} from "../../../../utils/api/auth";
import {toast} from "../../../Toastify";
import {validateForget} from "../../../../utils/schema/validateSchemas/user";

const ForgotPassword = () => {
  const onSubmit = async (value, {setSubmitting}) => {
    try {
      const {data: {message}} = await forgotAPI(value);
      toast(message, 'success');
    } catch (e) {
      toast(e.response.data, 'error');
    }

    setSubmitting(false);
  };

  return (
    <FormikWindow
      onSubmit={onSubmit}
      label='Send Recovery Link'
      initialValues={{email: ''}}
      validationSchema={validateForget}
      link={{url: '/login', label: 'Login'}}
    >
      <InputText
        name='email'
        label='E-mail'
        type='email'
        required
      />
    </FormikWindow>
  );
};

export default ForgotPassword;
