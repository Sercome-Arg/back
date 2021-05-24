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

  let calibrationCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      calibrationCreate = <CreateButton basePath={ basePath } />
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
        calibrationCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteCalibrationButton = () => {};

export const CalibrationList = (props) => {

  let calibrationReturn = null
  let calibrationUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      calibrationUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      calibrationUpdate
    }
    <TextField source="name" />
    <DateField source="lastAlert" />
    <DateField source="nextAlert" />
    <ReferenceField source="instrument" reference="instrument">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField source="business" reference="business">
      <TextField source="name" />
    </ReferenceField>
  </Datagrid>

  let calibrationDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let calibrationList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteCalibrationButton }
    >{ child }</List>
  }

  let calibrationDeleteBoolean = false
  let calibrationListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      calibrationDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      calibrationListBoolean = true
    }
  })

  if(calibrationListBoolean) {
    calibrationReturn = calibrationList
    if(calibrationDeleteBoolean) {
      calibrationReturn = calibrationDelete
    }
  }

  if(calibrationReturn === null) {
    return null
  } else {
    return calibrationReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <TextInput source="name" />
    <ReferenceInput label='Instrumento' source="instrument" reference="instrument">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput label='Empresa' source="business" reference="business">
      <SelectInput optionText="name" />
    </ReferenceInput>
  </SimpleForm>
}

export const CalibrationEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const CalibrationCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);