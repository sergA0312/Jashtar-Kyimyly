import { create } from 'zustand';
import { axiosInstance } from '@/app/api/apiclient';
import { useLanguageStore } from '../languageStore';

interface Goal {
  id: number;
  title: string;
  description: string;
  images: string[];
}

interface AboutGoalState {
  data: Goal | null;
  loading: boolean;
  error: string | null;
  fetchAboutGoal: () => Promise<void>;
}

export const useAboutGoalStore = create<AboutGoalState>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchAboutGoal: async () => {
    const lang = useLanguageStore.getState().currentLang;
    axiosInstance.defaults.headers['Accept-Language'] = lang;

    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/about_direction/goals/');
      const apiData = response.data[0]; // Берем первый элемент

      const transformedData: Goal = {
        id: apiData.id ?? 1,
        title: apiData.title,
        description: apiData.description,
        images: apiData.images || [],
      };

      set({ data: transformedData, loading: false });
    } catch (err: any) {
      console.error("Ошибка при загрузке целей:", err.message);
      set({ data: null, loading: false, error: err.message });
    }
  },
}));
