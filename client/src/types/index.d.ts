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

  export interface ProjectType {
    id: number;
    title: string;
    assignedPM: {
      id: number;
      name: string;
      position: string;
      avatar: string?;
    };
    description: string;
    projectType: string;
    startDate: string;
    dueDate: string;
    ownerId: number;
    status: string;
    overallProgress: number;
    fee: string;
    tasks: {
      id: number;
      title: string;
      description: string;
      status: "COMPLETED" | "IN_PROGRESS" | "NEW";
      dueDate: string;
    }[];
    activities: {
      id: number;
      activity: string;
      createdAt: string;
    }[];
    payments: {
      id: number;
      amount: string;
      dueDate: string;
      status: string;
      datePaid: string?;
    }[];
    files: string[];
    feedback: string[];
  }
}
