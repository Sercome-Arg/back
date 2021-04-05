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
  SimpleFormIterator,
  DateInput,
  NumberField,
  NumberInput
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

  let configurationCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      configurationCreate = <CreateButton basePath={ basePath } />
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
        configurationCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteConfigurationButton = () => {};

export const ConfigurationList = (props) => {

  let configurationReturn = null
  let configurationUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      configurationUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      configurationUpdate
    }
    <NumberField source="nextAlertYear" />
    <NumberField source="nextAlertMonth" />
    <NumberField source="nextAlertDay" />
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

  let configurationDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let configurationList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteConfigurationButton }
    >{ child }</List>
  }

  let configurationDeleteBoolean = false
  let configurationListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      configurationDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      configurationListBoolean = true
    }
  })

  if(configurationListBoolean) {
    configurationReturn = configurationList
    if(configurationDeleteBoolean) {
      configurationReturn = configurationDelete
    }
  }

  if(configurationReturn === null) {
    return null
  } else {
    return configurationReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <NumberInput source="nextAlertYear" defaultValue='0' />
    <NumberInput source="nextAlertMonth" defaultValue='0' />
    <NumberInput source="nextAlertDay" defaultValue='0' />
  </SimpleForm>
}

export const ConfigurationEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const ConfigurationCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);