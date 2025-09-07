import React from 'react';
import Box from "@mui/material/Box";
import {Datagrid, FilterForm, ListContextProvider, Pagination} from "react-admin";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";

const PaymentListSection = ({value, children, data, filters, ModalWindow}) => {
  const isXsmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );

  return (
    <ListContextProvider value={value}>
      <Box sx={isXsmall ? {mb: '72px'} : {}}>
        <FilterForm filters={filters}/>
        <Card sx={{
          '& .column-status': {
            display: {xs: 'none', sm: 'table-cell'},
          }
        }}>
          <Datagrid sx={{
            '& .column-undefined': {
              padding: '6px 8px'
            }
          }}>
            {data.map(({props, Component}, idx) => (
              <Component key={'PaymentListSection' + idx} {...props}/>
            ))}
            {children}
          </Datagrid>
        </Card>
        <Pagination/>
      </Box>
      {ModalWindow}
    </ListContextProvider>
  );
};

export default PaymentListSection;