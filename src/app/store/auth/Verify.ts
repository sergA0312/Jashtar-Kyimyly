import { create } from "zustand";
import { axiosInstance } from "@/app/api/apiclient";

interface VerifyState {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string | null;
    verify: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    uid: number;
    token: string;
}

export const useVerifyStore = create<VerifyState>((set) => ({
    loading: false,
    error: null,
    success: false,
    message: null,
    verify: async (data: RegisterData) => {
        set({ loading: true, error: null, success: false });
        try {
            const response = await axiosInstance.post("/account/verify-email/", data);
            set({ success: true, error: null, loading: false, message: response.data });
        } catch (err: any) {
            set({ error: err.response?.data?.message || "Something went wrong", success: false });
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        localStorage.removeItem("user");
        set({ success: false, error: null, message: null });
    },
}));
