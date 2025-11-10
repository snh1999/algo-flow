import { useState } from "react";
import { z } from "zod";
import ErrorMessage from "../ErrorMessage";
import { getInputFieldStyling } from "./inputFields.helpers";
import type { TTextFieldsProps } from "./inputFields.types";

// Array Input Component
interface ArrayInputProps {
  label?: string;
  placeholder?: string;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function ArrayFields(props: TTextFieldsProps) {
  const {
    error,
    setError,
    placeholder,
    addToData,
    initialValue = "",
    disabled = false,
  } = props;
  const [value, setValue] = useState<string>(initialValue.toString());

  // const schema = getTextSchema(props);

  const validate = (val: string) => {
    try {
      JSON.parse(val);
      // schema.parse(val);
      setError("");
      addToData(val);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else if (err instanceof Error) {
        console.log(err.message);
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
        placeholder={placeholder}
        disabled={disabled}
        className={getInputFieldStyling(error)}
      />
    </div>
  );
}
