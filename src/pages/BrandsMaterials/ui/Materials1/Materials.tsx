import React, { useState, useEffect } from "react";
import styles from "./Materials.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMaterialsStore } from "@/app/store/Brands/materialsStore";

const Materials2: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const { t } = useTranslation();
  const { materials, loading, fetchMaterials } = useMaterialsStore();

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const updateVisibleCount = () => {
    const width = window.innerWidth;
    if (width <= 577) setVisibleCount(2);
    else if (width <= 977) setVisibleCount(3);
    else setVisibleCount(4);
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className={styles.brand}>
          <div className={styles.headMaterials}>
            <h1>Похожие товары</h1>
          </div>
          <div className={styles.loader}>Загрузка...</div>
        </div>
      </div>
    );
  }

  const displayMaterials = materials.slice(0, visibleCount);

  return (
    <div className="container">
      <div className={styles.brand}>
        <div className={styles.headMaterials}>
          <h1>Похожие товары</h1>
        </div>
        <div className={styles.itemMaterialCards}>
          {displayMaterials.map((item) => (
            <Link key={item.id} to={`/detailview/${item.id}`}>
              <div className={styles.materialCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg";
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
    </div>
  );
};

export default Materials2;
