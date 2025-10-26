import {
  BetweenHorizontalStart,
  Cpu,
  TextCursorInput,
  Trash2,
} from "lucide-react";
import { useSettingsStore } from "../../store/settingStore";
import { ESelectionMenu } from "../../common/types";

export default function NodeMenu() {
  const { menuMode } = useSettingsStore();

  return (
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
      <div title="Input Node">
        <TextCursorInput />
      </div>
      <div title="Process Node">
        <Cpu />
      </div>
      <div title="Output Node">
        <BetweenHorizontalStart />
      </div>
      <div title="Delete">
        <Trash2 className="text-red-700 opacity-70" />
      </div>
    </div>
  );
}
