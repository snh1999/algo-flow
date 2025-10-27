import { type XYPosition } from "@xyflow/react";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";

export type OnDropAction = ({ position }: { position: XYPosition }) => void;

interface DnDContextType {
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  // The action to be performed when something is dropped on the flow.
  dropAction: OnDropAction | null;
  setDropAction: Dispatch<SetStateAction<OnDropAction | null>>;
}

const DnDContext = createContext<DnDContextType | null>(null);

// The DnDProvider is used to provide the context for the DnD functionality.
// This allows to wrap `ReactFlow` component instance in the `DnDProvider`(no need to register any callback in `App.tsx`).
// Use the `useDnD` hook in components that need to start dragging a new node into the flow.
export function DnDProvider({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dropAction, setDropAction] = useState<OnDropAction | null>(null);

  return (
    <DnDContext.Provider
      value={{
        isDragging,
        setIsDragging,
        dropAction,
        // This is a workaround to ensure that the drop action is not treated as a lazy function.
        setDropAction: (action) => setDropAction(() => action),
      }}
    >
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;
