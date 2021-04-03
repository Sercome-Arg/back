import * as React from "react";
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import customRoutes from './customRoutes';

import Dashboard from './Entities/Home';
import NotFound from './Entities/NotFoundPage';

import { UserList, UserCreate, UserEdit } from './Entities/User'
import { PermissionList } from './Entities/Permission'
import { RolList, RolCreate, RolEdit } from './Entities/Rol'
import { MagnitudeList, MagnitudeCreate, MagnitudeEdit } from './Entities/Magnitude'
import { InstrumentList, InstrumentCreate, InstrumentEdit } from './Entities/Instrument'
import { BusinessList, BusinessCreate, BusinessEdit } from './Entities/Business'

// entity

const resourceF = (entity, Entity, props, permissionList, base) => {
	let propsReturn = { ...props };
	propsReturn.permissions = permissionList;
	propsReturn.update = base['update' + entity]
	propsReturn.create = base['create' + entity]
	propsReturn.list = base['list' + entity]
	propsReturn.delete = base['delete' + entity]
	return <Entity { ...propsReturn } />
}

const App = () => (
	<Admin 
		dashboard={ Dashboard } 
		authProvider={ authProvider } 
		dataProvider={ dataProvider }
		catchAll={ NotFound }
		customRoutes={ customRoutes }
	>
		{
			(permissions) => {

				let resources = []
				let permissionList = []
				let base = []

				if(
					permissions !== undefined &&
					permissions.permissionList !== undefined &&
					Array.isArray(permissions.permissionList) &&
					permissions.permissionList.length > 0
				) permissionList = permissions.permissionList

				if(
					permissions !== undefined &&
					permissions.base !== undefined
				) base = permissions.base

				resources.push(
					<Resource 
						name='user' 
						list={(props) => { return resourceF('User', UserList, props, permissionList, base) }}
						edit={(props) => { return resourceF('User', UserEdit, props, permissionList, base) }}
						create={(props) => { return resourceF('User', UserCreate, props, permissionList, base) }}
					/>
				)

				resources.push(
					<Resource 
						name='permission' 
						list={(props) => { return resourceF('Permission', PermissionList, props, permissionList, base) }}
					/>
				)

				resources.push(<Resource name='rol' list={(props) => { return resourceF('Rol', RolList, props, permissionList, base) }} edit={(props) => { return resourceF('Rol', RolEdit, props, permissionList, base) }} create={(props) => { return resourceF('Rol', RolCreate, props, permissionList, base) }} /> )
				resources.push(<Resource name='magnitude' list={(props) => { return resourceF('Magnitude', MagnitudeList, props, permissionList, base) }} edit={(props) => { return resourceF('Magnitude', MagnitudeEdit, props, permissionList, base) }} create={(props) => { return resourceF('Magnitude', MagnitudeCreate, props, permissionList, base) }} /> )
				resources.push(<Resource name='instrument' list={(props) => { return resourceF('Instrument', InstrumentList, props, permissionList, base) }} edit={(props) => { return resourceF('Instrument', InstrumentEdit, props, permissionList, base) }} create={(props) => { return resourceF('Instrument', InstrumentCreate, props, permissionList, base) }} /> )
				resources.push(<Resource name='business' list={(props) => { return resourceF('Business', BusinessList, props, permissionList, base) }} edit={(props) => { return resourceF('Business', BusinessEdit, props, permissionList, base) }} create={(props) => { return resourceF('Business', BusinessCreate, props, permissionList, base) }} /> )
				// push

				return resources
			}
		}
	</Admin>
);

export default App;
