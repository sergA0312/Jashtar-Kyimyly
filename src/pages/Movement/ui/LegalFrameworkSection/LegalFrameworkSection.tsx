
import { MultiContainer, Typography } from "@/shared/ui";
import styles from "./LegalFrameworkSection.module.scss";
import CalendarIcon from "@/shared/assets/images/Legalframeworksection1.svg";
import { FC } from "react";
import { useTranslation } from "react-i18next";


export const LegalFrameworkSection: FC = () => {
  const {t, i18n} = useTranslation()
  const laws = [
    {
      date: "04.06.2024",
      title: 'Закон “О молодёжи”',
      description: 'Закон Кыргызской Республики №157',
      link: '#',
    },
    {
      date: "04.06.2024",
      title: 'Закон “О молодёжи”',
      description: 'Закон Кыргызской Республики №157',
      link: '#',
    },
    {
      date: "04.06.2024",
      title: 'Закон “О молодёжи”',
      description: 'Закон Кыргызской Республики №157',
      link: '#',
    },
  ];

  return (
    <section className={styles.legalFrameworkSection}>
      <MultiContainer>
        <div className={styles.content}>
          <Typography variant="h6" color="white" className={styles.title}>
          {t('aboutTheMovement.laws')}
          </Typography>
          <div className={styles.cardsWrapper}>
            {laws.map((law, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.date}>
                  <span className={styles.icon}>
                    <img src={CalendarIcon} alt="calendar icon" />
                  </span>
                  <span>{law.date}</span>
                </div>
                <div className={styles.lawTitle}>{law.title}</div>
                <div className={styles.lawDesc}>{law.description}</div>
                <a className={styles.downloadBtn} href={law.link}>
                  Скачать PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </MultiContainer>
    </section>
  );
};