import React from "react";
import Box from "@mui/material/Box";
import format from "date-fns/format";
import CloseIcon from '@mui/icons-material/Close';

import {editHeaderStyle} from "../styles";

const Header = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  justifyContent: 'space-between'
}

const StatusColor = {
  position: 'absolute',
  height: '100%',
  width: '5px',
  borderRadius: '20px'
}

const InfoID = {
  fontSize: '11px',
  fontWeight: 'bold'
}


export const HeaderEdit = ({setDataModal}) => {
  return (
    <Box display='flex' sx={editHeaderStyle}>
      <Box
        sx={{borderRadius: '50%', minWidth: 0, height: '36px', cursor: 'pointer'}}
        display='flex'
        alignItems='center'
        onClick={() => setDataModal(e => ({...e, open: false}))}
      >
        <CloseIcon htmlColor='#ffffff'/>
      </Box>
    </Box>
  )
}

export const HeaderPayment = ({loan_id, customer_id, status, color, start}) => {
  return (
    <Box sx={Header}>
      <Box sx={{...StatusColor, background: color}}/>
      <Box sx={{marginLeft: '15px'}}>
        <Box sx={InfoID}>Customer ID - {customer_id}</Box>
        <Box sx={InfoID}>Loan ID - {loan_id}</Box>
      </Box>
      <Box>
        <Box sx={InfoID}>Status - <span style={{color}}>{status}</span></Box>
        <Box sx={InfoID}>Date - <span style={{color}}>{format(new Date(start), 'yyyy/MM/dd')}</span></Box>
      </Box>
    </Box>
  )
}
