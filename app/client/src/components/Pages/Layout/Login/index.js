import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import FormikWindow from "../Formik";
import InputText from "../../../CustomInputs/Text";

import {toast} from "../../../Toastify";
import {checkUserAPI, loginAPI} from "../../../../utils/api/auth";
import {validateLogin} from "../../../../utils/schema/validateSchemas/user";

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (value, {setSubmitting}) => {
    try {
      const {message, redirect} = await loginAPI(value);
      toast(message, 'success');
      navigate(redirect);
    } catch (e) {
      toast(e.response.data, 'error');
    }

    setSubmitting(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      await checkUserAPI();
    }

    checkAuth().catch((e) => toast(e.response.data, 'error'));
  }, []);

  return (
    <FormikWindow
      onSubmit={onSubmit}
      label='Sign in'
      initialValues={{email: '', password: ''}}
      validationSchema={validateLogin}
      link={{url: '/forgot-password', label: 'Forgot password?'}}
    >
      <InputText
        name='email'
        label='E-mail'
        type='email'
        required={true}
      />
      <InputText
        name='password'
        label='Password'
        type='password'
        required={true}
      />
    </FormikWindow>
  );
};

export default LoginPage;
