import type { XYPosition } from "@xyflow/react";
import { create } from "zustand";

export type TOnDropAction = (position: XYPosition) => void;

type DnDState = {
  isDragging: boolean;

  dropAction: TOnDropAction | null;
};

export const useDnDStore = create<DnDState>(() => ({
  isDragging: false,
  dropAction: null,
}));

export const setIsDragging = (value: boolean) => {
  useDnDStore.setState({ isDragging: value });
};

export const setDropAction = (dropAction: TOnDropAction | null) => {
  useDnDStore.setState({ dropAction });
};
