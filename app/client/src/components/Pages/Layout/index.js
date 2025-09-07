import React from 'react';
import {Layout as LayoutAdmin} from 'react-admin';

import AppBar from "./AppBar";
import Menu from "./Menu";

const Layout = (props) => {
  return (
    <LayoutAdmin
      {...props}
      menu={Menu}
      appBar={AppBar}
    />
  );
};

export default Layout;