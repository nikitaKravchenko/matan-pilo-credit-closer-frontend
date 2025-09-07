import {TextField, DateField} from "react-admin";
import ColoredNumberField from "../../../components/CustomInputs/ColoredNumberField";

export const listPaymentData = [
  {props: {source: 'id'}, Component: TextField},
  {props: {source: 'amount'}, Component: ColoredNumberField},
  {props: {source: 'status'}, Component: TextField},
  {props: {source: 'date'}, Component: DateField},
];
