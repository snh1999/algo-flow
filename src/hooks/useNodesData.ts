import type { TAllowedTypes } from "@/components/inputs/fields/inputFields.types";
import type { TInputDataType, TInputType } from "@/nodes/nodes.type";
import {
  useNodeConnections,
  useNodeId,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

export const useGetNodeData = () => {
  const nodeId = useNodeId()!;
  const { data } = useNodesData(nodeId)!;
  return data;
};

export const useGetNodeConnectionsData = () => {
  const connections = useNodeConnections({ handleType: "target" });

  const nodes = useNodesData(
    connections.map((connection) => connection.source),
  );
  return nodes.map((node) => node.data.value);
};

export const useSetNodeData = () => {
  const nodeId = useNodeId()!;
  const { updateNodeData } = useReactFlow();
  const { data } = useNodesData(nodeId)!;

  return ({
    value,
    type,
    dataType,
  }: {
    value?: TAllowedTypes;
    type?: TInputType;
    dataType?: TInputDataType;
  }) =>
    updateNodeData(nodeId, {
      value,
      type: type ? type : data.type,
      dataType: dataType ? dataType : data.dataType,
    });
};
