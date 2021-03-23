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

  let instrumentCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      instrumentCreate = <CreateButton basePath={ basePath } />
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
        instrumentCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteInstrumentButton = () => {};

export const InstrumentList = (props) => {

  let instrumentReturn = null
  let instrumentUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      instrumentUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      instrumentUpdate
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

  let instrumentDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let instrumentList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteInstrumentButton }
    >{ child }</List>
  }

  let instrumentDeleteBoolean = false
  let instrumentListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      instrumentDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      instrumentListBoolean = true
    }
  })

  if(instrumentListBoolean) {
    instrumentReturn = instrumentList
    if(instrumentDeleteBoolean) {
      instrumentReturn = instrumentDelete
    }
  }

  if(instrumentReturn === null) {
    return null
  } else {
    return instrumentReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
    <TextInput source="business" />
  </SimpleForm>
}

export const InstrumentEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const InstrumentCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);