import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import FormikWindow from "../Formik";
import InputText from "../../../CustomInputs/Text";

import {toast} from "../../../Toastify";
import {resetAPI} from "../../../../utils/api/auth";
import {getCustomParams} from "../../../../utils/functions/workingString";
import {validateReset} from "../../../../utils/schema/validateSchemas/user";

const ResetPassword = () => {
  const navigate = useNavigate();
  const reset = getCustomParams(window.location.search);

  const onSubmit = async (value, {setSubmitting}) => {
    try {
      await resetAPI({password: value.password, reset});
    } catch (e) {
      toast(e.response.data, 'error');
    }

    setSubmitting(false);
  };

  useEffect(() => {
    if (!reset) {
      navigate('/login');
    }
  }, [reset, navigate]);

  return (
    <FormikWindow
      onSubmit={onSubmit}
      label='Confirm'
      initialValues={{password: '', confirm_password: ''}}
      validationSchema={validateReset}
      link={{url: '/login', label: 'Login'}}
    >
      <InputText
        name='password'
        label='New Password'
        type='password'
        required={true}
      />
      <InputText
        name='confirm_password'
        label='Confirm Password'
        type='password'
        required={true}
      />
    </FormikWindow>
  );
};

export default ResetPassword;
