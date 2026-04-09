import React from "react";
import styles from "./style.module.scss";
import defaultImg from "../../shared/assets/images/photo.png";
import { useNavigate } from "react-router-dom";

interface Images {
  id: number;
  event: number;
  image: string;
}

interface Events {
  id: number;
  title: string;
  description: string;
  date: string;
  event_status: string;
  images: Images[];
}

// Новый тип из API
interface EventItem {
  id: number;
  title: string;
  data: string;
  image: string;
  short_text: string;
}

type CardItem = Events | EventItem;

interface CardProps {
  item: CardItem;
  onClick?: () => void;
}

function Card({ item, onClick }: CardProps) {
  const navigate = useNavigate();

  // Функция для проверки типа item
  const isNewFormat = (item: CardItem): item is EventItem => {
    return "data" in item && "short_text" in item;
  };

  // Получение изображения
  const getImageUrl = () => {
    if (isNewFormat(item)) {
      // Для нового формата из API
      console.log("Новый формат, image:", item.image);
      return item.image || defaultImg;
    } else {
      // Для старого формата
      console.log("Старый формат, images:", item.images);
      return item.images?.[0]?.image || defaultImg;
    }
    return item.images?.[0]?.image || "";
  };

  // Получение заголовка
  const getTitle = () => {
    const title = item.title;
    return title.length > 22 ? `${title.slice(0, 22)}...` : title;
  };

  // Получение описания
  const getDescription = () => {
    let description = "";
    if (isNewFormat(item)) {
      description = item.short_text;
    } else {
      description = item.description;
    }
    return description.length > 50
      ? `${description.slice(0, 50)}...`
      : description;
  };

  // Получение даты
  const getDate = () => {
    if (isNewFormat(item)) {
      return item.data;
    }
    return item.date;
  };

  // Форматирование даты
  const formattedDate = getDate()
    ? new Date(getDate()!).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
      })
    : "";

  // Обработчик клика
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/events/${item.id}/`);
    }
  };

  const imageUrl = getImageUrl();
  console.log("Итоговый URL изображения:", imageUrl);

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={imageUrl}
        alt={item.title}
        onError={(e) => {
          console.error("Ошибка загрузки изображения:", imageUrl);
          (e.target as HTMLImageElement).src = defaultImg;
        }}
      />
      <div className={styles.Footercard}>
        <div className={styles.date}>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.title}>
          <h3>{getTitle()}</h3>
          <p>{getDescription()}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
