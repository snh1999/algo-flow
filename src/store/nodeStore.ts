import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  addEdge,
} from "@xyflow/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface INodeState {
  nodes: Node[];
  edges: Edge[];
}

export const useNodeStore = create(
  persist<INodeState>(
    () => ({
      nodes: [],
      edges: [],
    }),
    {
      name: "algo-flow",
    },
  ),
);

export const onNodesChange: OnNodesChange = (changes) => {
  useNodeStore.setState((state) => ({
    nodes: applyNodeChanges(changes, state.nodes),
  }));
};

export const onEdgesChange: OnEdgesChange = (changes) => {
  useNodeStore.setState((state) => ({
    edges: applyEdgeChanges(changes, state.edges),
  }));
};

export const onConnect: OnConnect = (connection) => {
  useNodeStore.setState((state) => ({
    edges: addEdge(connection, state.edges),
  }));
};

export const setNodes = (nodes: Node[]) => {
  useNodeStore.setState({ nodes });
};

export const addNode = (node: Node) => {
  useNodeStore.setState((state) => ({
    nodes: [...state.nodes, node],
  }));
};

export const setEdges = (edges: Edge[]) => {
  useNodeStore.setState({ edges });
};
