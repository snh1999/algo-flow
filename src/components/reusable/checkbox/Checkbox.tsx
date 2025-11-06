import { Check, Square } from "lucide-react";

interface Props {
  value: boolean;
  toggleValue: () => void;
}

export default function Checkbox({ value, toggleValue }: Props) {
  return (
    <div className="scale-70">
      {value ? (
        <Check strokeWidth={4} className="checkbox" onClick={toggleValue} />
      ) : (
        <Square
          fill="palevioletred"
          color="palevioletred"
          className="checkbox"
          onClick={toggleValue}
        />
      )}
    </div>
  );
}
