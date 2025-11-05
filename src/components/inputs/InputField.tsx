import { InputComponentMap, type TInputFieldsProps } from "./inputs.types";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";

type TProps = Omit<TInputFieldsProps, "error" | "setError">;

export default function InputField(props: TProps) {
  const Component = InputComponentMap[props.inputType];
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [props.inputType]);

  return (
    <div className="flex flex-col">
      <Component error={error} setError={setError} {...props} />
      <ErrorMessage errorMessage={error} />
    </div>
  );
}
