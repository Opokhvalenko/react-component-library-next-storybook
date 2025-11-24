import { useCallback, useState } from "react";

export function useSidebarOpenItems(initialOpenIds: string[] = []) {
  const [openItemIds, setOpenItemIds] = useState<string[]>(initialOpenIds);

  const toggleItem = useCallback((id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id],
    );
  }, []);

  const reset = useCallback(() => {
    setOpenItemIds([]);
  }, []);

  return { openItemIds, toggleItem, reset };
}