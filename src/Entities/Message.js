import * as React from "react";
import { cloneElement, useMemo } from 'react';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
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
  EditButton,
  TabbedShowLayout,
  Tab
} from 'react-admin';
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
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
    </TopToolbar>
  );
};

export const MessageList = (props) => {

  return <List 
    {...props} 
    actions={<ListActions />}
  >
    <Datagrid>
      <EditButton />
      <TextField source="text" />
      <ReferenceField source="item" reference="item">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="receiver" reference="user">
        <TextField source="email" />
      </ReferenceField>
    </Datagrid>
  </List>

};

export const MessageEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="receiver" reference="user">
        <SelectInput optionText="email" />
      </ReferenceInput>
      <ReferenceInput source="item" reference="item">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="text" />
    </SimpleForm>
  </Edit>
);

export const MessageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="receiver" reference="user">
        <SelectInput optionText="email" />
      </ReferenceInput>
      <ReferenceInput source="item" reference="item">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput multiline source="text" resettable/>
    </SimpleForm>
  </Create>
);