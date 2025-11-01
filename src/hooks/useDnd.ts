import { useReactFlow, type XYPosition } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { useDnDStore } from "../store/dndStore";

export const useDnD = () => {
  const { screenToFlowPosition } = useReactFlow();
  const { isDragging, setIsDragging, dropAction, setDropAction } =
    useDnDStore();

  // `useDnD` hook return this callback, and can be used when a node is dragged into the flow.
  const onDragStart = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
      onDrop: (position: XYPosition) => void,
    ) => {
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
        dropAction?.(flowPosition);
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
