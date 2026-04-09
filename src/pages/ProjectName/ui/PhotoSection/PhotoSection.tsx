import { MultiContainer } from "@/shared/ui";
import styles from "./PhotoSection.module.scss";
import { useParams } from "react-router-dom";
import { useDetailProjectStore } from "@/app/store/projectDetail/projectDetail";
import { useEffect } from "react";

export function PhotoSection() {
  const { id } = useParams<{ id: string }>();
  const { data, fetchProjectById } = useDetailProjectStore();
  useEffect(() => {
    if (id) {
      fetchProjectById(Number(id));
    }
  }, [id, fetchProjectById]);
  return (
    <MultiContainer className={styles.photoGallery}>
      <div className={styles.gallery}>
        {data?.gallery_images.map((image, index) => (
          <img
            key={image.id}
            className={styles[`p${index + 1}`]}
            src={image.image}
            alt=""
          />
        ))}
      </div>
    </MultiContainer>
  );
}
