import InputCompositeNode from "./InputCompositeNode";
import { InputNode } from "./InputNode";

export const NodeTypes = {
  input: InputNode,
  composite: InputCompositeNode,
};

export type TNodeTypes = keyof typeof NodeTypes | "default" | "output";
