import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <nav className={styles.pagination}>
      <button
        className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        <ChevronLeftIcon className={styles.icon} />
      </button>

      <div className={styles.pageNumbers}>
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ''
            } ${typeof page === 'string' ? styles.ellipsis : ''}`}
            onClick={() => handlePageClick(page)}
            disabled={typeof page === 'string'}
            aria-label={typeof page === 'number' ? `Страница ${page}` : 'Многоточие'}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={`${styles.navButton} ${styles.next} ${
          currentPage === totalPages ? styles.disabled : ''
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        <ChevronRightIcon className={styles.icon} />
      </button>
    </nav>
  );
};