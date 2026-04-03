
import styles from './Result.module.scss';
import { MultiContainer, Typography } from '@/shared/ui';

export function Result() {
  return (
    <section className={styles.resultSection}>
      <MultiContainer>
        <div className={styles.content}>
          <Typography variant="title" className={styles.title}  color="black">
          Результаты за 2023–2024 гг. :
          </Typography>
          <ul className={styles.list}>
            <li>Более 30 000 молодых людей вовлечены в деятельность движения.</li>
            <li>Основные форматы: воркшопы, волонтерские инициативы, сессии, профориентации, конкурсы и фестивали.</li>
          </ul>
        </div>
      </MultiContainer>
    </section>
  );
}
