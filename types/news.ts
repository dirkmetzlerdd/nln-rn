import { Timestamp } from "firebase/firestore";

export type News = {
  id: string;
  authorId: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: Timestamp;
  description: string;
  serviceId: string;
};

export type NewNews = Omit<News, "createdAt" | "authorId" | "id">;
