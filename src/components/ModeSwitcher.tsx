import { ETheme } from "../common/app.constants";
import { setColorMode, useSettingsStore } from "../store/settingStore";
import { Monitor, Moon, Sun } from "lucide-react";
import TabComponent from "./reusable/tab/Tab";

export default function ModeSwitcher() {
  const colorMode = useSettingsStore((state) => state.colorMode);

  const iconMenuMap = [
    { key: ETheme.DARK_MODE, icon: Moon },
    { key: ETheme.LIGHT_MODE, icon: Sun },
    { key: ETheme.SYSTEM, icon: Monitor },
  ];

  return (
    <TabComponent
      iconMenuMap={iconMenuMap}
      value={colorMode}
      setValue={setColorMode}
      compact
    />
  );
}
