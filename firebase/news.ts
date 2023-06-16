import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NewNews } from "../types/news";
import { initialize } from "./main";

const { auth, firestore } = initialize();

export function addNewNews(news: NewNews) {
  if (!auth?.currentUser) return;

  setDoc(doc(collection(firestore, `service/${news.serviceId}/news`)), {
    ...news,
    createdAt: serverTimestamp(),
    authorId: auth.currentUser.uid,
  });
}
