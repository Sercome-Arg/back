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
  NumberField,
  NumberInput,
  EmailField,
  FormTab,
  TabbedForm,
  RichTextInput,
  ReferenceManyField,
  DateInput,
  BooleanInput


} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

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

  let businessCreate = null

  props.permissions.map(perm => {
    if (perm.permission == props.create) {
      businessCreate = <CreateButton basePath={basePath} />
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
        businessCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteBusinessButton = () => { };

export const BusinessList = (props) => {

  let businessReturn = null
  let businessUpdate = null

  props.permissions.map(perm => {
    if (perm.permission == props.update) {
      businessUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      businessUpdate
    }
    <TextField source="name" />
    <ReferenceField source="agent" reference="user">
      <TextField source="email" />
    </ReferenceField>
    <ReferenceField source="area" reference="area">
      <TextField source="name" />
    </ReferenceField>
    <TextField source="address" />
    <EmailField source="email" />
    <TextField source="phone" />
    <TextField label='CUIT' source="CUIT" />
  </Datagrid>

  let businessDelete = (child) => {
    return <List
      {...props}
      actions={<ListActions permissions={props.permissions} create={props.create} />}
    >{child}</List>
  }

  let businessList = (child) => {
    return <List
      {...props}
      actions={<ListActions permissions={props.permissions} create={props.create} />}
      bulkActionButtons={BulkDeleteBusinessButton}
    >{child}</List>
  }

  let businessDeleteBoolean = false
  let businessListBoolean = false

  props.permissions.map(perm => {
    if (perm.permission == props.delete) {
      businessDeleteBoolean = true
    }
    if (perm.permission == props.list) {
      businessListBoolean = true
    }
  })

  if (businessListBoolean) {
    businessReturn = businessList
    if (businessDeleteBoolean) {
      businessReturn = businessDelete
    }
  }

  if (businessReturn === null) {
    return null
  } else {
    return businessReturn(grid)
  }
};

  const style = makeStyles({
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
  });




let form = (id) => {

  const classes = style();

  return <TabbedForm margin="normal">

    <FormTab label="Information">
      <TextInput disabled label="Id" source="id" formClassName={classes.inlineBlock} />
      <TextInput source="name" formClassName={classes.inlineBlock} />
      <ReferenceInput source="agent" reference="user">
        <SelectInput optionText="email" />
      </ReferenceInput>
      <ReferenceInput source="area" reference="area">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="CUIT" />
    </FormTab>
  
    <FormTab label="Contact">
    <TextInput source="address" />
      <TextInput source="email" type='email' />
      <TextInput source="phone" />
    </FormTab>

    <FormTab label="Audit">
    
      <ReferenceField source="creationUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="updateUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="creationDate" locales="es-AR" />
      <DateField source="updateDate" locales="es-AR" />
    </FormTab>

  </TabbedForm>

}

export const BusinessEdit = props => {
  let id = <TextInput disabled source="id" />
  return <Edit {...props}>
    {form(id)}
  </Edit>
};

export const BusinessCreate = props => (
  <Create {...props}>
    {form()}
  </Create>
);