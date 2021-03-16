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
  EditButton,
  TabbedShowLayout,
  Tab,
  ArrayField,
  SingleFieldList,
  ArrayInput,
  SimpleFormIterator,
  NumberField,
  NumberInput,
  BooleanField,
  BooleanInput
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
    </TopToolbar>
  );
};

export const ItemList = (props) => {

  return <List 
    {...props} 
    actions={<ListActions />}
  >
    <Datagrid>
      <EditButton />
      <TextField source="name" />
      <NumberField source="price" />
      <TextField source="shortDescription" />
      <BooleanField source="state" />
      <BooleanField source="display" />
      <ArrayField label='subcategory' source="subs">
        <Datagrid>
          <TextField label=" " source="name" /> 
        </Datagrid>
      </ArrayField>
      <ArrayField source="tag">
        <Datagrid>
          <TextField label=" " source="name" /> 
        </Datagrid>
      </ArrayField>
    </Datagrid>
  </List>

};

export const ItemEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <NumberInput source="price" />
      <TextInput source="shortDescription" />
      <BooleanInput source="state" />
      <BooleanInput source="display" />
      <TextInput multiline source="description"/>
      <ArrayInput source="subcategory">
        <SimpleFormIterator>
          <ReferenceInput label="subcategory" source="subcategory" reference="subcategory">
            <SelectInput optionText="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="tag">
        <SimpleFormIterator>
          <TextInput label="tag" source="name" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const ItemCreate = props => ( 
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="price" />
      <TextInput source="shortDescription" />
      <BooleanInput source="state" />
      <BooleanInput source="display" />
      <TextInput multiline source="description"/>
      <ArrayInput source="subcategory">
        <SimpleFormIterator>
          <ReferenceInput label="subcategory" source="subcategory" reference="subcategory">
            <SelectInput optionText="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="tag">
        <SimpleFormIterator>
          <TextInput label="tag" source="name" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);