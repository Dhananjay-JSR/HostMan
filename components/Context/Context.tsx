"use client";
import { AxiosResponse } from "axios";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Dispatch, createContext, useReducer } from "react";
type AppState = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  isInitialRequestDown: boolean;
  isLoading: boolean;
  windowName:string;
  response:null | AxiosResponse<
  any,
  any
>
};
export enum AppOperations {
  UPDATE_METHOD,
  UPDATE_URL,
  TOGGLE_INITIAL,
  TOGGLE_LOADING,
  UPDATE_RESPONSE,
  UPDATE_WINDOW_NAME
}

const DefaultState: AppState = {
  method: "GET",
  windowName: "Untitled",
  url: "https://echo.dhananjaay.dev/",
  isInitialRequestDown: false,
  isLoading: false,
  response:null
};

function ReducerFunction(
  state: AppState,
  action: {
    type: AppOperations;
    payload: any;
  }
) {
  switch (action.type) {
    case AppOperations.UPDATE_METHOD:
      return {
        ...state,
        method: action.payload,
      };

    case AppOperations.UPDATE_URL:
      return {
        ...state,
        url: action.payload,
      };
    case AppOperations.TOGGLE_INITIAL:
      return {
        ...state,
        isInitialRequestDown: true,
      };
    case AppOperations.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AppOperations.UPDATE_RESPONSE:
        return {
            ...state,
            response:action.payload
        }
        case AppOperations.UPDATE_WINDOW_NAME:
          return {
            ...state,
            windowName: action.payload
          }
    default:
      return {
        ...state,
      };
  }
}

export const StorageContext = createContext<{
  state: AppState;
  dispatch: Dispatch<{
    type: AppOperations;
    payload: any;
  }>;
}>(
  {} as {
    state: AppState;
    dispatch: Dispatch<{
      type: AppOperations;
      payload: any;
    }>;
  }
);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ReducerFunction, DefaultState);

  return (
    
    <SessionProvider >


    <StorageContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </StorageContext.Provider>
    </SessionProvider>
  );
}
