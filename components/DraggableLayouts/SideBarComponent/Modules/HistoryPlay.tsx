'use client'

import { AppOperations, StorageContext } from "@/components/Context/Context";
import { useContext } from "react";

export default function HistoryPlay({
    method,
    url
}:{
    method:"DELETE"| "POST" | "GET" | "PATCH" ,
    url:string
}) {
  const {dispatch} = useContext(StorageContext)
  return (
    <div className="text-xs flex justify-between px-3 gap-2">
      <span className={` ${method=="GET" ? "text-green-500" : method=="DELETE" ? "text-red-600" : method=="PATCH" ?"text-yellow-400" : "text-teal-600"}`}>{method}</span>
      <span className="truncate">{url}</span>
      <button className="group" onClick={()=>{
        dispatch({
          type:AppOperations.UPDATE_URL,
          payload: url
        })
        dispatch({
          type:AppOperations.UPDATE_METHOD,
          payload:method
        })
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi group-hover:fill-green-400 bi-play-fill"
          viewBox="0 0 16 16"
        >
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
      </button>
    </div>
  );
}
