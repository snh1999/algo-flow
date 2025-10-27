import { useReactFlow, type XYPosition } from "@xyflow/react";
import DnDContext, { type OnDropAction } from "./DndContext";
import { useCallback, useContext, useEffect, useState } from "react";

export const useDnD = () => {
  const { screenToFlowPosition } = useReactFlow();

  const context = useContext(DnDContext);
  if (!context) {
    throw new Error("useDnD must be used within a DnDProvider");
  }
  const { isDragging, setIsDragging, setDropAction, dropAction } = context;

  // `useDnD` hook return this callback, and can be used when a node is dragged into the flow.
  const onDragStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, onDrop: OnDropAction) => {
      event.preventDefault();
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
      setIsDragging(true);
      setDropAction(onDrop);
    },
    [setIsDragging, setDropAction],
  );

  const onDragEnd = useCallback(
    (event: PointerEvent) => {
      if (!isDragging) {
        setIsDragging(false);
        return;
      }

      (event.target as HTMLElement).releasePointerCapture(event.pointerId);

      // Use elementFromPoint to get the actual element under the pointer
      const elementUnderPointer = document.elementFromPoint(
        event.clientX,
        event.clientY,
      );
      const isDroppingOnFlow = elementUnderPointer?.closest(".react-flow");
      event.preventDefault();

      // Only allow dropping on the flow area
      if (isDroppingOnFlow) {
        const flowPosition = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        dropAction?.({ position: flowPosition });
      }

      setIsDragging(false);
    },
    [isDragging, setIsDragging, screenToFlowPosition, dropAction],
  );

  // Add global touch event listeners
  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("pointerup", onDragEnd);

    return () => {
      document.removeEventListener("pointerup", onDragEnd);
    };
  }, [onDragEnd, isDragging]);

  return {
    isDragging,
    onDragStart,
  };
};

export const useDnDPosition = () => {
  const [position, setPosition] = useState<XYPosition | undefined>(undefined);

  // By default, the pointer move event sets the position of the dragged element in the context.
  // This will be used to display the `DragGhost` component.
  const onDrag = useCallback((event: PointerEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    document.addEventListener("pointermove", onDrag);
    return () => {
      document.removeEventListener("pointermove", onDrag);
    };
  }, [onDrag]);

  return { position };
};
