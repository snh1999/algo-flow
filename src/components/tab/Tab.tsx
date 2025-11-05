import { motion } from "framer-motion";
import type { ComponentType } from "react";

interface Props<T extends string | undefined> {
  iconMenuMap: { key: T; icon: ComponentType }[];
  value: T;
  setValue: (value: T) => void;
  compact?: boolean;
}

export default function TabComponent<T extends string | undefined>({
  iconMenuMap,
  value,
  setValue,
  compact = false,
}: Props<T>) {
  return (
    <div className="submenu_topbar cursor-pointer gap-1 p-1 rounded-md">
      {iconMenuMap.map((menu) => {
        const Icon = menu.icon;
        return (
          <div
            key={menu.key ?? "undefined"}
            className={`relative transition-all ${
              value === menu.key ? "active_topbar" : ""
            } ${compact ? "p-0.5" : "p-1.5"}`}
            onClick={() => setValue(menu.key)}
            title={menu.key}
          >
            <Icon />
            {value === menu.key && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-blue-500/10 rounded-md"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
