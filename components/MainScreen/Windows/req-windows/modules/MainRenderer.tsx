import { Dispatch, SetStateAction, useState } from "react";
import { OptionTypes, Tabs } from "./interface";
import {
  AuthorisationModal,
  BodyModal,
  HeaderTabModal,
  ParameterModal,
} from "./Modals";

export default function MainRenderer({
  selectTab,
  optionState,
  setOptionState,
}: {
  selectTab: Tabs;
  optionState: OptionTypes;
  setOptionState: Dispatch<SetStateAction<OptionTypes>>;
}) {
  const [] = useState("");
  const [key, setKey] = useState("");
  if (selectTab == Tabs.PARAMETERS) {
    return (
      <ParameterModal
        optionState={optionState}
        setOptionState={setOptionState}
      />
    );
  }

  if (selectTab == Tabs.HEADERS) {
    return (
      <HeaderTabModal
        optionState={optionState}
        setOptionState={setOptionState}
      />
    );
  }

  if (selectTab == Tabs.BODY) {
    return (
      <BodyModal optionState={optionState} setOptionState={setOptionState} />
    );
  }

  if (selectTab === Tabs.AUTHORISATION) {
    return (
      <AuthorisationModal
        optionState={optionState}
        setOptionState={setOptionState}
      />
    );
  }

  return <></>;
}
