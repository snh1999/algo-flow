import {
  Dices,
  Eraser,
  Grip,
  SquareMousePointer,
  SquareSquare,
} from "lucide-react";
import { useSettingsStore } from "../../store/settingStore";
import { ESelectionMenu } from "../../common/types";

export default function SelectionMenu() {
  const { menuMode, setMenuMode } = useSettingsStore();
  const iconMenuMap = [
    { key: ESelectionMenu.RANDOM, icon: Dices },
    { key: ESelectionMenu.DRAG, icon: Grip },
    { key: ESelectionMenu.RECTANGLE, icon: SquareSquare },
    { key: ESelectionMenu.SELECTION, icon: SquareMousePointer },
    { key: ESelectionMenu.ERASER, icon: Eraser },
  ];
  return (
    <div className="topbar flex gap-3 p-2 rounded-md backdrop-opacity-50 shadow-xs">
      {iconMenuMap.map((menu) => (
        <div
          className={menuMode === menu.key ? "active_topbar" : ""}
          title={menu.key}
          onClick={() => setMenuMode(menu.key)}
        >
          <menu.icon />
        </div>
      ))}
    </div>
  );
}
