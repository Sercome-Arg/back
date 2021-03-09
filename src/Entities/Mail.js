import * as React from "react";
import { cloneElement, useMemo } from 'react';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import PropTypes from 'prop-types';
import config from './config'
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
  EditButton,
  TabbedShowLayout,
  Tab,
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
  BooleanField,
  BooleanInput
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';

const httpClient = (url, options = {}) => {
  // if (!options.headers) {
  //     options.headers = new Headers({ Accept: 'application/json' });
  // }
  // add your own headers here

  options.headers = new Headers()

  options.headers.set('Content-Type', 'application/json');
  options.headers.set('Authorization', localStorage.getItem('session_token'));
  options.headers.set('session', localStorage.getItem('session_id'));
  return fetchUtils.fetchJson(url, options);
}

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
    if(perm.number == config.createMail) {
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
    if(perm.number == config.updateMail) {
      mailUpdate = <EditButton />
    }
  })

  let mailDelete = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } />}
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
    actions={<ListActions permissions={ props.permissions } />}
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
    if(perm.number == config.deleteMail) {
      mailDeleteBoolean = true
    }
    if(perm.number == config.listMail) {
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