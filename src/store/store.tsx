import { type ColorMode, type BackgroundVariant } from "@xyflow/react";
import { create } from "zustand";
import { ETheme } from "../common/app.constants";

interface IState {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  bgVariant?: BackgroundVariant;
  setBGVariant: (bgVariant?: BackgroundVariant) => void;
  controlVisiblity: boolean;
  toggleControlVisiblity: () => void;
  minimapVisiblity: boolean;
  toggleMinimapVisiblity: () => void;
}

export const useAppStore = create<IState>()((set) => ({
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
