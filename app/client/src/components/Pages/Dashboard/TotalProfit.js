import React from 'react';
import ItemTotalProfit from "./ItemTotalProfit";
import Box from "@mui/material/Box";

import dollar from "../../../utils/images/svg/dollar.svg";

const TotalProfit = ({date, data}) => {
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap'}} mt='10px' mb='10px'>
      {date && (
        <>
          <ItemTotalProfit
            label='TOTAL GAVE'
            value={data?.total_gave || '0'}
            currency='USD'
            iconUrl={dollar}
          />
          <ItemTotalProfit
            label='PROFIT'
            value={data?.profit || '0'}
            currency='USD'
            iconUrl={dollar}
          />
        </>
      )}
      {/*<ItemTotalProfit*/}
      {/*  label='RETURNED MONEY'*/}
      {/*  value={data?.total_amount || '0'}*/}
      {/*  currency='USD'*/}
      {/*  iconUrl={dollar}*/}
      {/*/>*/}
      <ItemTotalProfit
        label='NUMBER OF PAYMENTS'
        value={data?.count || '0'}
      />
          <ItemTotalProfit
            label='PAID'
            value={data?.paid || '0'}
            currency='USD'
            iconUrl={dollar}
          />
          <ItemTotalProfit
            label='WAITING FOR PAYMENT'
            value={data?.wait || '0'}
            currency='USD'
            iconUrl={dollar}
          />
          <ItemTotalProfit
            label='Overdue'
            value={data?.overdue || '0'}
            currency='USD'
            iconUrl={dollar}
          />
    </Box>
  );
};

export default TotalProfit;