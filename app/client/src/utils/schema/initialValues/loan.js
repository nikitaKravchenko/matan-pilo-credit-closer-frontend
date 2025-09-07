import {NumberField, TextField, DateField} from "react-admin";
import ColoredNumberField from "../../../components/CustomInputs/ColoredNumberField";

export const initialDataLoanPost = {
  customer_id: 0,
  loan_amount: '',
  payment_amount: '',
  number_payments: '',
  payment_period: 'M1',
  status: 'Active'
}

export const loanShowItems = [
  {label: 'Loan amount', props: {source: 'loan_amount'}, Component: ColoredNumberField},
  {label: 'Number payments', props: {source: 'number_payments'}, Component: NumberField},
  {label: 'Payment amount', props: {source: 'payment_amount'}, Component: ColoredNumberField},
  {label: 'Return total', props: {source: 'return_total'}, Component: ColoredNumberField},
  {label: 'Profit', props: {source: 'profit'}, Component: ColoredNumberField},
  {label: 'Start payment date', props: {source: 'start_payment_date'}, Component: DateField},
  {label: 'End payment date', props: {source: 'end_payment_date'}, Component: DateField},
  {label: 'Status', props: {source: 'status'}, Component: TextField},
];


export const customerShowItems = [
  {label: 'First name', name: 'first_name'},
  {label: 'Last name', name: 'last_name'},
  {label: 'Email', name: 'email'},
  {label: 'Phone', name: 'phone'},
];

export const customerShowItemsCalendar = [
  {label: 'Email', name: 'email'},
  {label: 'Phone', name: 'phone'},
  {label: 'Amount', name: 'amount'},
];
