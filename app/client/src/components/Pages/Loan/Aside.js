import React from 'react';
import {useEditController, useGetOne} from "react-admin";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import {loanShowItems, customerShowItems} from "../../../utils/schema/initialValues/loan";
import {CustomReferenceLink} from "../../CustomInputs/CustomField/CustomReference";

export const LoanAsideEdit = ({customerId, edit}) => {
  return (
    <Box ml={2}>
      <Card>
        <CardContent>
          <WrapperShowLoan>
            {loanShowItems.map(({label, props, Component}, idx) => (
              <TableRow key={'TableRow_' + idx}>
                <TableCell style={{width: 'fit-content'}} component="th" scope="row">
                  {label}
                </TableCell>
                <TableCell style={{maxWidth: 90, overflow: "hidden"}} align="right">
                  <Component {...props}/>
                </TableCell>
              </TableRow>
            ))}
          </WrapperShowLoan>
        </CardContent>
      </Card>
      {edit ? (
        <CustomerAsideEdit customerId={customerId}/>
      ) : (
        <CustomerAsidePost customerId={customerId}/>
      )}
    </Box>
  );
};

const CustomerAsideEdit = ({customerId}) => {
  const {record} = useEditController();
  const {data, isLoading} = useGetOne('customers', {
    id: customerId ? customerId : record?.customer_id || 0
  });

  if (isLoading) {
    return <div>Loading</div>
  }

  return <CustomerAside data={data}/>
}

export const CustomerAsidePost = ({customerId}) => {
  const {data, isLoading} = useGetOne('customers', {
    id: customerId ? customerId : 0
  });

  if (isLoading) {
    return <div>Loading</div>
  }

  return <CustomerAside data={data}/>
}

const CustomerAside = ({data}) => {
  return (
    <Card sx={{marginTop: '20px'}}>
      <CardContent>
        <WrapperShowLoan>
          {customerShowItems.map(({label, name}, idx) => (
            <TableRow key={'TableRow_' + idx}>
              <TableCell style={{width: 'fit-content'}} component="th" scope="row">
                {label}
              </TableCell>
              <TableCell style={{maxWidth: 90, overflow: "hidden"}} align="right">
                {name === 'email' ? (
                  <CustomReferenceLink reference='customers' source={data.id}>
                    {data.email}
                  </CustomReferenceLink>
                ) : (data[name])}
              </TableCell>
            </TableRow>
          ))}
        </WrapperShowLoan>
      </CardContent>
    </Card>
  )
}

export const WrapperShowLoan = ({children, label, sx}) => {
  return (
    <TableContainer sx={sx ? {} : {width: '300px'}}>
      {label}
      <Table>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
