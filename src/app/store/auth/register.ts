// store/useAuthStore.ts
import { axiosInstance } from "@/app/api/apiclient";
import { create } from "zustand";

interface RegisterData {
  name: string;
  second_name: string;
  surname: string;
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface UserData {
  name: string;
  second_name: string;
  surname: string;
  full_name: string;
  email: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: UserData | null;
  register: (data: RegisterData) => Promise<void>;
  // logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  return {
    loading: false,
    error: null,
    success: false,
    user: null,

    register: async (data) => {
      set({ loading: true, error: null, success: false });
      try {
        const response = await axiosInstance.post("/account/register/", data);

        console.log("Сырой ответ сервера:", response.data);

        // если сервер возвращает { user: {...} }
        const userData: UserData = response.data.user || response.data;

        console.log("То, что сохраняем:", userData);

        set({ success: true, user: userData });

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("Теперь в localStorage:", localStorage.getItem("user"));
        }
      } catch (err: any) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          err.message ||
          "Неизвестная ошибка";
        set({ error: message });
        throw err;
      } finally {
        set({ loading: false });
      }
    }

    // logout: () => {
    //   if (typeof window !== "undefined") {
    //     localStorage.removeItem("user");
    //   }
    //   set({ user: null, success: false });
    // },
  };
});
