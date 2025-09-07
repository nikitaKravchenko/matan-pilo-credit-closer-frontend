import React from 'react';
import Box from "@mui/material/Box";

import TemplateAuto from "./TemplateAuto";
import Template from "./Template";
import ToSend from "./ToSend";


const Message = ({stateTabs}) => {
  return (
    <Box width={{xs: '100%', xl: '80%'}} maxWidth={{xs: '400px'}}>
      {stateTabs === 'Automatic' && (
        <TemplateAuto/>
      )}
      {stateTabs === 'Template' && (
        <Template/>
      )}
      {stateTabs === 'Settings' && (
        <ToSend/>
      )}
    </Box>
  );
};

export default Message;