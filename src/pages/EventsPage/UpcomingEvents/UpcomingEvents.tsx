import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './style.module.scss'
import Card from '@/widgets/Card/Card'
import img from '../../../shared/assets/images/photo.png'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next'
import { eventsStore } from '@/app/store/events/events'
import { useNavigate } from 'react-router-dom'


const UpcomingEvents: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
  const {t, i18n} = useTranslation()
  const navigate = useNavigate()
   const { event, loading, error, fetchevents } = eventsStore();
   const upcomingEvents = event.filter(event => event.event_status === "upcoming");

     useEffect(() => {
       fetchevents();
     }, []);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current
      swiperInstance.params.navigation.nextEl = nextRef.current
      swiperInstance.navigation.init()
      swiperInstance.navigation.update()
    }
  }, [swiperInstance])
 if (loading) {
  return <div className='loader'></div>;
}
if (error) {
  return <p style={{ color: "red" }}>{error}</p>;
}
  return (
    <div className={styles.UpcomingEvents}>
      <h1 className={styles.title}>{t('events.upcomingEvents')}</h1>

      <div className={styles.swiperWrapper}>
        <button ref={prevRef} className={styles.customArrow}>
           <ChevronLeft />
        </button>

        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiperInstance}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2.12 },
            769: { slidesPerView: 3.1 },
          }}
        >
          {upcomingEvents.map((event) => (
            <SwiperSlide key={event.id} className={styles.slide}>
              <Card onClick={() => navigate(`/events/${event.id}`)}  item={event}/>
            </SwiperSlide>
          ))}
        </Swiper>

        <button ref={nextRef} className={styles.customArrow}>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

export default UpcomingEvents
