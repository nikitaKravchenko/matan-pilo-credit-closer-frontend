import React, {useState} from 'react';
import {Title} from "react-admin";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";

import CardMessage from "./Card";

import {createCard} from "../../../ModalWindow/calendar/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Message from "./Message";

const tabs = [
  {id: 'Settings', name: 'Email Settings'},
  {id: 'Template', name: 'Email Template'},
  {id: 'Automatic', name: 'Email Template Automatic'},
];

const SettingEmail = () => {
  const [stateTabs, setStateTabs] = useState('Settings');

  const isMdall = useMediaQuery(theme =>
    theme.breakpoints.down('md')
  );

  const handleChange = (e, value) => {
    setStateTabs(value);
  }

  return (
    <Box display='flex' flexDirection={{xs: 'column', md: 'row'}}>
      <Title title='Email'/>
      <Card sx={{
        ...createCard,
        marginTop: '10px',
        padding: isMdall ? '0 10px 10px 10px' : '0 20px 20px 20px',
        width: isMdall ? 'auto' : '70%'
      }}>
        <Box>
          <Tabs
            textColor="primary"
            indicatorColor="secondary"
            variant="fullWidth"
            onChange={handleChange}
            value={stateTabs}
            centered
          >
            {tabs.map((choice) => (
              <Tab
                key={choice.id}
                value={choice.id}
                label={choice.name}
              />
            ))}
          </Tabs>
          <Box marginTop='20px' display='flex' flexDirection='column'>
            <Message stateTabs={stateTabs}/>
          </Box>
        </Box>
      </Card>
      <CardMessage stateTabs={stateTabs}/>
    </Box>
  );
};

export default SettingEmail;