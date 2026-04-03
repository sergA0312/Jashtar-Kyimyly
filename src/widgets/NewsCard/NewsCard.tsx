import styles from "./style.module.scss";
import defaultImg from "../../shared/assets/images/photo.png";
import { IoCalendarOutline } from "react-icons/io5";

interface Data {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface CardProps {
  item: Data;
  onClick?: () => void;
}

function NewsCard({ item, onClick }: CardProps) {
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
  return (
    <div className={styles.card}>
      <img src={item.image || defaultImg} alt={item.title} onClick={onClick} />
      <div className={styles.cardText}>
        <div className={styles.date}>
          <IoCalendarOutline />
          <p>{formattedDate}</p>
        </div>
        <p>{item.description.slice(0, 60)}...</p>
      </div>
    </div>
  );
}

export default NewsCard;
