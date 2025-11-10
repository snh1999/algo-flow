import {
  InputComponentMap,
  type TInputFieldsProps,
} from "./fields/inputFields.types";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import { useNodeId, useReactFlow } from "@xyflow/react";
import type { TInputType } from "@/nodes/nodes.type";

type TProps = {
  type: TInputType;
} & Omit<TInputFieldsProps, "error" | "setError" | "addToData">;

export default function InputField(props: TProps) {
  const Component =
    InputComponentMap[props.type] ?? InputComponentMap[props.dataType];

  const [error, setError] = useState("");

  const nodeId = useNodeId()!;
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    setError("");
    updateNodeData(nodeId, {
      value: undefined,
      type: props.type,
      dataType: props.dataType,
    });
  }, [nodeId, props.dataType, props.type, updateNodeData]);

  return (
    <div className="flex flex-col">
      <Component
        error={error}
        setError={setError}
        {...props}
        addToData={(value) =>
          updateNodeData(nodeId, {
            value,
            type: props.type,
            dataType: props.dataType,
          })
        }
      />
      <ErrorMessage errorMessage={error} />
    </div>
  );
}
