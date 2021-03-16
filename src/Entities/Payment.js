import * as React from "react";
import { cloneElement } from 'react';
import { fetchUtils } from 'react-admin';
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
  EditButton,
  ArrayInput,
  SimpleFormIterator,
  Pagination
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

  let paymentCreate = null

  props.permissions.map(perm => {
    if(perm.number == props.create) {
      paymentCreate = <CreateButton basePath={ basePath } />
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
        paymentCreate
      }
    </TopToolbar>
  );
};

const PaymentFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="q" alwaysOn /> */}
    <ReferenceInput label="Payment" source="name" reference="payment" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

const BulkDeletePaymentButton = () => {};

const PaymentPagination = props => <Pagination rowsPerPageOptions={[10, 25, 100, 200]} {...props} />;

export const PaymentList = (props) => {

  let paymentReturn = null
  let paymentUpdate = null

  props.permissions.map(perm => {
    if(perm.number == props.update) {
      paymentUpdate = <EditButton />
    }
  })

  let paymentDelete = <List 
    {...props} 
    actions={<ListActions permissions={ props.permissions } create={ props.create } />}
    pagination={<PaymentPagination />}
  >
    <Datagrid>
      {
        paymentUpdate
      }
      <TextField label='Detalle' source="meli.status_detail" />
      <TextField label='Email' source="meli.payer.email" />
      <TextField label='Importe' source="meli.transaction_amount" />
      <TextField label='Descripción' source="meli.description" />
      <DateField label='Fecha' source="meli.date_approved" />
    </Datagrid>
  </List>
  
  let paymentList = <List 
    {...props} 
    actions={ <ListActions permissions={ props.permissions } create={ props.create } /> }
    bulkActionButtons={ BulkDeletePaymentButton }
    pagination={<PaymentPagination />}
  >
    <Datagrid>
      {
        paymentUpdate
      }
      <TextField label='Detalle' source="meli.status_detail" />
      <TextField label='Email' source="meli.payer.email" />
      <TextField label='Importe' source="meli.transaction_amount" />
      <TextField label='Descripción' source="meli.description" />
      <DateField label='Fecha' source="meli.date_approved" />
    </Datagrid>
  </List>

  let paymentDeleteBoolean = false
  let paymentListBoolean = false

  props.permissions.map(perm => {
    if(perm.number == props.delete) {
      paymentDeleteBoolean = true
    }
    if(perm.number == props.list) {
      paymentListBoolean = true
    }
  })

  if(paymentListBoolean) {
    paymentReturn = paymentList
    if(paymentDeleteBoolean) {
      paymentReturn = paymentDelete
    }
  }

  return paymentReturn
};

export const PaymentEdit = props => (
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

export const PaymentCreate = props => (
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