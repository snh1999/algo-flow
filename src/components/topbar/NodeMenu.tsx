import {
  BetweenHorizontalStart,
  Cpu,
  TextCursorInput,
  Trash2,
} from "lucide-react";

export default function NodeMenu() {
  return (
    <div className="flex gap-3 p-2 rounded-md backdrop-opacity-50 shadow-xs">
      <div title="Input Node">
        <TextCursorInput />
      </div>
      <div title="Process Node">
        <Cpu />
      </div>
      <div title="Output Node">
        <BetweenHorizontalStart />
      </div>
      <div title="Delete">
        <Trash2 className="text-red-700 opacity-70" />
      </div>
    </div>
  );
}
