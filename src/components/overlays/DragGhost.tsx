import { useDnDPosition } from "../../hooks/useDnd/useDnd";

interface DragGhostProps {
  type: string | null;
}

// The DragGhost component is used to display a ghost node when dragging a node into the flow.
export function DragGhost({ type }: DragGhostProps) {
  const { position } = useDnDPosition();

  const reactFlowNodeClass = `react-flow__node react-flow__node-${type || "default"}`;

  if (!position) return null;

  return (
    <div
      // className={`ghostnode react-flow__node ${type}`}
      className={`${reactFlowNodeClass} ghostnode`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );
}
