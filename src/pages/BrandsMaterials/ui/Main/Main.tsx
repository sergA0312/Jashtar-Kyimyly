import React, { useEffect } from "react";
import styles from "./Main.module.scss";
import Navpanel from "@/widgets/Navpanel/Navpanel";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useMaterialsStore } from "@/app/store/Brands/materialsStore";

function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { materials, loading, error, fetchMaterials } = useMaterialsStore();

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  if (loading) {
    return (
      <div className={styles.main}>
        <Navpanel
          text={t("brandMaterials.home")}
          link="/"
          text2={t("brandMaterials.brandMaterials")}
        />
        <div className="container">
          <div className={styles.loader}>Загрузка...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.main}>
        <Navpanel
          text={t("brandMaterials.home")}
          link="/"
          text2={t("brandMaterials.brandMaterials")}
        />
        <div className="container">
          <div className={styles.error}>Ошибка: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Navpanel
        text={t("brandMaterials.home")}
        link="/"
        text2={t("brandMaterials.brandMaterials")}
      />
      <div className={`${styles.herotext} container`}>
        <h1>{t("brandMaterials.brandMaterials")}</h1>
        <h3>
          Однозначно, интерактивные прототипы формируют глобальную экономическую
          сеть и при этом — заблокированы в рамках своих собственных
          рациональных ограничений. Значимость этих проблем настолько очевидна.
        </h3>
      </div>
      <div className={`${styles.content} container`}>
        {materials.map((item) => (
          <Link key={item.id} to={`/detailview/${item.id}`}>
            <div className={styles.materialCard}>
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                }}
              />
              <div className={styles.cardTitle}>
                <h4>{item.title}</h4>
                <p className={styles.price}>{item.price} KGZ</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Main;
