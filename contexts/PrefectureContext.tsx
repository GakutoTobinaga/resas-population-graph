import React from "react";
import { PrefectureContextType } from "./PrefectureContextTypes";

const PrefectureContext = React.createContext<
  PrefectureContextType | undefined
>(undefined);

export default PrefectureContext;
