import React, { useState } from "react";
import { Gallery } from "./ui/Gallery/Gallery";
import { Pagination } from "./ui/Pagination/Pagination";
import styles from "./Allbom.module.scss";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

// Мок данные для названий альбомов
const albumNames: { [key: string]: string } = {
  "1": "Природа Казахстана",
  "2": "Городские пейзажи",
  "3": "Культурное наследие",
  "4": "Спортивные события",
  "5": "Научные достижения",
  "6": "Молодежные форумы",
};

export const Allbom = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const albumTitle = albumNames[albumId || "1"] || `Альбом ${albumId}`;

  // Мок данные для фото
  const allItems: GalleryItem[] = Array.from({ length: 48 }, (_, index) => ({
    id: index + 1,
    src: `https://picsum.photos/seed/${albumId}-${index}/400/300`,
    alt: `Фото ${index + 1}`,
    title: `Фото ${index + 1}`,
  }));

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Навигационные обработчики
  const handleGoHome = () => navigate("/");
  const handleGoMedia = () => navigate("/media");
  const handleGoPhotoGallery = () => navigate("/photoGallery");

  return (
    <div className={styles.main}>
      <div className={styles.breadcrumbs}>
        <span onClick={handleGoHome} className={styles.clickable}>
          Главная
        </span>
        <ChevronRight size={14} />
        <span onClick={handleGoMedia} className={styles.clickable}>
          Медиа
        </span>
        <ChevronRight size={14} />
        <span onClick={handleGoPhotoGallery} className={styles.clickable}>
          Фотогалерея
        </span>
        <ChevronRight size={14} />
        <span className={styles.current}>Альбом "{albumTitle}"</span>
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{albumTitle}</h1>
        </header>

        <Gallery items={currentItems} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className={styles.info}>
          <p className={styles.infoText}>
            Страница {currentPage} из {totalPages} • Показано{" "}
            {currentItems.length} из {allItems.length} элементов
          </p>
        </div>
      </div>
    </div>
  );
};
