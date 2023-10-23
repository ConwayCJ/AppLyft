import { useContext } from "react";
import { AppContext } from "./AppProvider";

export default function useAppProvider() {
  return useContext(AppContext)
}