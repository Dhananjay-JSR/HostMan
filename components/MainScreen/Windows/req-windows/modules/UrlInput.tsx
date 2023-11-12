"use client";

import { AppOperations, StorageContext } from "@/components/Context/Context";
import { useContext } from "react";

export default function URLInput() {
  const { state, dispatch } = useContext(StorageContext);
  return (
    <input
      type="text"
      value={state.url}
      onChange={(e) => {
        let Value = e.currentTarget.value;
        dispatch({
          type: AppOperations.UPDATE_URL,
          payload: Value,
        });
      }}
      className=" bg-gray-800 placeholder:font-serif  focus:outline-none px-4 w-full"
      placeholder="URL"
    />
  );
}
