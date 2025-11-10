import type { EnumType } from "@/common/types";

export const EInputType = {
  BASIC: "basic",
  ARRAY: "array",
  MAP: "map",
} as const;

export type TInputType = EnumType<typeof EInputType>;

export const EInputDataType = {
  BOOLEAN: "boolean",
  STRING: "string",
  INT: "integer",
  FLOAT: "float",
} as const;

export type TInputDataType = EnumType<typeof EInputDataType>;
