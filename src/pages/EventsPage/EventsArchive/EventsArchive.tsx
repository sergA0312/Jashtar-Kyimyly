import { eventsStore } from "@/app/store/events/events";
import Card from "@/widgets/Card/Card";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function EventsArchive() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { event, loading, error, fetchevents } = eventsStore();

  useEffect(() => {
    fetchevents();
  }, [fetchevents]);

  const eventsList = event?.events_list || [];

  // Фильтруем прошедшие мероприятия
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
            {t("events.archive") || "Архив мероприятий"}
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
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {t("events.upcoming") || "Актуальные мероприятия"}
          </button>
        </div>

        {pastEvents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "#999", fontSize: "18px" }}>
              Нет прошедших мероприятий
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: "20px",
                padding: "10px",
                background: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>
                Всего в архиве: {pastEvents.length}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "30px",
              }}
            >
              {pastEvents.map((eventItem) => (
                <Card
                  key={eventItem.id}
                  item={eventItem}
                  onClick={() => navigate(`/events/${eventItem.id}/`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventsArchive;
