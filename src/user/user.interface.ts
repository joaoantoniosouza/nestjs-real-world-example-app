export interface UserData {
  email: string;
  username: string;
  password: string;
  bio?: string;
  image?: string;
}

export interface AuthenticatedUser {
  user: UserData;
  token: string;
}
