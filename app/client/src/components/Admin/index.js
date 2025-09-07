import React from 'react';
import {Route} from "react-router-dom";
import {Admin, CustomRoutes, Resource} from 'react-admin';
import {createBrowserHistory} from 'history';

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import Toastify from "../Toastify";

import ConfigurationUser from "../Pages/Configuration/ConfigurationUser";
import ForgotPassword from "../Pages/Layout/ForgotPassword";
import ResetPassword from "../Pages/Layout/ResetPassword";
import SettingEmail from "../Pages/Setting/Email";
import LoginPage from "../Pages/Layout/Login";
import FullCalendar from "../Pages/Calendar";
import Dashboard from "../Pages/Dashboard";
import Customer from "../Pages/Customer";
import Layout from "../Pages/Layout";
import Loan from "../Pages/Loan";
import {Theme} from "../Pages/Layout/theme";

const AppAdmin = () => {
  const history = createBrowserHistory();

  return (
    <>
      <Admin
        theme={Theme}
        loginPage={LoginPage}
        dashboard={Dashboard}
        authProvider={authProvider}
        dataProvider={dataProvider}
        customReducers={true}
        requireAuth={true}
        layout={Layout}
        history={history}
      >
        <CustomRoutes noLayout={true}>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
        </CustomRoutes>
        <CustomRoutes>
          <Route path="/calendar" element={<FullCalendar/>}/>
          <Route path="/setting/email" element={<SettingEmail/>}/>
        </CustomRoutes>

        <Resource name="configuration" list={ConfigurationUser}/>
        <Resource name="customers" {...Customer}/>
        <Resource name="loans" {...Loan}/>
      </Admin>
      <Toastify/>
    </>
  );
};

export default AppAdmin;
