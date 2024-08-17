import { State, User } from "./types";

type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_IS_LOGGED_IN"; payload: boolean }
  | { type: "SET_SESSION_EXPIRATION"; payload: number };

type Dispatch = (action: Action) => void;

export type AuthContextType = {
  state: State;
  dispatch: Dispatch;
};

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_SESSION_EXPIRATION":
      return {
        ...state,
        expiration_duration: action.payload,
      };
    default:
      return state;
  }
};
