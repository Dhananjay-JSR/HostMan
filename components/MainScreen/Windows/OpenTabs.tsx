"use client";

import { StorageContext } from "@/components/Context/Context";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export default function OpenTabs() {
  const [value, setValue] = useState("Untitled");
  const [showTextInput, setShowTextInput] = useState(false);
  const InputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { state } = useContext(StorageContext);


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
    }
  }, [showTextInput]);
  return (
    <div className="w-44 h-full bg-neutral-950 border-t-2  border-red-600 px-3 flex gap-2 items-center">
      <span className="text-xs text-green-500">{state.method}</span>
      {showTextInput ? (
        <input
          onChange={(eve) => {
            let NewValue = eve.currentTarget.value;
            setValue((prev) => NewValue);
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
          value={value}
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
          {value}
        </button>
      )}
    </div>
  );
}
