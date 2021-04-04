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
  ReferenceInput,
  SelectInput,
  Edit,
  SimpleForm,
  Create,
  ReferenceField,
  EditButton,
  ArrayInput,
  SimpleFormIterator
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
    resource,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
  } = useListContext();

  let alertCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      alertCreate = <CreateButton basePath={ basePath } />
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
        alertCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteAlertButton = () => {};

export const AlertList = (props) => {

  let alertReturn = null
  let alertUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      alertUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      alertUpdate
    }
    <TextField source="name" />
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

  let alertDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let alertList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteAlertButton }
    >{ child }</List>
  }

  let alertDeleteBoolean = false
  let alertListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      alertDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      alertListBoolean = true
    }
  })

  if(alertListBoolean) {
    alertReturn = alertList
    if(alertDeleteBoolean) {
      alertReturn = alertDelete
    }
  }

  if(alertReturn === null) {
    return null
  } else {
    return alertReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
  </SimpleForm>
}

export const AlertEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const AlertCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);