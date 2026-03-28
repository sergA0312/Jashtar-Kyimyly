import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

interface User {
  refresh: string;
  access: string;
  user: {
    id: number;
    email: string;
    full_name: string;
  }
}

interface RegisterData {
  email: string;
  password: string;
}

interface RegisterState {
  formData: RegisterData;

  user: User | null;
  setField: (field: keyof RegisterData, value: string) => void;
  submit: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  // logout: () => void;
}

export const useLogeinStore = create<RegisterState>((set, get) => ({
  formData: {
    email: "",
    password: "",
  },
  data: null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
  success: false,

  setField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  submit: async () => {
    set({ loading: true, error: null, success: false });

    try {
      const { formData } = get();
      await axiosInstance.post("account/login/", formData);
      set({ success: true });
      // const response = await axiosInstance.post("account/login/", formData);

      await axiosInstance.post("account/login/", formData);
      set({ success: true });
      const response = await axiosInstance.post("account/login/", formData);
      const userData: User = response.data.user;
      set({ user: userData, success: true });
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  // logout: () => {
  //   set({ user: null, success: false });
  //   localStorage.removeItem("user");
  // },
}));
