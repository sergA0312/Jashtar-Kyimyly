import Navpanel from "@/widgets/Navpanel/Navpanel";
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import img1 from "../../shared/assets/images/image (1).png";
import img2 from "../../shared/assets/images/image (2).png";
import img3 from "../../shared/assets/icons/time-line.svg";
import img4 from "../../shared/assets/icons/calendar-line.svg";
import img5 from "../../shared/assets/icons/map-pin-line.svg";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { EventDetailStore } from "@/app/store/events/eventsDetail";
import { useLanguageStore } from "@/app/store/languageStore";

function NameOfTheEvent() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const data = {
    id: 1,
    title: "Название мероприятия",
    description:
      "Безусловно, высокотехнологичная концепция общественного уклада предопределяет высокую востребованность системы массового участия. Значимость этих проблем настолько очевидна, что синтетическое тестирование предопределяет высокую востребованность экспериментов, поражающих по своей масштабности и грандиозности. В своём стремлении повысить качество жизни, они забывают, что сложившаяся структура организации выявляет срочную потребность прогресса профессионального сообщества. ",
    event_status: "2",
    date: new Date(),
    images: [
      {
        id: 1,
        event: 1,
        title: "Photo",
        image: "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
      },
      {
        id: 2,
        event: 1,
        title: "Photo",
        image: "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
      },
      {
        id: 3,
        event: 1,
        title: "Photo",
        image: "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
      },
      {
        id: 4,
        event: 1,
        title: "Photo",
        image: "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
      },
    ],
  };
  // const { eventDetail, fetchEventDetail, loading, error } = EventDetailStore();
  const { currentLang } = useLanguageStore();
  // useEffect(() => {
  //   if (id) {
  //     fetchEventDetail(Number(id));
  //   }
  // }, [id, currentLang]);

  // if (loading) return <div className="loader"></div>;
  // if (error) return <p>Ошибка: {error}</p>;
  // if (!eventDetail) return <p>Нет данных</p>;
  // время
  const time = data.date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // дата
  const fullDate = data.date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div className={`${styles.wrapper} container`}>
      <Navpanel
        text={t("events.home")}
        link="/"
        text2={t("events.events")}
        link2="/events"
        text3={data.title}
      />

      <div className={styles.event}>
        <h1 className={styles.title}>{data.title}</h1>

        <p className={styles.description}>{data.description}</p>

        <div className={styles.imagesBlock}>
          {data.images.length > 0 && (
            <div className={styles.imagesRow}>
              <div className={styles.imagesGroup}>
                <img src={data.images[0]?.image} alt={data.title} />
                <div className={styles.images}>
                  <img src={data.images[1]?.image} alt={data.title} />
                  <img src={data.images[2]?.image} alt={data.title} />
                </div>
              </div>

              <div className={styles.imagesFooter}>
                <img src={data.images[3]?.image} alt={data.title} />
                <img src={data.images[3]?.image} alt={data.title} />
              </div>
            </div>
          )}
        </div>

        <div className={styles.details}>
          <h1 className={styles.detailsTitle}>{t("events.detailevent")}</h1>
          <span className={styles.detail}>
            <img src={img3} alt="" /> {time}
          </span>
          <span className={styles.detail}>
            <img src={img4} alt="" /> {fullDate}{" "}
          </span>
          <span className={styles.detail}>
            <img src={img5} alt="" />
            Улица, Дом
          </span>
        </div>
      </div>
    </div>
  );
}

export default NameOfTheEvent;
