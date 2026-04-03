import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import img from "../../shared/assets/images/photo.png";
import Card from "@/widgets/Card/Card";
import Navpanel from "@/widgets/Navpanel/Navpanel";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { eventsStore } from "@/app/store/events/events";
import { EventDetailStore } from "@/app/store/events/eventsDetail";
import { useNavigate } from "react-router-dom";

function EventsArchivePage() {
  const data = [
    {
      id: 1,
      title: "Технологическая конференция 2025",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 1,
          event: 1,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 2,
      title: "Форум цифровых инноваций",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 2,
          event: 2,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 3,
      title: "Международный бизнес-саммит",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 3,
          event: 3,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 4,
      title: "Выставка стартапов и инвестиций",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 4,
          event: 4,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 5,
      title: "Конгресс по развитию IT-сектора",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 5,
          event: 5,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 6,
      title: "Образовательный форум будущего",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 6,
          event: 6,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 7,
      title: "Экологический саммит 2025",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 7,
          event: 7,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 8,
      title: "Конференция по кибербезопасности",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 8,
          event: 8,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 9,
      title: "Фестиваль инновационных технологий",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 9,
          event: 9,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 10,
      title: "Международная IT-выставка",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 10,
          event: 10,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 11,
      title: "Форум цифровой трансформации",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 11,
          event: 11,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
    {
      id: 12,
      title: "Саммит разработчиков 2025",
      description: "Описание мероприятия",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 12,
          event: 12,
          title: "Photo",
          image:
            "https://www.gem-center.ru/data/image/NGA/Conf2025-440x300.jpg",
        },
      ],
    },
  ];
  const { t, i18n } = useTranslation();
  // const { event, loading, error, fetchevents } = eventsStore();
  const navigate = useNavigate();
  // const { fetchEventDetail } = EventDetailStore();
  // useEffect(() => {
  //   fetchevents();
  // }, []);
  // 👉 Настройки пагинации
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentEvents = data.slice(startIndex, startIndex + pageSize);

  // 👉 Функция для "умной" пагинации
  const getPaginationRange = () => {
    const delta = 1; // сколько кнопок показывать вокруг текущей
    const range: (number | string)[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);

    if (left > 2) {
      range.push("...");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) {
      range.push("...");
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };
  // if (loading) {
  //   return <p>Загрузка...</p>;
  // }
  // if (error) {
  //   return <p style={{ color: "red" }}>{error}</p>;
  // }
  return (
    <div className={`${styles.eventsArchivePage} container`}>
      <Navpanel
        text={t("events.home")}
        link="/"
        text2={t("events.events")}
        link2="/events"
        text3={t("events.eventArchive")}
      />
      <div className={styles.eventsText2}>
        <h1>{t("events.eventArchive")}</h1>
      </div>

      <div className={styles.eventsArchive2}>
        {currentEvents.map((event) => (
          <Card
            onClick={() => navigate(`/events/${event.id}`)}
            key={event.id}
            item={event}
          />
        ))}
      </div>

      {/* 👉 Пагинация */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          {getPaginationRange().map((page, index) =>
            page === "..." ? (
              <span key={index} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(Number(page))}
                className={currentPage === page ? styles.activePage : ""}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default EventsArchivePage;
