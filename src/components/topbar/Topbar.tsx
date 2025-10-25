import { Panel } from "@xyflow/react";
import NodeMenu from "./NodeMenu";
import SelectionMenu from "./SelectionMenu";

export function Topbar() {
  return (
    <Panel position="top-center">
      <div className="topbar flex gap-1 rounded-md backdrop-opacity-50 shadow-xs">
        <NodeMenu />
        <div className="border-l-1 p-0 border-neutral-500" />
        <SelectionMenu />
      </div>
    </Panel>
  );
}
