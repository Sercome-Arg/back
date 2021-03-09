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
  Tab,
  NumberField,
  DateInput,
  NumberInput
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

export const TransactionList = (props) => {

  return <List 
    {...props} 
    actions={<ListActions />}
  >
    <Datagrid>
      <EditButton />
      <ReferenceField source="item" reference="item">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="amount" />
      <NumberField source="totalPrice" />
      <ReferenceField source="seller" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="buyer" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="start" />
      <DateField source="end" />
    </Datagrid>
  </List>

};

export const TransactionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="item" reference="item">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="amount" />
      <NumberInput source="totalPrice" />
      <ReferenceInput source="seller" reference="user">
        <SelectInput optionText="email" />
      </ReferenceInput>
      <ReferenceInput source="buyer" reference="user">
        <SelectInput optionText="email" />
      </ReferenceInput>
      <DateInput source="start" />
      <DateInput source="end" />
    </SimpleForm>
  </Edit>
);

export const TransactionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="item" reference="item">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="amount" />
      <NumberInput source="totalPrice" />
      <ReferenceInput source="seller" reference="user">
        <SelectInput optionText="email" />
      </ReferenceInput>
      <ReferenceInput source="buyer" reference="user">
        <SelectInput optionText="email" />
      </ReferenceInput>
      <DateInput source="start" />
      <DateInput source="end" />
    </SimpleForm>
  </Create>
);