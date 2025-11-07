import {
  Handle,
  Position,
  useNodeConnections,
  useNodeId,
  useNodesData,
} from "@xyflow/react";
import { EInputDataType } from "./nodes.type";
import InputField from "@/components/inputs/InputField";

export default function InputCompositeNode() {
  const nodeId = useNodeId()!;
  const { data } = useNodesData(nodeId)!;
  const inputCount = Number(data.value ?? 1);

  const connections = useNodeConnections({ handleType: "target" });
  const nodes = useNodesData(
    connections.map((connection) => connection.source),
  );
  const values = nodes.map((node) => node.data.value);
  console.log(values);

  // const updateNodeInternals = useUpdateNodeInternals();

  return (
    <div className="react-flow__node-default rounded-md">
      <label className="input_label justify-between">
        <p className="text-end py-1 opacity-60">Composite</p>
        <div className="scale-80 text-center">
          <p className="opacity-60">Input count</p>
          <InputField
            inputType={EInputDataType.INT}
            initialValue={inputCount}
            min={1}
            max={10}
            positive
          />
        </div>
      </label>

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
