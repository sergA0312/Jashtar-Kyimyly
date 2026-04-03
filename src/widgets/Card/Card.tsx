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
interface CardProps {
  item: Events;
  onClick?: () => void;
}

function Card({ item, onClick }: CardProps) {
  const navigate = useNavigate();
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
      })
    : "";
  return (
    <div className={styles.card}>
      {item.images.slice(0, 1).map((img) => (
        <img key={img.id} onClick={onClick} src={img.image} alt={item.title} />
      ))}
      <div className={styles.Footercard}>
        <div className={styles.date}>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.title}>
          <h3>{item.title.slice(0, 22)}...</h3>
          <p>{item.description.slice(0, 50)}...</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
