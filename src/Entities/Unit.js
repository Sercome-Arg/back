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

  let unitCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      unitCreate = <CreateButton basePath={ basePath } />
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
        unitCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteUnitButton = () => {};

export const UnitList = (props) => {

  let unitReturn = null
  let unitUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      unitUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      unitUpdate
    }
    <TextField source="name" />
    <TextField source="symbol" />
    <ReferenceField source="magnitude" reference="magnitude">
      <TextField source="name" />
    </ReferenceField>
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

  let unitDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let unitList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteUnitButton }
    >{ child }</List>
  }

  let unitDeleteBoolean = false
  let unitListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      unitDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      unitListBoolean = true
    }
  })

  if(unitListBoolean) {
    unitReturn = unitList
    if(unitDeleteBoolean) {
      unitReturn = unitDelete
    }
  }

  if(unitReturn === null) {
    return null
  } else {
    return unitReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
    <TextInput source="symbol" />
    <ReferenceInput source="magnitude" reference="magnitude">
      <SelectInput optionText="name" />
    </ReferenceInput>
  </SimpleForm>
}

export const UnitEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const UnitCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);