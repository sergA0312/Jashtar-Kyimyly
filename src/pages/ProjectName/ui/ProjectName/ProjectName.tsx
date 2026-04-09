import { MultiContainer, Typography } from "@/shared/ui";
import styles from "./ProjectName.module.scss";
import { useParams } from "react-router-dom";
import { useDetailProjectStore } from "@/app/store/projectDetail/projectDetail";
import { useEffect } from "react";

export const ProjectName = () => {
  const { id } = useParams<{ id: string }>();
  const { data, fetchProjectById } = useDetailProjectStore();
  useEffect(() => {
    if (id) {
      fetchProjectById(Number(id));
    }
  }, [id, fetchProjectById]);
  return (
    <MultiContainer className={styles.projectBlock}>
      <div className={styles.projectHeader}>
        <Typography variant="title" color="black" weight="600">
          Проект {data?.title}
        </Typography>
      </div>
      <div className={styles.projectContent}>
        <Typography variant="desc" color="black" weight="400">
          {data?.full_text}
        </Typography>
      </div>
      <img src={data?.image} />
    </MultiContainer>
  );
};
