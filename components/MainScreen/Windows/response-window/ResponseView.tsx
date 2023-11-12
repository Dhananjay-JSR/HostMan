"use client";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

enum Tabs {
  RAW_DATA,
  HEADERS,
  PREVIEW,
}
export default function ResponseView() {
  const [currentTab, setCurrentTab] = useState(Tabs.RAW_DATA);
  const [responseData, setResponseData] = useState<null | AxiosResponse<
    any,
    any
  >>(null);
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {/* <button
        onClick={async () => {
          setLoading(true);
          let Data = await axios.post("http://localhost:3000/api", {
            url: "https://echo.hoppscotch.io",
            method: "GET",
          });
          console.log(Data);
          setResponseData((prev) => Data);
          setLoading(false);
        }}
      >
        Run Reqq
      </button> */}
      <>
        {isLoading ? (
          <div className="h-full w-full flex justify-center items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="mx-auto animate-spin bi bi-gear-wide-connected"
                viewBox="0 0 16 16"
              >
                <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
              </svg>
              <div>Loading....</div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-xs flex gap-6 ">
              <div className="gap-2 flex">
                <span className="text-gray-400 font-semibold">STATUS</span>
                <span className="text-green-300">
                  {responseData?.status} &#183; {responseData?.statusText}
                </span>
              </div>
              <div className="gap-2 flex">
                <span className="text-gray-400 font-semibold">Time</span>
                <span className="text-green-300">
                  {responseData?.data.responseDuration} ms
                </span>
              </div>
              <div className="gap-2 flex">
                <span className="text-gray-400 font-semibold">Size</span>
                <span className="text-green-300">
                  {" "}
                  {responseData?.data.responseSize} KB
                </span>
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
              {responseData == null ||
                responseData.data.responseHeaders["content-type"] ==
                  "text/html; charset=utf-8"}
              <button
                className="px-5 hover:text-gray-400 relative "
                onClick={() => {
                  setCurrentTab(Tabs.PREVIEW);
                }}
              >
                Preview
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
            {currentTab == Tabs.RAW_DATA && (
              <div
                className=" border-t border-gray-800 pt-1  h-full w-full overflow-y-visible break-words text-xs"
                style={
                  {
                    // height: "calc(100% - 108px)",
                  }
                }
              >
                {responseData?.data.responsePayload}
              </div>
            )}

            {currentTab == Tabs.PREVIEW && (
              <div
                className=" border-t border-gray-800 pt-1  h-full w-full overflow-y-visible break-words text-xs"
                style={
                  {
                    // height: "calc(100% - 108px)",
                  }
                }
              >
                <iframe
                  sandbox=""
                //   frameborder={0}
                  className="w-full bg-white"
                  srcDoc={responseData?.data.responsePayload}
                ></iframe>
              </div>
            )}

            {currentTab == Tabs.HEADERS && (
              <div
                className=" border-t border-gray-800 pt-1  h-full w-full overflow-y-visible break-words text-xs"
                style={
                  {
                    // height: "calc(100% - 108px)",
                  }
                }
              >
                <table className="w-full border border-gray-600 ">
                  <tbody>
                    {Object.keys(responseData?.data.responseHeaders).map(
                      (keys) => {
                        return (
                          <tr key={keys} className="">
                            <td className="border w-1/2 border-gray-600 px-2 truncate">
                              {keys}
                            </td>
                            <td className="border w-1/2 border-gray-600 px-2 break-all">
                              {responseData?.data.responseHeaders[keys]}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
                {/* {responseData?.data.responsePayload} */}
              </div>
            )}
          </>
        )}
      </>
    </>
  );
}
