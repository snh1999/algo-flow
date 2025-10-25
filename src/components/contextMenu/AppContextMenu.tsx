import { BackgroundVariant } from "@xyflow/react";
import type { TPosition } from "../../common/types";
import { useSettingsStore } from "../../store/settingStore";
import ModeSwitcher from "../ModeSwitcher";
import type { ChangeEventHandler } from "react";

export type TProps = {
  position: TPosition;
};
export default function AppContextMenu({ position }: TProps) {
  const {
    controlVisiblity,
    toggleControlVisiblity,
    minimapVisiblity,
    toggleMinimapVisiblity,
    setBGVariant,
  } = useSettingsStore();

  const onBGChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setBGVariant(event.target.value as BackgroundVariant | undefined);
  };

  return (
    <div
      className="context-menu z-50 rounded-md flex flex-col text-sm opacity-75 "
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        minWidth: "250px",
      }}
    >
      <div className="app_menu_item">
        Show Controls
        <input
          className="size-3"
          type="checkbox"
          checked={controlVisiblity}
          onClick={toggleControlVisiblity}
        />
      </div>
      <div className="app_menu_item">
        Show Minimap
        <input
          className="size-3"
          type="checkbox"
          checked={minimapVisiblity}
          onClick={toggleMinimapVisiblity}
        />
      </div>
      <div className="app_menu_item">
        Theme
        <ModeSwitcher />
      </div>
      <div className="app_menu_item">
        Background
        <select
          className="xy-theme__select rounded-md p-1 text-center"
          onChange={onBGChange}
          data-testid="colormode-select"
        >
          <option value={undefined}>Blank</option>
          <option value={BackgroundVariant.Cross}>Cross</option>
          <option value={BackgroundVariant.Dots}>Dots</option>
          <option value={BackgroundVariant.Lines}>Lines</option>
        </select>
      </div>
    </div>
  );
}
