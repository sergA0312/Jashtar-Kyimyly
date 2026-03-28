import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

interface ForgotPasswordState {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string | null;
    forgotPassword: (data: RegisterData) => Promise<void>;
    verifyToken: (data: TokenData) => Promise<void>;
    setNewPassword: (data: NewPasswordData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    email: string;
}

interface TokenData {
    token: string;
}

interface NewPasswordData {
    token: string;
    password: string;
}

export const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
    loading: false,
    error: null,
    success: false,
    message: null,

    forgotPassword: async (data: RegisterData) => {
        set({ loading: true, error: null, success: false, message: null });
        try {
            const response = await axiosInstance.post("/account/password_reset/", data);
            set({ loading: false, success: true, message: response.data });
        } catch (error: any) {
            set({ loading: false, error: error.response?.data?.message || "Ошибка", success: false });
        }
    },

    verifyToken: async (data: TokenData) => {
        set({ loading: true, error: null, success: false, message: null });
        try {
            const response = await axiosInstance.post("/account/password_reset/validate_token/", data);
            set({ loading: false, success: true, message: response.data });
        } catch (error: any) {
            set({ loading: false, error: error.response?.data?.message || "Ошибка", success: false });
        }
    },

    setNewPassword: async (data: NewPasswordData) => {
        set({ loading: true, error: null, success: false, message: null });
        try {
            const response = await axiosInstance.post("/account/password_reset/confirm/", data);
            set({ loading: false, success: true, message: response.data });
        } catch (error: any) {
            set({ loading: false, error: error.response?.data?.message || "Ошибка", success: false });
        }
    },

    logout: () => {
        set({ success: false, error: null, message: null });
    },
}));
