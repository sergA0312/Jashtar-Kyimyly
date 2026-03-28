import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

// Тип для массива картинок, которые приходят от API
interface ProjectImage {
  id: number;
  project: number;
  image: string;
}

// Тип для объекта проекта, который приходит от API
interface ProjectApi {
  id: number;
  title: string;
  description: string;
  images: ProjectImage[];
}

// Упрощённый проект, который используем во фронте
interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // берём только первую картинку
}

interface ProjectState {
  data: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      // Типизируем ответ от API
      const response = await axiosInstance.get<ProjectApi[]>("/content/projects/");
      const apiData = response.data;

      // Трансформируем данные под удобный формат
      const transformedData: Project[] = apiData.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.images.length > 0 ? item.images[0].image : "",
      }));

      set({ data: transformedData, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Ошибка при загрузке проектов:", err.message);
        set({ data: [], loading: false, error: err.message });
      } else {
        console.error("Неизвестная ошибка:", err);
        set({ data: [], loading: false, error: "Неизвестная ошибка" });
      }
    }
  },
}));
