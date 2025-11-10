import { useNodeConnections, useNodeId, useNodesData } from "@xyflow/react";

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
