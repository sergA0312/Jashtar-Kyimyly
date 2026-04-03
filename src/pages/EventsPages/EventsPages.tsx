// EventsArchive.tsx
import { eventsStore } from "@/app/store/events/events";
import img from "../../shared/assets/images/photo.png";
import scss from "./EventsPages.module.scss";
import Card from "@/widgets/Card/Card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function EventsPages() {
  const usenavigate = useNavigate();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  const [count, setCount] = useState(3);
  const { event, loading, error, fetchevents } = eventsStore();
  const data = [
    {
      id: 1,
      title: "Название мероприятия",
      description:
        "Безусловно, высокотехнологичная концепция общественного уклада предопределяет высокую востребованность системы массового участия. Значимость этих проблем настолько очевидна, что синтетическое тестирование предопределяет высокую востребованность экспериментов, поражающих по своей масштабности и грандиозности. В своём стремлении повысить качество жизни, они забывают, что сложившаяся структура организации выявляет срочную потребность прогресса профессионального сообщества. ",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 1,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 2,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 3,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 5,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
      ],
    },
    {
      id: 2,
      title: "Название мероприятия",
      description:
        "Безусловно, высокотехнологичная концепция общественного уклада предопределяет высокую востребованность системы массового участия. Значимость этих проблем настолько очевидна, что синтетическое тестирование предопределяет высокую востребованность экспериментов, поражающих по своей масштабности и грандиозности. В своём стремлении повысить качество жизни, они забывают, что сложившаяся структура организации выявляет срочную потребность прогресса профессионального сообщества. ",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 1,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 2,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 3,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 5,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
      ],
    },
    {
      id: 3,
      title: "Название мероприятия",
      description:
        "Безусловно, высокотехнологичная концепция общественного уклада предопределяет высокую востребованность системы массового участия. Значимость этих проблем настолько очевидна, что синтетическое тестирование предопределяет высокую востребованность экспериментов, поражающих по своей масштабности и грандиозности. В своём стремлении повысить качество жизни, они забывают, что сложившаяся структура организации выявляет срочную потребность прогресса профессионального сообщества. ",
      event_status: "2",
      date: Date(),
      images: [
        {
          id: 1,
          title: "Photo",
          event: 1,
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 2,
          title: "Photo",
          event: 1,

          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 3,
          title: "Photo",
          event: 1,

          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          id: 5,
          event: 1,
          title: "Photo",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
        },
      ],
    },
  ];
  useEffect(() => {
    fetchevents();
  }, []);
  // if (loading) {
  //   return <div className="loader"></div>;
  // }
  // if (error) {
  //   return <p style={{ color: "red" }}>{error}</p>;
  // }
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 977) {
  //       setCount(2);
  //     } else {
  //       setCount(3);
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    <div className="container">
      <div className={scss.event}>
        <div className={scss.eventTitle}>
          <h1>{t("landing.upcomingEvents")}</h1>
          <button onClick={() => usenavigate("/")}>
            {t("landing.button")}
          </button>
        </div>
        <div className={scss.eventCards}>
          {data.slice(0, count).map((event) => (
            <Card
              onClick={() => usenavigate(`/events/${event.id}/`)}
              key={event.id}
              item={event}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
