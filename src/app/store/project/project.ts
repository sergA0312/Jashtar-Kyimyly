import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

// Типы API
interface ProjectItemApi {
  id: number;
  title: string;
  image: string;
  short_text: string;
}

interface ProjectGroupApi {
  id: number;
  title: string;
  goals_title: string;
  project_items: ProjectItemApi[];
}

// Тип для UI
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Состояние стора
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
      // Получаем массив групп проектов
      const response = await axiosInstance.get<ProjectGroupApi[]>(
        "/project/projects/"
      );
      const apiData = response.data;

      // Извлекаем все проекты из project_items
      const allProjects: Project[] = apiData.flatMap((group) =>
        group.project_items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.short_text,
          image: item.image,
        }))
      );

      set({ data: allProjects, loading: false });
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
