import { useState } from "react";
import { z } from "zod";
import type { TTextFieldsProps } from "./inputs.types";

export default function TextField({
  error,
  setError,
  placeholder,
  minLength,
  maxLength,
  pattern,
  patternMessage,
  required = true,
  disabled = false,
}: TTextFieldsProps) {
  const [value, setValue] = useState("");

  const validate = (val: string) => {
    try {
      let schema = required
        ? z.string().min(1, "This field is required")
        : z.string();

      if (minLength !== undefined) {
        schema = schema.min(
          minLength,
          `Minimum ${minLength} characters required`,
        );
      }
      if (maxLength !== undefined) {
        schema = schema.max(
          maxLength,
          `Maximum ${maxLength} characters allowed`,
        );
      }
      if (pattern) {
        schema = schema.regex(pattern, patternMessage || "Invalid format");
      }

      schema.parse(val);
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
    setValue(newValue);
    validate(newValue);
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={() => validate(value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`input_field focus:outline-none transition-colors ${
          error ? "border-red-500" : "border-gray-400/50"
        }`}
      />
    </div>
  );
}
