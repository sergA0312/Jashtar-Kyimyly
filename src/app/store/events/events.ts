// src/app/store/events/events.ts
import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

// Типы данных из API
export interface EventItem {
  id: number;
  title: string;
  data: string;
  image: string;
  short_text: string;
}

export interface EventsResponse {
  events: string;
  events_list: EventItem[];
}

interface EventsState {
  event: EventsResponse | null;
  loading: boolean;
  error: string | null;
  fetchevents: () => Promise<void>;
}

export const eventsStore = create<EventsState>((set) => ({
  event: null,
  loading: false,
  error: null,

  fetchevents: async () => {
    set({ loading: true, error: null });
    try {
      // Уберите /api/ из пути, так как baseURL уже содержит /api/
      const response = await axiosInstance.get("/home/");
      console.log("Мероприятия загружены:", response.data);

      set({
        event: {
          events: response.data.events || "Мероприятия",
          events_list: response.data.events_list || [],
        },
        loading: false,
      });
    } catch (err: any) {
      console.error("Ошибка при загрузке мероприятий:", err);
      set({
        event: null,
        loading: false,
        error: err.message || "Ошибка загрузки мероприятий",
      });
    }
  },
}));
