import {
  BetweenHorizontalStart,
  Cpu,
  TextCursorInput,
  Trash2,
} from "lucide-react";
import { useSettingsStore } from "../../store/settingStore";
import { ESelectionMenu } from "../../common/types";
import { useDnD } from "../../hooks/useDnd/useDnd";
import { useCallback, useState } from "react";
import { useReactFlow, type XYPosition } from "@xyflow/react";
import type { OnDropAction } from "../../hooks/useDnd/DndContext";
import { DragGhost } from "../overlays/DragGhost";

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function NodeMenu() {
  const { menuMode } = useSettingsStore();

  const { onDragStart, isDragging } = useDnD();
  const [type, setType] = useState<string | null>(null);

  const { setNodes } = useReactFlow();

  const createAddNewNode = useCallback(
    (nodeType: string): OnDropAction => {
      return ({ position }: { position: XYPosition }) => {
        // Here, we create a new node and add it to the flow.
        // You can customize the behavior of what happens when a node is dropped on the flow here.
        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        };

        setNodes((nds) => nds.concat(newNode));
        setType(null);
      };
    },
    [setNodes, setType],
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
