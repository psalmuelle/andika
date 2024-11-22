export interface User {
  id: number;
  email: string;
  password: string;
  verified: boolean;
  verification: string | null;
  isAdmin: boolean;
  adminPasskey: string | null;
}
