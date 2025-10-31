import { type ColorMode, type BackgroundVariant } from "@xyflow/react";
import { create } from "zustand";
import { ETheme } from "../common/app.constants";
import { ESelectionMenu, type TSelectionMenu } from "../common/types";

interface IState {
  menuMode: TSelectionMenu;
  setMenuMode: (menuMode: TSelectionMenu) => void;
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  bgVariant?: BackgroundVariant;
  setBGVariant: (bgVariant?: BackgroundVariant) => void;
  controlVisiblity: boolean;
  toggleControlVisiblity: () => void;
  minimapVisiblity: boolean;
  toggleMinimapVisiblity: () => void;
}

export const useSettingsStore = create<IState>()((set) => ({
  menuMode: ESelectionMenu.RANDOM,
  setMenuMode: (menuMode) => set(() => ({ menuMode })),
  colorMode: ETheme.SYSTEM,
  setColorMode: (colorMode) => set(() => ({ colorMode })),

  bgVariant: undefined,
  setBGVariant: (bgVariant) => set(() => ({ bgVariant })),

  controlVisiblity: true,
  toggleControlVisiblity: () =>
    set((state) => ({ controlVisiblity: !state.controlVisiblity })),
  minimapVisiblity: false,
  toggleMinimapVisiblity: () =>
    set((state) => ({
      minimapVisiblity: !state.minimapVisiblity,
    })),
}));
