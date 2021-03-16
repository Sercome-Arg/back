import * as React from "react";
import { cloneElement } from 'react';
import { fetchUtils } from 'react-admin';
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
  SimpleFormIterator
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

  let linkCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      linkCreate = <CreateButton basePath={ basePath } />
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
        linkCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteLinkButton = () => {};

export const LinkList = (props) => {

  let linkReturn = null
  let linkUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      linkUpdate = <EditButton />
    }
  })

  let linkDelete = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } create={ props.create } />}
  >
    <Datagrid>
      {
        linkUpdate
      }
      <TextField source="room" />
      <TextField source="url" />
    </Datagrid>
  </List>
  
  let linkList = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    bulkActionButtons={ BulkDeleteLinkButton }
  >
    <Datagrid>
      {
        linkUpdate
      }
      <TextField source="room" />
      <TextField source="url" />
    </Datagrid>
  </List>

  let linkDeleteBoolean = false
  let linkListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      linkDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      linkListBoolean = true
    }
  })

  if(linkListBoolean) {
    linkReturn = linkList
    if(linkDeleteBoolean) {
      linkReturn = linkDelete
    }
  }

  return linkReturn
};

export const LinkEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="room" />
      <TextInput source="url" />
    </SimpleForm>
  </Edit>
);

export const LinkCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="room" />
      <TextInput source="url" />
    </SimpleForm>
  </Create>
);