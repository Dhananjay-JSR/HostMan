"use client";

import { AppOperations, StorageContext } from "@/components/Context/Context";
import axios from "axios";
import { useContext } from "react";

export default function SendButton() {
  const { state, dispatch } = useContext(StorageContext);
  return (
    <button
      disabled={state.url == ""}
      onClick={async () => {
        if (state.isInitialRequestDown == false) {
          dispatch({
            type: AppOperations.TOGGLE_INITIAL,
            payload: "",
          });
        }

        dispatch({
          type: AppOperations.TOGGLE_LOADING,
          payload: true,
        });
        let Data = await axios.post("http://localhost:3000/api", {
          url: state.url,
          method: state.method,
        });
        dispatch({
          type: AppOperations.UPDATE_RESPONSE,
          payload: Data,
        });
        dispatch({
          type: AppOperations.TOGGLE_LOADING,
          payload: false,
        });
      }}
      className="px-4 mr-2 bg-red-600 disabled:bg-red-950 transition-all disabled:transition-all rounded-sm ml-2"
    >
      Send
    </button>
  );
}
