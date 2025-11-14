import { Handle, Position } from "@xyflow/react";
import {
  EInputDataType,
  EInputType,
  type TInputDataType,
  type TInputType,
} from "./nodes.type";
import { useState } from "react";
import InputField from "@/components/inputs/InputField";
import { NODE_SELECT_STYLE } from "./nodes.constants";
import { useGetNodeData, useSetNodeData } from "@/hooks/useNodesData";
import type { TAllowedTypes } from "@/components/inputs/fields/inputFields.types";

export function InputNode() {
  const data = useGetNodeData();
  const [dataType, setDataType] = useState<TInputDataType>(
    (data.dataType ?? EInputDataType.INT) as TInputDataType,
  );
  const [type, setType] = useState<TInputType>(
    (data.type ?? EInputType.BASIC) as TInputType,
  );

  const updateNodeData = useSetNodeData();

  return (
    <div className="rounded-md">
      <p className="text-center py-1 opacity-60">Input</p>

      <label className="input_label justify-between">
        <select
          className={NODE_SELECT_STYLE}
          value={type as TInputType}
          onChange={(event) => {
            setType(event.target.value as TInputType);
            updateNodeData({ type });
          }}
        >
          {Object.values(EInputType).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select
          className={NODE_SELECT_STYLE}
          value={dataType as TInputType}
          onChange={(event) => {
            setDataType(event.target.value as TInputDataType);
            updateNodeData({ dataType });
          }}
        >
          {Object.values(EInputDataType).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <div className="input_label justify-center">
        <InputField
          type={type}
          dataType={dataType}
          initialValue={data.value as TAllowedTypes}
        />
      </div>

      <Handle className="w-2 h-2" type="source" position={Position.Right} />
    </div>
  );
}
