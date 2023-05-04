export type News = {
  id: string;
  authorId: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: number;
  description: string;
};

export type NewNews = Omit<News, "createdAt" | "authorId" | "id">;
