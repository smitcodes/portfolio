import React from "react";

/**
 * Shared modal accessibility behaviour:
 *   • Escape closes
 *   • page scroll is locked while open
 *   • Tab / Shift+Tab are trapped inside the panel
 *   • focus moves into the panel on open, and returns to the trigger on close
 *
 * Assumes the component mounting this hook is only rendered while the dialog
 * is open (true for both modals in this project).
 *
 * @param {Function} onClose            invoked when Escape is pressed
 * @param {Function} [getReturnTarget]  optional fallback returning the element
 *                                      to focus on close, used when the node
 *                                      that opened the dialog has gone away
 * @returns {{ panelRef: object, initialFocusRef: object }}
 */
export function useDialogA11y(onClose, getReturnTarget) {
  const panelRef = React.useRef(null);
  const initialFocusRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);

  // Always call the latest onClose without re-running the setup effect.
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  const getReturnTargetRef = React.useRef(getReturnTarget);
  getReturnTargetRef.current = getReturnTarget;

  React.useEffect(() => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    /** Visible, focusable elements inside the dialog, in DOM order. */
    const focusableInPanel = () => {
      const panel = panelRef.current;
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.getClientRects().length > 0);
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = focusableInPanel();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const inside = panelRef.current?.contains(active);

      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    if (initialFocusRef.current) initialFocusRef.current.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";

      let target = returnFocusRef.current;
      if (!target || target === document.body || !document.contains(target)) {
        const fallback = getReturnTargetRef.current;
        target = fallback ? fallback() : null;
      }
      if (
        target &&
        typeof target.focus === "function" &&
        document.contains(target)
      ) {
        target.focus({ preventScroll: true });
      }
    };
  }, []);

  return { panelRef, initialFocusRef };
}
