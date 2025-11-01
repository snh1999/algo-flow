import type { XYPosition } from "@xyflow/react";
import { create } from "zustand";

export type TOnDropAction = (position: XYPosition) => void;

type DnDState = {
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;

  dropAction: TOnDropAction | null;
  setDropAction: (dropAction: TOnDropAction | null) => void;
};

export const useDnDStore = create<DnDState>((set) => ({
  isDragging: false,
  setIsDragging: (value) => set({ isDragging: value }),

  dropAction: null,
  setDropAction: (dropAction) => set({ dropAction }),
}));
