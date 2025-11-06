import { Dices, Eraser, Grip, SquareMousePointer } from "lucide-react";
import { setMenuMode, useSettingsStore } from "@/store/settingStore";
import { ESelectionMenu } from "@/common/types";
import TabComponent from "../reusable/tab/Tab";

export default function SelectionMenu() {
  const { menuMode } = useSettingsStore();
  const iconMenuMap = [
    { key: ESelectionMenu.RANDOM, icon: Dices },
    { key: ESelectionMenu.DRAG, icon: Grip },
    // { key: ESelectionMenu.RECTANGLE, icon: SquareSquare },
    { key: ESelectionMenu.SELECTION, icon: SquareMousePointer },
    { key: ESelectionMenu.ERASER, icon: Eraser },
  ];

  return (
    <TabComponent
      iconMenuMap={iconMenuMap}
      value={menuMode}
      setValue={setMenuMode}
    />
  );
}
