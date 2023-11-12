"use client";
import { Dispatch, createContext, useReducer } from "react";
type AppState = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  isInitialRequestDown: boolean;
  isLoading: boolean;
};
export enum AppOperations {
  UPDATE_METHOD,
  UPDATE_URL,
  TOGGLE_INITIAL,
  TOGGLE_LOADING,
}

const DefaultState: AppState = {
  method: "GET",
  url: "https://echo.dhananjaay.dev/",
  isInitialRequestDown: false,
  isLoading: false,
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
    <StorageContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
