declare module "types" {
  export interface ProfileType {
    avatar: string;
    company: string;
    createdAt: string;
    id: number;
    name: string;
    position: string;
    userId: number;
    user: {
      email: string;
    };
  }

  export interface UserType {
    adminPasskey: string | null;
    createdAt: string;
    email: string;
    id: number;
    isAdmin: boolean;
    verified: boolean;
  }
}
