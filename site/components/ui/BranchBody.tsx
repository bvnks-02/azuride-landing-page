"use client";

import { useEffect } from "react";
import type { Branch } from "@/lib/tokens";

/**
 * Sets data-branch on <body> so the page-scoped --accent variable cascades
 * to the nav indicator and every accent-tinted element (build spec §3).
 */
export function BranchBody({ branch }: { branch: Branch }) {
  useEffect(() => {
    document.body.dataset.branch = branch;
    return () => {
      delete document.body.dataset.branch;
    };
  }, [branch]);
  return null;
}
