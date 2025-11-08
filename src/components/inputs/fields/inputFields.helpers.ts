import { z } from "zod";
import { EInputDataType } from "@/nodes/nodes.type";
import type { TNumberFieldsProps, TTextFieldsProps } from "./inputFields.types";

export const getInputFieldStyling = (error?: unknown) =>
  `input_field focus:outline-none transition-colors ${
    error ? "border-red-500" : "border-gray-400/50"
  }`;

export function getNumberSchema({
  inputType,
  positive,
  min,
  max,
}: TNumberFieldsProps) {
  let schema = z.number("Value must be a number");

  if (inputType === EInputDataType.INT) {
    schema = schema.int("Value must be an integer");
  }
  if (positive) {
    schema = schema.positive("Value must be positive");
  }
  if (min !== undefined) {
    schema = schema.min(min, `Minimum allowed value is ${min}`);
  }
  if (max !== undefined) {
    schema = schema.max(max, `Maximum allowed value is ${max}`);
  }
  return schema;
}

export function getTextSchema({
  required,
  minLength,
  maxLength,
  pattern,
  patternMessage,
}: TTextFieldsProps) {
  let schema = required
    ? z.string().min(1, "This field is required")
    : z.string();

  if (minLength !== undefined) {
    schema = schema.min(minLength, `Minimum ${minLength} characters required`);
  }
  if (maxLength !== undefined) {
    schema = schema.max(maxLength, `Maximum ${maxLength} characters allowed`);
  }
  if (pattern) {
    schema = schema.regex(pattern, patternMessage || "Invalid format");
  }

  return schema;
}
