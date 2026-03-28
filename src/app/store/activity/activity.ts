// src/store/activityStore.ts
import { create } from 'zustand';
import { axiosInstance } from '@/app/api/apiclient';

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface ActivityState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  loading: false,
  error: null,

  fetchActivities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/content/activity_direction/'); // Вот это изменение!
      
      // Здесь может понадобиться трансформация данных, в зависимости от того, как ваше API их возвращает.
      // Например, если API возвращает `results` внутри объекта.
      const transformedData = response.data; 

      set({ activities: transformedData, loading: false });
    } catch (err: any) {
      set({ activities: [], loading: false, error: err.message });
    }
  },
}));