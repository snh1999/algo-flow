import type { XYPosition } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";

export const useDraggingCursorPosition = () => {
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
