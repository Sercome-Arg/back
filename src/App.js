import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import jsonServerProvider from 'ra-data-json-server';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import Dashboard from './Entities/Home';
import NotFound from './Entities/NotFoundPage';

import { UserList, UserCreate, UserEdit } from './Entities/User'
import { InstrumentList, InstrumentCreate, InstrumentEdit } from './Entities/Instrument'
import { AlertList, AlertCreate, AlertEdit } from './Entities/Alert'
import { PermissionList, PermissionCreate, PermissionEdit } from './Entities/Permission' 
import { RolList, RolCreate, RolEdit } from './Entities/Rol'
import { MailList, MailCreate, MailEdit } from './Entities/Mail'

const App = () => (
  <Admin 
    dashboard={ Dashboard } 
    authProvider={ authProvider } 
    dataProvider={ dataProvider }
    catchAll={ NotFound }
  >
    {
      (permissions) => {

        let resources = []

        resources.push(<Resource name="permission" list={ PermissionList } edit={ PermissionEdit } create={ PermissionCreate } permissions={ permissions } />)
        resources.push(<Resource name="rol" list={ RolList } edit={ RolEdit } create={ RolCreate } permissions={ permissions } />)
        resources.push(<Resource name="user" list={ UserList } edit={ UserEdit } create={ UserCreate } permissions={ permissions } />)
				resources.push(<Resource name="mail" list={ MailList } edit={ MailEdit } create={ MailCreate } permissions={ permissions } />)
				resources.push(<Resource name="instrument" list={ InstrumentList } edit={ InstrumentEdit } create={ InstrumentCreate } permissions={ permissions } />)
				resources.push(<Resource name="alert" list={ AlertList } edit={ AlertEdit } create={ AlertCreate } permissions={ permissions } />)

        return resources
      }
    }
  </Admin>
);

export default App;
