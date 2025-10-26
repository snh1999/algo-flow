import {
  Dices,
  Eraser,
  Grip,
  SquareMousePointer,
  SquareSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSettingsStore } from "../../store/settingStore";
import { ESelectionMenu } from "../../common/types";

export default function SelectionMenu() {
  const { menuMode, setMenuMode } = useSettingsStore();
  const iconMenuMap = [
    { key: ESelectionMenu.RANDOM, icon: Dices },
    { key: ESelectionMenu.DRAG, icon: Grip },
    // { key: ESelectionMenu.RECTANGLE, icon: SquareSquare },
    { key: ESelectionMenu.SELECTION, icon: SquareMousePointer },
    { key: ESelectionMenu.ERASER, icon: Eraser },
  ];

  return (
    <div className="submenu_topbar cursor-pointer gap-1 p-1 rounded-md">
      {iconMenuMap.map((menu) => {
        const Icon = menu.icon;
        return (
          <div
            key={menu.key}
            className={`relative p-1.5 transition-all ${
              menuMode === menu.key ? "active_topbar" : ""
            }`}
            onClick={() => setMenuMode(menu.key)}
            title={menu.key}
          >
            <Icon />
            {menuMode === menu.key && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-blue-500/10 rounded-md"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
