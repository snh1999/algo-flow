import { useState } from "react";
import { motion } from "framer-motion";
import type { TBooleanFieldsProps } from "./inputs.types";
import { BookCheck, BookX } from "lucide-react";

export default function BooleanField({
  trueLabel = "True",
  falseLabel = "False",
  disabled = false,
}: TBooleanFieldsProps) {
  const [value, setValue] = useState(false);
  const className = "w-2";

  return (
    <motion.button
      type="button"
      onClick={() => setValue((state) => !state)}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      animate={{
        backgroundColor: value ? "#ec4899" : "#e5e7eb",
        color: value ? "#ffffff" : "#374151",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="flex items-center text-[10px] gap-1 px-1 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <motion.span
        key={value.toString()}
        animate={{ opacity: 1 }}
        initial={false}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="flex items-center gap-0.5"
      >
        {value ? (
          <>
            {trueLabel}
            <BookCheck className={className} />
          </>
        ) : (
          <>
            {falseLabel}
            <BookX className={className} />
          </>
        )}
      </motion.span>
    </motion.button>
  );
}
