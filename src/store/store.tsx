import { type ColorMode } from "@xyflow/react";
import { create } from "zustand";

interface IState {
  colorMode: ColorMode;
  setColorMode: (updatedMode: ColorMode) => void;
  controlVisiblity: boolean;
  toggleControlVisiblity: () => void;
  minimapVisiblity: boolean;
  toggleMinimapVisiblity: () => void;
}

export const useAppStore = create<IState>()((set) => ({
  colorMode: "system",
  setColorMode: (updatedMode) =>
    set(() => ({
      colorMode: updatedMode,
    })),

  controlVisiblity: true,
  toggleControlVisiblity: () =>
    set((state) => ({ controlVisiblity: !state.controlVisiblity })),
  minimapVisiblity: false,
  toggleMinimapVisiblity: () =>
    set((state) => ({
      minimapVisiblity: !state.minimapVisiblity,
    })),
}));
