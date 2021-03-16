import * as React from "react";
import { cloneElement } from 'react';
import { 
	useListContext,
	TopToolbar,
	CreateButton,
	sanitizeListRestProps,
	List,
	Datagrid,
	TextField,
	DateField,
	TextInput,
	Filter,
	Edit,
	SimpleForm,
	Create,
	ReferenceField,
	EditButton,
	Toolbar,
	SaveButton,
	DeleteButton,	
	Pagination 
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';

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
		if(perm.permission == props.create) {
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

const BulkDeletePermissionButton = () => {};

const PermissionPagination = props => <Pagination rowsPerPageOptions={[10, 25, 100, 200]} {...props} />;

export const PermissionList = (props) => {

	let permissionReturn = null
	let permissionUpdate = null

	let permissionDelete = null
	
	let permissionList = <List 
		{...props} 
		actions={<ListActions permissions={ props.permissions } create={ props.create } />}
		bulkActionButtons={ BulkDeletePermissionButton }
		pagination={<PermissionPagination />}
	>
		<Datagrid>
			{
				permissionUpdate
			}
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="number" />
		</Datagrid>
	</List>

	let permissionDeleteBoolean = false
	let permissionListBoolean = false

	props.permissions.map(perm => {
		if(perm.permission == props.delete) {
			permissionDeleteBoolean = true
		}
		if(perm.permission == props.list) {
			permissionListBoolean = true
		}
	})

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
		if(perm.permission == props.delete) {
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
			toolbar={<CustomToolbar { ...props } delete={ props.delete } />}
		>
			<TextInput disabled source="id" />
			<TextInput source="name" />
			<TextInput source="number" />
		</SimpleForm>
	</Edit>

	props.permissions.map(perm => {
		if(perm.permission == props.update) {
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
		if(perm.permission == props.create) {
			permissionReturn = permissionCreate
		}
	})

	return permissionReturn
};