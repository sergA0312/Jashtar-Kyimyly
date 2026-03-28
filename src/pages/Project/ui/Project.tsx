import type { FC } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navpanel from "@/widgets/Navpanel/Navpanel";
import styles from "./Project.module.scss";
import { useTranslation } from "react-i18next";
import { useProjectStore } from "@/app/store/project/project";

export const Project: FC = () => {
  const { data, loading, error, fetchProjects } = useProjectStore();
  const {t, i18n} = useTranslation()
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) return <div className={styles.loading}>Загрузка проектов...</div>;
  if (error) return <div className={styles.error}>Ошибка при загрузке данных: {error}</div>;
  if (!data.length) return <div className={styles.empty}>Проекты не найдены</div>;

  return (
    <div className={styles.projectSection}>
      <Navpanel text={t('projects.home')} link="/" text2={t('projects.projects')}/>
      <h2 className={styles.sectionTitle}>{t('projects.projects')}</h2>
      <div className={styles.projectGrid}>
        {data.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <img src={project.image} alt={project.title} className={styles.projectImage} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
              <Link to={`project/${project.id}`}>
                <button className={styles.learnMoreButton}>Узнать больше</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
