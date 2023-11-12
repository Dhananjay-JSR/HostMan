"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

enum Tabs {
  PARAMETERS,
  BODY,
  HEADERS,
  AUTHORISATION,
}

function RequestOptionViews({
  selectTab,
  optionState,
  setOptionState,
}: {
  selectTab: Tabs;
  optionState: {
    Parameter: {
      id: number;
      key: string;
      Value: string;
    }[];
    Body: never[];
    Header: {
      id: number;
      key: string;
      Value: string;
    }[];
    Auth: never[];
  };
  setOptionState: Dispatch<
    SetStateAction<{
      Parameter: {
        id: number;
        key: string;
        Value: string;
      }[];
      Body: never[];
      Header: {
        id: number;
        key: string;
        Value: string;
      }[];
      Auth: never[];
    }>
  >;
}) {
  const [key, setKey] = useState("");
  if (selectTab == Tabs.PARAMETERS) {
    return (
      <div>
        <div className="text-gray-500 font-semibold text-sm">
          Query Parameters
        </div>
        <table className="w-full border-collapse border border-slate-500 ">
          <tbody>
            {optionState.Parameter.map((e, index) => {
              return (
                <tr key={e.id}>
                  <td className="text-center border border-slate-600">
                    {e.id}
                  </td>
                  <td className="border border-slate-600">
                    <input
                      value={e.key}
                      onChange={(eve) => {
                        let VALYE = eve.target.value;
                        // check if it's the last Input and on Press create new Value
                        // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                        if (
                          optionState.Parameter.indexOf(e) ==
                          optionState.Parameter.length - 1
                        ) {
                          // it is Last Element
                          //   @ts-ignore
                          setOptionState((prev) => {
                            // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                            let NewBlock: {
                              id: number;
                              key: string;
                              Value: string;
                            }[] = [];

                            NewBlock.push(
                              {
                                id: prev.Parameter.filter(
                                  (f) => f.id == e.id
                                )[0].id,
                                key: VALYE,
                                Value: "",
                              },
                              {
                                id:
                                  prev.Parameter.filter((f) => f.id == e.id)[0]
                                    .id + 1,
                                key: "",
                                Value: "",
                              }
                            );
                            return {
                              ...prev,
                              Parameter: [
                                ...prev.Parameter.filter((f) => f.id !== e.id),
                                ,
                                ...NewBlock,
                              ],
                            };
                          });
                        } else {
                          setOptionState((prev) => {
                            // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                            let Position = -1;
                            prev.Parameter.forEach((value, index) => {
                              if (
                                value.id ==
                                prev.Parameter.filter((f) => f.id == e.id)[0].id
                              ) {
                                Position = index;
                              }
                            });
                            return {
                              ...prev,
                              Parameter: [
                                ...prev.Parameter.filter(
                                  (f, index) => index < Position
                                ),
                                {
                                  id: prev.Parameter.filter(
                                    (f) => f.id == e.id
                                  )[0].id,
                                  key: VALYE,
                                  Value: "",
                                },
                                ...prev.Parameter.filter(
                                  (f, index) => index > Position
                                ),
                              ],
                            };
                          });
                        }
                      }}
                      placeholder="Key"
                      type="text"
                      spellCheck={false}
                      className="bg-black  focus:outline-none  w-full px-1"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      placeholder="Value"
                      type="text"
                      spellCheck={false}
                      className="bg-black focus:outline-none   w-full px-2"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <button className="px-1 w-full">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye-fill mx-auto  "
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                    </button>
                  </td>
                  <td className="border border-slate-600 ">
                    <button
                      disabled={optionState.Parameter.length == 1}
                      onClick={() => {
                        setOptionState((prev) => {
                          let updatedState = {
                            ...prev,
                            Parameter: prev.Parameter.filter(
                              (ele) => ele.id !== e.id
                            ),
                          };
                          return updatedState;
                        });
                      }}
                      className="px-1 w-full group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColo   r"
                        className="bi bi-trash2-fill mx-auto group-disabled:fill-red-500 fill-white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (selectTab == Tabs.HEADERS) {
    return (
      <div>
        <div className="text-gray-500 font-semibold text-sm">Headers</div>
        <table className="w-full border-collapse border border-slate-500 ">
          <tbody>
            {optionState.Header.map((e, index) => {
              return (
                <tr key={e.id}>
                  <td className="text-center border border-slate-600">
                    {e.id}
                  </td>
                  <td className="border border-slate-600">
                    <input
                      value={e.key}
                      onChange={(eve) => {
                        let VALYE = eve.target.value;
                        // check if it's the last Input and on Press create new Value
                        // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                        if (
                          optionState.Header.indexOf(e) ==
                          optionState.Header.length - 1
                        ) {
                          // it is Last Element
                          //   @ts-ignore
                          setOptionState((prev) => {
                            // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                            let NewBlock: {
                              id: number;
                              key: string;
                              Value: string;
                            }[] = [];

                            NewBlock.push(
                              {
                                id: prev.Header.filter((f) => f.id == e.id)[0]
                                  .id,
                                key: VALYE,
                                Value: "",
                              },
                              {
                                id:
                                  prev.Header.filter((f) => f.id == e.id)[0]
                                    .id + 1,
                                key: "",
                                Value: "",
                              }
                            );
                            return {
                              ...prev,
                              Header: [
                                ...prev.Header.filter((f) => f.id !== e.id),
                                ,
                                ...NewBlock,
                              ],
                            };
                          });
                        } else {
                          setOptionState((prev) => {
                            // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                            let Position = -1;
                            prev.Header.forEach((value, index) => {
                              if (
                                value.id ==
                                prev.Header.filter((f) => f.id == e.id)[0].id
                              ) {
                                Position = index;
                              }
                            });
                            return {
                              ...prev,
                              Header: [
                                ...prev.Header.filter(
                                  (f, index) => index < Position
                                ),
                                {
                                  id: prev.Header.filter((f) => f.id == e.id)[0]
                                    .id,
                                  key: VALYE,
                                  Value: "",
                                },
                                ...prev.Header.filter(
                                  (f, index) => index > Position
                                ),
                              ],
                            };
                          });
                        }
                      }}
                      placeholder="Key"
                      type="text"
                      spellCheck={false}
                      className="bg-black  focus:outline-none  w-full px-1"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      placeholder="Value"
                      type="text"
                      spellCheck={false}
                      className="bg-black focus:outline-none   w-full px-2"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <button className="px-1 w-full">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye-fill mx-auto  "
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                    </button>
                  </td>
                  <td className="border border-slate-600">
                    <button
                      disabled={optionState.Header.length == 1}
                      onClick={() => {
                        setOptionState((prev) => {
                          let updatedState = {
                            ...prev,
                            Header: prev.Header.filter(
                              (ele) => ele.id !== e.id
                            ),
                          };
                          return updatedState;
                        });
                      }}
                      className="px-1 w-full group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash2-fill mx-auto group-disabled:fill-red-500 fill-white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return <></>;
}

export default function RequestOption() {
  const [currentTab, setCurrentTab] = useState(Tabs.PARAMETERS);
  const [optionsState, setOptionState] = useState({
    Parameter: [
      {
        id: 1,
        key: "",
        Value: "",
      },
    ],
    Body: [],
    Header: [
      {
        id: 1,
        key: "",
        Value: "",
      },
    ],
    Auth: [],
  });

  useEffect(() => {
    console.log(optionsState);
  }, [optionsState]);
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
        <RequestOptionViews
          optionState={optionsState}
          setOptionState={setOptionState as any}
          selectTab={currentTab}
        />
      </div>
    </>
  );
}
