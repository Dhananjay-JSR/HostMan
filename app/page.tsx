"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T {
  let lastCallTime = 0;

  return function (this: any, ...args: any[]) {
    const now = Date.now();

    if (now - lastCallTime >= delay) {
      func.apply(this, args);
      lastCallTime = now;
    }
  } as T;
}

export default function Home() {
  const [isDown, setIsDown] = useState(false);
  const [iniMousePosX, setInitPosX] = useState<number>();
  const [finalMouseDirection, setFinalMouseDirection] = useState<{
    mouseDistance: number;
    RightDirection: boolean;
  }>({
    mouseDistance: 0,
    RightDirection: false,
  });
  useEffect(() => {
    function Test(e: MouseEvent) {
      if (isDown == true) {
        // throttle(()=>{
        let CurrentDestination = e.clientX;
        if (iniMousePosX) {
          let Diff =
            Math.abs(CurrentDestination - iniMousePosX) >= 100
              ? 100
              : Math.abs(CurrentDestination - iniMousePosX);
          let RightDir =
            Math.sign(CurrentDestination - iniMousePosX) == -1 ? false : true;
          console.log({ mouseDistance: Diff, RightDirection: RightDir });
          setFinalMouseDirection((prev) => {
            return { mouseDistance: Diff, RightDirection: RightDir };
          });

          //  console.log( CurrentDestination - iniMousePosX)
        }
        // },400)
      }
    }

    function MouseDown() {
      // console.log("Up");
      // Stop Counting
      setIsDown((prev) => false);
    }
    // as dragging can be on doc we setup effect here TODO: maybe a bettr way to optimise to throttle fn
    document.addEventListener("mousemove", Test);

    document.addEventListener("mouseup", MouseDown);

    return () => {
      document.removeEventListener("mousemove", Test);
      document.removeEventListener("mouseup", MouseDown);
    };
  }, [isDown]);
  return (
    <main className="flex-grow h-full bg-gray-900 w-full flex">
      <div
        className={`bg-red-500`}
        style={{
          width: `calc(50% ${finalMouseDirection.RightDirection ? "+" : "-"} ${
            finalMouseDirection.mouseDistance
          }px`,
        }}
      >
        <div
          className="h-full w-1 hover:cursor-grab bg-black ml-auto select-none"
          onMouseDown={(e) => {
            // console.log(e.clientX);
            let clientX = e.clientX;
            // Start Capturing Inital Postion
            setInitPosX((prev) => clientX);
            // Start Capturing When Button is Down
            setIsDown((prev) => true);
          }}
        ></div>
      </div>
      <div className="w-1/2 bg-green-500"></div>
    </main>
  );
}
