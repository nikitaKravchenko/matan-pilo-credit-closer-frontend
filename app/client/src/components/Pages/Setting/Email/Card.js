import React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CardContent from "@mui/material/CardContent";

import {WrapperShowLoan} from "../../Loan/Aside";
import {initialMessageSetting} from "../../../../utils/schema/initialValues/message";

const CardMessage = ({stateTabs}) => {
  return (
    <Box width={{xs: '100%', md: '40%'}} ml={{xs: 0, md: 2}} marginTop='10px'>
      {stateTabs !== 'Settings' && (
        <Card>
          <CardContent>
            <WrapperShowLoan sx={true} label='Variables'>
              {initialMessageSetting.map(({name, value}, idx) => (
                <TableRow key={'initialMessageSetting' + idx}>
                  <TableCell style={{width: 'fit-content', fontWeight: 'bold', color: '#0094ef'}} component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell style={{width: '70%', wordBreak: 'break-word', wordWrap: 'break-word', overflowWrap: 'break-word'}}>
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </WrapperShowLoan>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CardMessage;