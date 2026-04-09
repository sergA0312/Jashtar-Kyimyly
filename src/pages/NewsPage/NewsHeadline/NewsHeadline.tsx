// src/pages/NewsPage/NewsHeadline/NewsHeadline.tsx
import styles from "./style.scss";
import defaultImg from "@/shared/assets/images/photo.png";
import { Calendar } from "lucide-react";

interface NewsHeadlineProps {
  newsdetail: {
    id: number;
    title?: string;
    data: string;
    news_image: string;
    description: string;
  };
}

function NewsHeadline({ newsdetail }: NewsHeadlineProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.newsHeadline}>
      <div className="container">
        <div className={styles.headlineContent}>
          <div className={styles.headlineImage}>
            <img
              src={newsdetail.news_image || defaultImg}
              alt={newsdetail.title || "Новость"}
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImg;
              }}
            />
          </div>
          <div className={styles.headlineText}>
            <div className={styles.date}>
              <Calendar size={16} />
              <span>{formatDate(newsdetail.data)}</span>
            </div>
            <h1>{newsdetail.title || "Новость"}</h1>
            <p>{newsdetail.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsHeadline;
