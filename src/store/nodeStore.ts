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
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  addNode: (node: Node) => void;
  setEdges: (edges: Edge[]) => void;
}

export const useNodeStore = create(
  persist<INodeState>(
    (set, get) => ({
      nodes: [],
      edges: [],
      onNodesChange(changes) {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange(changes) {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      setNodes: (nodes) => {
        set({ nodes });
      },
      addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
      },
      setEdges: (edges) => {
        set({ edges });
      },
    }),
    {
      name: "algo-flow",
    },
  ),
);
