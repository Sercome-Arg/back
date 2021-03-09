import * as React from "react";
import { cloneElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  useListContext,
  TopToolbar,
  CreateButton,
  ExportButton,
  Button,
  sanitizeListRestProps,
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  ReferenceInput,
  SelectInput,
  Filter,
  Edit,
  SimpleForm,
  Create,
  ReferenceField,
  EmailField,
  BooleanField,
  BooleanInput,
  PasswordInput,
  NumberField,
  NumberInput,
  DateInput,
  SaveButton,
  Toolbar,
  useCreate,
  useRedirect,
  useNotify,
  EditButton
} from 'react-admin';
import { useCallback } from 'react';
import IconEvent from '@material-ui/icons/Event';

const ListActions = (props) => {
  const {
    className,
    exporter,
    filters,
    maxResults,
    ...rest
  } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();
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
      <CreateButton basePath={basePath} />
    </TopToolbar>
  );
};

export const UserList = (props) => {

  return <List 
      {...props} 
      actions={<ListActions />}
    >
    <Datagrid>
      <EditButton />
      <TextField source="user" />
      <ReferenceField source="rol" reference="rol">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="wingcoins" />
      <EmailField source="email" />
      <TextField source="name" />
      <TextField source="surname" />
      <NumberField source="dni" />
      <BooleanField source="aceptTC" />
      <BooleanField source="enabled" />
      <ReferenceField source="creationUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="updateUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="creationDate" locales="es-AR"/>
      <DateField source="updateDate" locales="es-AR"/>
    </Datagrid>
  </List>
};

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm >
      <TextInput disabled source="id" />
      <TextInput source="user" />
      <ReferenceInput source="rol" reference="rol">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="email" type="email" />
      <TextInput source="name" />
      <TextInput source="surname" />
      <NumberInput source="dni" />
      <BooleanInput label="aceptTC" source="aceptTC" />
      <BooleanInput label="enabled" source="enabled" />
      <NumberInput source="phone" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="user" />
      <ReferenceInput source="rol" reference="rol">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="email" type="email"/>
      <TextInput source="name" />
      <TextInput source="surname" />
      <NumberInput source="dni" />
      <BooleanInput label="aceptTC" source="aceptTC" />
      <BooleanInput label="enabled" source="enabled" />
      <NumberInput source="phone" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);