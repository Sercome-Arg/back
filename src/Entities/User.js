import * as React from "react";
import { cloneElement } from 'react';
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
  EditButton
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

const EntityFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="email" alwaysOn />
  </Filter>
);

export const UserList = (props) => {

  return <List 
      {...props} 
      actions={<ListActions />}
      filters={<EntityFilter />}
    >
    <Datagrid>
      <EditButton />
      <ReferenceField source="rol" reference="rol">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <EmailField source="email" />
      <BooleanField source="sendAlert" />
      <TextField source="process" />
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
      <TextInput source="name" />
      <TextInput source="email" type="email" />
      <BooleanInput source="sendAlert" />
      <TextInput source="process" />
      <ReferenceInput source="rol" reference="rol">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" type="email" />
      <BooleanInput source="sendAlert" />
      <TextInput source="process" />
      <ReferenceInput source="rol" reference="rol">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);