import React, { useEffect } from "react";
import styles from "./NameMerch.module.scss";
import { useMaterialsStore } from "@/app/store/Brands/materialsStore";
import { useParams } from "react-router-dom";

function NameMerch() {
  const { id } = useParams();
  const { materials, loading, fetchMaterials } = useMaterialsStore();

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  if (loading) {
    return <div className={styles.container2}>Загрузка...</div>;
  }

  const currentMaterial = materials.find((item) => item.id === Number(id));
  const otherMaterials = materials.filter((item) => item.id !== Number(id));

  if (!currentMaterial) {
    return <div className={styles.container2}>Товар не найден</div>;
  }

  return (
    <div className={styles.container2}>
      <div className={styles.mainCard}>
        <img
          src={currentMaterial.image}
          alt={currentMaterial.title}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
          }}
        />
        <div className={styles.div}>
          <h2 className={styles.name}>{currentMaterial.title}</h2>
          <p className={styles.price}>{currentMaterial.price} KGZ</p>
          <p className={styles.description}>
            Однозначно, интерактивные прототипы формируют глобальную
            экономическую сеть и при этом — заблокированы в рамках своих
            собственных рациональных ограничений. Значимость этих проблем
            настолько очевидна.
          </p>
        </div>
      </div>

      {otherMaterials.length > 0 && (
        <div className={styles.similarProducts}>
          <h3>Похожие товары</h3>
          <div className={styles.similarGrid}>
            {otherMaterials.slice(0, 4).map((item) => (
              <div key={item.id} className={styles.similarCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg";
                  }}
                />
                <h4>{item.title}</h4>
                <p>{item.price} KGZ</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NameMerch;
