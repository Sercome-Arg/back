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

  let areaCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      areaCreate = <CreateButton basePath={ basePath } />
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
        areaCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteAreaButton = () => {};

export const AreaList = (props) => {

  let areaReturn = null
  let areaUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      areaUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      areaUpdate
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

  let areaDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let areaList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteAreaButton }
    >{ child }</List>
  }

  let areaDeleteBoolean = false
  let areaListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      areaDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      areaListBoolean = true
    }
  })

  if(areaListBoolean) {
    areaReturn = areaList
    if(areaDeleteBoolean) {
      areaReturn = areaDelete
    }
  }

  if(areaReturn === null) {
    return null
  } else {
    return areaReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
  </SimpleForm>
}

export const AreaEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const AreaCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);