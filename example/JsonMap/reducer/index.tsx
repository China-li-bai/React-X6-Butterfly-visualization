import React from "react";
import { AppConfig, initialStates, ReactComponent } from "./config";

export enum ConfigActionType {
  SET_JSON,
}

export type ReducerAction = {
  type: ConfigActionType;
  payload?: any;
};

export const useConfigReducer: React.Reducer<AppConfig, ReducerAction> = (
  state = initialStates,
  action
) => {
  switch (action.type) {
    case ConfigActionType.SET_JSON:
      return {
        ...state,
        json: action.payload,
      };

    default:
      return state;
  }
};

interface Config {
  json: string;
  dispatch: React.Dispatch<ReducerAction>;
}

const defaultContext: Config = {
  ...initialStates,
  dispatch: () => { },
};

const ConfigContext = React.createContext(defaultContext);

const useConfig = () => React.useContext(ConfigContext);

const WithProvider: ReactComponent = ({ children }) => {
  const [states, dispatch] = React.useReducer(useConfigReducer, initialStates);
  const value = {
    dispatch,
    json: states.json,
  };
  return (
    <ConfigContext.Provider value={value} > {children} </ConfigContext.Provider>
  );
};


// const AppWith = <P extends object>(
//   Component: React.ComponentType<P>
// ): React.FC => {
//   console.log("🚀 - file: config.tsx - line 77 - Component", Component)

//   return (props) => (
//     <WithProvider>
//     <Component { ...(props as P) } />
//     </WithProvider>
//   );
// };
const AppProviders = ({ children }) => {
  return (<WithProvider>
    {children}
  </WithProvider>)
}
export { AppProviders, useConfig, WithProvider, ConfigContext }