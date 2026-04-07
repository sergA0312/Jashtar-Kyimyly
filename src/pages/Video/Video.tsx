import { ArrowRightIcon, ArrowLeftIcon, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import styles from "./VideoGallry.module.scss";
import { VideoCard } from "@/pages/Media/ui/VideoCard/VideoCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Navpanel from "@/widgets/Navpanel/Navpanel";
import vidioIMG from "@/shared/assets/images/vidioimg.png";
const ITEMS_PER_PAGE = 9;

// Функция для генерации мок-данных
const generateMockVideos = (count: number) => {
  const dates = [
    "12.03.2025",
    "10.03.2025",
    "08.03.2025",
    "05.03.2025",
    "02.03.2025",
    "28.02.2025",
    "25.02.2025",
    "22.02.2025",
    "20.02.2025",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    date: dates[i % dates.length],
    title: `Название видео "${Math.floor(i / 3) + 1}"`,
    videoUrl: "https://example.com/videos/video.mp4",
    thumbnailUrl: vidioIMG,
  }));
};

// Мок-данные для видео
const VideoData = generateMockVideos(13);

export function Video() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Оптимизированные вычисления с useMemo
  const { totalPages, currentVideos } = useMemo(() => {
    const total = Math.ceil(VideoData.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const current = VideoData.slice(start, start + ITEMS_PER_PAGE);
    return { totalPages: total, currentVideos: current };
  }, [currentPage]);
  const handleGoHome = () => navigate("/");
  const handleGoMedia = () => navigate("/media");
  // Обработчики событий
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleGoBack = () => navigate("/media");

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span onClick={handleGoHome} className={styles.clickable}>
          {t("PhotoGallery.home") || "Главная"}
        </span>
        <ChevronRight size={14} />
        <span onClick={handleGoMedia} className={styles.clickable}>
          {t("PhotoGallery.media") || "Медиа"}
        </span>
        <ChevronRight size={14} />
        <span className={styles.current}>
          {t("PhotoGallery.PhotoGallery") || "Фотогалерея"}
        </span>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>
          {String(t("VideoLibrary.VideoLibrary"))}
        </h1>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            aria-label={String(t("VideoLibrary.selectDate"))}
          >
            <span className={styles.buttonText}>
              {String(t("VideoLibrary.selectDate"))}
            </span>
            <ArrowRightIcon className={styles.buttonIcon} />
          </button>

          <button
            className={styles.button}
            onClick={handleGoBack}
            aria-label={String(t("VideoLibrary.goBack"))}
          >
            <span className={styles.buttonText}>
              {String(t("VideoLibrary.goBack"))}
            </span>
            <ArrowRightIcon className={styles.buttonIcon} />
          </button>
        </div>
      </header>

      <div className={styles.gallery}>
        {currentVideos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            date={video.date}
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label={String(t("VideoLibrary.previousPage"))}
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
                aria-label={`Страница ${i + 1}`}
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
            aria-label={String(t("VideoLibrary.nextPage"))}
          >
            <ArrowRightIcon className={styles.pageIcon} />
          </button>
        </div>
      )}
    </div>
  );
}
