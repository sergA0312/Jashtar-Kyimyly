import React from "react";
import { ImageIcon } from "lucide-react";
import styles from "./AlbumCard.module.scss";

interface AlbumCardProps {
  title: string | null;
  event: string;
  imageUrl: string;
  count: number;
  onClick?: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ title, event, imageUrl, count, onClick }) => {
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={title||""} className={styles.image} />
        <div className={styles.count}>
          <ImageIcon className={styles.icon} />
          <span>{count}</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.event}>&quot;{event}&quot;</p>
      </div>
    </article>
  );
};
