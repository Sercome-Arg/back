import * as React from "react";
import { cloneElement } from 'react';
import { fetchUtils } from 'react-admin';
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
	ReferenceInput,
	SelectInput,
	Filter,
	Edit,
	SimpleForm,
	Create,
	ReferenceField,
	EditButton,
	ArrayInput,
	SimpleFormIterator,
	NumberField
} from 'react-admin';

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

	let subscriptionCreate = null

	props.permissions.map(perm => {
		if(perm.number == props.create) {
			subscriptionCreate = <CreateButton basePath={ basePath } />
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
				subscriptionCreate
			}
		</TopToolbar>
	);
};

const BulkDeleteSubscriptionButton = () => {};

export const SubscriptionList = (props) => {

	let subscriptionReturn = null
	let subscriptionUpdate = null

	props.permissions.map(perm => {
		if(perm.number == props.update) {
			subscriptionUpdate = <EditButton />
		}
	})

	let subscriptionDelete = <List 
		{...props} 
		actions={<ListActions permissions={ props.permissions } create={ props.create } />}
	>
		<Datagrid>
			{
				subscriptionUpdate
			}
			<NumberField source="end" />
			<NumberField source="start" />
			<ReferenceField source="user" reference="user">
				<TextField source="email" />
			</ReferenceField>
		</Datagrid>
	</List>
	
	let subscriptionList = <List 
		{...props} 
		actions={ <ListActions permissions={ props.permissions } create={ props.create } /> }
		bulkActionButtons={ BulkDeleteSubscriptionButton }
	>
		<Datagrid>
			{
				subscriptionUpdate
			}
			<DateField source="end" />
			<DateField source="start" />
			<ReferenceField source="user" reference="user">
				<TextField source="email" />
			</ReferenceField>
		</Datagrid>
	</List>

	let subscriptionDeleteBoolean = false
	let subscriptionListBoolean = false

	props.permissions.map(perm => {
		if(perm.number == props.delete) {
			subscriptionDeleteBoolean = true
		}
		if(perm.number == props.list) {
			subscriptionListBoolean = true
		}
	})

	if(subscriptionListBoolean) {
		subscriptionReturn = subscriptionList
		if(subscriptionDeleteBoolean) {
			subscriptionReturn = subscriptionDelete
		}
	}

	return subscriptionReturn
};

export const SubscriptionEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled source="id" />
			<TextInput source="name" />
			<ArrayInput source="permission">
				<SimpleFormIterator>
					<ReferenceInput label="permission" source="permission" reference="permission">
						<SelectInput optionText="name" />
					</ReferenceInput>
				</SimpleFormIterator>
			</ArrayInput>
		</SimpleForm>
	</Edit>
);

export const SubscriptionCreate = props => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" />
			<ArrayInput source="permission">
				<SimpleFormIterator>
					<ReferenceInput label="permission" source="permission" reference="permission">
						<SelectInput optionText="name" />
					</ReferenceInput>
				</SimpleFormIterator>
			</ArrayInput>
		</SimpleForm>
	</Create>
);