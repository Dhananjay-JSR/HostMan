"use client";
import { AppOperations, StorageContext } from "@/components/Context/Context";
import { useContext } from "react";

export default function MethodDropdown() {
  const { dispatch,state } = useContext(StorageContext);
  return (
    <select
      onChange={(e) => {
        let MethodsValye = e.currentTarget.value;
        dispatch({
          payload: MethodsValye,
          type: AppOperations.UPDATE_METHOD,
        });
      }}
      name="RequestMethods"
      defaultValue={"GET"}
      value={state.method}
      className="bg-gray-800 py-1 px-2 rounded-tl-sm  rounded-bl-sm outline-none"
    >
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PATCH">PATCH</option>
      <option value="DELETE">DELETE</option>
    </select>
  );
}
