export type News = {
  id: string;
  authorId: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: number;
};

export type NewNews = Omit<News, "createdAt" | "authorId" | "id">;
