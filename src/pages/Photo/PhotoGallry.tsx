import { AlbumCard } from "@/shared/ui/Media/MediaCard";
import Navpanel from "@/widgets/Navpanel/Navpanel";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PhotoGallry.module.scss";
import { useTranslation } from "react-i18next";
import { useImagesStore } from "@/app/store/Media/images";

// Константы
const ITEMS_PER_PAGE = 16;

// Мок-данные для альбомов (если нужны)
const albums = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  title: `Альбом ${i + 1}`,
  event: `Событие ${Math.ceil((i + 1) / 3)}`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/400/300`,
  count: Math.floor(Math.random() * 50) + 1,
}));

export function PhotoGallry() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading, error, imagesCards, fetchImages } = useImagesStore();

  // Оптимизированные вычисления с useMemo
  const { totalPages, currentAlbums } = useMemo(() => {
    const total = Math.ceil(albums.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const current = albums.slice(start, start + ITEMS_PER_PAGE);
    return { totalPages: total, currentAlbums: current };
  }, [currentPage]);

  // Обработчики событий
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleGoBack = () => navigate("/media");

  // Состояния загрузки и ошибки
  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p>{t("PhotoGallery.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>{error}</p>
        <button onClick={() => fetchImages()} className={styles.retryButton}>
          {t("PhotoGallery.retry")}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Навигация */}
      <div className={styles.breadcrumbs}>
        <Navpanel
          text={t("PhotoGallery.home")}
          link="/"
          text2={t("PhotoGallery.media")}
          link2="/media"
          text3={t("PhotoGallery.PhotoGallery")}
        />
      </div>

      {/* Заголовок */}
      <header className={styles.header}>
        <h1 className={styles.title}>{t("PhotoGallery.PhotoGallery")}</h1>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            aria-label={t("PhotoGallery.selectDate")}
          >
            <span className={styles.buttonText}>
              {t("PhotoGallery.selectDate")}
            </span>
            <ArrowRightIcon className={styles.buttonIcon} />
          </button>
          <button
            className={styles.button}
            onClick={handleGoBack}
            aria-label={t("PhotoGallery.goBack")}
          >
            <span className={styles.buttonText}>
              {t("PhotoGallery.goBack")}
            </span>
            <ArrowRightIcon className={styles.buttonIcon} />
          </button>
        </div>
      </header>

      {/* Галерея */}
      <div className={styles.gallery}>
        {currentAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            title={album.title}
            event={album.event}
            imageUrl={album.imageUrl}
            count={album.count}
            onClick={() => navigate(`/album/${album.id}`)}
          />
        ))}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label={t("PhotoGallery.previousPage")}
          >
            <ArrowLeftIcon className={styles.pageIcon} />
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`${styles.pageNumber} ${
                  currentPage === i + 1 ? styles.active : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
                aria-label={`${t("PhotoGallery.page")} ${i + 1}`}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className={styles.pageButton}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label={t("PhotoGallery.nextPage")}
          >
            <ArrowRightIcon className={styles.pageIcon} />
          </button>
        </div>
      )}
    </div>
  );
}
