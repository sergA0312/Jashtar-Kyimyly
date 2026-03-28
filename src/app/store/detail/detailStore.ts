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
}

export const useDetailStore = create<DetailState>((set) => ({
  selectedMaterial: null,
  loading: false,
  error: null,

  fetchMaterialById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get<Material>(`home/brand-materials/${id}/`);
      set({ selectedMaterial: response.data, loading: false });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));
