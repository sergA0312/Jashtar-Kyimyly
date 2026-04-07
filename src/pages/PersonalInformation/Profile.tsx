import React from "react";
import styles from "./Profile.module.scss";
import { OpenProject } from "./ui/OpenProject/OpenProject";
import { FinishedProject } from "./ui/FinishedProject/FinishedProject";
import { Education } from "./ui/Education/Education";
import logo from "@/shared/assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import {
  MOCK_USER_DATA,
  mockFetchUserData,
  UserData,
} from "@/shared/mock/userData";

export const Profile = () => {
  const navigationItems = [
    "Редактировать",
    "Проекты",
    "Обучающие материалы",
    "Telegram-канал",
    "Ваши заявки",
  ];
  const [activeItem, setActiveItem] = React.useState(1);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  // URL для аватарки (можно использовать любой из предложенных)
  const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";
  // Альтернативные варианты:
  // const avatarUrl = "https://randomuser.me/api/portraits/women/68.jpg";
  // const avatarUrl = "https://ui-avatars.com/api/?background=2e6cf4&color=fff&rounded=true&size=90&name=User";
  // const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=user123";

  // Загрузка данных
  React.useEffect(() => {
    const storedData = localStorage.getItem("user");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Добавляем аватарку, если её нет в данных
        if (!parsedData.avatar) {
          parsedData.avatar = avatarUrl;
        }
        setUserData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка парсинга:", error);
        loadMockData();
      }
    } else {
      loadMockData();
    }
  }, []);

  const loadMockData = async () => {
    try {
      const data = await mockFetchUserData();
      // Добавляем аватарку к данным
      data.avatar = avatarUrl;
      setUserData(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      MOCK_USER_DATA.avatar = avatarUrl;
      setUserData(MOCK_USER_DATA);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case 1:
        return (
          <div className={styles.projectsContainer}>
            <OpenProject />
            <FinishedProject />
          </div>
        );
      case 2:
        return <Education />;
      case 3:
        return (
          <div className={styles.telegramContainer}>
            <h2 className={styles.sectionTitle}>Telegram-канал</h2>
            <p>Контент Telegram-канала будет здесь</p>
          </div>
        );
      case 4:
        return (
          <div className={styles.applicationsContainer}>
            <h2 className={styles.sectionTitle}>Ваши заявки</h2>
            <p>Список ваших заявок будет здесь</p>
          </div>
        );
      default:
        return <p>Выберите раздел</p>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderContainer}>
          <div className={styles.loader}>Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Ошибка загрузки данных</h2>
          <p>Пожалуйста, попробуйте позже</p>
          <button onClick={loadMockData} className={styles.retryButton}>
            Повторить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} alt="Logo" src={logo} />
        <h1 className={styles.title}>Личный кабинет</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <span>Выйти</span>
          <svg
            className={styles.logoutIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.avatar}>
              <img
                src={userData.avatar || avatarUrl}
                alt="User avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = avatarUrl;
                }}
              />
            </div>

            <div className={styles.userInfo}>
              <h2 className={styles.userName}>
                {userData?.full_name || userData?.name || "Пользователь"}
              </h2>
              <p className={styles.userEmail}>
                {userData?.email || "Email не указан"}
              </p>
            </div>

            <button className={styles.editButton}>Редактировать</button>

            <nav className={styles.navigation}>
              {navigationItems.slice(1).map((item, index) => (
                <button
                  key={index}
                  className={`${styles.navItem} ${
                    index + 1 === activeItem ? styles.active : ""
                  }`}
                  onClick={() => setActiveItem(index + 1)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className={styles.contentArea}>{renderContent()}</main>
      </div>
    </div>
  );
};
