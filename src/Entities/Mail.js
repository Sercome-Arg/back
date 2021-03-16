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
  Filter,
  Edit,
  SimpleForm,
  Create,
  ReferenceField,
  EditButton,
  BooleanField,
  BooleanInput
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

  let mailCreate = null

  props.permissions.map(perm => {
    if(perm.number == props.create) {
      mailCreate = <CreateButton basePath={ basePath } />
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
        mailCreate
      }
    </TopToolbar>
  );
};

const MailFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="q" alwaysOn /> */}
    <ReferenceInput label="Mail" source="name" reference="mail" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

const BulkDeleteMailButton = () => {};

export const MailList = (props) => {

  let mailReturn = null
  let mailUpdate = null

  props.permissions.map(perm => {
    if(perm.number == props.update) {
      mailUpdate = <EditButton />
    }
  })

  let mailDelete = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } create={ props.create } />}
  >
    <Datagrid>
      {
        mailUpdate
      }
      <TextField source="from" />
      <TextField source="pass" />
      <BooleanField source="enabled" />
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
  </List>
  
  let mailList = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    bulkActionButtons={ BulkDeleteMailButton }
  >
    <Datagrid>
      {
        mailUpdate
      }
      <TextField source="from" />
      <TextField source="pass" />
      <BooleanField source="enabled" />
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
  </List>

  let mailDeleteBoolean = false
  let mailListBoolean = false

  props.permissions.map(perm => {
    if(perm.number == props.delete) {
      mailDeleteBoolean = true
    }
    if(perm.number == props.list) {
      mailListBoolean = true
    }
  })

  if(mailListBoolean) {
    mailReturn = mailList
    if(mailDeleteBoolean) {
      mailReturn = mailDelete
    }
  }

  return mailReturn
};

export const MailEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="from" />
      <TextInput source="pass" />
      <BooleanInput source="enabled" />
    </SimpleForm>
  </Edit>
);

export const MailCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="from" />
      <TextInput source="pass" />
      <BooleanInput source="enabled" />
    </SimpleForm>
  </Create>
);