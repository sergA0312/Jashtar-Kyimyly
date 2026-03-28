import type { FC } from "react";
import styles from "./Goals.module.scss";
import { MultiContainer } from "@/shared/ui";

export const Goals: FC = () => {
  return (
    <MultiContainer className={styles.goalsBlock}>
      <div className={styles.goalsHeader}>
        Цели и задачи проекта
      </div>
      <div className={styles.goalsContent}>
        <ul>
          <li>Есть над чем задуматься:</li>
          <li>тщательные исследования</li>
          <li>конкурентов направят популярность</li>
          <li>среди определенных слоев населения,</li>
          <li>а значит, должны быть заблокированы</li>
          <li>в рамках своих собственных</li>
          <li>рациональных и ограничений.</li>
        </ul>
        <ul>
          <li>Есть над чем задуматься:</li>
          <li>тщательные исследования</li>
          <li>конкурентов направят популярность</li>
          <li>среди определенных слоев населения,</li>
          <li>а значит, должны быть заблокированы</li>
          <li>в рамках своих собственных</li>
          <li>рациональных и.</li>
        </ul>
      </div>
    </MultiContainer>
  );
};
