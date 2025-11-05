import type { EnumType } from "@/common/types";

export const EInputType: Record<string, string> = {
  BASIC: "BASIC",
  ARRAY: "ARRAY",
  SET: "SET",
  MAP: "MAP",
};

export type TInputType = EnumType<typeof EInputType>;

export const EInputDataType: Record<string, string> = {
  BOOLEAN: "boolean",
  STRING: "string",
  INT: "integer",
  FLOAT: "float",
};

export type TInputDataType = EnumType<typeof EInputDataType>;
