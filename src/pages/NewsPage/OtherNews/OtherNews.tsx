// src/pages/NewsPage/OtherNews/OtherNews.tsx
import NewsCard from "@/widgets/NewsCard/NewsCard";
import { NewsStore } from "@/app/store/news/news";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./OtherNews.module.scss";

function OtherNews() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams(); // Получаем ID текущей новости из URL
  const { news, loading, fetchnews } = NewsStore();

  useEffect(() => {
    fetchnews();
  }, [fetchnews]);

  const newsList = news?.news_list || [];

  // Исключаем текущую новость из списка "Другие новости"
  const otherNewsList = newsList.filter((item) => item.id !== Number(id));

  // Показываем только первые 3 новости
  const displayNews = otherNewsList.slice(0, 3);

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loader}>Загрузка других новостей...</div>
      </div>
    );
  }

  if (displayNews.length === 0) {
    return (
      <div className="container">
        <div className={styles.noNews}>
          <p>{t("news.noOtherNews") || "Нет других новостей"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.otherNews}>
        <h2 className={styles.sectionTitle}>
          {t("news.otherNews") || "Другие новости"}
        </h2>
        <div className={styles.newsGrid}>
          {displayNews.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              item={newsItem}
              onClick={() => navigate(`/news/${newsItem.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OtherNews;
