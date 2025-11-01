import {
  BetweenHorizontalStart,
  Cpu,
  TextCursorInput,
  Trash2,
} from "lucide-react";
import { useSettingsStore } from "../../store/settingStore";
import { ESelectionMenu } from "../../common/types";
import { useDnD } from "../../hooks/useDnd";
import { useCallback, useState } from "react";
import { type XYPosition } from "@xyflow/react";
import { DragGhost } from "../overlays/DragGhost";
import { addNode } from "../../store/nodeStore";
import { nanoid } from "nanoid";

export default function NodeMenu() {
  const { menuMode } = useSettingsStore();

  const { onDragStart, isDragging } = useDnD();
  const [type, setType] = useState<string | null>(null);

  const createAddNewNode = useCallback(
    (nodeType: string) => {
      return (position: XYPosition) => {
        addNode({
          id: nanoid(),
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        });
        setType(null);
      };
    },
    [setType],
  );

  return (
    <>
      {isDragging && <DragGhost type={type} />}
      <div
        className="submenu_topbar gap-3 p-2.5"
        style={{
          cursor:
            menuMode === ESelectionMenu.DRAG
              ? "grab"
              : menuMode === ESelectionMenu.RANDOM
                ? "default"
                : menuMode === ESelectionMenu.RECTANGLE
                  ? "crosshair"
                  : "none",
        }}
      >
        <div
          title="Input Node"
          onPointerDown={(event) => {
            setType("input");
            onDragStart(event, createAddNewNode("input"));
          }}
        >
          <TextCursorInput />
        </div>
        <div
          title="Process Node"
          onPointerDown={(event) => {
            setType("default");
            onDragStart(event, createAddNewNode("default"));
          }}
        >
          <Cpu />
        </div>
        <div
          title="Output Node"
          onPointerDown={(event) => {
            setType("output");
            onDragStart(event, createAddNewNode("output"));
          }}
        >
          <BetweenHorizontalStart />
        </div>
        <div title="Delete">
          <Trash2 />
        </div>
      </div>
    </>
  );
}
