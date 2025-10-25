export type TPosition = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type EnumType<T> = T[keyof T];

export const ESelectionMenu = {
  RANDOM: "random",
  DRAG: "drag",
  RECTANGLE: "rectangle",
  SELECTION: "selection",
  ERASER: "eraser",
} as const;

export type TSelectionMenu = EnumType<typeof ESelectionMenu>;
