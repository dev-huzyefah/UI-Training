export interface AuthUser {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData extends AuthCredentials {
  displayName: string;
}
