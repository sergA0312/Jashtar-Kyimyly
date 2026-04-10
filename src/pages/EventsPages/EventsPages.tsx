import { eventsStore } from "@/app/store/events/events";
import Card from "@/widgets/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import scss from "./EventsPages.module.scss";

export function EventsPages() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [count, setCount] = useState(3);
  const { event, loading, error, fetchevents } = eventsStore();

  useEffect(() => {
    fetchevents();
  }, [fetchevents]);

  useEffect(() => {
    const handleResize = () => {
      setCount(window.innerWidth <= 977 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div style={{ padding: "40px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h1 style={{ fontSize: "32px", fontWeight: "700" }}>
              {t("landing.upcomingEvents")}
            </h1>
            <button
              onClick={() => navigate("/events")}
              style={{
                padding: "10px 24px",
                background: "transparent",
                border: "2px solid #0066cc",
                color: "#0066cc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {t("landing.button")}
            </button>
          </div>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #0066cc",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            ></div>
            <p>Загрузка мероприятий...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ padding: "40px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h1 style={{ fontSize: "32px", fontWeight: "700" }}>
              {t("landing.upcomingEvents")}
            </h1>
            <button
              onClick={() => navigate("/events")}
              style={{
                padding: "10px 24px",
                background: "transparent",
                border: "2px solid #0066cc",
                color: "#0066cc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {t("landing.button")}
            </button>
          </div>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "red" }}>Ошибка: {error}</p>
            <button
              onClick={() => fetchevents()}
              style={{
                marginTop: "20px",
                padding: "10px 24px",
                background: "#0066cc",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Повторить
            </button>
          </div>
        </div>
      </div>
    );
  }

  const eventsList = event?.events_list || [];

  if (eventsList.length === 0) {
    return (
      <div className="container">
        <div style={{ padding: "40px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h1 style={{ fontSize: "32px", fontWeight: "700" }}>
              {t("landing.upcomingEvents")}
            </h1>
            <button
              onClick={() => navigate("/events")}
              style={{
                padding: "10px 24px",
                background: "transparent",
                border: "2px solid #0066cc",
                color: "#0066cc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {t("landing.button")}
            </button>
          </div>
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "#999", fontSize: "18px" }}>
              Нет доступных мероприятий
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={scss.event}>
        <div className={scss.eventTitle}>
          <h1>{t("landing.upcomingEvents")}</h1>
          <button onClick={() => navigate("/events")}>
            {t("landing.button")}
          </button>
        </div>
        <div className={scss.eventCards}>
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

export default EventsPages;
