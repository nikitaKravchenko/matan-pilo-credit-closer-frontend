import React from 'react';
import {NumberField} from "react-admin";

const NumberInputDashboard = ({value, currency}) => {
  const color = +value > 0 ? 'green' : 'rgba(0, 0, 0, 0.6)';

  return (
    <NumberField
      source='source'
      record={{source: +value}}
      sx={{color: currency === 'USD' ? color : 'black', fontSize: '18px'}}
      options={currency && {style: 'currency', currency: currency}}
    />
  );
};

export default NumberInputDashboard;