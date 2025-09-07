import React from 'react';
import Box from '@mui/material/Box';
import format from "date-fns/format";

export const getStatus = (status, date) => {
  if(status === 'Paid') {
    return 'Paid';
  }
  const newDate = new Date(date);
  const currentDate = new Date(format(new Date(), 'yyyy-MM-dd'));

  return newDate < currentDate ? 'Overdue' : 'Waiting for payment';
}

const RenderEventContent = (eventInfo) => {
  const props = eventInfo.event.extendedProps.data;
  if (!props?.loan_id) {
    return null;
  }

  const {status, full_name, amount, display, date} = props;

  const statusEvent = getStatus(status, date);

  const color = statusEvent === 'Paid' ? '#4caf50' :
    statusEvent === 'Waiting for payment' ? '#0094EFFF' : '#f44336'

  const background = statusEvent === "Paid" ? "#b5ffba" :
    statusEvent === "Waiting for payment" ? "#a5ddff" : "#ffbeb9"

  return (
    <Box display='flex' width='100%' sx={{
      flexDirection: 'column',
      borderLeftColor: color,
      background,
      borderLeftWidth: 5,
      borderLeftStyle: 'solid',
      padding: '4px 6px',
      overflow: 'hidden',
      display: display ? 'flex' : 'none',
      fontSize: '10px',
      fontWeight: 'bold'
    }}>
      <i>{full_name}</i>
      <i>Amount - <span style={{
        color: 'green',
        fontSize: '13px',
        fontWeight: 'bold'
      }}>${Math.round((+amount + Number.EPSILON) * 100) / 100}</span></i>
      <i>Status - <span style={{color, fontSize: '13px'}}>{statusEvent}</span></i>
    </Box>
  );
};

export default RenderEventContent;