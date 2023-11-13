

import { AppOperations, StorageContext } from "@/components/Context/Context";
import { useContext } from "react";
import MethodDropdown from "./modules/MethodDropdown";
import URLInput from "./modules/UrlInput";
import SendButton from "./modules/SendButton";
import { OptionTypes } from "./modules/interface";

export default function UrlInputHolder({
  optionsState
}:{
  optionsState: OptionTypes,
}) {

  return (
    <div className="flex items-stretch">
     <MethodDropdown/>
      <URLInput/>
    <SendButton optionsState={optionsState} />
      {/* <button className="px-4 bg-red-200 rounded-sm text-black">Save</button> */}
    </div>
  );
}
