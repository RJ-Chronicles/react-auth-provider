import { useReducer } from "react";
import { AuthContextType, authReducer } from ".";
import { State } from "./types";
import React from "react";

const initial_state: State = {
  user: null,
  isAuthenticated: false,
  expiration_duration: 0,
};
export const AuthContext = React.createContext<AuthContextType>({
  state: initial_state,
  dispatch: () => null,
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initial_state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
