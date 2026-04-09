// src/app/store/news/newsDetail.ts
import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

export interface NewsDetailItem {
  id: number;
  title?: string;
  data: string;
  news_image: string;
  description: string;
}

interface NewsDetailState {
  newsdetail: NewsDetailItem | null;
  loading: boolean;
  error: string | null;
  fetchNewsDetail: (id: number) => Promise<void>;
}

export const NewsDetailStore = create<NewsDetailState>((set) => ({
  newsdetail: null,
  loading: false,
  error: null,

  fetchNewsDetail: async (id: number) => {
    set({ loading: true, error: null });
    try {
      // Если есть отдельный эндпоинт для детальной новости
      const response = await axiosInstance.get(`/news/${id}/`);
      set({ newsdetail: response.data, loading: false });
    } catch (err: any) {
      // Если нет отдельного эндпоинта, получаем из списка
      try {
        const homeResponse = await axiosInstance.get("/home/");
        const newsList = homeResponse.data.news_list || [];
        const foundNews = newsList.find((item: any) => item.id === id);

        if (foundNews) {
          set({
            newsdetail: {
              ...foundNews,
              title: foundNews.title || foundNews.description?.slice(0, 50),
            },
            loading: false,
          });
        } else {
          throw new Error("Новость не найдена");
        }
      } catch (error) {
        set({
          newsdetail: null,
          loading: false,
          error: err.message || "Ошибка загрузки новости",
        });
      }
    }
  },
}));
