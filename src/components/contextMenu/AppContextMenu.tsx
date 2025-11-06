import { BackgroundVariant } from "@xyflow/react";

import ModeSwitcher from "../ModeSwitcher";
import type { TPosition } from "@/common/types";
import {
  setBGVariant,
  toggleControlVisiblity,
  toggleMinimapVisiblity,
  useSettingsStore,
} from "@/store/settingStore";
import { useShallow } from "zustand/shallow";
import { Ban, Grid2x2, Plus, SquareDot } from "lucide-react";
import TabComponent from "../reusable/tab/Tab";
import Checkbox from "../reusable/checkbox/Checkbox";

export type TProps = {
  position: TPosition;
};
export default function AppContextMenu({ position }: TProps) {
  const { controlVisiblity, minimapVisiblity, bgVariant } = useSettingsStore(
    useShallow((state) => ({
      controlVisiblity: state.controlVisiblity,
      minimapVisiblity: state.minimapVisiblity,
      bgVariant: state.bgVariant,
    })),
  );

  const iconMap = [
    { key: undefined, icon: Ban },
    { key: BackgroundVariant.Cross, icon: Plus },
    { key: BackgroundVariant.Dots, icon: SquareDot },
    { key: BackgroundVariant.Lines, icon: Grid2x2 },
  ];

  return (
    <div
      className="context-menu z-50 rounded-md flex flex-col text-sm opacity-85 "
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        minWidth: "250px",
      }}
    >
      <div className="app_menu_item">
        Show Controls
        <Checkbox
          value={controlVisiblity}
          toggleValue={toggleControlVisiblity}
        />
      </div>
      <div className="app_menu_item">
        Show Minimap
        <Checkbox
          value={minimapVisiblity}
          toggleValue={toggleMinimapVisiblity}
        />
      </div>
      <div className="app_menu_item">
        Theme
        <ModeSwitcher />
      </div>
      <div className="app_menu_item gap-5">
        Background
        <TabComponent
          iconMenuMap={iconMap}
          value={bgVariant}
          setValue={setBGVariant}
          compact
        />
      </div>
    </div>
  );
}
