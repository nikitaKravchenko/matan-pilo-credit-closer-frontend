import * as Yup from 'yup';

export const validateLogin = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .max(42, 'Max length 42')
    .required('Required'),
  password: Yup.string()
    .max(255, 'Max length 255')
    .required('Required'),
});

export const validateForget = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .max(42, 'Max length 42')
    .required('Required')
});

export const validateReset = Yup.object({
  password: Yup.string()
    .max(255, 'Max length 255')
    .required('Required'),
  confirm_password: Yup.string()
    .when('password', {
      is: (val) => (val && val.length > 0),
      then: Yup.string()
        .oneOf([Yup.ref('password')], 'Password mismatch')
        .required('Required')
    })
});