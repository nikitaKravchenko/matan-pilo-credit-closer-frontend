import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import {
  DateInput,
  List,
  SelectInput,
} from 'react-admin';


import AutoCompleteCustomer from "../../../CustomInputs/AutoCompleteCustomer";
import TitleList from "../../Section/TitleList";
import Action from "../../Section/Action";
import LoanListDesktop from "./LoanDesktop";
import LoanListMobile from "./LoanMobile";
import {exporterLoan} from "../../../../utils/functions/exportList";

const MobileFilters = [
  <AutoCompleteCustomer
    source="customer_id"
    style={{xs: '200px', sm: '300px'}}
    setCustomerId={() => {
    }}
  />,
  <DateInput source="start_created"/>,
  <DateInput source='end_created'/>,
  <SelectInput
    source="status"
    fullWidth
    isRequired
    label='Status'
    choices={[{id: 'Active', name: 'Active'}, {id: 'Closed', name: 'Closed'}]}
  />
]

const Filters = [
  <TitleList source="list | trash" alwaysOn/>,
  ...MobileFilters
]

const LoanList = (props) => {
  const isXsmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );
  const isMdmall = useMediaQuery(theme =>
    theme.breakpoints.down('md')
  );

  return (
    <List
      {...props}
      actions={<Action/>}
      filters={isMdmall ? MobileFilters : Filters}
      filterDefaultValues={{paranoid: true}}
      emptyWhileLoading={false}
      exporter={exporterLoan}
    >
      <Box>
        {isXsmall ? (
          <LoanListMobile/>
        ) : (
          <LoanListDesktop/>
        )}
      </Box>
    </List>
  )
}

export default LoanList;
