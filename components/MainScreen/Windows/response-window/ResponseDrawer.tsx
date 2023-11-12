'use client'

import React from "react";
import { useEffect, useState } from "react"

export default function ResponseModal({children}:{
    children:React.ReactNode
}){
    const [isDown, setIsDown] = useState(false);
    const [iniMousePosY, setInitPosY] = useState<number>(0);
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
          let CurrentDestination = e.clientY;
          // capturing the position of mouse as cliked down
          if (iniMousePosY) {
    
            if (finalMouseDirection.mouseDistance == 0) {
              // if the windows slider is at RESET mode
              let isLeftPropogation =
                Math.sign(CurrentDestination - iniMousePosY) == -1;
                // check if it's propogating left side
              if (isLeftPropogation) {
                // if it's propogating left side ,  set Distance = Current - Initial
                // if this values Exceeds 100 stop , hence preventing the windows from going more left
                setFinalMouseDirection((prev) => {
                  return {
                    mouseDistance:
                      Math.abs(CurrentDestination - iniMousePosY) > 100
                        ? 100
                        : Math.abs(CurrentDestination - iniMousePosY),
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
                Math.sign(CurrentDestination - iniMousePosY) == -1;
    
              if (isLeftPropogation) {
                // if being dragged left , check if it reaches 100 and Stop anymore poropogation
                setFinalMouseDirection((prev) => {
                  return {
                    mouseDistance:
                      Intialvalue + Math.abs(CurrentDestination - iniMousePosY) >
                      100
                        ? 100
                        : Intialvalue +
                          Math.abs(CurrentDestination - iniMousePosY),
                    RightDirection: isLeftPropogation,
                  };
                });
              } else {
                // similary of being dragged right , check if it reduces more than zero and stops
                setFinalMouseDirection((prev) => {
                  return {
                    mouseDistance:
                      Intialvalue - Math.abs(CurrentDestination - iniMousePosY) <
                      0
                        ? 0
                        : Intialvalue -
                          Math.abs(CurrentDestination - iniMousePosY),
                    RightDirection: !isLeftPropogation,
                  };
                });
              }
            } else if (finalMouseDirection.mouseDistance == 100) {
              // if value is 100 there is no point of moving Left , we can only move right
              let Intialvalue = finalMouseDirection.mouseDistance;
         
              let isLeftPropogation =
                Math.sign(CurrentDestination - iniMousePosY) == -1;
              if (!isLeftPropogation) {
                setFinalMouseDirection((prev) => {
                  return {
                    mouseDistance:
                      Intialvalue - Math.abs(CurrentDestination - iniMousePosY) <
                      0
                        ? 0
                        : Intialvalue -
                          Math.abs(CurrentDestination - iniMousePosY),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isDown]);
   return <div style={{
    height: `calc(150px + ${finalMouseDirection.mouseDistance}px ) `
   }} className="absolute bottom-0 w-full bg-neutral-950 ">
    <div className="h-[1.5px] w-full hover:h-1.5 bg-gray-800 cursor-crosshair transition-all hover:transition-all hover:bg-red-600 hover:cursor-grab" onMouseDown={(e)=>{
          // console.log(e.clientX);
          let clientY = e.clientY;
          // Start Capturing Inital Postion
          setInitPosY((prev) => clientY);
          // Start Capturing When Button is Down
          setIsDown((prev) => true);
    }}></div>
    <div className="p-2 h-40">

    {children}
    </div>
    </div>
}