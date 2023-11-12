'use client'
import { useState } from "react";

enum Tabs {
    RAW_DATA,
    HEADERS,
    PREVIEW
}
export default function ResponseView() {
    const [currentTab,setCurrentTab] = useState(Tabs.RAW_DATA)
  return (
    <>
      <div className="text-xs flex gap-6 ">
        <div className="gap-2 flex">
          <span className="text-gray-400 font-semibold">STATUS</span>
          <span className="text-green-300">200 &#183; OK</span>
        </div>
        <div className="gap-2 flex">
          <span className="text-gray-400 font-semibold">Time</span>
          <span className="text-green-300">1098 ms</span>
        </div>
        <div className="gap-2 flex">
          <span className="text-gray-400 font-semibold">Size</span>
          <span className="text-green-300">921B</span>
        </div>
      </div>



      {/* TODO: Reuse Here */}


      <div className="h-7 mt-1.5 flex gap-2 mb-2">
          <button
            className="px-5 hover:text-gray-400 relative "
            onClick={() => {
              setCurrentTab(Tabs.RAW_DATA);
            }}
          >
            RAW{" "}
            {currentTab == Tabs.RAW_DATA && (
              <div className="absolute h-0.5  left-0 w-full bg-red-500"></div>
            )}
          </button>
          <button
            className="px-5 hover:text-gray-400 relative "
            onClick={() => {
              setCurrentTab(Tabs.PREVIEW);
            }}
          >
            Body
            {currentTab == Tabs.PREVIEW && (
              <div className="absolute h-0.5  left-0 w-full bg-red-500"></div>
            )}
          </button>
          <button
            className="px-5 hover:text-gray-400 relative "
            onClick={() => {
              setCurrentTab(Tabs.HEADERS);
            }}
          >
            Headers
            {currentTab == Tabs.HEADERS && (
              <div className="absolute h-0.5  left-0 w-full bg-red-500"></div>
            )}
          </button>
          
        </div>

    </>
  );
}
