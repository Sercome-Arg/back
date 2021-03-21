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

  let entityCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      entityCreate = <CreateButton basePath={ basePath } />
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
        entityCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteEntityButton = () => {};

export const EntityList = (props) => {

  let entityReturn = null
  let entityUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      entityUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      entityUpdate
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

  let entityDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let entityList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteEntityButton }
    >{ child }</List>
  }

  let entityDeleteBoolean = false
  let entityListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      entityDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      entityListBoolean = true
    }
  })

  if(entityListBoolean) {
    entityReturn = entityList
    if(entityDeleteBoolean) {
      entityReturn = entityDelete
    }
  }

  return entityReturn(grid)
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
  </SimpleForm>
}

export const EntityEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const EntityCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);