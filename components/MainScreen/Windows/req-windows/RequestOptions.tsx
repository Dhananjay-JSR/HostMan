"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BodyType, OptionTypes, Tabs } from "./modules/interface";
import MainRenderer from "./modules/MainRenderer";



export default function RequestOption() {
  const [currentTab, setCurrentTab] = useState(Tabs.PARAMETERS);
  const [optionsState, setOptionState] = useState<OptionTypes>({
    Parameter: [
      {
        id: 1,
        key: "",
        Value: "",
      },
    ],
    Body: {
      type: BodyType.NONE,
      payload: "",
      forms: [
        {
          id: 1,
          key: "",
          value: "",
        },
      ],
    },
    Header: [
      {
        id: 1,
        key: "",
        Value: "",
      },
    ],
    Auth: {
      type: "NONE",
      username: "",
      password: "",
      token: "",
    },
  });

  //   useEffect(() => {
  //     console.log(optionsState);
  //   }, [optionsState]);
  return (
    <>
      <div className="mt-3">
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
