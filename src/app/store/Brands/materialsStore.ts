// src/app/store/materials/materials.ts
import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";
import { AxiosError } from "axios";

export interface Material {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string; // Добавлено опциональное поле description
}

interface MaterialsState {
  materials: Material[];
  loading: boolean;
  error: string | null;
  fetchMaterials: () => Promise<void>;
}

export const useMaterialsStore = create<MaterialsState>((set) => ({
  materials: [],
  loading: false,
  error: null,

  fetchMaterials: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/home/");
      // Данные из API находятся в поле merch_list
      const merchList = response.data.merch_list || [];
      const mappedMaterials = merchList.map((item: any) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        description:
          item.description ||
          "Однозначно, интерактивные прототипы формируют глобальную экономическую сеть и при этом — заблокированы в рамках своих собственных рациональных ограничений. Значимость этих проблем настолько очевидна.",
      }));
      set({ materials: mappedMaterials, loading: false });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      set({
        error: error.response?.data?.message || "Ошибка загрузки товаров",
        loading: false,
      });
    }
  },
}));
