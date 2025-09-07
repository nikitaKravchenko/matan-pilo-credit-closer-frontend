import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {AppBar as RaAppBar, Logout, MenuItemLink, UserMenu as RaUserMenu} from 'react-admin';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import horizontal from "../../../../utils/images/svg/logo-horizontal.svg";
import logoShort from "../../../../utils/images/svg/logo-short.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

const UserMenu = (props) => {
  return (
    <RaUserMenu {...props}>
      <MenuItemLink
        to="/configuration"
        primaryText="User"
        leftIcon={
          <ManageAccountsIcon/>
        }
      />
      <Logout/>
    </RaUserMenu>
  )
}

const AppBar = (props) => {
  const isMobile = useMediaQuery('(min-width:400px)');
  const isXsmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );
  return (
    <RaAppBar {...props} userMenu={<UserMenu/>} sx={{background: '#171717'}}>
      <Box position='relative' width='100%' height='40px' display='flex' alignItems='center'>
        <Typography
          variant="h6"
          color="inherit"
          id="react-admin-title"
        />
      </Box>
      {isMobile && (
        <Box position='absolute' display='flex' width='100%' justifyContent='center' zIndex={-1}>
          <img
            src={isXsmall ? logoShort : horizontal}
            alt='horizontal'
            width={isXsmall ? 35 : 150}
            height={isXsmall ? 35 : 40}
            style={{pointerEvents: 'none'}}
          />
        </Box>
      )}
    </RaAppBar>
  );
};

export default AppBar;