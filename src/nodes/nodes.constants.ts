import InputCompositeNode from "./InputCompositeNode";
import { InputNode } from "./InputNode";

export const NodeTypes = {
  input: InputNode,
  composite: InputCompositeNode,
};

export const NODE_SELECT_STYLE =
  "xy-theme__select nodrag rounded-md text-center p-0.5";

export type TNodeTypes = keyof typeof NodeTypes | "default" | "output";
