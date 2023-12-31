import { Dispatch, SetStateAction } from "react";
import { OptionTypes, BodyType, AuthType } from "./interface";

export function ParameterModal({
  optionState,
  setOptionState,
}: {
  // selectTab: Tabs;
  optionState: OptionTypes;
  setOptionState: Dispatch<SetStateAction<OptionTypes>>;
}) {
  return (
    <div>
      <div className="text-gray-500 font-semibold text-sm">
        Query Parameters
      </div>
      <table className="w-full border-collapse border border-slate-500 ">
        <tbody>
          {optionState.Parameter.map((e, index) => {
            return (
              <tr key={e.id}>
                <td className="text-center border border-slate-600">{e.id}</td>
                <td className="border border-slate-600">
                  <input
                    value={e.key}
                    onChange={(eve) => {
                      let VALYE = eve.target.value;
                      // check if it's the last Input and on Press create new Value
                      // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                      if (
                        optionState.Parameter.indexOf(e) ==
                        optionState.Parameter.length - 1
                      ) {
                        // it is Last Element
                        //   @ts-ignore
                        setOptionState((prev) => {
                          // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                          let NewBlock: {
                            id: number;
                            key: string;
                            Value: string;
                          }[] = [];

                          NewBlock.push(
                            {
                              id: prev.Parameter.filter((f) => f.id == e.id)[0]
                                .id,
                              key: VALYE,
                              Value: prev.Parameter.filter(
                                (f) => f.id == e.id
                              )[0].Value,
                            },
                            {
                              id:
                                prev.Parameter.filter((f) => f.id == e.id)[0]
                                  .id + 1,
                              key: "",
                              Value: "",
                            }
                          );
                          return {
                            ...prev,
                            Parameter: [
                              ...prev.Parameter.filter((f) => f.id !== e.id),
                              ,
                              ...NewBlock,
                            ],
                          };
                        });
                      } else {
                        setOptionState((prev) => {
                          // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                          let Position = -1;
                          prev.Parameter.forEach((value, index) => {
                            if (
                              value.id ==
                              prev.Parameter.filter((f) => f.id == e.id)[0].id
                            ) {
                              Position = index;
                            }
                          });
                          return {
                            ...prev,
                            Parameter: [
                              ...prev.Parameter.filter(
                                (f, index) => index < Position
                              ),
                              {
                                id: prev.Parameter.filter(
                                  (f) => f.id == e.id
                                )[0].id,
                                key: VALYE,
                                Value: prev.Parameter.filter(
                                  (f) => f.id == e.id
                                )[0].Value,
                              },
                              ...prev.Parameter.filter(
                                (f, index) => index > Position
                              ),
                            ],
                          };
                        });
                      }
                    }}
                    placeholder="Key"
                    type="text"
                    spellCheck={false}
                    className="bg-black  focus:outline-none  w-full px-1"
                  />
                </td>
                <td className="border border-slate-600">
                  <input
                    placeholder="Value"
                    type="text"
                    value={e.Value}
                    onChange={(eve) => {
                      let VALYE = eve.target.value;

                      // check if it's the last Input and on Press create new Value
                      // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                      if (
                        optionState.Parameter.indexOf(e) ==
                        optionState.Parameter.length - 1
                      ) {
                        // it is Last Element
                        //   @ts-ignore
                        setOptionState((prev) => {
                          // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                          let NewBlock: {
                            id: number;
                            key: string;
                            Value: string;
                          }[] = [];

                          NewBlock.push(
                            {
                              id: prev.Parameter.filter((f) => f.id == e.id)[0]
                                .id,
                              key: prev.Parameter.filter((f) => f.id == e.id)[0]
                                .key,
                              Value: VALYE,
                            },
                            {
                              id:
                                prev.Parameter.filter((f) => f.id == e.id)[0]
                                  .id + 1,
                              key: "",
                              Value: "",
                            }
                          );
                          return {
                            ...prev,
                            Parameter: [
                              ...prev.Parameter.filter((f) => f.id !== e.id),
                              ,
                              ...NewBlock,
                            ],
                          };
                        });
                      } else {
                        setOptionState((prev) => {
                          // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                          let Position = -1;
                          prev.Parameter.forEach((value, index) => {
                            if (
                              value.id ==
                              prev.Parameter.filter((f) => f.id == e.id)[0].id
                            ) {
                              Position = index;
                            }
                          });
                          return {
                            ...prev,
                            Parameter: [
                              ...prev.Parameter.filter(
                                (f, index) => index < Position
                              ),
                              {
                                id: prev.Parameter.filter(
                                  (f) => f.id == e.id
                                )[0].id,
                                key: prev.Parameter.filter(
                                  (f) => f.id == e.id
                                )[0].key,
                                Value: VALYE,
                              },
                              ...prev.Parameter.filter(
                                (f, index) => index > Position
                              ),
                            ],
                          };
                        });
                      }
                    }}
                    spellCheck={false}
                    className="bg-black focus:outline-none   w-full px-2"
                  />
                </td>
                <td className="border border-slate-600">
                  <button className="px-1 w-full">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-eye-fill mx-auto  "
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  </button>
                </td>
                <td className="border border-slate-600 ">
                  <button
                    disabled={optionState.Parameter.length == 1}
                    onClick={() => {
                      setOptionState((prev) => {
                        let updatedState = {
                          ...prev,
                          Parameter: prev.Parameter.filter(
                            (ele) => ele.id !== e.id
                          ),
                        };
                        return updatedState;
                      });
                    }}
                    className="px-1 w-full group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColo   r"
                      className="bi bi-trash2-fill mx-auto group-disabled:fill-red-500 fill-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function HeaderTabModal({
  optionState,
  setOptionState,
}: {
  // selectTab: Tabs;
  optionState: OptionTypes;
  setOptionState: Dispatch<SetStateAction<OptionTypes>>;
}) {
  return (
    <div>
      <div className="text-gray-500 font-semibold text-sm">Headers</div>
      <table className="w-full border-collapse border border-slate-500 ">
        <tbody>
          {optionState.Header.map((e, index) => {
            return (
              <tr key={e.id}>
                <td className="text-center border border-slate-600">{e.id}</td>
                <td className="border border-slate-600">
                  <input
                    value={e.key}
                    onChange={(eve) => {
                      let VALYE = eve.target.value;
                      // check if it's the last Input and on Press create new Value
                      // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                      if (
                        optionState.Header.indexOf(e) ==
                        optionState.Header.length - 1
                      ) {
                        // it is Last Element
                        //   @ts-ignore
                        setOptionState((prev) => {
                          // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                          let NewBlock: {
                            id: number;
                            key: string;
                            Value: string;
                          }[] = [];

                          NewBlock.push(
                            {
                              id: prev.Header.filter((f) => f.id == e.id)[0].id,
                              key: VALYE,
                              Value: prev.Header.filter((f) => f.id == e.id)[0]
                                .Value,
                            },
                            {
                              id:
                                prev.Header.filter((f) => f.id == e.id)[0].id +
                                1,
                              key: "",
                              Value: "",
                            }
                          );
                          return {
                            ...prev,
                            Header: [
                              ...prev.Header.filter((f) => f.id !== e.id),
                              ,
                              ...NewBlock,
                            ],
                          };
                        });
                      } else {
                        setOptionState((prev) => {
                          // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                          //  it calculates the Index of Item we are currently uodating and store the value
                          let Position = -1;
                          prev.Header.forEach((value, index) => {
                            if (
                              value.id ==
                              prev.Header.filter((f) => f.id == e.id)[0].id
                            ) {
                              Position = index;
                            }
                          });
                          return {
                            ...prev,
                            Header: [
                              ...prev.Header.filter(
                                (f, index) => index < Position
                              ),
                              {
                                id: prev.Header.filter((f) => f.id == e.id)[0]
                                  .id,
                                key: VALYE,
                                Value: prev.Header.filter(
                                  (f) => f.id == e.id
                                )[0].Value,
                              },
                              ...prev.Header.filter(
                                (f, index) => index > Position
                              ),
                            ],
                          };
                        });
                      }
                    }}
                    placeholder="Key"
                    type="text"
                    spellCheck={false}
                    className="bg-black  focus:outline-none  w-full px-1"
                  />
                </td>
                <td className="border border-slate-600">
                  <input
                    placeholder="Value"
                    type="text"
                    value={e.Value}
                    onChange={(eve) => {
                      let VALYE = eve.target.value;
                      // check if it's the last Input and on Press create new Value
                      // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                      if (
                        optionState.Header.indexOf(e) ==
                        optionState.Header.length - 1
                      ) {
                        // it is Last Element
                        //   @ts-ignore
                        setOptionState((prev) => {
                          // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                          let NewBlock: {
                            id: number;
                            key: string;
                            Value: string;
                          }[] = [];

                          NewBlock.push(
                            {
                              id: prev.Header.filter((f) => f.id == e.id)[0].id,
                              key: prev.Header.filter((f) => f.id == e.id)[0]
                                .key,
                              Value: VALYE,
                            },
                            {
                              id:
                                prev.Header.filter((f) => f.id == e.id)[0].id +
                                1,
                              key: "",
                              Value: "",
                            }
                          );
                          return {
                            ...prev,
                            Header: [
                              ...prev.Header.filter((f) => f.id !== e.id),
                              ,
                              ...NewBlock,
                            ],
                          };
                        });
                      } else {
                        setOptionState((prev) => {
                          // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                          let Position = -1;
                          prev.Header.forEach((value, index) => {
                            if (
                              value.id ==
                              prev.Header.filter((f) => f.id == e.id)[0].id
                            ) {
                              Position = index;
                            }
                          });
                          return {
                            ...prev,
                            Header: [
                              ...prev.Header.filter(
                                (f, index) => index < Position
                              ),
                              {
                                id: prev.Header.filter((f) => f.id == e.id)[0]
                                  .id,
                                key: prev.Header.filter((f) => f.id == e.id)[0]
                                  .key,
                                Value: VALYE,
                              },
                              ...prev.Header.filter(
                                (f, index) => index > Position
                              ),
                            ],
                          };
                        });
                      }
                    }}
                    spellCheck={false}
                    className="bg-black focus:outline-none   w-full px-2"
                  />
                </td>
                <td className="border border-slate-600">
                  <button className="px-1 w-full">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-eye-fill mx-auto  "
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  </button>
                </td>
                <td className="border border-slate-600">
                  <button
                    disabled={optionState.Header.length == 1}
                    onClick={() => {
                      setOptionState((prev) => {
                        let updatedState = {
                          ...prev,
                          Header: prev.Header.filter((ele) => ele.id !== e.id),
                        };
                        return updatedState;
                      });
                    }}
                    className="px-1 w-full group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash2-fill mx-auto group-disabled:fill-red-500 fill-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function BodyModal({
  optionState,
  setOptionState,
}: {
  // selectTab: Tabs;
  optionState: OptionTypes;
  setOptionState: Dispatch<SetStateAction<OptionTypes>>;
}) {
  return (
    <>
      {" "}
      <div>
        <div className="text-gray-500  font-semibold text-sm">
          Content Type
          <select
            onChange={(e) => {
              let BodyType = e.currentTarget.value;
              setOptionState((prev) => {
                let OldState = { ...prev };
                OldState.Body.type = BodyType as BodyType;
                return OldState;
              });
            }}
            // defaultValue={"NONE"}
            value={optionState.Body.type}
            className="focus:outline-none ml-3 bg-gray-800 py-1 px-2 rounded-sm text-white"
          >
            <option className=" " value={BodyType.NONE}>
              None
            </option>
            <option value={BodyType.APPLICATION_JSON}>application/json</option>
            <option value={BodyType.APPLICATION_XML}>application/xml</option>
            <option value={BodyType.APPLICATION_X_FORM_ENCODE}>
              application/x-www-form-urlencoded
            </option>
          </select>
        </div>
        {(optionState.Body.type == BodyType.APPLICATION_XML ||
          optionState.Body.type == BodyType.APPLICATION_JSON) && (
          <>
            <div className="min-h-[170px]  font-bold  mt-1">
              <textarea
                value={optionState.Body.payload}
                onChange={(e) => {
                  let Value = e.currentTarget.value;
                  setOptionState((prev) => {
                    let NewState = { ...prev };
                    NewState.Body.payload = Value;
                    return NewState;
                  });
                }}
                rows={6}
                spellCheck={false}
                className=" resize-none p-1 w-full  bg-gray-800 font-normal"
              />
            </div>
          </>
        )}

        {optionState.Body.type == BodyType.NONE && (
          <div className="min-h-[170px] flex justify-center items-center font-bold underline ">
            This Request won&apos;t be Using Any Body
          </div>
        )}
        {optionState.Body.type == BodyType.APPLICATION_X_FORM_ENCODE && (
          <div className="max-h-[170px]  font-bold  overflow-y-auto  mt-3">
            <table className="w-full border-collapse border border-slate-500 ">
              <tbody>
                {optionState.Body.forms.map((formValue) => {
                  return (
                    <tr key={formValue.id}>
                      <td className="text-center border border-slate-600">
                        {formValue.id}
                      </td>
                      <td className="border border-slate-600">
                        <input
                          value={formValue.key}
                          onChange={(eve) => {
                            let VALYE = eve.target.value;
                            // console.log(VALYE);
                            // check if it's the last Input and on Press create new Value
                            // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                            if (
                              optionState.Body.forms.indexOf(formValue) ==
                              optionState.Body.forms.length - 1
                            ) {
                              // it is Last Element
                              //   @ts-ignore
                              setOptionState((prev) => {
                                // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                                let NewBlock: {
                                  id: number;
                                  key: string;
                                  Value: string;
                                }[] = [];

                                NewBlock.push(
                                  {
                                    id: prev.Body.forms.filter(
                                      (f) => f.id == formValue.id
                                    )[0].id,
                                    key: VALYE,
                                    Value:prev.Body.forms.filter(
                                      (f) => f.id == formValue.id
                                    )[0].value,
                                  },
                                  {
                                    id:
                                      prev.Body.forms.filter(
                                        (f) => f.id == formValue.id
                                      )[0].id + 1,
                                    key: "",
                                    Value: "",
                                  }
                                );
                                return {
                                  ...prev,
                                  Body: {
                                    ...prev.Body,
                                    forms: [
                                      ...prev.Body.forms.filter(
                                        (f) => f.id !== formValue.id
                                      ),
                                      ...NewBlock,
                                    ],
                                  },
                                };
                              });
                            } else {
                              // @ts-ignore
                              setOptionState((prev) => {
                                // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                                let Position = -1;
                                prev.Body.forms.forEach((value, index) => {
                                  if (
                                    value.id ==
                                    prev.Body.forms.filter(
                                      (f) => f.id == formValue.id
                                    )[0].id
                                  ) {
                                    Position = index;
                                  }
                                });
                                return {
                                  ...prev,
                                  Body: {
                                    ...prev.Body,
                                    forms: [
                                      ...prev.Body.forms.filter(
                                        (f, index) => index < Position
                                      ),
                                      {
                                        id: prev.Body.forms.filter(
                                          (f) => f.id == formValue.id
                                        )[0].id,
                                        key: VALYE,
                                        Value: prev.Body.forms.filter(
                                          (f) => f.id == formValue.id
                                        )[0].value,
                                      },
                                      ...prev.Body.forms.filter(
                                        (f, index) => index > Position
                                      ),
                                    ],
                                  },
                                  // Header: [
                                  //   ...prev.Header.filter(
                                  //     (f, index) => index < Position
                                  //   ),
                                  //   {
                                  //     id: prev.Header.filter((f) => f.id == e.id)[0]
                                  //       .id,
                                  //     key: VALYE,
                                  //     Value: "",
                                  //   },
                                  //   ...prev.Header.filter(
                                  //     (f, index) => index > Position
                                  //   ),
                                  // ],
                                };
                              });
                            }
                          }}
                          placeholder="Key"
                          type="text"
                          spellCheck={false}
                          className="bg-black  focus:outline-none  w-full px-1"
                        />
                      </td>
                      <td className="border border-slate-600">
                        <input
                        value={formValue.value}

                        onChange={(eve) => {
                          let VALYE = eve.target.value;
                          // console.log(VALYE);
                          // check if it's the last Input and on Press create new Value
                          // console.log(optionState.Parameter.indexOf(e), optionState.Parameter.length-1)
                          if (
                            optionState.Body.forms.indexOf(formValue) ==
                            optionState.Body.forms.length - 1
                          ) {
                            // it is Last Element
                            //   @ts-ignore
                            setOptionState((prev) => {
                              // const lastId = prev.Parameter[prev.Parameter.length - 1].id;
                              let NewBlock: {
                                id: number;
                                key: string;
                                Value: string;
                              }[] = [];

                              NewBlock.push(
                                {
                                  id: prev.Body.forms.filter(
                                    (f) => f.id == formValue.id
                                  )[0].id,
                                  key: prev.Body.forms.filter(
                                    (f) => f.id == formValue.id
                                  )[0].key,
                                  Value: VALYE,
                                },
                                {
                                  id:
                                    prev.Body.forms.filter(
                                      (f) => f.id == formValue.id
                                    )[0].id + 1,
                                  key: "",
                                  Value: "",
                                }
                              );
                              return {
                                ...prev,
                                Body: {
                                  ...prev.Body,
                                  forms: [
                                    ...prev.Body.forms.filter(
                                      (f) => f.id !== formValue.id
                                    ),
                                    ...NewBlock,
                                  ],
                                },
                              };
                            });
                          } else {
                            // @ts-ignore
                            setOptionState((prev) => {
                              // to keep updating the value , and keeping positon as Intact Filter Out BAsed on Position
                              let Position = -1;
                              prev.Body.forms.forEach((value, index) => {
                                if (
                                  value.id ==
                                  prev.Body.forms.filter(
                                    (f) => f.id == formValue.id
                                  )[0].id
                                ) {
                                  Position = index;
                                }
                              });
                              return {
                                ...prev,
                                Body: {
                                  ...prev.Body,
                                  forms: [
                                    ...prev.Body.forms.filter(
                                      (f, index) => index < Position
                                    ),
                                    {
                                      id: prev.Body.forms.filter(
                                        (f) => f.id == formValue.id
                                      )[0].id,
                                      key: prev.Body.forms.filter(
                                        (f) => f.id == formValue.id
                                      )[0].key,
                                      Value: VALYE,
                                    },
                                    ...prev.Body.forms.filter(
                                      (f, index) => index > Position
                                    ),
                                  ],
                                },
                                // Header: [
                                //   ...prev.Header.filter(
                                //     (f, index) => index < Position
                                //   ),
                                //   {
                                //     id: prev.Header.filter((f) => f.id == e.id)[0]
                                //       .id,
                                //     key: VALYE,
                                //     Value: "",
                                //   },
                                //   ...prev.Header.filter(
                                //     (f, index) => index > Position
                                //   ),
                                // ],
                              };
                            });
                          }
                        }}

                          placeholder="Value"
                          type="text"
                          spellCheck={false}
                          className="bg-black focus:outline-none   w-full px-2"
                        />
                      </td>
                      <td className="border border-slate-600">
                        <button className="px-1 w-full">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-eye-fill mx-auto  "
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        </button>
                      </td>
                      <td className="border border-slate-600">
                        <button
                          disabled={optionState.Body.forms.length == 1}
                          onClick={() => {
                            setOptionState((prev) => {
                              let updatedState = {
                                ...prev,
                                Body: {
                                  ...prev.Body,
                                  forms: prev.Body.forms.filter(
                                    (ele) => ele.id !== formValue.id
                                  ),
                                },
                                // Header: prev.Body.forms.filter(
                                //   (ele) => ele.id !== formValue.id
                                // ),
                              };
                              return updatedState;
                            });
                          }}
                          className="px-1 w-full group"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash2-fill mx-auto group-disabled:fill-red-500 fill-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* {optionState.Auth.type == "NONE" && } */}
      </div>
    </>
  );
}

export function AuthorisationModal({
  optionState,
  setOptionState,
}: {
  // selectTab: Tabs;
  optionState: OptionTypes;
  setOptionState: Dispatch<SetStateAction<OptionTypes>>;
}) {
  return (
    <div>
      <div className="text-gray-500  font-semibold text-sm">
        Authorization Type
        <select
          onChange={(e) => {
            let AuthType = e.currentTarget.value;
            setOptionState((prev) => {
              let OldState = { ...prev };
              OldState.Auth.type = AuthType as AuthType;
              return OldState;
            });
          }}
          defaultValue={optionState.Auth.type}
          className="focus:outline-none ml-3 bg-gray-800 py-1 px-2 rounded-sm text-white"
        >
          <option className=" " value={AuthType.NONE}>
            None
          </option>
          <option value={AuthType.BASIC}>Basic Auth</option>
          <option value={AuthType.BEARER}>Bearer Token</option>
        </select>
      </div>
      {optionState.Auth.type == AuthType.NONE && (
        <div className="min-h-[170px] flex justify-center items-center font-bold underline ">
          This Request won&apos;t be Using Any Auth
        </div>
      )}
      {optionState.Auth.type == AuthType.BEARER && (
        <div className="min-h-[170px] pt-3">
          <span>Bearer Token</span>
          <input
            type="text "
            value={optionState.Auth.token}
            onChange={(e) => {
              let TokenValue = e.currentTarget.value;
              setOptionState((prev) => {
                let PresevedState = { ...prev };
                PresevedState.Auth.token = TokenValue;
                return PresevedState;
              });
            }}
            className="ml-5 bg-gray-800 focus:outline-none px-2"
          />
        </div>
      )}

      {optionState.Auth.type == AuthType.BASIC && (
        <div className="pt-3">
          <div className="w-fit flex flex-col gap-4">
            <div className="w-full flex flex-row justify-between">
              <span>UserName</span>
              <input
                type="text "
                value={optionState.Auth.username}
                onChange={(e) => {
                  let UserNameValue = e.currentTarget.value;
                  setOptionState((prev) => {
                    let PresevedState = { ...prev };
                    PresevedState.Auth.username = UserNameValue;
                    return PresevedState;
                  });
                }}
                className="ml-5 bg-gray-800 focus:outline-none px-2"
              />
            </div>
            <div className="w-full flex flex-row justify-between">
              <span>Password</span>
              <input
                type="text "
                value={optionState.Auth.password}
                onChange={(e) => {
                  let PasswordValue = e.currentTarget.value;
                  setOptionState((prev) => {
                    let PresevedState = { ...prev };
                    PresevedState.Auth.password = PasswordValue;
                    return PresevedState;
                  });
                }}
                className="ml-5 bg-gray-800 focus:outline-none px-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
