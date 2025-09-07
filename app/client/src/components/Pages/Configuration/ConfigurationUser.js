import React, {useEffect, useState} from 'react';
import {Edit, SimpleForm, useUpdate, useRedirect, Toolbar, SaveButton} from "react-admin";

import UserForm from "./Form";

import {toast} from "../../Toastify";
import {getUser} from "../../../utils/api/custom-request";

const ToolbarUser = () => {
  return (
    <Toolbar>
      <SaveButton/>
    </Toolbar>
  );
};

const ConfigurationUser = () => {
  const redirect = useRedirect();
  const [update] = useUpdate();
  const [user, setUser] = useState({});

  const onSubmit = (e) => {
    update('user',
      {
        id: user.email,
        previousData: user,
        data: {...e, id: user.id}
      }, {
        onSuccess: () => {
          toast('Updated user', 'success');
          redirect('/');
        },
        onError: (e) => {
          toast(e.response.data, 'error');
        },
      });
  }

  useEffect(() => {
    getUser().then(({data}) => {
      setUser(data);
    }).catch((e) => {
      toast(e.response.data, 'error');
    });
  }, []);

  return (
    <Edit redirect={false} title='User'>
      <SimpleForm
        toolbar={<ToolbarUser/>}
        defaultValues={{...user, password: ''}}
        onSubmit={onSubmit}
      >
        <UserForm/>
      </SimpleForm>
    </Edit>
  );
};


export default ConfigurationUser;