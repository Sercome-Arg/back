import * as React from "react";
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import customRoutes from './customRoutes';

import Dashboard from './Entities/Home';
import NotFound from './Entities/NotFoundPage';

import { UserList, UserCreate, UserEdit } from './Entities/User'
import { PermissionList, PermissionCreate, PermissionEdit } from './Entities/Permission'
import { RolList, RolCreate, RolEdit } from './Entities/Rol'
import { LinkList, LinkCreate, LinkEdit } from './Entities/Link'

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

				resources.push(
					<Resource 
						name='rol' 
						list={(props) => { return resourceF('Rol', RolList, props, permissionList, base) }}
						edit={(props) => { return resourceF('Rol', RolEdit, props, permissionList, base) }}
						create={(props) => { return resourceF('Rol', RolCreate, props, permissionList, base) }}
					/>
				)

				resources.push(
					<Resource 
						name='link' 
						list={(props) => { return resourceF('Link', LinkList, props, permissionList, base) }}
						edit={(props) => { return resourceF('Link', LinkEdit, props, permissionList, base) }}
						create={(props) => { return resourceF('Link', LinkCreate, props, permissionList, base) }}
					/>
				)

				return resources
			}
		}
	</Admin>
);

export default App;
