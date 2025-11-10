import ArrayFields from "./ArrayField";
import BooleanField from "./BooleanField";
import NumberField from "./NumberField";
import TextField from "./TextField";
import {
  EInputDataType,
  EInputType,
  type TInputDataType,
} from "@/nodes/nodes.type";

export const InputComponentMap = {
  [EInputType.ARRAY]: ArrayFields,
  [EInputType.BASIC]: null,
  [EInputType.MAP]: null,
  [EInputDataType.BOOLEAN]: BooleanField,
  [EInputDataType.FLOAT]: NumberField,
  [EInputDataType.INT]: NumberField,
  [EInputDataType.STRING]: TextField,
};

export type TInputFieldsProps = TTextFieldsProps &
  TBooleanFieldsProps &
  TNumberFieldsProps;

export type TAllowedTypes =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

type TCommonFieldsProps = {
  dataType: TInputDataType;
  error: string;
  setError: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  addToData: <T extends TAllowedTypes>(val: T) => void;
  initialValue?: string | number | boolean;
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
