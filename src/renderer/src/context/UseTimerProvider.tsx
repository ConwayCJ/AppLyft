import { useContext } from "react";
import { TimerContext } from "./TimerProvider";

export default function useTimerProvider() {
  return useContext(TimerContext)
}