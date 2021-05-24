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
  Edit,
  SimpleForm,
  Create,
  ReferenceField,
  EditButton,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  Area,
  FormTab,
  TabbedForm
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const ListActions = (props) => {
  const {
    className,
    exporter,
    filters,
    maxResults,
    ...rest
  } = props;
  const {
    resource,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
  } = useListContext();

  let instrumentCreate = null

  props.permissions.map(perm => {
    if (perm.permission == props.create) {
      instrumentCreate = <CreateButton basePath={basePath} />
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
        instrumentCreate
      }
    </TopToolbar>
  );
};

const BulkDeleteInstrumentButton = () => { };

export const InstrumentList = (props) => {

  let instrumentReturn = null
  let instrumentUpdate = null

  props.permissions.map(perm => {
    if (perm.permission == props.update) {
      instrumentUpdate = <EditButton />
    }
  })

  let grid = <Datagrid>
    {
      instrumentUpdate
    }
    <TextField source="name" />
    <TextField label='ID' source="ID" />
    <TextField source="brand" />
    <TextField source="version" />
    <TextField source="numberOfSerie" />
    <ReferenceField source="business" reference="business">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField source="magnitude" reference="magnitude">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField source="unit" reference="unit">
      <TextField source="name" />
    </ReferenceField>
    <TextField source="minimumWorkingRange" />
    <TextField source="maximumWorkingRange" />
    <TextField source="minimumMeasurementRange" />
    <TextField source="maximumMeasurementRange" />
    <TextField source="validateYear" />
    <TextField source="validateMonth" />
    <TextField source="validateDay" />
  </Datagrid>

  let instrumentDelete = (child) => {
    return <List
      {...props}
      actions={<ListActions permissions={props.permissions} create={props.create} />}
    >{child}</List>
  }

  let instrumentList = (child) => {
    return <List
      {...props}
      actions={<ListActions permissions={props.permissions} create={props.create} />}
      bulkActionButtons={BulkDeleteInstrumentButton}
    >{child}</List>
  }

  let instrumentDeleteBoolean = false
  let instrumentListBoolean = false

  props.permissions.map(perm => {
    if (perm.permission == props.delete) {
      instrumentDeleteBoolean = true
    }
    if (perm.permission == props.list) {
      instrumentListBoolean = true
    }
  })

  if (instrumentListBoolean) {
    instrumentReturn = instrumentList
    if (instrumentDeleteBoolean) {
      instrumentReturn = instrumentDelete
    }
  }

  if (instrumentReturn === null) {
    return null
  } else {
    return instrumentReturn(grid)
  }
};

const style = makeStyles({
  inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});


let form = (id) => {

  const classes = style();

  return <TabbedForm margin="normal">

    <FormTab label="Information">
      { id }
      <TextInput label="Identificación" source='ID'/>
      <ReferenceInput label='Empresa' source="business" reference="business" formClassName={classes.inlineBlock}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label='Magnitud' source="magnitude" reference="magnitude" formClassName={classes.inlineBlock}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label='Unidad de Medida' source="unit" reference="unit" formClassName={classes.inlineBlock}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <></>
      <TextInput label='Marca' source="brand" formClassName={classes.inlineBlock} />
      <TextInput label='Modelo' source="version" formClassName={classes.inlineBlock} />
      <TextInput label='Número de Serie' source="numberOfSerie" formClassName={classes.inlineBlock} />

      {/* <ReferenceInput source="agent" reference="user" formClassName={classes.inlineBlock}>
        <SelectInput optionText="email" />
      </ReferenceInput>
      <ReferenceInput source="area" reference="area" formClassName={classes.inlineBlock}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="CUIT" formClassName={classes.inlineBlock} /> */}
    </FormTab>

    <FormTab label="Ranges">
      <TextInput source="minimumWorkingRange" />
      <TextInput source="maximumWorkingRange" />
      <TextInput source="minimumMeasurementRange" />
      <TextInput source="maximumMeasurementRange" />
      <NumberInput source="validateYear" />
      <NumberInput source="validateMonth" />
      <NumberInput source="validateDay" />
      <TextInput source="observation" multiline />
    </FormTab>

    <FormTab label="Audit">

      <ReferenceField source="creationUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="updateUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="creationDate" locales="es-AR" />
      <DateField source="updateDate" locales="es-AR" />
    </FormTab>

  </TabbedForm>

}



export const InstrumentEdit = props => {
  const classes = style();
  let id = <TextInput disabled source="id" formClassName={classes.inlineBlock} />
  return <Edit {...props}>
    {form(id)}
  </Edit>
};

export const InstrumentCreate = props => (
  <Create {...props}>
    { form()}
  </Create>
);