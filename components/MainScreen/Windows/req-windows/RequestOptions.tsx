"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BodyType, OptionTypes, Tabs } from "./modules/interface";
import MainRenderer from "./modules/MainRenderer";



export default function RequestOption({
  optionsState,
  setOptionState
}:{
  optionsState: OptionTypes,
  setOptionState: Dispatch<SetStateAction<OptionTypes>>

}) {
  const [currentTab, setCurrentTab] = useState(Tabs.PARAMETERS);
  

  //   useEffect(() => {
  //     console.log(optionsState);
  //   }, [optionsState]);
  return (
    <>
      <div className="mt-3 h-full select-none" draggable={false}> 
        <div className="h-7 flex gap-2 mb-2">
          <button
            className="px-5 hover:text-gray-400 relative "
            onClick={() => {
              setCurrentTab(Tabs.PARAMETERS);
            }}
          >
            Parameters{" "}
            {currentTab == Tabs.PARAMETERS && (
              <div className="absolute h-0.5  left-0 w-full bg-red-500"></div>
            )}
          </button>
          <button
            className="px-5 hover:text-gray-400 relative "
            onClick={() => {
              setCurrentTab(Tabs.BODY);
            }}
          >
            Body
            {currentTab == Tabs.BODY && (
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
          <button
            className="px-5 hover:text-gray-400 relative "
            onClick={() => {
              setCurrentTab(Tabs.AUTHORISATION);
            }}
          >
            Authorisation
            {currentTab == Tabs.AUTHORISATION && (
              <div className="absolute h-0.5  left-0 w-full bg-red-500"></div>
            )}
          </button>
        </div>
        <MainRenderer
          optionState={optionsState}
          setOptionState={setOptionState}
          selectTab={currentTab}
        />
      </div>
    </>
  );
}
