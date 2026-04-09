import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";
import { AxiosError } from "axios";

export interface GoalsProject {
  id: number;
  text: string;
}

export interface GalleryImage {
  id: number;
  image: string;
  order: number;
}

export interface ProjectDetail {
  id: number;
  title: string;
  image: string;
  full_text: string;
  goals_title: string;
  goals: GoalsProject[];
  gallery_images: GalleryImage[];
}

interface DetailProjectState {
  data: ProjectDetail | null;
  loading: boolean;
  error: string | null;
  fetchProjectById: (id: number) => Promise<void>;
}

export const useDetailProjectStore = create<DetailProjectState>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchProjectById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get<ProjectDetail>(
        `/project/projects-detail/${id}/`
      );
      set({ data: response.data, loading: false });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));
