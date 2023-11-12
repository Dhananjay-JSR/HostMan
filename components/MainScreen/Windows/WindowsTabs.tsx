"use client";

import { useState } from "react";

function OpenTabs() {
  return (
    <div className="w-44 h-full bg-neutral-950 border-t-2  border-red-600 px-3 flex gap-2 items-center">
      <span className="text-xs text-green-500">GET</span>
      <span>Untitled</span>
    </div>
  );
}

function AddButtion() {
  return (
    <button className="ml-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus-circle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
      </svg>
    </button>
  );
}

export default function WindowsTabs() {
  const [ContainerValue, setContainerValue] = useState(1);
  return (
    <div className="w-11/12 flex overflow-x-hidden">
      <OpenTabs/>
      {/* TODO: Implementation Needed */}
      {/* {Array.from(
        {
          length: 10,
        },
        (value) => (
         <OpenTabs key={value as unknown as number}/>
        )
      )} */}
       {/* <AddButtion  /> */}
    </div>
  );
}
