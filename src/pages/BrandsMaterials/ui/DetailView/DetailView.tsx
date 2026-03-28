import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailView.module.scss";
import Materials from "../Materials1/Materials";
import { useDetailStore } from "@/app/store/detail/detailStore";
import Navpanel from "@/widgets/Navpanel/Navpanel";
import { useTranslation } from "react-i18next";

function DetailView() {
  const { id } = useParams<{ id: string }>();
  const { selectedMaterial, fetchMaterialById, loading, error } = useDetailStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) fetchMaterialById(Number(id));
  }, [id, fetchMaterialById]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!selectedMaterial) return <p>No material found</p>;

  return (
    <div className="container">
      <div className={styles.detailview}>
        <div className={styles.text}>
          <Navpanel
            text={t("brandMaterials.home")}
            link="/"
            text2={t("brandMaterials.brandMaterials")}
            link2="/main"
            text3={selectedMaterial.title}
          />
        </div>

        <div className={styles.view}>
          <div className={styles.div}>
            <div className={styles.gallery}>
              <img src={selectedMaterial.image} alt={selectedMaterial.title} />

              <div className={styles.imgs}>
                <img src={selectedMaterial.image} alt={selectedMaterial.title} />
                <img src={selectedMaterial.image} alt={selectedMaterial.title} />
                <img src={selectedMaterial.image} alt={selectedMaterial.title} />
              </div>
            </div>
            <div className={styles.price2}>
              <h1>{t("brandMaterials.price")}:</h1>
              <button>
                <p>{selectedMaterial.price} KGZ</p>
              </button>
            </div>
          </div>

          <div className={styles.name}>
            <div className={styles.hero}>
              <h1>{selectedMaterial.title}</h1>
              <h4>{selectedMaterial.description}</h4>
            </div>

            <div className={styles.price}>
              <h1>{t("brandMaterials.price")}:</h1>
              <button>
                <p>{selectedMaterial.price} KGZ</p>
              </button>
            </div>
          </div>
        </div>

        <h2 className={styles.h2}>{t("brandMaterials.SimilarProducts")}</h2>
        <Materials />
      </div>
    </div>
  );
}

export default DetailView;
