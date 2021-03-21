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

  let magnitudeCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      magnitudeCreate = <CreateButton basePath={ basePath } />
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
        magnitudeCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteMagnitudeButton = () => {};

export const MagnitudeList = (props) => {

  let magnitudeReturn = null
  let magnitudeUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      magnitudeUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      magnitudeUpdate
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

  let magnitudeDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let magnitudeList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteMagnitudeButton }
    >{ child }</List>
  }

  let magnitudeDeleteBoolean = false
  let magnitudeListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      magnitudeDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      magnitudeListBoolean = true
    }
  })

  if(magnitudeListBoolean) {
    magnitudeReturn = magnitudeList
    if(magnitudeDeleteBoolean) {
      magnitudeReturn = magnitudeDelete
    }
  }

  if(magnitudeReturn === null) {
    return null
  } else {
    return magnitudeReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
  </SimpleForm>
}

export const MagnitudeEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const MagnitudeCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);