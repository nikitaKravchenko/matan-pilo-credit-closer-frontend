import React, {useState} from 'react';
import {useSidebarState, DashboardMenuItem, MenuItemLink} from "react-admin";
import Box from "@mui/material/Box";

import SubMenu from "./SubMenu";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';

const MenuItems = [
  {to: 'customers', primaryText: 'Customers', Icon: PeopleAltIcon},
  {to: 'loans', primaryText: 'Loans', Icon: CreditScoreIcon},
  {to: 'calendar', primaryText: 'Calendar', Icon: CalendarMonthIcon},
]

const Menu = ({dense = false}) => {
  const [state, setState] = useState({menuSetting: false});
  const [open] = useSidebarState();

  const handleToggle = (menu) => {
    setState(state => ({...state, [menu]: !state[menu]}));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: theme =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem primaryText='Analytics'/>
      {MenuItems.map(({to, primaryText, Icon}, i) => (
        <MenuItemLink
          key={'MenuItemLink_' + i}
          to={`/${to}`}
          primaryText={primaryText}
          state={{_scrollToTop: true}}
          dense={dense}
          leftIcon={<Icon/>}
        />
      ))}

      <SubMenu
        handleToggle={() => handleToggle('menuSetting')}
        isOpen={state.menuSetting}
        name="Settings"
        dense={dense}
        icon={state.menuSetting ? <ExpandMoreIcon/> : <SettingsIcon/>}
      >
        <MenuItemLink
          to="/setting/email"
          primaryText='Email'
          state={{_scrollToTop: true}}
          dense={dense}
          leftIcon={<MailIcon/>}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;