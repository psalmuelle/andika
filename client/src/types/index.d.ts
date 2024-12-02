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

  export interface TechnicalArticleRequest {
    id: number;
    numberOfArticles: number;
    audience: string;
    primaryGoal: string;
    contentStructure: string[];
    idealLength: string;
    usefulLinks: string;
    proposedTopics: string;
  }

  export interface WhitepaperRequest {
    id: number;
    productName: string;
    niche: string;
  }

  export interface ApiDocRequest {
    id: number;
    startupName: string;
    industry: string;
    docType: string;
    usefulLinks: string;
  }

  export interface EditingRequest {
    id: number;
    drafts: string[];
    usefulLinks: string;
    info: string;
  }

  export interface ProjectRequestType {
    id: number;
    user: UserType;
    userId: number;
    requestType: "TECHNICAL_ARTICLE" | "WHITEPAPER" | "API_DOC" | "EDITING";
    status: "NEW" | "STARTED";
    createdAt: string;
    ArticleRequest?: TechnicalArticleRequest;
    WhitepaperRequest?: WhitepaperRequest;
    ApiDocRequest?: ApiDocRequest;
    EditingRequest?: EditingRequest;
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
    owner?: ProfileType;
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
