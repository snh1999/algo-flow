import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  type Edge,
  type Node,
  type OnConnect,
  MiniMap,
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "tailwindcss";
import { useSettingsStore } from "./store/settingStore";
import AppContextMenu from "./components/contextMenu/AppContextMenu";
import type { TPosition } from "./common/types";
import { Topbar } from "./components/topbar/Topbar";
import { DnDProvider } from "./hooks/useDnd/DndContext";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function App() {
  const { colorMode, controlVisiblity, minimapVisiblity, bgVariant } =
    useSettingsStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges],
  );

  return (
    <ReactFlowProvider>
      <DnDProvider>
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
            <Topbar />
            {minimapVisiblity && <MiniMap />}
            {bgVariant && <Background variant={bgVariant} />}
            {controlVisiblity && <Controls />}
            {contextMenu && <AppContextMenu position={{ ...contextMenu }} />}
          </ReactFlow>
        </div>
      </DnDProvider>
    </ReactFlowProvider>
  );
}
