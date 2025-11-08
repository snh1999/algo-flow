import {
  InputComponentMap,
  type TInputFieldsProps,
} from "./fields/inputFields.types";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import { useNodeId, useReactFlow } from "@xyflow/react";

type TProps = Omit<TInputFieldsProps, "error" | "setError" | "addToData">;

export default function InputField(props: TProps) {
  const Component = InputComponentMap[props.inputType];
  const [error, setError] = useState("");

  const nodeId = useNodeId()!;
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    setError("");
  }, [props.inputType]);

  return (
    <div className="flex flex-col">
      <Component
        error={error}
        setError={setError}
        {...props}
        addToData={(value) => updateNodeData(nodeId, { value })}
      />
      <ErrorMessage errorMessage={error} />
    </div>
  );
}
