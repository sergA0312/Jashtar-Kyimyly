import type { FC } from 'react';
import styles from './Management.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { MultiContainer, Typography } from "@/shared/ui";
import { useManagementStore } from "@/app/store/about-movement/managementPerson";
import { useLanguageStore } from "@/app/store/languageStore";

export const Management: FC = () => {
  const { data, loading, error, fetchManagement } = useManagementStore();
  const { currentLang } = useLanguageStore();
  const {t, i18n} = useTranslation()
  useEffect(() => {
    fetchManagement();
  }, [fetchManagement, currentLang]);

  if (loading) return <div className={styles.loading}>Загрузка руководства...</div>;
  if (error) return <div className={styles.error}>Ошибка при загрузке данных: {error}</div>;
  if (!data.length) return <div className={styles.empty}>Нет данных о руководстве</div>;

  return (
    <section className={styles.management}>
      <MultiContainer>
        <div className={styles.content}>
          <Typography variant="h6" color="black" className={styles.title}>
            {t('aboutTheMovement.management')}
          </Typography>

          <div className={styles.cardWrapper}>
            {data.map((person) => (
              <div key={person.id} className={styles.personCard}>
                <img src={person.image} alt={person.full_name} className={styles.personImage} />
                <div className={styles.personInfo}>
                  <div className={styles.shadowOverlay}></div>
                  <Typography variant="bodyText" color="white" className={styles.personName}>
                    {person.full_name} {/* заменили name на full_name */}
                  </Typography>
                  <Typography variant="bodyText" color="white" className={styles.personPosition}>
                    "{person.position}"
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MultiContainer>
    </section>
  );
};
