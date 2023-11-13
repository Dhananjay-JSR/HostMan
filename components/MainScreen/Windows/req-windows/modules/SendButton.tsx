"use client";

import { AppOperations, StorageContext } from "@/components/Context/Context";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { OptionTypes } from "./interface";

export default function SendButton({optionsState}: { optionsState: OptionTypes }) {
  const { state, dispatch } = useContext(StorageContext);
  const { data } = useSession();
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

        let Data;
        if (data?.user?.email) {
          Data = await axios.post("/api", {
            windowName:state.windowName,
            url: state.url,
            method: state.method,
            email: data?.user?.email,
            ...optionsState
          });
        } else {
          Data = await axios.post("/api", {
            windowName:state.windowName,
            url: state.url,
            method: state.method,
            ...optionsState
          });
        }

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
