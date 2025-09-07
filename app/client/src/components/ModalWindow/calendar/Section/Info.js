import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import {WrapperShowLoan} from "../../../Pages/Loan/Aside";
import {customerShowItemsCalendar} from "../../../../utils/schema/initialValues/loan";

const InfoPayment = (data) => {
  return (
    <Box>
      <Box sx={{marginBottom: '40px'}}>
        <WrapperShowLoan sx={true}>
          {customerShowItemsCalendar.map(({label, name}, idx) => (
            <TableRow key={'TableRow_' + idx}>
              <TableCell style={{width: 'fit-content'}} component="th" scope="row">
                {label}
              </TableCell>
              <TableCell style={{maxWidth: '160px', overflow: "hidden"}} align="right">
                {name === 'amount' ? (
                  <span style={{
                    color: '#008000',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}>${data.amount}</span>
                ) : (
                  <span style={{fontSize: '11px', fontWeight: 'bold'}}>{data[name]}</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </WrapperShowLoan>
      </Box>
      <BodyButtons
        status={data.status}
        setStateWindow={data.setStateWindow}
        deletePayment={data.deletePayment}
      />
    </Box>
  )
}

const BodyButtons = ({setStateWindow, deletePayment, status}) => {
  return (
    <>
      {status !== 'Paid' && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{marginBottom: '10px'}}
          onClick={() => setStateWindow('send')}
        >
          Send Message
        </Button>
      )}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{marginBottom: '10px'}}
        onClick={() => setStateWindow('edit')}
      >
        Edit
      </Button>
      <Button
        fullWidth
        color="error"
        variant="outlined"
        onClick={deletePayment}
      >
        Delete
      </Button>
    </>
  );
}

export default InfoPayment;
