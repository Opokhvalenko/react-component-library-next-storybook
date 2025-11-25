import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { useAutoDismiss } from "./useAutoDismiss";
import "./Toast.css";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
  showCloseButton = true,
}: ToastProps): ReactElement {
  useAutoDismiss(duration, () => {
    onClose?.();
  });

  return (
    <div className="toast-container">
      <motion.div
        className={`toast toast--${type}`}
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, translateY: 16, scale: 0.95 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="toast__message">{message}</span>

        {showCloseButton && (
          <button
            type="button"
            className="toast__close"
            aria-label="Close notification"
            onClick={() => onClose?.()}
          >
            ×
          </button>
        )}
      </motion.div>
    </div>
  );
}
