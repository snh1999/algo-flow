import { useState } from "react";
import { z } from "zod";
import type { TTextFieldsProps } from "./inputFields.types";
import { getInputFieldStyling, getTextSchema } from "./inputFields.helpers";

export default function TextField(props: TTextFieldsProps) {
  const {
    error,
    setError,
    placeholder,
    addToData,
    initialValue = "",
    disabled = false,
  } = props;
  const [value, setValue] = useState<string>(initialValue.toString());

  const schema = getTextSchema(props);

  const validate = (val: string) => {
    try {
      schema.parse(val);
      setError("");
      addToData(val);
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
        placeholder={placeholder}
        disabled={disabled}
        className={getInputFieldStyling(error)}
      />
    </div>
  );
}
