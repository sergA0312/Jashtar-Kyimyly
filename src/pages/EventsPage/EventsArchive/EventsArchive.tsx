import { eventsStore } from "@/app/store/events/events";
import Card from "@/widgets/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import scss from "./style.module.scss";
export function EventsArchive() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { event, loading, error, fetchevents } = eventsStore();
  const [count, setCount] = useState(3);

  useEffect(() => {
    fetchevents();
  }, [fetchevents]);

  const eventsList = event?.events_list || [];
  useEffect(() => {
    const handleResize = () => {
      setCount(window.innerWidth <= 977 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pastEvents = eventsList.filter((eventItem) => {
    if (!eventItem.data) return false;
    const eventDate = new Date(eventItem.data);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  });

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "40px" }}>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
          Ошибка: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={scss.eventPage}>
        <div className={scss.eventPageTitle}>
          <h1>{t("events.eventArchive")}</h1>
          <button onClick={() => navigate("/events")}>
            {t("landing.button")}
          </button>
        </div>
        <div className={scss.eventPageCards}>
          {eventsList.slice(0, count).map((eventItem) => (
            <Card
              onClick={() => navigate(`/events/${eventItem.id}/`)}
              key={eventItem.id}
              item={eventItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsArchive;
