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

  let rolCreate = null

  props.permissions.map(perm => {
    if(perm.permission == props.create) {
      rolCreate = <CreateButton basePath={ basePath } />
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
        rolCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteRolButton = () => {};

export const RolList = (props) => {

  let rolReturn = null
  let rolUpdate = null

  props.permissions.map(perm => {
    if(perm.permission == props.update) {
      rolUpdate = <EditButton />
    }
  })

  let rolDelete = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } create={ props.create } />}
  >
    <Datagrid>
      {
        rolUpdate
      }
      <TextField source="name" />
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
  
  let rolList = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    bulkActionButtons={ BulkDeleteRolButton }
  >
    <Datagrid>
      {
        rolUpdate
      }
      <TextField source="name" />
      <ArrayField label='permission' source="subs">
        <Datagrid>
          <TextField label=" " source="name" /> 
        </Datagrid>
      </ArrayField>
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

  let rolDeleteBoolean = false
  let rolListBoolean = false

  props.permissions.map(perm => {
    if(perm.permission == props.delete) {
      rolDeleteBoolean = true
    }
    if(perm.permission == props.list) {
      rolListBoolean = true
    }
  })

  if(rolListBoolean) {
    rolReturn = rolList
    if(rolDeleteBoolean) {
      rolReturn = rolDelete
    }
  }

  return rolReturn
};

export const RolEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <ArrayInput source="permission">
        <SimpleFormIterator>
          <ReferenceInput perPage={ 10000 } label="permission" source="permission" reference="permission">
            <SelectInput optionText="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const RolCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ArrayInput source="permission">
        <SimpleFormIterator>
          <ReferenceInput perPage={ 10000 } label="permission" source="permission" reference="permission">
            <SelectInput optionText="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);