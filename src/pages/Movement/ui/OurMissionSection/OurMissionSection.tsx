import type { FC } from 'react';
import { useEffect } from 'react';
import styles from './OurMissionSection.module.scss';
import { MultiContainer, Typography } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useAboutGoalStore } from '@/app/store/about-movement/ourmissionsection';
import { useLanguageStore } from '@/app/store/languageStore';


  
  export const OurMissionSection: FC = () => {
  const {t, i18n} = useTranslation()
  const { data, loading, error, fetchAboutGoal } = useAboutGoalStore();
  const { currentLang } = useLanguageStore();

  // Обновляем данные при смене языка
  useEffect(() => {
    fetchAboutGoal();
  }, [fetchAboutGoal, currentLang]);

  if (loading) return <div className={styles.loading}>Загрузка целей и миссий...</div>;
  if (error) return <div className={styles.error}>Ошибка при загрузке данных: {error}</div>;
  if (!data) return <div className={styles.empty}>Нет данных о целях</div>;

  return (
    <section className={styles.ourMissionSection}>
      <MultiContainer>
        <div className={styles.content}>
          <Typography variant="h6" color="black" className={styles.title}>
            {t('aboutTheMovement.goals')}
            {data.title}
          </Typography>
          <Typography variant="bodyText" color="black" className={styles.paragraph}>
            {data.description}
          </Typography>

          <hr className={styles.divider} />

          <div className={styles.imageGrid}>
            <div className={styles.galleryTop}>
              {data.images.slice(0, 3).map((img, index) => (
                <img key={index} src={img} alt={`img${index + 1}`} className={styles[`image${index + 2}`]} />
              ))}
            </div>
            <div className={styles.galleryBottom}>
              {data.images.slice(3, 5).map((img, index) => (
                <img key={index} src={img} alt={`img${index + 5}`} className={styles[`image${index + 5}`]} />
              ))}
            </div>
          </div>
        </div>
      </MultiContainer>
    </section>
  );
};
