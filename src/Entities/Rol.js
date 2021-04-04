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

  let rolCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      rolCreate = <CreateButton basePath={ basePath } />
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
        rolCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteRolButton = () => {};

export const RolList = (props) => {

  let rolReturn = null
  let rolUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      rolUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      rolUpdate
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

  let rolDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let rolList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteRolButton }
    >{ child }</List>
  }

  let rolDeleteBoolean = false
  let rolListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      rolDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      rolListBoolean = true
    }
  })

  if(rolListBoolean) {
    rolReturn = rolList
    if(rolDeleteBoolean) {
      rolReturn = rolDelete
    }
  }

  if(rolReturn === null) {
    return null
  } else {
    return rolReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
    <ArrayInput source="permission">
      <SimpleFormIterator>
        <ReferenceInput perPage={ 10000 } label="permission" source="permission" reference="permission">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
}

export const RolEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const RolCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);