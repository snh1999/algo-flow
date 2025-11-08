import { Handle, Position } from "@xyflow/react";
import { EInputDataType, type TInputDataType } from "./nodes.type";
import { useState } from "react";
import InputField from "@/components/inputs/InputField";
import { ArrayInput } from "@/components/inputs/fields/ArrayField";

export function InputNode() {
  const [dataType, setDataType] = useState<TInputDataType>(EInputDataType.INT);

  return (
    <div className="rounded-md">
      <label className="input_label justify-between">
        <p className="text-end py-1 opacity-60">Input</p>
        <select
          className="xy-theme__select nodrag rounded-md text-center p-0.5"
          value={dataType as TInputDataType}
          onChange={(event) =>
            setDataType(event.target.value as TInputDataType)
          }
        >
          {Object.keys(EInputDataType).map((key) => (
            <option key={key} value={EInputDataType[key]}>
              {EInputDataType[key]}
            </option>
          ))}
        </select>
      </label>

      <div className="input_label justify-center">
        <InputField inputType={dataType} />
      </div>
      <ArrayInput />

      <Handle className="w-2 h-2" type="source" position={Position.Right} />
    </div>
  );
}
