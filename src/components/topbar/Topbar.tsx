import { Panel } from "@xyflow/react";
import NodeMenu from "./NodeMenu";
import SelectionMenu from "./SelectionMenu";

export function Topbar() {
  return (
    <Panel position="top-center">
      <div className="topbar flex rounded-md backdrop-opacity-50 shadow-xs">
        <NodeMenu />
        <div className="border-l-1 p-0 border-neutral-500" />
        <SelectionMenu />
      </div>
    </Panel>
  );
}
