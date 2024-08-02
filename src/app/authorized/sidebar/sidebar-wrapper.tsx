// src/app/authorized/sidebar-wrapper.tsx

"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";

export function SidebarWrapper() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="relative h-full hidden sm:block"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Sidebar isExpanded={isExpanded} />
    </div>
  );
}