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

  let companyCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      companyCreate = <CreateButton basePath={ basePath } />
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
        companyCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteCompanyButton = () => {};

export const CompanyList = (props) => {

  let companyReturn = null
  let companyUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      companyUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      companyUpdate
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

  let companyDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let companyList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteCompanyButton }
    >{ child }</List>
  }

  let companyDeleteBoolean = false
  let companyListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      companyDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      companyListBoolean = true
    }
  })

  if(companyListBoolean) {
    companyReturn = companyList
    if(companyDeleteBoolean) {
      companyReturn = companyDelete
    }
  }

  if(companyReturn === null) {
    return null
  } else {
    return companyReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
  </SimpleForm>
}

export const CompanyEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const CompanyCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);