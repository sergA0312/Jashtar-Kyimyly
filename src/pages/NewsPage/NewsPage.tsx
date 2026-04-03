import Navpanel from "@/widgets/Navpanel/Navpanel";
import NewsHeadline from "./NewsHeadline/NewsHeadline";
import { OtherNews } from "./OtherNews/OtherNews";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { NewsDetailStore } from "@/app/store/news/newsDetail";
import { useEffect } from "react";
import { useLanguageStore } from "@/app/store/languageStore";

function NewsPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams(); // <-- id из URL
  const { newsdetail, fetchNewsDetail, loading, error } = NewsDetailStore();
  const { currentLang } = useLanguageStore();
  useEffect(() => {
    if (id) {
      fetchNewsDetail(Number(id));
    }
  }, [id, currentLang]);
  const data = {
    id: 1,
    image:
      "https://groups.google.com/group/digital-services-2024/attach/25a9aa043ccfb/6.jpg?part=0.1&view=1",
    title: "Как уже неоднократно упомянуто",
    description:
      "Как уже неоднократно упомянуто, интерактивные прототипы, вне зависимости от их уровня, должны быть преданы социально-демократической анафеме.",
    date: Date(),
  };
  // if (loading) return <p>Загрузка...</p>;
  // if (error) return <p>Ошибка: {error}</p>;
  // if (!newsdetail) return <p>Нет данных</p>;

  return (
    <>
      <Navpanel
        text={t("news.home")}
        link="/"
        text2={t("news.news")}
        link2="/news"
        text3={data.title}
      />
      <NewsHeadline newsdetail={data} />
      <OtherNews />
    </>
  );
}

export default NewsPage;
