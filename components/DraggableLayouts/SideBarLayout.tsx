'use client'
import { useEffect, useState }  from "react";
import React from "react";
export default function MainDraggableLayout({
    children
}:{
    children:React.ReactNode
}){
 const [isDown, setIsDown] = useState(false);
const [iniMousePosX, setInitPosX] = useState<number>(0);
const [finalMouseDirection, setFinalMouseDirection] = useState<{
  mouseDistance: number;
  RightDirection: boolean;
}>({
  mouseDistance: 0,
  RightDirection: false,
});
React.Children
useEffect(() => {
  function Test(e: MouseEvent) {
    if (isDown == true) {
      // checks if it's a left click down
      let CurrentDestination = e.clientX;
      // capturing the position of mouse as cliked down
      if (iniMousePosX) {

        if (finalMouseDirection.mouseDistance == 0) {
          // if the windows slider is at RESET mode
          let isLeftPropogation =
            Math.sign(CurrentDestination - iniMousePosX) == -1;
            // check if it's propogating left side
          if (isLeftPropogation) {
            // if it's propogating left side ,  set Distance = Current - Initial
            // if this values Exceeds 100 stop , hence preventing the windows from going more left
            setFinalMouseDirection((prev) => {
              return {
                mouseDistance:
                  Math.abs(CurrentDestination - iniMousePosX) > 100
                    ? 100
                    : Math.abs(CurrentDestination - iniMousePosX),
                RightDirection: !isLeftPropogation,
              };
            });
          }
        } else if (finalMouseDirection.mouseDistance < 100) {
          //  if slider is between any of transition state
          let Intialvalue = finalMouseDirection.mouseDistance;
          // we are required to keep track of last finalMouseDirection Value 
          // as we would be doing something like Initial Position - {i}
          // where i is current dragging difference 
          /*
           This is Actually an example of
           The stale closure captures variables that have outdated values
           but here it's working in favor of program so IT IS WHAT IT IS LOL
          */
          let isLeftPropogation =
            Math.sign(CurrentDestination - iniMousePosX) == -1;

          if (isLeftPropogation) {
            // if being dragged left , check if it reaches 100 and Stop anymore poropogation
            setFinalMouseDirection((prev) => {
              return {
                mouseDistance:
                  Intialvalue + Math.abs(CurrentDestination - iniMousePosX) >
                  100
                    ? 100
                    : Intialvalue +
                      Math.abs(CurrentDestination - iniMousePosX),
                RightDirection: isLeftPropogation,
              };
            });
          } else {
            // similary of being dragged right , check if it reduces more than zero and stops
            setFinalMouseDirection((prev) => {
              return {
                mouseDistance:
                  Intialvalue - Math.abs(CurrentDestination - iniMousePosX) <
                  0
                    ? 0
                    : Intialvalue -
                      Math.abs(CurrentDestination - iniMousePosX),
                RightDirection: !isLeftPropogation,
              };
            });
          }
        } else if (finalMouseDirection.mouseDistance == 100) {
          // if value is 100 there is no point of moving Left , we can only move right
          let Intialvalue = finalMouseDirection.mouseDistance;
     
          let isLeftPropogation =
            Math.sign(CurrentDestination - iniMousePosX) == -1;
          if (!isLeftPropogation) {
            setFinalMouseDirection((prev) => {
              return {
                mouseDistance:
                  Intialvalue - Math.abs(CurrentDestination - iniMousePosX) <
                  0
                    ? 0
                    : Intialvalue -
                      Math.abs(CurrentDestination - iniMousePosX),
                RightDirection: !isLeftPropogation,
              };
            });
          }
        }
      }
    }
  }

  function MouseDown() {
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
  <main className="flex-grow h-full w-full flex">
    <div
      className={``}
      style={{
        width: `calc(25% - ${finalMouseDirection.mouseDistance}px`,
      }}
    >
      <div
        className="h-full w-[1.5px] hover:w-1.5 transition-all hover:transition-all hover:bg-red-600 hover:cursor-grab bg-gray-800 ml-auto select-none"
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
    <div
      className=" relative"
      style={{
        width: `calc(75% + ${finalMouseDirection.mouseDistance}px`,
      }}
    >
{children}

    </div>
  </main>
);
}