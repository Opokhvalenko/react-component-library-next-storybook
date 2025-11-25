import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";
import { SidebarMenuList } from "./SidebarMenuList";
import type { SidebarMenuProps } from "./SidebarMenu.types";
import { useSidebarOpenItems } from "./useSidebarOpenItems";
import "./SidebarMenu.css";

export default function SidebarMenu({
  isOpen,
  onClose,
  items,
  title = "Menu",
}: SidebarMenuProps): ReactElement | null {
  const { openItemIds, toggleItem, reset } = useSidebarOpenItems();

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="sidebar-overlay"
          aria-modal="true"
          role="dialog"
          aria-label={title}
        >
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close sidebar"
            onClick={handleClose}
          />

          <motion.aside
            className="sidebar-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="sidebar-header">
              <h2 className="sidebar-title">{title}</h2>

              <button
                type="button"
                className="sidebar-close"
                aria-label="Close sidebar"
                onClick={handleClose}
              >
                ×
              </button>
            </div>

            <nav className="sidebar-nav" aria-label={title}>
              <SidebarMenuList
                items={items}
                openItemIds={openItemIds}
                onToggle={toggleItem}
              />
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
