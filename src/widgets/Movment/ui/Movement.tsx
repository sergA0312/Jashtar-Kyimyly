import { Typography } from "@/shared/ui";
import style from "./Movement.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

// Типы данных из API
interface Advantage {
  id: number;
  title: string;
  text: string;
}

interface AboutBlock {
  id: number;
  description?: string;
  advantages?: Advantage[];
}

interface HomePageData {
  about_movent: string;
  about_blocks: AboutBlock[];
}

const Movement = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных с API
  useEffect(() => {
    const fetchHomePageData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://157.230.235.0/api/home/");
        console.log("Данные с сервера:", response.data);
        setData(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Ошибка при загрузке:", err);
        setError(err.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  // Если данные загружаются
  if (loading) {
    return (
      <div className={`${style.movement} container`}>
        <div className={style.loader}>Загрузка...</div>
      </div>
    );
  }

  // Если произошла ошибка
  if (error) {
    return (
      <div className={`${style.movement} container`}>
        <div className={style.error}>Ошибка: {error}</div>
      </div>
    );
  }

  // Получаем блок с преимуществами (id=1)
  const advantagesBlock = data?.about_blocks?.find((block) => block.id === 1);
  const advantages = advantagesBlock?.advantages || [];

  // Заголовок раздела из API или из переводов
  const sectionTitle = data?.about_movent || t("landing.aboutTheMovement");

  // Описание раздела из API (description блока с id=1)
  const sectionDescription =
    advantagesBlock?.description || t("landing.aboutTheMovementDescription");

  return (
    <div className={`${style.movement} container`}>
      <Typography className={style.title} variant="card_title" color="black">
        {sectionTitle}
      </Typography>

      <Typography className={style.bodyText} variant="card_title" color="black">
        {sectionDescription}
      </Typography>

      <div className={style.cards}>
        {advantages.map((advantage) => (
          <div key={advantage.id} className={style.card}>
            <div className={style.circleCard}>
              <div></div>
            </div>
            <h4>{advantage.title}</h4>
            <p>{advantage.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movement;
