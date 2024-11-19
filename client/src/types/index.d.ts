declare module "types" {
  export interface ProfileType {
    id: number;
    name: string;
    email: string;
    avatar: string;
    userId: number;
    company: string;
    position: string;
    refferalCode: string;
    refferalCount: number;
    rewards: {
      value: number;
      currency: string;
    };
    refferedBy: string | null;
    createdAt: string;
  }
}
