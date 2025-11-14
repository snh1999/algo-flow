import { Handle, Position } from "@xyflow/react";
import { EInputDataType, EInputType } from "./nodes.type";
import InputField from "@/components/inputs/InputField";
import {
  useGetNodeConnectionsData,
  useGetNodeData,
} from "@/hooks/useNodesData";
import type {
  TAllowedArrayTypes,
  TAllowedTypes,
} from "@/components/inputs/fields/inputFields.types";

export default function InputCompositeNode() {
  const data = useGetNodeData();
  const inputCount = Number(data.value ?? 1);

  const values = useGetNodeConnectionsData();

  // const updateNodeInternals = useUpdateNodeInternals();

  return (
    <div className="react-flow__node-default rounded-md">
      <label className="input_label justify-between">
        <p className="text-end py-1 opacity-60">Composite</p>
        <div className="scale-80 text-center">
          <p className="opacity-60">Input count</p>
          <InputField
            type={EInputType.BASIC}
            dataType={EInputDataType.INT}
            initialValue={inputCount}
            min={1}
            max={10}
            positive
          />
        </div>
      </label>
      {values.map((value, index) => (
        <div key={`${index}`}>
          Input #{index + 1}: {JSON.stringify(value)}
        </div>
      ))}

      {Array.from({ length: inputCount }).map((_, index) => (
        <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={`handle-${index}`}
          style={{
            top: `${((index + 1) * 100) / (inputCount + 1)}%`,
          }}
        />
      ))}
    </div>
  );
}
