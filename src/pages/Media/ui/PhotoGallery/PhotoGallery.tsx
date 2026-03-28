import { ArrowRightIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoCard } from '../PhotoCard/PhotoCard';
import styles from './PhotoGallery.module.scss';
import { useTranslation } from 'react-i18next';
import { useImagesStore } from '@/app/store/Media/images';

// Определение интерфейсов
interface GalleryImage {
  id: number;
  gallery: number;
  image: string;
}

interface ApiImageItem {
  id: number;
  title: string;
  date?: string;
  images: GalleryImage[];
}

interface ImageItem {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

export const PhotoGallery: React.FC = () => {
  const { imagesCards, loading, error, fetchImages } = useImagesStore();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);


  const navigate = useNavigate();
  const { t, i18n } = useTranslation()
  console.log("Current language:", imagesCards);
  
    // const navigate = useNavigate();
    // const {t , i18n} = useTranslation()
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('media.PhotoGallery')}</h1>
        
        <button onClick={() => navigate("/photoGallery")} className={styles.button}>
          <span className={styles.buttonText}>{t('media.allPhoto')}</span>
          <ArrowRightIcon className={styles.buttonIcon} />
        </button>
      </header>

      <main className={styles.gallery}>
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p className={styles.error}>Ошибка: {error}</p>
        ) : imagesCards.length === 0 ? (
          <p>Нет доступных изображений.</p>
        ) : (
          imagesCards.slice(0, 6).map((item) => (
            <PhotoCard
              key={item.id}
              id={item.id}
              date={item.date}
              title={item.title}
              imageUrl={item.image}
            />
          ))
        )}
      </main>
    </div>
  );
};