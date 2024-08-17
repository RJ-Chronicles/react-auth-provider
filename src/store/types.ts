export type User = {
  name: string;
  email: string;
  token: string;
  expiration: string;
};

export type State = {
  user: User | null;
  isAuthenticated: boolean;
  expiration_duration: number;
};
