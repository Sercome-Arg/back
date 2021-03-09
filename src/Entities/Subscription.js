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
  NumberField
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

  let subscriptionCreate = null

  props.permissions.map(perm => {
    if(perm.number == config.createSubscription) {
      subscriptionCreate = <CreateButton basePath={ basePath } />
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
        subscriptionCreate
      }
    </TopToolbar>
  );
};

const SubscriptionFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="q" alwaysOn /> */}
    <ReferenceInput label="Subscription" source="name" reference="subscription" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

const BulkDeleteSubscriptionButton = () => {};

export const SubscriptionList = (props) => {

  let subscriptionReturn = null
  let subscriptionUpdate = null

  props.permissions.map(perm => {
    if(perm.number == config.updateSubscription) {
      subscriptionUpdate = <EditButton />
    }
  })

  let subscriptionDelete = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } />}
  >
    <Datagrid>
      {
        subscriptionUpdate
      }
      <NumberField source="end" />
      <NumberField source="start" />
      <ReferenceField source="user" reference="user">
        <TextField source="email" />
      </ReferenceField>
      {/* <TextField source="operationType" />
      <ReferenceField source="creationUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="updateUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="creationDate" />
      <DateField source="updateDate" /> */}
    </Datagrid>
  </List>
  
  let subscriptionList = <List 
    {...props} 
    actions={ <ListActions permissions={ props.permissions } /> }
    bulkActionButtons={ BulkDeleteSubscriptionButton }
  >
    <Datagrid>
      {
        subscriptionUpdate
      }
      <DateField source="end" />
      <DateField source="start" />
      <ReferenceField source="user" reference="user">
        <TextField source="email" />
      </ReferenceField>
      {/* <TextField source="operationType" />
      <ReferenceField source="creationUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="updateUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="creationDate" />
      <DateField source="updateDate" /> */}
    </Datagrid>
  </List>

  let subscriptionDeleteBoolean = false
  let subscriptionListBoolean = false

  props.permissions.map(perm => {
    if(perm.number == config.deleteSubscription) {
      subscriptionDeleteBoolean = true
    }
    if(perm.number == config.listSubscription) {
      subscriptionListBoolean = true
    }
  })

  if(subscriptionListBoolean) {
    subscriptionReturn = subscriptionList
    if(subscriptionDeleteBoolean) {
      subscriptionReturn = subscriptionDelete
    }
  }

  return subscriptionReturn
};

export const SubscriptionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <ArrayInput source="permission">
        <SimpleFormIterator>
          <ReferenceInput label="permission" source="permission" reference="permission">
            <SelectInput optionText="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const SubscriptionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ArrayInput source="permission">
        <SimpleFormIterator>
          <ReferenceInput label="permission" source="permission" reference="permission">
            <SelectInput optionText="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);