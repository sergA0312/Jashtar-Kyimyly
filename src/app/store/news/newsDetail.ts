import { axiosInstance } from "@/app/api/apiclient";
import { AxiosError } from "axios";
import { create } from "zustand";

interface NewsDetail {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface NewsDetailState {
  newsdetail: NewsDetail | null; 
  loading: boolean;
  error: string | null;
  fetchNewsDetail: (id: number) => Promise<void>;
  reset: () => void; 
}

export const NewsDetailStore = create<NewsDetailState>((set) => ({
  newsdetail: null,
  loading: false,
  error: null,

  fetchNewsDetail: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get<NewsDetail>(`content/news/${id}/`);

      const apiData = response.data; 
      const transformedData = {
        id: apiData.id,
        title: apiData.title,
        description: apiData.description,
        date: apiData.date,
        image: apiData.image,
      };

      set({ newsdetail: transformedData });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      set({ error: error.response?.data?.message || "Что-то пошло не так" });
      console.error("Ошибка при загрузке детали новости:", error);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ newsdetail: null, error: null, loading: false }),
}));
