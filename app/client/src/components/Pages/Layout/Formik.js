import React from 'react';
import {Formik, Form} from "formik";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import matan_loans from "../../../utils/images/svg/matan_loans.svg";
import './styles.css';

const FormikWindow = ({initialValues, validationSchema, onSubmit, children, link, label}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      <Form className='backgroundWindow'>
        <Card className='cardLayout'>
          <img
            src={matan_loans}
            alt='matan loans'
            width='300px'
            height='150px'
            style={{pointerEvents: 'none'}}
          />
          {children}
          <Box className='layoutButtons'>
            <Link className='layoutLink' to={link.url}>
              {link.label}
            </Link>
            <Button
              size='medium'
              fullWidth={true}
              type="submit"
              variant="contained"
              color="primary"
            >
              {label}
            </Button>
          </Box>
        </Card>
      </Form>
    </Formik>
  );
};

export default FormikWindow;