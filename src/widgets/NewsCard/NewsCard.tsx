// src/widgets/NewsCard/NewsCard.tsx
import styles from "./style.module.scss";
import defaultImg from "../../shared/assets/images/photo.png";
import { Calendar } from "lucide-react";

interface NewsItem {
  id: number;
  data: string;
  news_image: string;
  description: string;
}

interface NewsCardProps {
  item: NewsItem;
  onClick?: () => void;
}

function NewsCard({ item, onClick }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getTitle = () => {
    const desc = item.description;
    const firstDot = desc.indexOf(".");
    if (firstDot !== -1 && firstDot < 60) {
      return desc.slice(0, firstDot);
    }
    return desc.length > 55 ? `${desc.slice(0, 55)}...` : desc;
  };

  const getPreview = () => {
    const desc = item.description;
    const title = getTitle();
    let remainingDesc = desc;
    if (desc.startsWith(title)) {
      remainingDesc = desc.slice(title.length).replace(/^[.,\s]+/, "");
    }
    return remainingDesc.length > 100
      ? `${remainingDesc.slice(0, 100)}...`
      : remainingDesc;
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardImage}>
        <img
          src={item.news_image || defaultImg}
          alt="Новость"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImg;
          }}
        />
      </div>
      <div className={styles.cardText}>
        <div className={styles.date}>
          <Calendar size={14} />
          <span>{formatDate(item.data)}</span>
        </div>
        <h3 className={styles.title}>{getTitle()}</h3>
        <p className={styles.description}>{getPreview()}</p>
      </div>
    </div>
  );
}

export default NewsCard;
