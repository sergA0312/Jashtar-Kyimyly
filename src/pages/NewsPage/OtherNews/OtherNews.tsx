// EventsArchive.tsx
import NewsCard from "@/widgets/NewsCard/NewsCard";
import { useNavigate } from "react-router-dom";
import scss from "./OtherNews.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { NewsStore } from "@/app/store/news/news";
import { NewsDetailStore } from "@/app/store/news/newsDetail";
interface Event {
  id: number;
  img: string;
  title: string;
  description: string;
}

export function OtherNews() {
  const usenavigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { news, loading, error, fetchnews } = NewsStore();
  useEffect(() => {
    fetchnews();
  }, [fetchnews]);
  const { fetchNewsDetail } = NewsDetailStore();
  const data = [
    {
      id: 1,
      image:
        "https://groups.google.com/group/digital-services-2024/attach/25a9aa043ccfb/6.jpg?part=0.1&view=1",
      title: "Как уже неоднократно упомянуто",
      description:
        "Как уже неоднократно упомянуто, интерактивные прототипы, вне зависимости от их уровня, должны быть преданы социально-демократической анафеме.",
      date: Date(),
    },
    {
      id: 2,
      image:
        "https://groups.google.com/group/digital-services-2024/attach/25a9aa043ccfb/6.jpg?part=0.1&view=1",
      title: "Как уже неоднократно упомянуто",
      description:
        "Как уже неоднократно упомянуто, интерактивные прототипы, вне зависимости от их уровня, должны быть преданы социально-демократической анафеме.",
      date: Date(),
    },
    {
      id: 3,
      image:
        "https://groups.google.com/group/digital-services-2024/attach/25a9aa043ccfb/6.jpg?part=0.1&view=1",
      title: "Как уже неоднократно упомянуто",
      description:
        "Как уже неоднократно упомянуто, интерактивные прототипы, вне зависимости от их уровня, должны быть преданы социально-демократической анафеме.",
      date: Date(),
    },
  ];
  return (
    <div className="container">
      <div className={scss.news}>
        <div className={scss.newsTitle}>
          <h1>{t("news.otherNews")}</h1>
          <button onClick={() => usenavigate("/news")}>
            {t("landing.button")}
          </button>
        </div>
        <div className={scss.newsCards}>
          {data.slice(0, 3).map((event) => (
            <NewsCard
              onClick={() => usenavigate(`/news/${event.id}`)}
              key={event.id}
              item={event}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
