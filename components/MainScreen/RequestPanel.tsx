"use client"
import { useState } from "react";
import RequestOption from "./Windows/req-windows/RequestOptions";
import UrlInputHolder from "./Windows/req-windows/RequestUrlInput";
import { AuthType, BodyType, OptionTypes } from "./Windows/req-windows/modules/interface";

export default function RequestPanel() {
  const [optionsState, setOptionState] = useState<OptionTypes>({
    Parameter: [
      {
        id: 1,
        key: "",
        Value: "",
      },
    ],
    Body: {
      type: BodyType.NONE,
      payload: "",
      forms: [
        {
          id: 1,
          key: "",
          value: "",
        },
      ],
    },
    Header: [
      {
        id: 1,
        key: "",
        Value: "",
      },
    ],
    Auth: {
      type:AuthType.NONE,
      username: "",
      password: "",
      token: "",
    },
  });
  return (
    <div className="p-3 ">
      <UrlInputHolder optionsState={optionsState} />
      <RequestOption
        optionsState={optionsState}
        setOptionState={setOptionState}
      />
    </div>
  );
}
