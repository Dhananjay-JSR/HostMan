"use client";

import { StorageContext } from "@/components/Context/Context";
import { useContext } from "react";

export default function OpenTabs() {
  const { state } = useContext(StorageContext);
  return (
    <div className="w-44 h-full bg-neutral-950 border-t-2  border-red-600 px-3 flex gap-2 items-center">
      <span className="text-xs text-green-500">{state.method}</span>
      <span>Untitled</span>
    </div>
  );
}
