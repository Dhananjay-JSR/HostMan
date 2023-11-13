"use client";

import { AppOperations, StorageContext } from "@/components/Context/Context";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export default function OpenTabs() {
  // const [value, setValue] = useState("Untitled");
  // const {state} = useContext(StorageContext)
  const [showTextInput, setShowTextInput] = useState(false);

  const InputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { state ,dispatch} = useContext(StorageContext);


  useEffect(()=>{
    function MouseClick(e:MouseEvent){
        if (e.target instanceof HTMLElement && InputRef.current && !InputRef.current.contains(e.target)) {
            setShowTextInput(false)
          }
    }
    document.addEventListener("mousedown",MouseClick)

    return ()=>{
        document.removeEventListener("mousedown",MouseClick) 
    }
  },[])
  useEffect(() => {
    if (showTextInput) {
      InputRef.current.focus();
      InputRef.current.select();
    }
  }, [showTextInput]);
  return (
    <div className="w-44 h-full bg-neutral-950 border-t-2  border-red-600 px-3 flex gap-2 items-center">
      <span className={`text-xs ${state.method=="GET" ? "text-green-500" : state.method=="DELETE" ? "text-red-600" : state.method=="PATCH" ?"text-yellow-400" : "text-teal-600"}  font-semibold`}>{state.method}</span>
      {showTextInput ? (
        <input
          onChange={(eve) => {
            let NewValue = eve.currentTarget.value;
            // setValue((prev) => NewValue);
            dispatch({
              type:AppOperations.UPDATE_WINDOW_NAME,
              payload:NewValue
            })
          }}
          onKeyUp={(event) => {
            // console.log(event.key)
            if (event.key == "Enter" || event.key == "Escape") {
              setShowTextInput((prev) => false);
            }
          }}
          ref={InputRef}
          type="text"
          className="w-full bg-neutral-950 outline-none"
          value={state.windowName}
        />
      ) : (
        <button
          className="w-full pr-2 text-left truncate"
          onClick={(e) => {
            if (e.detail >= 2) {
              setShowTextInput((prev) => true);
            }
            // console.log(e.detail)
          }}
        >
          {state.windowName}
        </button>
      )}
    </div>
  );
}
