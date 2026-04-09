// src/store/activityStore.ts
import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

export interface ActivityItem {
  id: number;
  title: string;
  short_description: string;
  full_description: string;
  image: string;
  instagram_url: string | null;
  telegram_url: string | null;
}

export interface ActivityBlock {
  id: number;
  title: string;
  items: ActivityItem[];
}

interface ActivityState {
  data: ActivityBlock | null;
  loading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchActivities: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get<ActivityBlock>("/directions");
      const sortedItems = (response.data.items || []).sort(
        (a, b) => a.id - b.id
      );

      set({
        data: {
          id: response.data.id,
          title: response.data.title,
          items: sortedItems,
        },
        loading: false,
      });
    } catch (err: any) {
      console.error("Ошибка при загрузке направлений:", err.message);

      set({
        data: null,
        loading: false,
        error: err.message,
      });
    }
  },
}));
