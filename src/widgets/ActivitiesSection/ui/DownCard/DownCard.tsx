import React, { useState, useEffect } from "react";
import styles from "./DownCard.module.scss";
import img from "../../../../shared/assets/images/drop down.svg";
import img1 from "../../../../shared/assets/images/instagram-line.svg";
import img2 from "../../../../shared/assets/images/telegram-2-fill.svg";

interface ActivityCardProps {
    onClick?: () => void;
    bgColor: string;
    index: number;
    show: number;
}

export const DownCard: React.FC<ActivityCardProps> = ({
    onClick,
    bgColor,
    index,
    show,
}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show === index) {
            setShouldRender(true);
            setTimeout(() => setIsVisible(true), 10); // небольшая задержка для запуска анимации
        } else {
            setIsVisible(false);
            setTimeout(() => setShouldRender(false), 500); // время совпадает с transition
        }
    }, [show, index]);

    const handleClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShouldRender(false);
            if (onClick) onClick();
        }, 500);
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`${styles.container} ${isVisible ? styles.visible : styles.hidden
                }`}
            style={{ backgroundColor: bgColor }}
        >
            <h1 className={styles.title}>Волонтерство</h1>
            <p className={styles.subtitle}>Помогай другим и твори добро!</p>
            <p className={styles.text}>
                Идейные соображения высшего порядка, а также синтетическое тестирование
                выявляет срочную потребность вывода текущих активов. В частности,
                реализация измененных плановых заданий играет определяющее значение для
                кластеризации усилий. А ещё многие известные личности лишь добавляют
                фракционных разногласий и объединены в целые классеры себе подобных.
                Повседневная практика показывает, что высокотехнологичная концепция
                общественного уклада выявляет срочную потребность кластеризации усилий.
            </p>
            <div className={styles.buttons}>
                <span>
                    <img src={img2} alt="telegram" />
                </span>
                <span>
                    <img src={img1} alt="instagram" />
                </span>
                <button onClick={handleClick} className={styles.button}>
                    <img src={img} alt="close" />
                </button>
            </div>
        </div>
    );
};
