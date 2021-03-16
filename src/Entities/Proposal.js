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
  BooleanField,
  BooleanInput,
  ArrayField,
  NumberField,
  NumberInput
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

export const ProposalList = (props) => {

  return <List 
    {...props} 
    actions={<ListActions />}
  >
    <Datagrid>
      <EditButton />
      <NumberField source="price" />
      <ReferenceField source="proposalState" reference="proposalState">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="aceptTC" />
      <ReferenceField source="creationUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="creationDate" />
      <ArrayField source="resource">
        <Datagrid>
          <TextField label=" " source="url" />
        </Datagrid>
      </ArrayField>
    </Datagrid>
  </List>
};

export const ProposalEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="proposalState" reference="proposalState">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput disabled source="price" />
      <BooleanInput disabled source="aceptTC" />
      <TextInput disabled source="description" />
    </SimpleForm>
  </Edit>
);

export const ProposalCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="price" />
      <TextInput source="description" />
      <BooleanInput source="aceptTC" />
    </SimpleForm>
  </Create>
);