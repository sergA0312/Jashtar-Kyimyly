import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";
import { AxiosError } from "axios";

export interface Material {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
  price: number;
}

interface DetailState {
  selectedMaterial: Material | null;
  loading: boolean;
  error: string | null;
  fetchMaterialById: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useDetailStore = create<DetailState>((set) => ({
  selectedMaterial: null,
  loading: false,
  error: null,

  fetchMaterialById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get<Material>(
        `home/brand-materials/${id}/`,
      );

      if (response.data) {
        set({
          selectedMaterial: {
            id: response.data.id,
            title: response.data.title,
            description: response.data.description || "Описание отсутствует",
            slug: response.data.slug,
            image: response.data.image,
            price: response.data.price,
          },
          loading: false,
        });
      } else {
        set({
          error: "Товар не найден",
          loading: false,
          selectedMaterial: null,
        });
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      set({
        error: error.response?.data?.message || "Ошибка загрузки товара",
        loading: false,
        selectedMaterial: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
