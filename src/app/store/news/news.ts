// src/app/store/news/news.ts
import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

export interface NewsItem {
  id: number;
  data: string;
  news_image: string;
  description: string;
}

export interface NewsResponse {
  news: string;
  news_list: NewsItem[];
}

interface NewsState {
  news: NewsResponse | null;
  loading: boolean;
  error: string | null;
  fetchnews: () => Promise<void>;
}

export const NewsStore = create<NewsState>((set) => ({
  news: null,
  loading: false,
  error: null,

  fetchnews: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/home/");
      set({
        news: {
          news: response.data.news || "Новости",
          news_list: response.data.news_list || [],
        },
        loading: false,
      });
    } catch (err: any) {
      set({
        news: null,
        loading: false,
        error: err.message || "Ошибка загрузки новостей",
      });
    }
  },
}));
