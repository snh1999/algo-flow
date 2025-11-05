import { motion } from "framer-motion";
import type { ComponentType } from "react";

interface Props<T extends string> {
  iconMenuMap: { key: T; icon: ComponentType }[];
  value: T;
  setValue: (value: T) => void;
}

export default function TabComponent<T extends string>({
  iconMenuMap,
  value,
  setValue,
}: Props<T>) {
  return (
    <div className="submenu_topbar cursor-pointer gap-1 p-1 rounded-md">
      {iconMenuMap.map((menu) => {
        const Icon = menu.icon;
        return (
          <div
            key={menu.key}
            className={`relative p-1.5 transition-all ${
              value === menu.key ? "active_topbar" : ""
            }`}
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
