import Navpanel from "@/widgets/Navpanel/Navpanel";
import NewsHeadline from "./NewsHeadline/NewsHeadline";
import OtherNews from "./OtherNews/OtherNews";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { NewsDetailStore } from "@/app/store/news/newsDetail";
import { useEffect } from "react";
import { useLanguageStore } from "@/app/store/languageStore";

function NewsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { newsdetail, fetchNewsDetail, loading, error } = NewsDetailStore();
  const { currentLang } = useLanguageStore();

  useEffect(() => {
    if (id) {
      fetchNewsDetail(Number(id));
    }
  }, [id, currentLang, fetchNewsDetail]);

  // Состояние загрузки
  if (loading) {
    return (
      <>
        <Navpanel
          text={t("news.home")}
          link="/"
          text2={t("news.news")}
          link2="/news"
          text3={t("news.loading") || "Загрузка..."}
        />
        <div
          className="container"
          style={{ padding: "60px 0", textAlign: "center" }}
        >
          <p>Загрузка новости...</p>
        </div>
      </>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <>
        <Navpanel
          text={t("news.home")}
          link="/"
          text2={t("news.news")}
          link2="/news"
          text3={t("news.error") || "Ошибка"}
        />
        <div
          className="container"
          style={{ padding: "60px 0", textAlign: "center" }}
        >
          <p style={{ color: "red" }}>Ошибка: {error}</p>
        </div>
      </>
    );
  }

  // Если нет данных
  if (!newsdetail) {
    return (
      <>
        <Navpanel
          text={t("news.home")}
          link="/"
          text2={t("news.news")}
          link2="/news"
          text3={t("news.notFound") || "Новость не найдена"}
        />
        <div
          className="container"
          style={{ padding: "60px 0", textAlign: "center" }}
        >
          <p>Новость не найдена</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navpanel
        text={t("news.home")}
        link="/"
        text2={t("news.news")}
        link2="/news"
        text3={newsdetail.title || "Новость"}
      />
      <NewsHeadline newsdetail={newsdetail} />
      <OtherNews />
    </>
  );
}

export default NewsPage;
