import { useEffect, type FC } from "react";
import styles from "./Goals.module.scss";
import { MultiContainer, Typography } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useDetailProjectStore } from "@/app/store/projectDetail/projectDetail";

export const Goals: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, fetchProjectById } = useDetailProjectStore();
  useEffect(() => {
    if (id) {
      fetchProjectById(Number(id));
    }
  }, [id, fetchProjectById]);
  const goals = data?.goals || [];

  const middle = Math.ceil(goals.length / 2);

  const firstColumn = goals.slice(0, middle);
  const secondColumn = goals.slice(middle);

  return (
    <MultiContainer className={styles.goalsBlock}>
      <div className={styles.goalsHeader}>
        <Typography variant="title" color="black" weight="600">
          {data?.goals_title}
        </Typography>
      </div>
      <div className={styles.goalsContent}>
        <div className={styles.goalsContent}>
          <ul>
            {firstColumn.map((item) => (
              <li key={item.id}>
                <Typography variant="desc" color="black" weight="400">
                  {item.text}
                </Typography>
              </li>
            ))}
          </ul>
          <ul>
            {secondColumn.map((item) => (
              <li key={item.id}>
                <Typography variant="desc" color="black" weight="400">
                  {item.text}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MultiContainer>
  );
};
