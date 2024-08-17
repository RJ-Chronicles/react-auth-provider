import { useEffect, useRef, useState } from "react";
import useAuthContext from "../store/useAuthContext";
import useSessionManager from "./useSessionManagement";

const FIVE_MINUTES = 300 * 1000;
const useSessionExpirationWarning = () => {
  const { state } = useAuthContext();
  const { expiration_duration } = state;
  const { handleUserLogout } = useSessionManager();
  const [msg, setMsg] = useState("");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // Use useRef to persist the timer reference

  const updateFunction = () => {
    if (expiration_duration < new Date().getTime() + FIVE_MINUTES) {
      setMsg("Your session will expire soon");
    }

    if (expiration_duration < new Date().getTime()) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      handleUserLogout();
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(updateFunction, FIVE_MINUTES);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [expiration_duration]);
  return {
    msg,
  };
};

export default useSessionExpirationWarning;
