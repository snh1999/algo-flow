import { useState } from "react";
import { z } from "zod";
import { getArraySchema, getInputFieldStyling } from "./inputFields.helpers";
import type { TArrayFieldsProps } from "./inputFields.types";

export default function ArrayFields(props: TArrayFieldsProps) {
  const {
    error,
    setError,
    placeholder,
    addToData,
    initialValue = [],
    disabled = false,
  } = props;
  const [value, setValue] = useState<string>(JSON.stringify(initialValue));

  const schema = getArraySchema(props);

  const validate = (val: string) => {
    try {
      const data = JSON.parse(val);
      schema.parse(data);
      setError("");
      addToData(data);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
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
