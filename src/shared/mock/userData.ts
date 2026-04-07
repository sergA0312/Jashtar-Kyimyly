// src/shared/mock/userData.ts

export interface UserData {
  email: string;
  full_name?: string;
  name?: string;
  avatar?: string;
  id?: number;
  role?: string;
  phone?: string;
  city?: string;
}

// URL аватарки по умолчанию
const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/32.jpg";

// Тестовые данные пользователя
export const MOCK_USER_DATA: UserData = {
  id: 1,
  email: "test@example.com",
  full_name: "Тестовый Пользователь",
  name: "Тестовый",
  role: "user",
  phone: "+7 (999) 123-45-67",
  city: "Москва",
  avatar: DEFAULT_AVATAR, // Добавляем аватарку
};

// Функция для имитации API запроса
export const mockFetchUserData = (): Promise<UserData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER_DATA);
    }, 500);
  });
};
