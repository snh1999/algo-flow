import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Background,
  Controls,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "tailwindcss";
import { useSettingsStore } from "./store/settingStore";
import AppContextMenu from "./components/contextMenu/AppContextMenu";
import type { TPosition } from "./common/types";
import { Topbar } from "./components/topbar/Topbar";
import { DnDProvider } from "./hooks/useDnd/DndContext";
import { useNodeStore, type INodeState } from "./store/nodeStore";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

const selector = (state: INodeState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function App() {
  const { nodes, edges, onConnect, onEdgesChange, onNodesChange } =
    useNodeStore(useShallow(selector));

  const { colorMode, controlVisiblity, minimapVisiblity, bgVariant } =
    useSettingsStore();

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
