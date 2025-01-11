import axiosInstance from "@/config/axios";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  published: boolean;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    position: string;
  };
  _count: {
    likes: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  published?: boolean;
  tags: string[];
}

export interface UpdateBlogPost {
  title?: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  published?: boolean;
  tags?: string[];
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await axiosInstance.get("/blog", {
    withCredentials: true,
  });
  return response.data;
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const { data } = await axiosInstance.get(`/blog/${slug}`);
  return data;
};

export const createBlogPost = async (
  post: CreateBlogPost,
): Promise<BlogPost> => {
  const { data } = await axiosInstance.post("/blog", post, {
    withCredentials: true,
  });
  return data;
};

export const updateBlogPost = async (
  slug: string,
  post: UpdateBlogPost,
): Promise<BlogPost> => {
  const { data } = await axiosInstance.patch(`/blog/${slug}`, post, {
    withCredentials: true,
  });

  return data;
};

export const deleteBlogPost = async (slug: string): Promise<void> => {
  await axiosInstance.delete(`/blog/${slug}`, {
    withCredentials: true,
  });
};

export const likeBlogPost = async (slug: string): Promise<BlogPost> => {
  const { data } = await axiosInstance.post(`/blog/${slug}/like`);
  return data;
};

export const unlikeBlogPost = async (slug: string): Promise<BlogPost> => {
  const { data } = await axiosInstance.delete(`/blog/${slug}/like`);
  return data;
};

export const hasLikedBlogPost = async (slug: string): Promise<boolean> => {
  const { data } = await axiosInstance.get(`/blog/${slug}/has-liked`);
  return data.hasLiked;
};

export type { BlogPost };
