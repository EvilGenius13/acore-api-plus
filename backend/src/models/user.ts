export interface User {
  id: number;
  username: string;
  email: string;
  salt: string;
  verifier: Date;
}