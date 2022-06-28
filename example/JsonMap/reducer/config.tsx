import React, { PropsWithChildren } from "react";
import { defaultJson } from "../constants/data";

export interface AppConfig {
  json: string;
}
export const initialStates: AppConfig = {
  json: JSON.stringify(defaultJson),
};

export type ReactComponent = React.FC<PropsWithChildren<any>>;