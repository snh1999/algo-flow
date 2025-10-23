import { type ColorMode } from "@xyflow/react";
import { useAppStore } from "../store/store";
import type { ChangeEventHandler } from "react";

export default function ModeSwitcher() {
  const { setColorMode } = useAppStore();

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as ColorMode);
  };

  return (
    <select
      className="xy-theme__select rounded-md p-1"
      onChange={onChange}
      data-testid="colormode-select"
    >
      <option value="dark">dark</option>
      <option value="light">light</option>
      <option value="system">system</option>
    </select>
  );
}
