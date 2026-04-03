import type { FC } from "react";
import { useEffect } from "react";
import styles from "./MovementSection.module.scss";
import { MultiContainer, Typography } from "@/shared/ui";
import { useAboutMovementStore } from "@/app/store/about-movement/aboutMovementStore";

export const MovementSection: FC = () => {
  const { data, loading, error, fetchAboutMovement } = useAboutMovementStore();

  useEffect(() => {
    fetchAboutMovement();
  }, [fetchAboutMovement]);

  if (loading) {
    return <div className={styles.loading}>Загрузка данных о движении...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>Ошибка при загрузке данных: {error}</div>
    );
  }

  if (!data) {
    return <div className={styles.empty}>Нет данных о движении</div>;
  }

  return (
    <section className={styles.movementSection}>
      <MultiContainer>
        <div className={styles.content}>
          <Typography variant="h6" color="black" className={styles.title}>
            {data.title}
          </Typography>
          <Typography
            variant="bodyText"
            color="black"
            className={styles.paragraph}
          >
            {data.description}
          </Typography>
          <div className={styles.imageWrapper}>
            <img src={data.image} alt="Изображение" className={styles.image} />
          </div>
        </div>
      </MultiContainer>
    </section>
  );
};
