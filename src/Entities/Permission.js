import * as React from "react";
import { cloneElement, useMemo } from 'react';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import PropTypes from 'prop-types';
import config from './config'
import { 
	useListContext,
	TopToolbar,
	CreateButton,
	ExportButton,
	Button,
	sanitizeListRestProps,
	List,
	Datagrid,
	TextField,
	DateField,
	TextInput,
	ReferenceInput,
	SelectInput,
	Filter,
	Edit,
	SimpleForm,
	Create,
	ReferenceField,
	EditButton,
	TabbedShowLayout,
	Tab,
	NumberField,
	NumberInput,
	Toolbar,
	SaveButton,
	DeleteButton,	
	useDeleteMany,
	Pagination 
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';

import { makeStyles } from '@material-ui/core/styles';
import permissions from "./config";

const useStyles = makeStyles({
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
});

const ListActions = (props) => {
	const {
		className,
		exporter,
		filters,
		maxResults,
		...rest
	} = props;
	const {
		currentSort,
		resource,
		displayedFilters,
		filterValues,
		hasCreate,
		basePath,
		selectedIds,
		showFilter,
		total,
	} = useListContext();

	let permissionCreate = null

	props.permissions.map(perm => {
		if(perm.number == config.createPermission) {
			permissionCreate = <CreateButton basePath={ basePath } />
		}
	})

	return (
		<TopToolbar className={className} {...sanitizeListRestProps(rest)}>
			{
				filters && cloneElement(filters, {
					resource,
					showFilter,
					displayedFilters,
					filterValues,
					context: 'button',
				})
			}
			{
				permissionCreate
			}
		</TopToolbar>
	);
};

const PermissionFilter = (props) => (
	<Filter {...props}>
		<TextInput label="Search" source="name" alwaysOn />
	</Filter>
);

const BulkDeletePermissionButton = () => {};

const PermissionPagination = props => <Pagination rowsPerPageOptions={[10, 25, 100, 200]} {...props} />;

export const PermissionList = (props) => {

	let permissionReturn = null
	let permissionUpdate = null

	if(
		props !== undefined &&
		props.permissions !== undefined &&
		Array.isArray(props.permissions)
	) {
		props.permissions.map(perm => {
			if(perm.number == config.updatePermission) {
				permissionUpdate = <EditButton />
			}
		})

	}


	let permissionDelete = <List 
		{...props} 
		actions={<ListActions permissions={ props.permissions } />}
		pagination={<PermissionPagination />}
	>
		<Datagrid>
			{
				permissionUpdate
			}
			<TextField source="name" />
			<TextField source="number" />
			<TextField source="operationType" />
			<ReferenceField source="creationUser" reference="user">
				<TextField source="email" />
			</ReferenceField>
			<ReferenceField source="updateUser" reference="user">
				<TextField source="email" />
			</ReferenceField>
			<DateField source="creationDate" />
			<DateField source="updateDate" />
		</Datagrid>
	</List>
	
	let permissionList = <List 
		{...props} 
		actions={<ListActions permissions={ props.permissions } />}
		bulkActionButtons={ BulkDeletePermissionButton }
		pagination={<PermissionPagination />}
	>
		<Datagrid>
			{
				permissionUpdate
			}
			<TextField source="name" />
			<TextField source="number" />
			<TextField source="operationType" />
			<ReferenceField source="creationUser" reference="user">
				<TextField source="email" />
			</ReferenceField>
			<ReferenceField source="updateUser" reference="user">
				<TextField source="email" />
			</ReferenceField>
			<DateField source="creationDate" />
			<DateField source="updateDate" />
		</Datagrid>
	</List>

	let permissionDeleteBoolean = false
	let permissionListBoolean = false
	
	if(
		props !== undefined &&
		props.permissions !== undefined &&
		Array.isArray(props.permissions)
	) {
		props.permissions.map(perm => {
			if(perm.number == config.deletePermission) {
				permissionDeleteBoolean = true
			}
			if(perm.number == config.listPermission) {
				permissionListBoolean = true
			}
		})
	}
	


	if(permissionListBoolean) {
		permissionReturn = permissionList
		if(permissionDeleteBoolean) {
			permissionReturn = permissionDelete
		}
	}

	return permissionReturn
};

const CustomToolbar = props => {

	let permissionReturn = <Toolbar { ...props } classes={ useStyles() }>
		<SaveButton />
	</Toolbar>

	let permissionDelete = <Toolbar { ...props } classes={ useStyles() }>
		<SaveButton />
		<DeleteButton />
	</Toolbar>

	props.permissions.map(perm => {
		if(perm.number == config.deletePermission) {
			permissionReturn = permissionDelete
		}
	})

	return permissionReturn
};

export const PermissionEdit = props => {

	let permissionReturn = null
	let permissionEdit = <Edit
		{ ...props }
		actions={ null }
		>
		<SimpleForm
			toolbar={<CustomToolbar { ...props } />}
		>
			<TextInput disabled source="id" />
			<TextInput source="name" />
			<TextInput source="number" />
		</SimpleForm>
	</Edit>

	props.permissions.map(perm => {
		if(perm.number == config.updatePermission) {
			permissionReturn = permissionEdit
		}
	})

	return permissionReturn
};

export const PermissionCreate = props => {

	let permissionReturn = null
	let permissionCreate = <Create {...props}>
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="number" />
		</SimpleForm>
	</Create>

	props.permissions.map(perm => {
		if(perm.number == config.createPermission) {
			permissionReturn = permissionCreate
		}
	})

	return permissionReturn
};