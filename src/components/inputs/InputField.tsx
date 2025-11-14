import {
  InputComponentMap,
  type TAllowedTypes,
  type TInputFieldsProps,
} from "./fields/inputFields.types";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import type { TInputType } from "@/nodes/nodes.type";
import { useSetNodeData } from "@/hooks/useNodesData";

type TProps = {
  type: TInputType;
} & Omit<TInputFieldsProps, "error" | "setError" | "addToData">;

export default function InputField(props: TProps) {
  const Component =
    InputComponentMap[props.type] ?? InputComponentMap[props.dataType];

  const [error, setError] = useState("");
  const updateNodeData = useSetNodeData();

  return (
    <div className="flex flex-col">
      <Component
        error={error}
        setError={setError}
        {...props}
        addToData={(value: TAllowedTypes) => updateNodeData({ value })}
      />
      <ErrorMessage errorMessage={error} />
    </div>
  );
}
