import { useCallback } from "react";

export function useDragScroll(containerRef) {
  const onMouseDown = useCallback(
    (e) => {
      const container = containerRef.current;
      if (!container) return;

      container.style.cursor = "grabbing";
      container.style.userSelect = "none";

      const startY = e.pageY - container.getBoundingClientRect().top;
      const scrollTop = container.scrollTop;

      const onMouseMove = (e) => {
        const y = e.pageY - container.getBoundingClientRect().top;
        const walk = y - startY;
        container.scrollTop = scrollTop - walk;
      };

      const onMouseUp = () => {
        container.style.cursor = "grab";
        container.style.removeProperty("user-select");
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [containerRef]
  );

  return { onMouseDown };
}
