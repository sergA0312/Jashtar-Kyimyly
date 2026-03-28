import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";
import { useLanguageStore } from "../languageStore";

interface ManagementPerson {
  id: number;
  image: string;
  full_name: string; // изменено
  position: string;
}

interface ManagementState {
  data: ManagementPerson[];
  loading: boolean;
  error: string | null;
  fetchManagement: () => Promise<void>;
}

export const useManagementStore = create<ManagementState>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchManagement: async () => {
    const lang = useLanguageStore.getState().currentLang;
    axiosInstance.defaults.headers["Accept-Language"] = lang;

    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/about_direction/management/");
      const apiData = response.data;

      const transformedData: ManagementPerson[] = apiData.map((person: any) => ({
        id: person.id,
        image: person.image,
        full_name: person.full_name, // используем full_name
        position: person.position,
      }));

      set({ data: transformedData, loading: false });
    } catch (err: any) {
      console.error("Ошибка при загрузке руководства:", err.message);
      set({ data: [], loading: false, error: err.message });
    }
  },
}));
