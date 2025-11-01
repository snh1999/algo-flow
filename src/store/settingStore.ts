import { type ColorMode, type BackgroundVariant } from "@xyflow/react";
import { create } from "zustand";
import { ETheme } from "../common/app.constants";
import { ESelectionMenu, type TSelectionMenu } from "../common/types";

interface IState {
  menuMode: TSelectionMenu;
  colorMode: ColorMode;
  bgVariant?: BackgroundVariant;
  controlVisiblity: boolean;
  minimapVisiblity: boolean;
}

export const useSettingsStore = create<IState>()(() => ({
  menuMode: ESelectionMenu.RANDOM,
  colorMode: ETheme.SYSTEM,
  bgVariant: undefined,
  controlVisiblity: true,
  minimapVisiblity: false,
}));

export const setMenuMode = (menuMode: TSelectionMenu) => {
  useSettingsStore.setState({ menuMode });
};

export const setColorMode = (colorMode: ColorMode) => {
  useSettingsStore.setState({ colorMode });
};

export const setBGVariant = (bgVariant?: BackgroundVariant) => {
  useSettingsStore.setState(() => ({ bgVariant }));
};

export const toggleControlVisiblity = () =>
  useSettingsStore.setState((state) => ({
    controlVisiblity: !state.controlVisiblity,
  }));

export const toggleMinimapVisiblity = () =>
  useSettingsStore.setState((state) => ({
    minimapVisiblity: !state.minimapVisiblity,
  }));
