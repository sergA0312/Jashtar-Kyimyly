import styles from './Education.module.scss';

export function Education() {
    const downloads = Array(3).fill({
        title: 'Документ “Название”',
    });

    const trainings = Array(3).fill({
        title: 'Тренинг “Название”',
        image: 'https://via.placeholder.com/150',
    });

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Доступные проекты</h2>
            <div className={styles.projectsGrid}>
                {downloads.map((doc, index) => (
                    <div key={index} className={styles.projectCard}>
                        <p className={styles.projectTitle}>{doc.title}</p>
                        <button className={styles.downloadButton}>
                            Скачать
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.projectsGrid}>
                {trainings.map((item, index) => (
                    <div key={index} className={styles.trainingCard}>
                        <img
                            src={item.image}
                            alt={item.title}
                            className={styles.trainingImage}
                        />
                        <p className={styles.trainingTitle}>{item.title}</p>
                    </div>
                ))}
            </div>
            <div className={styles.projectsGrid}>
                {downloads.map((doc, index) => (
                    <div key={index} className={styles.projectCard}>
                        <p className={styles.projectTitle}>{doc.title}</p>
                        <button className={styles.downloadButton}>
                            Скачать
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
