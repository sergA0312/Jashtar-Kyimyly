// import React, { useEffect, useState } from "react";
// import styles from "./Materials.module.scss";
// import { Link } from "react-router-dom";
// import { useMaterialsStore } from "@/app/store/Brands/materialsStore";

// function Materials() {
//   const { materials, fetchMaterials, loading, error } = useMaterialsStore();
//   const [visibleCount, setVisibleCount] = useState<number>(4);

//   const updateVisibleCount = () => {
//     const width = window.innerWidth;
//     if (width <= 600) setVisibleCount(1);
//     else if (width <= 900) setVisibleCount(2);
//     else if (width <= 1200) setVisibleCount(3);
//     else setVisibleCount(4);
//   };

//   useEffect(() => {
//     updateVisibleCount();
//     window.addEventListener("resize", updateVisibleCount);

//     fetchMaterials();

//     return () => window.removeEventListener("resize", updateVisibleCount);
//   }, [fetchMaterials]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="">
//       <div className={styles.materialsContainer}>
//         {materials.slice(0, visibleCount).map((item) => (
//           <Link key={item.id} to={`/detailview/${item.id}`}> 
//             <div className={styles.materialCard}>
//               <img src={item.image} alt={item.title} />
//               <div>
//                 <h3>{item.title}</h3>
//                 <p className={styles.description}>{item.price}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Materials;


import React, { useState, useEffect } from "react";
import styles from "./Materials.module.scss";
import { Link } from "react-router-dom";
import { useMaterialsStore } from "@/app/store/Brands/materialsStore";

const Materials2: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const { materials, fetchMaterials, loading, error } = useMaterialsStore();

  const updateVisibleCount = () => {
    const width = window.innerWidth;
    if (width <= 600) setVisibleCount(1);
    else if (width <= 900) setVisibleCount(2);
    else if (width <= 1200) setVisibleCount(3);
    else setVisibleCount(4);
  };

  const maxIndex = materials.length - visibleCount;

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex < maxIndex) setStartIndex(startIndex + 1);
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    fetchMaterials();

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [fetchMaterials]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="">
      <div className={styles.container1}>
        <div className={styles.materialsContainer}>
          {materials.slice(startIndex, startIndex + visibleCount).map((item) => (
            <Link key={item.id} to={`/detailview/${item.id}`}>
              <div className={styles.materialCard}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p className={styles.description}>{item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.controlsRow}>
          <button className={styles.btns} onClick={handlePrev} disabled={startIndex === 0}>
            <img src="https://cdn-icons-png.flaticon.com/512/60/60775.png" alt="prev" />
          </button>

          <div className={styles.pagination}>
            {Array.from({ length: materials.length }, (_, i) => (
              <button
                key={i}
                className={startIndex === i ? styles.activeNumber : ""}
                onClick={() => setStartIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button className={styles.btns} onClick={handleNext} disabled={startIndex >= maxIndex}>
            <img src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Materials2;
