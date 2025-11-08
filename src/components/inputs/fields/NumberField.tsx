import { z } from "zod";
import type { TNumberFieldsProps } from "./inputFields.types";
import { useState } from "react";
import { getInputFieldStyling, getNumberSchema } from "./inputFields.helpers";

export default function NumberField(props: TNumberFieldsProps) {
  const {
    error,
    setError,
    placeholder,
    min,
    max,
    addToData,
    initialValue,
    required = true,
    disabled = false,
  } = props;

  const [value, setValue] = useState<number | string>(
    initialValue ? Number(initialValue) : "",
  );

  const schema = getNumberSchema(props);

  const validate = (val: number | string) => {
    if (val === "") return;
    try {
      const numberVal = Number(val);
      schema.parse(numberVal);
      setError("");
      addToData(numberVal);
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
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        step={0}
        min={min}
        max={max}
        required={required}
        className={getInputFieldStyling(error)}
      />
    </div>
  );
}
