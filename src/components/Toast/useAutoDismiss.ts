import { useEffect } from "react";

export function useAutoDismiss(
  duration: number | undefined,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!duration) return;

    const id = window.setTimeout(onDismiss, duration);

    return () => {
      window.clearTimeout(id);
    };
  }, [duration, onDismiss]);
}
