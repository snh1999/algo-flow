import { z } from "zod";
import type { TNumberFieldsProps } from "./inputs.types";
import { useState } from "react";
import { EInputDataType } from "@/nodes/nodes.type";

export default function NumberInput({
  error,
  setError,
  inputType,
  placeholder,
  min,
  max,
  positive,
  required = true,
  disabled = false,
}: TNumberFieldsProps) {
  const [value, setValue] = useState<number | string>("");

  const validate = (val: string) => {
    try {
      if (val === "") return;

      let schema = z.number("Value must be a number");

      if (inputType === EInputDataType.INT) {
        schema = schema.int("Value must be an integer number");
      }
      if (positive) {
        schema = schema.positive("Number must be positive");
      }
      if (min !== undefined) {
        schema = schema.min(min, `Minimum allowed value is ${min}`);
      }
      if (max !== undefined) {
        schema = schema.max(max, `Maximum allowed value is ${max}`);
      }

      schema.parse(Number(val));
      setError("");
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(Number(newValue));
    validate(newValue);
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        step={0}
        min={min}
        max={max}
        required={required}
        className={`input_field focus:outline-none transition-colors ${
          error ? "border-red-500" : "border-gray-400/50"
        }`}
      />
    </div>
  );
}
