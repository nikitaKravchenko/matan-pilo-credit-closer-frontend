import React from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import {
  List,
  maxLength,
  TextInput,
} from 'react-admin';

import {exporterCustomer} from "../../../../utils/functions/exportList";

import Actions from "../../Section/Action";
import TitleList from "../../Section/TitleList";
import CustomerDesktopList from "./CustomerDesktop";
import CustomerMobileList from "./CustomerMobile";

const MobileFilters = [
  <TextInput type='text' source="first_name"/>,
  <TextInput type='text' source="last_name"/>,
  <TextInput type='text' source="address"/>,
  <TextInput type='text' source="phone"/>,
  <TextInput type='text' source="email" validate={maxLength(42)}/>,
]

const Filters = [
  <TitleList source="list | trash" alwaysOn/>,
  ...MobileFilters
];

const CustomerList = (props) => {
  const isXsmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );
  const isMdmall = useMediaQuery(theme =>
    theme.breakpoints.down('md')
  );

  return (
    <List
      {...props}
      actions={<Actions/>}
      filters={isMdmall ? MobileFilters : Filters}
      emptyWhileLoading={false}
      filterDefaultValues={{paranoid: true}}
      exporter={exporterCustomer}
    >
      <Box>
        {isXsmall ? (
          <CustomerMobileList/>
        ) : (
          <CustomerDesktopList/>
        )}
      </Box>
    </List>
  );
};

export default CustomerList;
