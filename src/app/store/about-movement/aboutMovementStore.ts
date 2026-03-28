import { create } from 'zustand';
import { axiosInstance } from '@/app/api/apiclient';

interface AboutMovement {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface AboutMovementState {
  data: AboutMovement | null;
  loading: boolean;
  error: string | null;
  fetchAboutMovement: () => Promise<void>;
}

export const useAboutMovementStore = create<AboutMovementState>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAboutMovement: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/about_direction/history/');
      
      // Берём первый элемент массива
      const apiData = response.data[0];

      const transformedData = {
        id: apiData.id ?? 1, // Если ID нет, можно задать 1
        title: apiData.title,
        description: apiData.description,
        image: apiData.image, // Полный URL уже есть в API
      };

      console.log("Данные о движении:", transformedData);

      set({ data: transformedData, loading: false });
    } catch (err: any) {
      console.error("Ошибка при загрузке данных:", err.message);
      set({ data: null, loading: false, error: err.message });
    }
  },
}));
