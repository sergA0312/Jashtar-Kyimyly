import Navpanel from '@/widgets/Navpanel/Navpanel'
import React, { useEffect } from 'react'
import styles from './style.module.scss'
import img1 from '../../shared/assets/images/image (1).png'
import img2 from '../../shared/assets/images/image (2).png'
import img3 from '../../shared/assets/icons/time-line.svg'
import img4 from '../../shared/assets/icons/calendar-line.svg'
import img5 from '../../shared/assets/icons/map-pin-line.svg'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { EventDetailStore } from '@/app/store/events/eventsDetail'
import { useLanguageStore } from '@/app/store/languageStore'

function NameOfTheEvent() {
    const {t, i18n} = useTranslation()
    const { id } = useParams();
  const { eventDetail, fetchEventDetail, loading, error } = EventDetailStore();
    const { currentLang } = useLanguageStore();
  useEffect(() => {
    if (id) {
      fetchEventDetail(Number(id));
    }
  }, [id, currentLang]);

  if (loading) return <div className='loader'></div>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!eventDetail) return <p>Нет данных</p>;

  return (
    <div className={`${styles.wrapper} container`}>
      <Navpanel 
        text={t('events.home')} link='/' 
        text2={t('events.events')} link2='/events' 
        text3={eventDetail.title}
      />

      <div className={styles.event}>
        <h1 className={styles.title}>{eventDetail.title}</h1>

        <p className={styles.description}>
        {eventDetail.description}
        </p>

        <div className={styles.imagesBlock}>
           {eventDetail.images.length > 0 && (
  <div className={styles.imagesRow}>
    <div className={styles.imagesGroup}>
      <img src={eventDetail.images[0]?.image} alt={eventDetail.title} />
      <div className={styles.images}>
        <img src={eventDetail.images[1]?.image} alt={eventDetail.title} />
        <img src={eventDetail.images[2]?.image} alt={eventDetail.title}  />
      </div>
    </div>

    <div className={styles.imagesFooter}>
      <img src={eventDetail.images[3]?.image} alt={eventDetail.title}  />
      <img src={eventDetail.images[4]?.image} alt={eventDetail.title}  />
    </div>
  </div>
)}

        </div>

        <div className={styles.details}>
          <h1 className={styles.detailsTitle}>{t('events.detailevent')}</h1>
          <span className={styles.detail}><img src={img3} alt="" /> {eventDetail.time}</span>
          <span className={styles.detail}><img src={img4} alt="" /> {eventDetail.date} </span>
          <span className={styles.detail}><img src={img5} alt="" />{eventDetail.place}</span>
        </div>
      </div>
    </div>
  )
}

export default NameOfTheEvent
