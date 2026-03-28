import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import img from '../../shared/assets/images/photo.png'
import Card from '@/widgets/Card/Card'
import Navpanel from '@/widgets/Navpanel/Navpanel'
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next'
import { eventsStore } from '@/app/store/events/events'
import { EventDetailStore } from '@/app/store/events/eventsDetail'
import { useNavigate } from 'react-router-dom'

function EventsArchivePage() {
  const {t, i18n} = useTranslation()
  const { event, loading, error, fetchevents } = eventsStore();
  const navigate = useNavigate()
  const {fetchEventDetail} = EventDetailStore()
  useEffect(() => {
    fetchevents();
  }, []);
  // 👉 Настройки пагинации
  const pageSize = 12
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(event.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const currentEvents = event.slice(startIndex, startIndex + pageSize)

  // 👉 Функция для "умной" пагинации
  const getPaginationRange = () => {
    const delta = 1 // сколько кнопок показывать вокруг текущей
    const range: (number | string)[] = []
    const left = Math.max(2, currentPage - delta)
    const right = Math.min(totalPages - 1, currentPage + delta)

    range.push(1)

    if (left > 2) {
      range.push('...')
    }

    for (let i = left; i <= right; i++) {
      range.push(i)
    }

    if (right < totalPages - 1) {
      range.push('...')
    }

    if (totalPages > 1) {
      range.push(totalPages)
    }

    return range
  }
if (loading) {
  return <p>Загрузка...</p>;
}
if (error) {
  return <p style={{ color: "red" }}>{error}</p>;
}
  return (
    <div className={`${styles.eventsArchivePage} container`}>
      <Navpanel text={t('events.home')} link='/' text2={t('events.events')} link2='/events' text3={t('events.eventArchive')}/>
      <div className={styles.eventsText2}>
        <h1>{t('events.eventArchive')}</h1>
      </div>

      <div className={styles.eventsArchive2}>
        {currentEvents.map((event) => (
          <Card onClick={() => navigate(`/events/${event.id}`)} key={event.id} item={event} />
        ))}
      </div>

      {/* 👉 Пагинация */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
           <ChevronLeft />
          </button>
        
          {getPaginationRange().map((page, index) =>
            page === '...' ? (
              <span key={index} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(Number(page))}
                className={currentPage === page ? styles.activePage : ''}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
           <ChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default EventsArchivePage
