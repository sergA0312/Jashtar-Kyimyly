import React from 'react';
import styles from './FinishedProject.module.scss';

export function FinishedProject() {

    const completedProjects = Array(6).fill({
        title: 'Название проекта "Название"',
    });
    const renderProjectCard = (
        project: { title: string },
        type: 'available' | 'completed',
        index: number
    ) => {
        const cardTypeClass = type === 'available' ? styles.availableProject : styles.completedProject;

        return (
            <div
                key={index}
                className={`${styles.projectCard} ${cardTypeClass}`}
                style={{ '--index': index } as React.CSSProperties}
                onClick={() => console.log(`Clicked ${type} project ${index}`)}
            >
                <h3 className={styles.projectTitle}>
                    {project.title}
                </h3>
            </div>
        );
    };
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
                Законченные проекты
            </h2>

            <div className={styles.projectsGrid}>
                {completedProjects.map((project, index) =>
                    renderProjectCard(project, 'completed', index)
                )}
            </div>
        </section>
    );
}
