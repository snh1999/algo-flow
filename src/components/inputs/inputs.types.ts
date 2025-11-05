import BooleanField from "./BooleanField";
import NumberField from "./NumberField";
import TextField from "./TextField";
import { EInputDataType, type TInputDataType } from "@/nodes/nodes.type";

export const InputComponentMap = {
  [EInputDataType.BOOLEAN]: BooleanField,
  [EInputDataType.FLOAT]: NumberField,
  [EInputDataType.INT]: NumberField,
  [EInputDataType.STRING]: TextField,
};

export type TInputFieldsProps = TTextFieldsProps &
  TBooleanFieldsProps &
  TNumberFieldsProps;

type TCommonFieldsProps = {
  inputType: TInputDataType;
  error: string;
  setError: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export type TNumberFieldsProps = TCommonFieldsProps & {
  min?: number;
  max?: number;
  positive?: boolean;
};

export type TTextFieldsProps = TCommonFieldsProps & {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
};

export type TBooleanFieldsProps = TCommonFieldsProps & {
  trueLabel?: string;
  falseLabel?: string;
};
