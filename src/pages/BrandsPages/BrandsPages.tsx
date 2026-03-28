import React, { useState, useEffect } from "react";
import styles from "./Materials.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Material = {
  id: number;
  image: string;
  price: string;
  name: string;
};

const materials: Material[] = [
  { id: 1, image: "https://cdn-sh1.vigbo.com/shops/184868/products/22341008/images/2-e14428d4acf615f74cb36aaa67e09f87.jpg", name: 'Название мерча 1', price: "1000 KGZ" },
  { id: 2, image: "https://cdn-sh1.vigbo.com/shops/184868/products/22341008/images/2-e14428d4acf615f74cb36aaa67e09f87.jpg", name: 'Название мерча 2', price: "1200 KGZ" },
  { id: 3, image: "https://cdn-sh1.vigbo.com/shops/184868/products/22341008/images/2-e14428d4acf615f74cb36aaa67e09f87.jpg", name: 'Название мерча 3', price: "1500 KGZ" },
  { id: 4, image: "https://cdn-sh1.vigbo.com/shops/184868/products/22341008/images/2-e14428d4acf615f74cb36aaa67e09f87.jpg", name: 'Название мерча 4', price: "900 KGZ" },
];

function BrandsPages() {
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const usenavigate = useNavigate()
    const { t, i18n } = useTranslation();
  const updateVisibleCount = () => {
    const width = window.innerWidth;
    if (width <= 480) setVisibleCount(3);
    else if (width <= 900) setVisibleCount(4);
    else if (width <= 1200) setVisibleCount(4);
    else setVisibleCount(4);
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <div className={`${styles.materialsContainer} container`}>
       <div className={styles.headMaterials}>
        <h1>{t('landing.brandMaterials')}</h1>
         <button onClick={() => usenavigate('/main')}>{t('landing.button')}</button>
        </div>
      <div className={styles.itemMaterialCards}>
      {materials.slice(0, visibleCount).map((item) => (
        <Link key={item.id} to={`/detailview`}>
          <div className={styles.materialCard}>
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p className={styles.price}>{item.price}</p>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}

export default BrandsPages;
