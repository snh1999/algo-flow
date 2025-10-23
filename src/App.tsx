import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  MiniMap,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "tailwindcss";
import { useAppStore } from "./store/store";
import AppContextMenu from "./components/contextMenu/AppContextMenu";
import type { TPosition } from "./common/types";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function App() {
  const { colorMode, controlVisiblity, minimapVisiblity } = useAppStore();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const [contextMenu, setContextMenu] = useState<TPosition | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const onAppContextMenu = useCallback(
    (event: MouseEvent | React.MouseEvent) => {
      event.preventDefault();
      if (contextMenu) {
        setContextMenu(null);
        return;
      }
      const pane = ref.current?.getBoundingClientRect();
      if (!pane) return;

      setContextMenu({
        top: event.clientY,
        left: event.clientX,
      });
    },
    [setContextMenu, contextMenu],
  );

  const onPaneClick = useCallback(() => setContextMenu(null), [setContextMenu]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        colorMode={colorMode}
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneContextMenu={onAppContextMenu}
        onPaneClick={onPaneClick}
        fitView
      >
        {minimapVisiblity && <MiniMap />}
        <Background />
        {controlVisiblity && <Controls />}
        {contextMenu && <AppContextMenu position={{ ...contextMenu }} />}
      </ReactFlow>
    </div>
  );
}
