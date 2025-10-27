import { createPortal } from "react-dom";
import { useDnDPosition } from "../../hooks/useDnd/useDnd";

interface DragGhostProps {
  type: string | null;
}

// The DragGhost component is used to display a ghost node when dragging a node into the flow.
export function DragGhost({ type }: DragGhostProps) {
  const { position } = useDnDPosition();

  const flowRoot = document.querySelector(".react-flow");
  if (!flowRoot) return null;

  const reactFlowNodeClass = `react-flow__node react-flow__node-${type || "default"}`;

  if (!position) return null;

  const ghostNode = (
    <div
      className={`ghostnode ${reactFlowNodeClass}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );

  return createPortal(ghostNode, flowRoot);
}
