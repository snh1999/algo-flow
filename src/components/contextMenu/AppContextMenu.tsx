import type { TPosition } from "../../common/types";
import { useAppStore } from "../../store/store";
import ModeSwitcher from "../ModeSwitcher";

export type TProps = {
  position: TPosition;
};
export default function AppContextMenu({ position }: TProps) {
  const {
    controlVisiblity,
    toggleControlVisiblity,
    minimapVisiblity,
    toggleMinimapVisiblity,
  } = useAppStore();

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
    </div>
  );
}
