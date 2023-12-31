
import MainDraggableLayout from "@/components/DraggableLayouts/SideBarLayout";
import EnvironmentViewer from "@/components/MainScreen/EnvironmentViewer";
import RequestPanel from "@/components/MainScreen/RequestPanel";
import TabsHolder from "@/components/MainScreen/TabsHolder";
import WindowsContainer from "@/components/MainScreen/Windows/WindowsTabs";
import RequestOption from "@/components/MainScreen/Windows/req-windows/RequestOptions";
import UrlInputHolder from "@/components/MainScreen/Windows/req-windows/RequestUrlInput";
import ResponseDrawer from "@/components/MainScreen/Windows/response-window/ResponseDrawer";
import ResponseView from "@/components/MainScreen/Windows/response-window/ResponseView";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <>
      <MainDraggableLayout>
        <TabsHolder>
          <WindowsContainer />
          {/* <EnvironmentViewer /> */}
        </TabsHolder>
      <RequestPanel/>
     <ResponseDrawer>
      <ResponseView/>
     </ResponseDrawer>
      </MainDraggableLayout>
    </>
  );
}
