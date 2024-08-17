import { useCallback } from "react";
import { User } from "../store/types";
import useAuthContext from "../store/useAuthContext";

const useSessionManagement = () => {
  const { dispatch } = useAuthContext();

  const clearUserSession = useCallback(() => {
    localStorage.removeItem("candidate");
    dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_SESSION_EXPIRATION", payload: 0 });
  }, [dispatch]);

  const restoreUserSession = useCallback(() => {
    const storedUser = localStorage.getItem("candidate");

    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      const sessionExpirationTime = new Date(user.expiration).getTime();
      const currentTime = new Date().getTime();

      if (sessionExpirationTime < currentTime) {
        clearUserSession();
      } else {
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
        dispatch({
          type: "SET_SESSION_EXPIRATION",
          payload: sessionExpirationTime,
        });
      }
    }
  }, [clearUserSession, dispatch]);

  const handleUserLogin = useCallback(
    (user: User) => {
      const sessionExpirationDate = new Date(
        new Date().getTime() + parseInt(user.expiration) * 1000
      );
      user.expiration = sessionExpirationDate.toISOString();
      localStorage.setItem("candidate", JSON.stringify(user));

      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
      dispatch({
        type: "SET_SESSION_EXPIRATION",
        payload: sessionExpirationDate.getTime(),
      });
    },
    [dispatch]
  );

  const handleUserLogout = useCallback(() => {
    clearUserSession();
  }, [clearUserSession]);

  return {
    restoreUserSession,
    handleUserLogin,
    handleUserLogout,
  };
};

export default useSessionManagement;
