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

  let certificateCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      certificateCreate = <CreateButton basePath={ basePath } />
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
        certificateCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteCertificateButton = () => {};

export const CertificateList = (props) => {

  let certificateReturn = null
  let certificateUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      certificateUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      certificateUpdate
    }
    <ReferenceField source="calibration" reference="calibration">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField source="business" reference="business">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField source="instrument" reference="instrument">
      <TextField source="name" />
    </ReferenceField>
  </Datagrid>

  let certificateDelete = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    >{ child }</List>
  }
  
  let certificateList = (child) => {
    return <List 
      {...props} 
      actions={<ListActions permissions={ props.permissions } create={ props.create } />}
      bulkActionButtons={ BulkDeleteCertificateButton }
    >{ child }</List>
  }

  let certificateDeleteBoolean = false
  let certificateListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      certificateDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      certificateListBoolean = true
    }
  })

  if(certificateListBoolean) {
    certificateReturn = certificateList
    if(certificateDeleteBoolean) {
      certificateReturn = certificateDelete
    }
  }

  if(certificateReturn === null) {
    return null
  } else {
    return certificateReturn(grid)
  }
};

let form = (id) => {
  return <SimpleForm>
    { id }
    <ReferenceInput source="calibration" reference="calibration">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="instrument" reference="instrument">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="business" reference="business">
      <SelectInput optionText="name" />
    </ReferenceInput>
  </SimpleForm>
}

export const CertificateEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    { form(id) }
  </Edit>
};

export const CertificateCreate = props => (
  <Create {...props}>
    { form() }
  </Create>
);