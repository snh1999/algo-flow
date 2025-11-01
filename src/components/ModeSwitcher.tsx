import { type ColorMode } from "@xyflow/react";
import type { ChangeEventHandler } from "react";
import { ETheme } from "../common/app.constants";
import { setColorMode } from "../store/settingStore";

export default function ModeSwitcher() {
  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as ColorMode);
  };

  return (
    <select
      className="xy-theme__select rounded-md p-1 text-center"
      onChange={onChange}
      data-testid="colormode-select"
    >
      <option value={ETheme.DARK_MODE}>Dark</option>
      <option value={ETheme.LIGHT_MODE}>Light</option>
      <option value={ETheme.SYSTEM}>System</option>
    </select>
  );
}
